import { activeLocations, comingSoonLocations } from "@/data/locationsData";
import type { Location, ComingSoonLocation } from "@/lib/types";

export function getActiveLocations(): Location[] {
  return activeLocations;
}

export function getComingSoonLocations(): ComingSoonLocation[] {
  return comingSoonLocations;
}

/** Looks up an active location by its URL slug (e.g. "baltimore-md"), or undefined if none matches. */
export function getLocationBySlug(slug: string): Location | undefined {
  return activeLocations.find((location) => location.slug === slug);
}
