import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getActiveLocations } from "@/lib/api/locations";
import { findNearest } from "@/lib/geo/distance";
import { isWithinUsServiceArea } from "@/lib/geo/serviceArea";

const SELECTED_LOCATION_KEY = "fjh-selected-location-v1";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Crawlers hit us from US IPs, so the geo branch below would 307 them off
// /menu, /catering and /store onto one arbitrary store's page — the generic pages
// would then never be indexed on their own content. Bots always get the
// generic page; only real visitors get geo-routed.
const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|lighthouse|chrome-lighthouse|headlesschrome/i;

function isCrawler(request: NextRequest): boolean {
  return BOT_UA_PATTERN.test(request.headers.get("user-agent") ?? "");
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const activeLocations = getActiveLocations();

  if (isCrawler(request)) return NextResponse.next();

  // Manual selection wins because it is explicit and can be read before render.
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

  const geo = geolocation(request);
  const lat = Number(geo.latitude);
  const lng = Number(geo.longitude);

  if (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    isWithinUsServiceArea(lat, lng)
  ) {
    const nearest = findNearest({ lat, lng }, activeLocations);
    if (nearest) {
      url.pathname = `${url.pathname}/${nearest.item.slug}`;
      const response = NextResponse.redirect(url, 307);
      response.cookies.set(SELECTED_LOCATION_KEY, String(nearest.item.id), {
        maxAge: ONE_YEAR_SECONDS,
        path: "/",
        sameSite: "lax",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu", "/catering", "/store"],
};
