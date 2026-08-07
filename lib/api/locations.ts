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
 * The text every Google Maps link and embed searches for. One store, one query,
 * everywhere - the map on /store/[location], the map on /locations, the Find a
 * Flame popup and every "Get Directions" button all resolve to the same pin.
 *
 * Built from the structured address fields, NOT from `location.address`.
 * `address` is the display string and it is not uniform: some stores carry a
 * suite mid-string ("5230 Moravia Rd, Suite B, Baltimore, MD 21206"), some a
 * unit marker ("13600 Baltimore Ave #310, ..."), and Seven Corners has no city
 * in it at all ("6379 Seven Corners Center, VA 22044"). Google's embed runs
 * that string as a *search*, so those variations decided whether it landed on
 * the store's business listing - satellite view centred on the roof, with the
 * name/hours card - or fell back to a plain street geocode somewhere down the
 * road. That was the difference between /store/philadelphia-pa (whose address
 * happens to be clean) and the pages that looked wrong.
 *
 * So: drop the suite/unit - it never helps the search find a storefront - and
 * always spell out brand, street, city, state and ZIP in that order. `city` is
 * the postal city, which is what a geocoder wants; that is the one place it is
 * preferred over `getLocationLabel()`.
 */
export function locationMapQuery(
  location: Pick<
    Location,
    "streetAddress" | "city" | "state" | "postalCode"
  >
): string {
  // "5230 Moravia Rd, Suite B" → "5230 Moravia Rd"; "13600 Baltimore Ave #310"
  // → "13600 Baltimore Ave". Anything from the first suite/unit/# marker on is
  // interior detail the geocoder has no index for.
  const street = location.streetAddress
    .split(/,?\s*(?:suite|ste\.?|unit|#)\s*/i)[0]
    .replace(/,\s*$/, "")
    .trim();

  return `Flame Japanese Hibachi, ${street}, ${location.city}, ${location.state} ${location.postalCode}`;
}

/** The "Get Directions" target - same pin the embedded map shows. */
export function locationDirectionsUrl(
  location: Parameters<typeof locationMapQuery>[0]
): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationMapQuery(location)
  )}`;
}

/**
 * `src` for the embedded map. Every store gets identical framing - satellite
 * (`t=k`) at zoom 17 - so the maps read as one set across the site. Change the
 * view here and all three surfaces follow.
 */
export function locationMapEmbedSrc(
  location: Parameters<typeof locationMapQuery>[0]
): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    locationMapQuery(location)
  )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;
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
