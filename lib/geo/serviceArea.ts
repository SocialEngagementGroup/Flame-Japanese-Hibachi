export function isWithinUsServiceArea(lat: number, lng: number): boolean {
  const contiguousUs =
    lat >= 24.396308 && lat <= 49.384358 && lng >= -125 && lng <= -66.93457;
  const alaska = lat >= 51.2 && lat <= 71.6 && lng >= -179.2 && lng <= -129.9;
  const hawaii = lat >= 18.5 && lat <= 22.5 && lng >= -160.5 && lng <= -154.5;
  return contiguousUs || alaska || hawaii;
}
