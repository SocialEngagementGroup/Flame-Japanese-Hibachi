import { geolocation } from "@vercel/functions";

export type IpCoordinates = { lat: number; lng: number };

/**
 * Reads Vercel's edge-provided IP geolocation for the incoming request.
 * Returns null in local dev (Vercel doesn't set these headers outside its own
 * deployments) or whenever a coordinate can't be determined for the IP.
 */
export function getIpCoordinates(request: Request): IpCoordinates | null {
  const { latitude, longitude } = geolocation(request);
  if (!latitude || !longitude) return null;

  const lat = Number(latitude);
  const lng = Number(longitude);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return { lat, lng };
}
