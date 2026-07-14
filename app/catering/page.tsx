import Hero from "@/components/blocks/hero/Hero";
import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";

import { getCanonicalUrl } from "@/lib/seo/seo";

export const metadata = {
  title: "Hibachi Catering for Events & Parties",
  description:
    "Hibachi catering for weddings, corporate events and parties. Custom packages, 100% Halal, fresh prep. Request a quote from Flame Japanese Hibachi today.",
  alternates: {
    canonical: getCanonicalUrl("/catering"),
  },
};

export default function CateringPage() {
  return (
    <>
      <LocationAutoRedirect basePath="/catering" />
      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title={
          <>
            <span className="block md:inline">Cater with us</span>
            <br className="hidden md:block" />
            <span className="block md:inline">for next event.</span>
          </>
        }
        ctaLabel={null}
        align="center"
        fullHeight={false}
        heightClass="min-h-[480px] md:min-h-[600px] py-[var(--space-2xl)]"
        bgImageDesk="/catering/hero/flame-japanese-hibachi-catering-hero-desk.jpg"
        bgImageMob="/catering/hero/flame-japanese-hibachi-catering-hero-mob.jpg"
        bgVideo="/catering/hero/flame-japanese-hibachi-catering-hero.mp4"
      />
    </>
  );
}
