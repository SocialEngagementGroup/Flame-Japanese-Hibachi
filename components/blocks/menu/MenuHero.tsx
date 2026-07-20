"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
import { getLocationBySlug, getLocationLabel } from "@/lib/api/locations";

// There is no menu-specific hero clip — this is the same video the homepage
// uses, which is what the menu hero has always played.
const MENU_HERO_VIDEO = "/homepage/hero/flame-japanese-hibachi-hero.mp4";

/**
 * Menu hero, mounted from app/menu/layout.tsx rather than from the page.
 *
 * Living in the layout is what keeps the background video off the critical
 * path of a store switch: layouts persist across sibling route navigations, so
 * going /menu/baltimore-md → /menu/manassas-va swaps this heading text in place
 * instead of unmounting the <video> and re-downloading it.
 *
 * The city comes from the route param, so each statically generated location
 * page still ships its own H1 in the prerendered HTML — the layout is rendered
 * per page at build time, not shared at runtime.
 */
export default function MenuHero() {
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const location = slug ? getLocationBySlug(slug) : undefined;

  return (
    <Hero
      tagline="SIZZLING PERFECTION, EVERY TIME."
      title={
        <>
          <span className="block md:inline">SAVOR THE </span>
          <span className="block md:inline">
            {location
              ? `FLAVORS IN ${getLocationLabel(location).toUpperCase()}.`
              : "FLAVORS."}
          </span>
        </>
      }
      ctaLabel={null}
      align="center"
      fullHeight={false}
      posterSrc="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-desk-poster.webp"
      bgImageDesk="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-desk.png"
      bgImageMob="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-mob.png"
      bgVideo={MENU_HERO_VIDEO}
    />
  );
}
