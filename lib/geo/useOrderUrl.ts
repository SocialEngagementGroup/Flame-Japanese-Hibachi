"use client";

import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";

export { resolveOrderUrl } from "@/lib/geo/orderUrl";

/** Resolves the order.online URL: nearest store's orderUrl if known and non-empty, else the global fallback. */
export function useOrderUrl(): string {
  const { nearest } = useNearestLocation();
  return resolveOrderUrl(nearest);
}
