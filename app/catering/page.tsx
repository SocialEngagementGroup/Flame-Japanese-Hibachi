import React from "react";
import Hero from "@/components/blocks/hero/Hero";
import CateringMenuSection from "@/components/blocks/catering/CateringMenuSection";
import CateringAddOns from "@/components/blocks/catering/CateringAddOns";
import { cateringMenuSections } from "@/lib/data/catering";
import MenuCTA from "@/components/blocks/menu/menupage/MenuCTA";
import ContactSection from "@/components/blocks/contact/ContactSection";
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
    <div className="flex w-full flex-col">
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

      {cateringMenuSections.map((section) => (
        <React.Fragment key={section.id}>
          <CateringMenuSection
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
            cardVariant={section.id === "menu-5-wings" ? "shop" : "catering"}
          />

          {section.id === "menu-4-cbs" && (
            <CateringAddOns
              addons={[
                { name: "SPRING ROLLS", price: "$0.50/PER PERSON" },
                { name: "DUMPLINGS", price: "$0.75/PER PERSON" },
              ]}
            />
          )}

          {section.id === "menu-5-wings" && (
            <CateringAddOns
              addons={[
                { name: "FRIES HALF TRAY", price: "$40" },
                { name: "FRIES FULL TRAY", price: "$75" },
              ]}
            />
          )}
        </React.Fragment>
      ))}
      <MenuCTA />
      <ContactSection />
    </div>
  );
}