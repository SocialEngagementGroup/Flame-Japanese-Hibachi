"use client";

import { useParams } from "next/navigation";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { getLocationBySlug } from "@/lib/api/locations";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";

export { resolveOrderUrl } from "@/lib/geo/orderUrl";

/**
 * Resolves the order.online URL for whatever store the visitor is actually
 * looking at.
 *
 * The URL wins over the geolocation context. On `/menu/baltimore-md` every
 * order link must point at Baltimore even if the browser's nearest store is
 * Manassas - otherwise a shared link shows one store's page while its buttons
 * order from another. Falls back to the nearest-location context on pages with
 * no location in the URL (`/`, `/menu`, `/contact`, …), then to the site-wide
 * default.
 */
export function useOrderUrl(): string {
  const { nearest } = useNearestLocation();
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const urlStore = slug ? getLocationBySlug(slug) : undefined;

  return resolveOrderUrl(urlStore ?? nearest);
}
