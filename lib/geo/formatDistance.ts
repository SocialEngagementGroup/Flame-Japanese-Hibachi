/**
 * Straight-line distance, phrased for a list of restaurants.
 *
 * Shared by FindFlamePopup and LocationsSection so a store never reads
 * "3.6 mi away" in one place and "3.57 mi away" in another.
 *
 * Under half a mile "0.3 mi away" is noise, and one decimal stops reading as
 * meaningful once the number is large - nobody needs "127.4 mi away", and a
 * haversine doesn't have that precision anyway.
 */
export function formatDistance(miles: number): string {
  if (miles < 0.5) return "Right here";
  if (miles < 10) return `${miles.toFixed(1)} mi away`;
  return `${Math.round(miles)} mi away`;
}
