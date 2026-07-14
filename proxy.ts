import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getActiveLocations } from "@/lib/api/locations";

const SELECTED_LOCATION_KEY = "fjh-selected-location-v1";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const activeLocations = getActiveLocations();

  // Testing mode: only explicit manual/cookie selection redirects before render.
  // Automatic IP geolocation is intentionally disabled to isolate Vercel latency.
  const cookieVal = request.cookies.get(SELECTED_LOCATION_KEY)?.value;
  if (cookieVal) {
    const storeId = Number(cookieVal);
    if (!Number.isNaN(storeId)) {
      const selectedStore = activeLocations.find(
        (location) => location.id === storeId
      );
      if (selectedStore) {
        url.pathname = `${url.pathname}/${selectedStore.slug}`;
        return NextResponse.redirect(url, 307);
      }
    }

    const response = NextResponse.next();
    response.cookies.delete(SELECTED_LOCATION_KEY);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/catering"],
};
