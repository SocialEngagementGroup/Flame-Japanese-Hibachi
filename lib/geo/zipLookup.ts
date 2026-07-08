import * as zipcodes from "zipcodes";

const US_ZIP_PATTERN = /^\d{5}$/;

export type ZipCoordinates = { lat: number; lng: number };

/** Resolves a 5-digit US ZIP code to its centroid coordinates using the bundled offline zipcodes dataset. Returns null for an invalid or unknown ZIP. */
export function lookupZipCoordinates(zip: string): ZipCoordinates | null {
  if (!US_ZIP_PATTERN.test(zip)) return null;

  const match = zipcodes.lookup(zip);
  if (!match) return null;

  return { lat: match.latitude, lng: match.longitude };
}
