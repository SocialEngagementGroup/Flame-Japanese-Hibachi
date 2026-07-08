"use client";

import { useEffect } from "react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

interface LocationContextSyncProps {
  storeId: number;
}

/**
 * Keeps the global "nearest location" context (navbar name, order links
 * elsewhere on the site) in sync with whichever location-specific page the
 * visitor is actually viewing — covers direct links, shared URLs, and
 * reloads, not just in-app "Find a Flame" selection. Renders nothing.
 */
export default function LocationContextSync({
  storeId,
}: LocationContextSyncProps) {
  const { nearest, selectLocation } = useNearestLocation();

  useEffect(() => {
    if (nearest?.id !== storeId) {
      selectLocation(storeId);
    }
  }, [storeId, nearest, selectLocation]);

  return null;
}
