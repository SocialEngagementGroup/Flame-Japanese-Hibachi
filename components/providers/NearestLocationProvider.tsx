"use client";

import * as React from "react";
import { getActiveLocations } from "@/lib/api/locations";
import { findNearest } from "@/lib/geo/distance";
import type { Location } from "@/lib/types";

const STORAGE_KEY = "fjh-nearest-location-v1";
const MAX_CACHE_AGE_MS = 1000 * 60 * 60 * 24 * 14;
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
};

type NearestLocationContextValue = NearestLocationState & {
  requestLocation: () => void;
};

const defaultContextValue: NearestLocationContextValue = {
  status: "idle",
  nearest: null,
  requestLocation: () => {},
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

export function NearestLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<NearestLocationState>({
    status: "idle",
    nearest: null,
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
        setState({ status: "unavailable", nearest: null });
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
      });
    },
    []
  );

  const requestLocation = React.useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState({ status: "unavailable", nearest: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolveFromPosition,
      () => setState({ status: "unavailable", nearest: null }),
      GEO_OPTIONS
    );
  }, [resolveFromPosition]);

  React.useEffect(() => {
    const activeLocations = getActiveLocations();

    const applyStoreId = (storeId: number, distanceMiles: number) => {
      const store = activeLocations.find((l) => l.id === storeId);
      if (!store) return;
      setState({
        status: "resolved",
        nearest: { ...store, distanceMiles },
      });
    };

    const cached = readCache();
    if (cached) {
      applyStoreId(cached.storeId, cached.distanceMiles);
      return;
    }

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState({ status: "unavailable", nearest: null });
      return;
    }

    let cancelled = false;

    const askForLocation = () => {
      if (!cancelled) {
        navigator.geolocation.getCurrentPosition(resolveFromPosition, () => {
          if (!cancelled) setState({ status: "unavailable", nearest: null });
        }, GEO_OPTIONS);
      }
    };

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (cancelled) return;
          if (result.state === "granted") {
            askForLocation();
          } else if (result.state === "denied") {
            setState({ status: "unavailable", nearest: null });
          } else {
            askForLocation();
          }
        })
        .catch(askForLocation);
    } else {
      askForLocation();
    }

    return () => {
      cancelled = true;
    };
  }, [resolveFromPosition]);

  const value = React.useMemo(
    () => ({ ...state, requestLocation }),
    [state, requestLocation]
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
