import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';
import { getActiveLocations } from '@/lib/api/locations';
import { findNearest } from '@/lib/geo/distance';

const ROUTES_TO_REDIRECT = ['/menu', '/catering'];
const SELECTED_LOCATION_KEY = 'fjh-selected-location-v1';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Only intercept exact matches to generic paths
  if (!ROUTES_TO_REDIRECT.includes(url.pathname)) {
    return NextResponse.next();
  }

  const activeLocations = getActiveLocations();

  // 1. Check for manually selected store via cookie
  const cookieVal = request.cookies.get(SELECTED_LOCATION_KEY)?.value;
  if (cookieVal) {
    const storeId = Number(cookieVal);
    if (!Number.isNaN(storeId)) {
      const selectedStore = activeLocations.find((l) => l.id === storeId);
      if (selectedStore) {
        url.pathname = `${url.pathname}/${selectedStore.slug}`;
        return NextResponse.redirect(url, 307);
      }
    }
  }

  // 2. IP Geolocation Fallback
  const geo = geolocation(request);
  const lat = Number(geo.latitude);
  const lng = Number(geo.longitude);
  
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    const nearest = findNearest({ lat, lng }, activeLocations);
    if (nearest) {
      url.pathname = `${url.pathname}/${nearest.item.slug}`;
      return NextResponse.redirect(url, 307);
    }
  }

  // 3. Fallthrough (Local Dev or failed geo)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
