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
    promptVisible: false,
    outsideServiceAreaVisible: false,
  });

  // Tracks an explicit "Got it" dismissal for this session so a slower,
  // independently-running check (e.g. GPS resolving after the faster IP
  // check already showed and was dismissed) can't reopen the notice.
  const outsideAreaDismissedRef = React.useRef(false);

  const resolveFromCoordinates = React.useCallback(
    (origin: { lat: number; lng: number }): boolean => {
      const activeLocations = getActiveLocations();
      if (!isWithinUsServiceArea(origin.lat, origin.lng)) {
        setState({
          status: "unavailable",
          nearest: null,
          promptVisible: false,
          outsideServiceAreaVisible: !outsideAreaDismissedRef.current,
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
    outsideAreaDismissedRef.current = true;
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
        writeSelectedLocation(selectedStore.id);
        applyStoreId(selectedStore.id, 0);
        return;
      }
      clearSelectedLocation();
    }

    // 1. Immediately apply cache if available (fallback)
    if (cached) {
      applyStoreId(cached.storeId, cached.distanceMiles);
    }

    const showSoftAsk = () => {
      if (!cancelled) {
        if (isPromptRecentlyDismissed()) {
          setState(keepResolvedOrUnavailable);
        } else {
          setState((prev) => ({ ...prev, promptVisible: true }));
        }
      }
    };

    // Testing mode: no automatic IP or browser GPS lookup on page load.
    // Visitors can still pick a store, enter ZIP, or click "Use location" manually.
    if (!cached) {
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
