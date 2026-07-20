"use client";

import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

/** "Not your location?" control on a per-location page. Opens the same
 * FindFlamePopup the navbar location button opens, so changing store is one
 * consistent interaction everywhere instead of a detour to /locations.
 * Styled to match the link it replaced exactly. */
export default function ChangeLocationButton() {
  const { openFindFlame } = useNearestLocation();

  return (
    <button
      type="button"
      onClick={openFindFlame}
      className="underline underline-offset-2 hover:text-[#FF7808]"
    >
      Not your location?
    </button>
  );
}
