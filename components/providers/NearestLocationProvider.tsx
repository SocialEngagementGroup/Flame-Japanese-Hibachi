"use client";

import * as React from "react";
import { getActiveLocations } from "@/lib/api/locations";
import { findNearest } from "@/lib/geo/distance";
import type { Location } from "@/lib/types";

const STORAGE_KEY = "fjh-nearest-location-v1";
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

type NearestLocationState = {
  status: "idle" | "resolved" | "unavailable";
  nearest: (Location & { distanceMiles: number }) | null;
  promptVisible: boolean;
};

type NearestLocationContextValue = NearestLocationState & {
  requestLocation: () => void;
  dismissPrompt: () => void;
};

const defaultContextValue: NearestLocationContextValue = {
  status: "idle",
  nearest: null,
  promptVisible: false,
  requestLocation: () => {},
  dismissPrompt: () => {},
};

const NearestLocationContext = React.createContext<NearestLocationContextValue>(
  defaultContextValue
);

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

export function NearestLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<NearestLocationState>({
    status: "idle",
    nearest: null,
    promptVisible: false,
  });

  const resolveFromPosition = React.useCallback(
    (position: GeolocationPosition) => {
      const activeLocations = getActiveLocations();
      const origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const result = findNearest(origin, activeLocations);
      if (!result) {
        setState((prev) => prev.status === "resolved" ? prev : { status: "unavailable", nearest: null, promptVisible: false });
        return;
      }
      writeCache({
        storeId: result.item.id,
        distanceMiles: result.distanceMiles,
        timestamp: Date.now(),
      });
      setState({
        status: "resolved",
        nearest: { ...result.item, distanceMiles: result.distanceMiles },
        promptVisible: false,
      });
    },
    []
  );

  const requestLocation = React.useCallback(() => {
    setState((prev) => ({ ...prev, promptVisible: false }));
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState((prev) => prev.status === "resolved" ? prev : { status: "unavailable", nearest: null, promptVisible: false });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolveFromPosition,
      () => setState((prev) => prev.status === "resolved" ? prev : { status: "unavailable", nearest: null, promptVisible: false }),
      GEO_OPTIONS
    );
  }, [resolveFromPosition]);

  const dismissPrompt = React.useCallback(() => {
    writePromptDismissed();
    setState((prev) => ({ ...prev, promptVisible: false, status: prev.status === "resolved" ? "resolved" : "unavailable" }));
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const activeLocations = getActiveLocations();
    const cached = readCache();

    const applyStoreId = (storeId: number, distanceMiles: number) => {
      const store = activeLocations.find((l) => l.id === storeId);
      if (!store) return;
      if (!cancelled) {
        setState((prev) => ({
          ...prev,
          status: "resolved",
          nearest: { ...store, distanceMiles },
        }));
      }
    };

    // 1. Immediately apply cache if available (fallback)
    if (cached) {
      applyStoreId(cached.storeId, cached.distanceMiles);
    }

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      if (!cached && !cancelled) {
        setState({ status: "unavailable", nearest: null, promptVisible: false });
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
              setState((prev) => prev.status === "resolved" ? prev : { status: "unavailable", nearest: null, promptVisible: false });
            }
          },
          GEO_OPTIONS
        );
      }
    };

    const showSoftAsk = () => {
      if (!cancelled) {
        if (isPromptRecentlyDismissed()) {
          setState((prev) => prev.status === "resolved" ? prev : { status: "unavailable", nearest: null, promptVisible: false });
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
              setState({ status: "unavailable", nearest: null, promptVisible: false });
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
  }, [resolveFromPosition]);

  const value = React.useMemo(
    () => ({ ...state, requestLocation, dismissPrompt }),
    [state, requestLocation, dismissPrompt]
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
