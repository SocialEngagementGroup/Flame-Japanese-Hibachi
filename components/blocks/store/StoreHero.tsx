"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
import { getLocationBySlug, getLocationLabel } from "@/lib/api/locations";

/**
 * Store hero, mounted from app/store/layout.tsx rather than the page - same
 * reasoning as MenuHero/CateringHero: living in the layout keeps the
 * background image off the critical path of a store switch, and the city
 * comes from the route param so each statically generated location page
 * still ships its own heading in the prerendered HTML.
 */
export default function StoreHero() {
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const location = slug ? getLocationBySlug(slug) : undefined;
  const cityLabel = location ? getLocationLabel(location).toUpperCase() : null;

  return (
    <Hero
      tagline="SIZZLING PERFECTION, EVERY TIME."
      title={cityLabel ? `${cityLabel} OUTLET` : "FLAME OUTLET"}
      description={
        location
          ? `YOUR ${cityLabel} DESTINATION FOR MADE-TO-ORDER HALAL HIBACHI, SUSHI, WINGS, AND MORE. FRESHLY PREPARED, PACKED WITH FLAVOR, AND READY WHENEVER THE CRAVING HITS.`
          : "YOUR DESTINATION FOR MADE-TO-ORDER HALAL HIBACHI, SUSHI, WINGS, AND MORE. FRESHLY PREPARED, PACKED WITH FLAVOR, AND READY WHENEVER THE CRAVING HITS."
      }
      ctaLabel="VIEW THE MENU"
      ctaHref={location ? `/menu/${location.slug}` : "/menu"}
      secondaryCtaLabel="CATER FROM US"
      secondaryCtaHref={location ? `/catering/${location.slug}` : "/catering"}
      align="center"
      fullHeight={false}
      bgVideo={null}
      bgImageDesk="/store/store-hero-bg.png"
      bgImageMob="/store/store-hero-bg.png"
      blurBackground
    />
  );
}
