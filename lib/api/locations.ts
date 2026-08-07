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
 * The store's name without its trailing state - "Seven Corners, VA" →
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

/**
 * Builds the slug a store should have, from the same fields the slug format is
 * defined against (see the SLUG FORMAT block in data/locationsData.ts).
 *
 * This is the authoring/verification helper - `slug` stays a literal in the
 * data file so it is greppable and can never silently change under a store
 * that is already published. Use this to work out what a new store's slug
 * should be, and `assertLocationSlugs()` to check the file still agrees.
 */
export function toLocationSlug(
  location: Pick<Location, "name" | "state">
): string {
  const base = getLocationLabel(location)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${location.state.toLowerCase()}`;
}

/** Location-scoped sections. Add a new one here when its route is created -
 * it reuses the store's existing slug rather than introducing another id. */
export type LocationSection = "menu" | "catering" | "order" | "store";

/**
 * Canonical path for a location-scoped page: locationPath("menu", store) →
 * "/menu/laurel-md".
 *
 * Prefer this over interpolating `/${section}/${slug}` by hand. When a future
 * section (a per-location blog, say) is added, widening `LocationSection` is
 * the only change needed and every caller stays correct.
 */
export function locationPath(
  section: LocationSection,
  location: Pick<Location, "slug">
): string {
  return `/${section}/${location.slug}`;
}

/**
 * Returns every store whose `slug` doesn't match the documented format.
 * Empty array means the data file is consistent.
 */
export function findMalformedLocationSlugs(): Array<{
  slug: string;
  expected: string;
}> {
  return activeLocations
    .map((location) => ({
      slug: location.slug,
      expected: toLocationSlug(location),
    }))
    .filter((entry) => entry.slug !== entry.expected);
}
