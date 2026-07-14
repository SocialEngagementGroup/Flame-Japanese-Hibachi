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
 *
 * Guard: skips the sync when `isManuallySelected` is true. This prevents a
 * race where the old page's LocationContextSync effect fires (because
 * `nearest` changed after a FindFlamePopup pick) and overwrites the
 * user's deliberate choice back to the old store while the navigation
 * is still in flight.
 */
export default function LocationContextSync({
  storeId,
}: LocationContextSyncProps) {
  const { nearest, selectLocation, isManuallySelected } = useNearestLocation();

  useEffect(() => {
    // Don't let a transitioning-away page overwrite an explicit user pick.
    // isManuallySelected is true only after a FindFlamePopup selection.
    if (!isManuallySelected && nearest?.id !== storeId) {
      selectLocation(storeId);
    }
  }, [storeId, nearest, selectLocation, isManuallySelected]);

  return null;
}
