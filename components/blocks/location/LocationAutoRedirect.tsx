"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

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

  useEffect(() => {
    if (status === "resolved" && nearest) {
      router.replace(`${basePath}/${nearest.slug}`);
    }
  }, [status, nearest, basePath, router]);

  return null;
}
