"use client";

import * as React from "react";
import { getActiveLocations } from "@/lib/api/locations";
import { findNearest } from "@/lib/geo/distance";
import { isWithinUsServiceArea } from "@/lib/geo/serviceArea";
import type { Location } from "@/lib/types";

const STORAGE_KEY = "fjh-nearest-location-v1";
const SELECTED_LOCATION_KEY = "fjh-selected-location-v1";
const PROMPT_DISMISSED_KEY = "fjh-location-prompt-dismissed-v1";
const MAX_CACHE_AGE_MS = 1000 * 60 * 60 * 24 * 14;
const PROMPT_SNOOZE_MS = 1000 * 60 * 60 * 24 * 7;
const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 8000,
  maximumAge: 1000 * 60 * 60,
}; 

type CachedResult = {
  storeId: number;
  distanceMiles: number;
  timestamp: number;
};

type SelectedLocation = {
  storeId: number;
  timestamp: number;
};

type NearestLocationState = {
  status: "idle" | "resolved" | "unavailable";
  nearest: (Location & { distanceMiles: number }) | null;
  /** True when the current location was set by an explicit in-app user pick
   * (FindFlamePopup). False for auto-detection (GPS/IP/cache). Used to
   * prevent LocationContextSync on transitioning-away pages from overwriting
   * a deliberate store selection. */
  isManuallySelected: boolean;
  promptVisible: boolean;
  outsideServiceAreaVisible: boolean;
};

type NearestLocationContextValue = NearestLocationState & {
  /** Whether the shared "Find your Flame" store picker is open. Lives here,
   * not in Navbar, so every entry point (navbar button, the "Not your
   * location?" link on a location page, …) opens the exact same modal. */
  findFlameOpen: boolean;
  requestLocation: () => void;
  dismissPrompt: () => void;
  dismissOutsideServiceArea: () => void;
  selectLocation: (storeId: number) => void;
  openFindFlame: () => void;
  closeFindFlame: () => void;
  /** Resolves the nearest store from a plain lat/lng (e.g. a ZIP code lookup) instead of a GeolocationPosition. Returns the resolved store, or null if none (outside service area or no match). */
  resolveFromCoordinates: (origin: { lat: number; lng: number }) => Location | null;
};

const defaultContextValue: NearestLocationContextValue = {
  status: "idle",
  nearest: null,
  isManuallySelected: false,
  promptVisible: false,
  outsideServiceAreaVisible: false,
  findFlameOpen: false,
  requestLocation: () => {},
  dismissPrompt: () => {},
  dismissOutsideServiceArea: () => {},
  selectLocation: () => {},
  openFindFlame: () => {},
  closeFindFlame: () => {},
  resolveFromCoordinates: () => null,
};

const NearestLocationContext =
  React.createContext<NearestLocationContextValue>(defaultContextValue);

function readCache(): CachedResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedResult;
    if (
      typeof parsed.storeId !== "number" ||
      typeof parsed.distanceMiles !== "number" ||
      typeof parsed.timestamp !== "number"
    ) {
      return null;
    }
    if (Date.now() - parsed.timestamp > MAX_CACHE_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(result: CachedResult) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {}
}

function readSelectedLocation(): SelectedLocation | null {
  try {
    const raw = localStorage.getItem(SELECTED_LOCATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SelectedLocation;
    if (
      typeof parsed.storeId !== "number" ||
      typeof parsed.timestamp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readSelectedLocationCookie(): number | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SELECTED_LOCATION_KEY}=([^;]*)`)
  );
  if (!match) return null;
  const storeId = Number(decodeURIComponent(match[1]));
  return Number.isNaN(storeId) ? null : storeId;
}

// The cookie is what proxy.ts (server) already used to decide this
// visitor's redirect, so it's the source of truth. localStorage is checked
// only as a fallback — e.g. right after that redirect, on this device,
// localStorage hasn't been written yet even though the cookie has.
function readSelectedStoreId(): number | null {
  const cookieStoreId = readSelectedLocationCookie();
  if (cookieStoreId !== null) return cookieStoreId;
  return readSelectedLocation()?.storeId ?? null;
}

function writeSelectedLocation(storeId: number) {
  try {
    const value = JSON.stringify({ storeId, timestamp: Date.now() });
    localStorage.setItem(SELECTED_LOCATION_KEY, value);
    // Also save as a cookie for the Edge Middleware to read instantly
    document.cookie = `${SELECTED_LOCATION_KEY}=${storeId}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {}
}

function clearSelectedLocation() {
  try {
    localStorage.removeItem(SELECTED_LOCATION_KEY);
    document.cookie = `${SELECTED_LOCATION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch {}
}

function isPromptRecentlyDismissed(): boolean {
  try {
    const raw = localStorage.getItem(PROMPT_DISMISSED_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (Number.isNaN(dismissedAt)) return false;
    return Date.now() - dismissedAt < PROMPT_SNOOZE_MS;
  } catch {
    return false;
  }
}

function writePromptDismissed() {
  try {
    localStorage.setItem(PROMPT_DISMISSED_KEY, String(Date.now()));
  } catch {}
}

// promptVisible stays true here so the ZIP-entry fallback in the soft-ask
// card still has a chance once GPS is denied/unsupported, instead of the
// visitor being left with no way to resolve a store at all.
const unavailableState: NearestLocationState = {
  status: "unavailable",
  nearest: null,
  isManuallySelected: false,
  promptVisible: true,
  outsideServiceAreaVisible: false,
};

function keepResolvedOrUnavailable(prev: NearestLocationState) {
  return prev.status === "resolved" ? prev : unavailableState;
}

function toResolvedLocation(
  location: Location,
  distanceMiles: number = 0
): Location & { distanceMiles: number } {
  return { ...location, distanceMiles };
}

export function NearestLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<NearestLocationState>({
    status: "idle",
    nearest: null,
    isManuallySelected: false,
    promptVisible: false,
    outsideServiceAreaVisible: false,
  });

  // Tracks an explicit "Got it" dismissal for this session so a slower,
  // independently-running check (e.g. GPS resolving after the faster IP
  // check already showed and was dismissed) can't reopen the notice.
  const outsideAreaDismissedRef = React.useRef(false);

  const [findFlameOpen, setFindFlameOpen] = React.useState(false);
  const openFindFlame = React.useCallback(() => setFindFlameOpen(true), []);
  const closeFindFlame = React.useCallback(() => setFindFlameOpen(false), []);

  const resolveFromCoordinates = React.useCallback(
    (origin: { lat: number; lng: number }): Location | null => {
      const activeLocations = getActiveLocations();
      if (!isWithinUsServiceArea(origin.lat, origin.lng)) {
        setState({
          status: "unavailable",
          nearest: null,
          isManuallySelected: false,
          promptVisible: false,
          outsideServiceAreaVisible: !outsideAreaDismissedRef.current,
        });
        return null;
      }

      const result = findNearest(origin, activeLocations);
      if (!result) {
        setState(keepResolvedOrUnavailable);
        return null;
      }
      writeCache({
        storeId: result.item.id,
        distanceMiles: result.distanceMiles,
        timestamp: Date.now(),
      });
      if (readSelectedStoreId() !== null) return result.item;
      setState({
        status: "resolved",
        nearest: toResolvedLocation(result.item, result.distanceMiles),
        // Auto-detected by GPS/IP — not a deliberate user pick.
        isManuallySelected: false,
        promptVisible: false,
        outsideServiceAreaVisible: false,
      });
      return result.item;
    },
    []
  );

  const resolveFromPosition = React.useCallback(
    (position: GeolocationPosition) => {
      resolveFromCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    [resolveFromCoordinates]
  );

  const requestLocation = React.useCallback(() => {
    clearSelectedLocation();
    setState((prev) => ({
      ...prev,
      // User explicitly asked for GPS — clear the manual override so
      // the GPS result can take effect without being blocked.
      isManuallySelected: false,
      promptVisible: false,
      outsideServiceAreaVisible: false,
    }));
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState(keepResolvedOrUnavailable);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolveFromPosition,
      () => {
        writePromptDismissed();
        setState(keepResolvedOrUnavailable);
      },
      GEO_OPTIONS
    );
  }, [resolveFromPosition]);

  const dismissPrompt = React.useCallback(() => {
    writePromptDismissed();
    setState((prev) => ({
      ...prev,
      promptVisible: false,
      status: prev.status === "resolved" ? "resolved" : "unavailable",
    }));
  }, []);

  const dismissOutsideServiceArea = React.useCallback(() => {
    outsideAreaDismissedRef.current = true;
    setState((prev) => ({ ...prev, outsideServiceAreaVisible: false }));
  }, []);

  const selectLocation = React.useCallback((storeId: number) => {
    const store = getActiveLocations().find(
      (location) => location.id === storeId
    );
    if (!store) return;
    writeSelectedLocation(store.id);
    setFindFlameOpen(false);
    setState({
      status: "resolved",
      nearest: toResolvedLocation(store),
      // Mark as a deliberate user pick so LocationContextSync on any
      // page that is transitioning away doesn't overwrite this choice.
      isManuallySelected: true,
      promptVisible: false,
      outsideServiceAreaVisible: false,
    });
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const activeLocations = getActiveLocations();
    const selectedStoreId = readSelectedStoreId();
    const cached = readCache();

    const applyStoreId = (
      storeId: number,
      distanceMiles: number,
      manually: boolean = false
    ) => {
      const store = activeLocations.find((l) => l.id === storeId);
      if (!store) return;
      if (!cancelled) {
        setState((prev) => ({
          ...prev,
          status: "resolved",
          nearest: toResolvedLocation(store, distanceMiles),
          // Only mark as manual when restoring a stored explicit pick.
          // GPS cache restores keep the existing isManuallySelected value.
          isManuallySelected: manually ? true : prev.isManuallySelected,
          outsideServiceAreaVisible: false,
        }));
      }
    };

    if (selectedStoreId !== null) {
      const selectedStore = activeLocations.find(
        (location) => location.id === selectedStoreId
      );
      if (selectedStore) {
        writeSelectedLocation(selectedStore.id);
        // Pass manually=true so the restored pick is treated as intentional,
        // preventing LocationContextSync on other pages from overwriting it.
        applyStoreId(selectedStore.id, 0, true);
        return;
      }
      clearSelectedLocation();
    }

    // 1. Immediately apply cache if available (fallback)
    if (cached) {
      // GPS cache is auto-detected — not marked as a manual pick.
      applyStoreId(cached.storeId, cached.distanceMiles);
    }

    // 1.5. No cache or manual pick yet � try silent IP geolocation (Vercel
    // edge headers) as an immediate provisional default. No permission
    // prompt, and it's a no-op in local dev where those headers aren't set.
    // A later GPS fix (if granted) still overwrites this with something
    // more precise.
    if (!cached) {
      fetch("/api/geo/ip")
        .then((res) => (res.ok ? res.json() : null))
        .then((coords: { lat: number; lng: number } | null) => {
          if (!cancelled && coords) resolveFromCoordinates(coords);
        })
        .catch(() => {});
    }

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      if (!cached && !cancelled) {
        setState(unavailableState);
      }
      return;
    }

    const askForLocation = () => {
      if (!cancelled) {
        navigator.geolocation.getCurrentPosition(
          resolveFromPosition,
          () => {
            if (!cancelled) {
              // Remember that user blocked/dismissed � don't ask again for 7 days
              writePromptDismissed();
              setState(keepResolvedOrUnavailable);
            }
          },
          GEO_OPTIONS
        );
      }
    };

    const showSoftAsk = () => {
      if (!cancelled) {
        if (isPromptRecentlyDismissed()) {
          setState(keepResolvedOrUnavailable);
        } else {
          setState((prev) => ({ ...prev, promptVisible: true }));
        }
      }
    };

    // 2. Check permissions to see if we can refresh silently
    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (cancelled) return;
          if (result.state === "granted") {
            // Silently request fresh location
            askForLocation();
          } else if (result.state === "denied") {
            if (!cached) {
              showSoftAsk();
            }
          } else {
            // state === "prompt" � only trigger browser popup if no cache AND not recently dismissed
            if (!cached && !isPromptRecentlyDismissed()) {
              askForLocation();
            }
          }
        })
        .catch(showSoftAsk);
    } else {
      showSoftAsk();
    }

    return () => {
      cancelled = true;
    };
  }, [resolveFromPosition, resolveFromCoordinates]);

  const value = React.useMemo(
    () => ({
      ...state,
      findFlameOpen,
      requestLocation,
      dismissPrompt,
      dismissOutsideServiceArea,
      selectLocation,
      openFindFlame,
      closeFindFlame,
      resolveFromCoordinates,
    }),
    [
      state,
      findFlameOpen,
      requestLocation,
      dismissPrompt,
      dismissOutsideServiceArea,
      selectLocation,
      openFindFlame,
      closeFindFlame,
      resolveFromCoordinates,
    ]
  );

  return (
    <NearestLocationContext.Provider value={value}>
      {children}
    </NearestLocationContext.Provider>
  );
}

export function useNearestLocation() {
  return React.useContext(NearestLocationContext);
}
