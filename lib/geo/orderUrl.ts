import { ORDER_URL } from "@/lib/constants";
import type { Location } from "@/lib/types";

export function resolveOrderUrl(
  store: (Location & { distanceMiles?: number }) | null | undefined,
  fallback: string = ORDER_URL
): string {
  const candidate = store?.orderUrl?.trim();
  return candidate ? candidate : fallback;
}
