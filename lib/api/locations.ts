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

/**
 * The store's name without its trailing state — "Seven Corners, VA" →
 * "Seven Corners". Use this anywhere a location is named in body copy or a
 * heading.
 *
 * Do NOT use `location.city` for that. `city` is the postal city and is often
 * not what the store is called: the store shown everywhere as "Seven Corners"
 * has `city: "Falls Church"`, and "Northern Pkwy (Baltimore)" has
 * `city: "Baltimore"`. Using `city` made hero headings name a different place
 * than the navbar and store picker on those pages. `city` is for addresses and
 * schema.org output only.
 */
export function getLocationLabel(location: Pick<Location, "name">): string {
  return location.name.replace(/,\s*[A-Z]{2}\s*$/, "").trim();
}
