"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { getActiveLocations } from "@/lib/api/locations";

interface LocationAutoRedirectProps {
  /** Base path to redirect under, e.g. "/menu" or "/catering". */
  basePath: string;
}

/**
 * Renders nothing; sends visitors on a generic location-less page (e.g. /menu)
 * to their nearest location's dedicated page once NearestLocationProvider has
 * resolved one (GPS fix, localStorage cache, or manual selection).
 *
 * Intentionally a no-op until a location is actually resolved, so first-time
 * visitors and crawlers (which never grant geolocation) keep seeing the
 * generic page instead of being redirected on a guess.
 */
export default function LocationAutoRedirect({
  basePath,
}: LocationAutoRedirectProps) {
  const router = useRouter();
  const { status, nearest } = useNearestLocation();

  // Prefetch every location page up front so whichever store resolves as
  // "nearest" already has its RSC payload cached — otherwise the redirect
  // below has to wait on a full server round-trip before the URL updates,
  // well after the header text (a plain client re-render) has already changed.
  useEffect(() => {
    getActiveLocations().forEach((location) => {
      router.prefetch(`${basePath}/${location.slug}`);
    });
  }, [basePath, router]);

  useEffect(() => {
    if (status === "resolved" && nearest) {
      router.replace(`${basePath}/${nearest.slug}`);
    }
  }, [status, nearest, basePath, router]);

  return null;
}
