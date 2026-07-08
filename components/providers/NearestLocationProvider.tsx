"use client";

import * as React from "react";
import { getActiveLocations } from "@/lib/api/locations";
import { findNearest } from "@/lib/geo/distance";
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
  promptVisible: boolean;
  outsideServiceAreaVisible: boolean;
};

type NearestLocationContextValue = NearestLocationState & {
  requestLocation: () => void;
  dismissPrompt: () => void;
  dismissOutsideServiceArea: () => void;
  selectLocation: (storeId: number) => void;
  /** Resolves the nearest store from a plain lat/lng (e.g. a ZIP code lookup) instead of a GeolocationPosition. Returns true if a store was resolved. */
  resolveFromCoordinates: (origin: { lat: number; lng: number }) => boolean;
};

const defaultContextValue: NearestLocationContextValue = {
  status: "idle",
  nearest: null,
  promptVisible: false,
  outsideServiceAreaVisible: false,
  requestLocation: () => {},
  dismissPrompt: () => {},
  dismissOutsideServiceArea: () => {},
  selectLocation: () => {},
  resolveFromCoordinates: () => false,
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

function writeSelectedLocation(storeId: number) {
  try {
    localStorage.setItem(
      SELECTED_LOCATION_KEY,
      JSON.stringify({ storeId, timestamp: Date.now() })
    );
  } catch {}
}

function clearSelectedLocation() {
  try {
    localStorage.removeItem(SELECTED_LOCATION_KEY);
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
  promptVisible: true,
  outsideServiceAreaVisible: false,
};

function isWithinUsServiceArea(lat: number, lng: number): boolean {
  const contiguousUs =
    lat >= 24.396308 && lat <= 49.384358 && lng >= -125 && lng <= -66.93457;
  const alaska = lat >= 51.2 && lat <= 71.6 && lng >= -179.2 && lng <= -129.9;
  const hawaii = lat >= 18.5 && lat <= 22.5 && lng >= -160.5 && lng <= -154.5;
  return contiguousUs || alaska || hawaii;
}

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
    promptVisible: false,
    outsideServiceAreaVisible: false,
  });

  const resolveFromCoordinates = React.useCallback(
    (origin: { lat: number; lng: number }): boolean => {
      const activeLocations = getActiveLocations();
      if (!isWithinUsServiceArea(origin.lat, origin.lng)) {
        setState({
          status: "unavailable",
          nearest: null,
          promptVisible: false,
          outsideServiceAreaVisible: true,
        });
        return false;
      }

      const result = findNearest(origin, activeLocations);
      if (!result) {
        setState(keepResolvedOrUnavailable);
        return false;
      }
      writeCache({
        storeId: result.item.id,
        distanceMiles: result.distanceMiles,
        timestamp: Date.now(),
      });
      if (readSelectedLocation()) return true;
      setState({
        status: "resolved",
        nearest: toResolvedLocation(result.item, result.distanceMiles),
        promptVisible: false,
        outsideServiceAreaVisible: false,
      });
      return true;
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
    setState((prev) => ({ ...prev, outsideServiceAreaVisible: false }));
  }, []);

  const selectLocation = React.useCallback((storeId: number) => {
    const store = getActiveLocations().find(
      (location) => location.id === storeId
    );
    if (!store) return;
    writeSelectedLocation(store.id);
    setState({
      status: "resolved",
      nearest: toResolvedLocation(store),
      promptVisible: false,
      outsideServiceAreaVisible: false,
    });
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const activeLocations = getActiveLocations();
    const selectedLocation = readSelectedLocation();
    const cached = readCache();

    const applyStoreId = (storeId: number, distanceMiles: number) => {
      const store = activeLocations.find((l) => l.id === storeId);
      if (!store) return;
      if (!cancelled) {
        setState((prev) => ({
          ...prev,
          status: "resolved",
          nearest: toResolvedLocation(store, distanceMiles),
          outsideServiceAreaVisible: false,
        }));
      }
    };

    if (selectedLocation) {
      const selectedStore = activeLocations.find(
        (location) => location.id === selectedLocation.storeId
      );
      if (selectedStore) {
        applyStoreId(selectedStore.id, 0);
        return;
      }
      clearSelectedLocation();
    }

    // 1. Immediately apply cache if available (fallback)
    if (cached) {
      applyStoreId(cached.storeId, cached.distanceMiles);
    }

    // 1.5. No cache or manual pick yet — try silent IP geolocation (Vercel
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
              // Remember that user blocked/dismissed — don't ask again for 7 days
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
            // state === "prompt" — only trigger browser popup if no cache AND not recently dismissed
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
      requestLocation,
      dismissPrompt,
      dismissOutsideServiceArea,
      selectLocation,
      resolveFromCoordinates,
    }),
    [
      state,
      requestLocation,
      dismissPrompt,
      dismissOutsideServiceArea,
      selectLocation,
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
