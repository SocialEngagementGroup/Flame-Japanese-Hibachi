const EARTH_RADIUS_MI = 3958.8;

export type Coordinates = { lat: number; lng: number };

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two coordinates, in miles. */
export function haversineDistanceMiles(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_MI * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Returns the closest candidate to origin + its distance in miles, or null if candidates is empty. */
export function findNearest<T extends Coordinates>(
  origin: Coordinates,
  candidates: T[]
): { item: T; distanceMiles: number } | null {
  let best: { item: T; distanceMiles: number } | null = null;
  for (const candidate of candidates) {
    const distanceMiles = haversineDistanceMiles(origin, candidate);
    if (!best || distanceMiles < best.distanceMiles) {
      best = { item: candidate, distanceMiles };
    }
  }
  return best;
}
