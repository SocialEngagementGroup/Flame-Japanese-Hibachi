"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
import { getLocationBySlug, getLocationLabel } from "@/lib/api/locations";

/** Catering hero, mounted from app/catering/layout.tsx. Same reasoning as
 * MenuHero: keeping it in the layout means the 21 MB background video survives
 * a store switch instead of remounting and re-downloading. */
export default function CateringHero() {
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const location = slug ? getLocationBySlug(slug) : undefined;

  return (
    <Hero
      tagline="SIZZLING PERFECTION, EVERY TIME."
      title={
        <>
          <span className="block md:inline">Cater with us</span>
          <br className="hidden md:block" />
          <span className="block md:inline">
            {location ? `in ${getLocationLabel(location)}.` : "for next event."}
          </span>
        </>
      }
      ctaLabel={null}
      align="center"
      // No heightClass — falls through to the same default the menu hero uses,
      // so both heroes are the same height.
      fullHeight={false}
      bgImageDesk="/catering/hero/flame-japanese-hibachi-catering-hero-desk.jpg"
      bgImageMob="/catering/hero/flame-japanese-hibachi-catering-hero-mob.jpg"
      bgVideo="/catering/hero/flame-japanese-hibachi-catering-hero.mp4"
    />
  );
}
