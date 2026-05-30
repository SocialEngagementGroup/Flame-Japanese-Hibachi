import React from "react";
import Hero from "@/components/blocks/hero/Hero";
import CateringMenuSection from "@/components/blocks/catering/CateringMenuSection";
import CateringAddOns from "@/components/blocks/catering/CateringAddOns";
import { cateringMenuSections } from "@/lib/data/catering";
import { ORDER_URL } from "@/lib/constants";
import MenuCTA from "@/components/blocks/menu/menupage/MenuCTA";
import ContactSection from "@/components/blocks/contact/ContactSection";

export const metadata = {
  title: "Catering | Flame Japanese Hibachi",
  description:
    "Make your next event unforgettable with Flame Japanese Hibachi catering. Fresh hibachi trays, party packages, and bold flavors made for every celebration.",
};

export default function CateringPage() {
  return (
    <div className="flex w-full flex-col">
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
        bgImageDesk="/catering/hero/flame-japanese-hibachi-catering-hero-desk.jpg"
        bgImageMob="/catering/hero/flame-japanese-hibachi-catering-hero-mob.jpg"
      />

      {cateringMenuSections.map((section) => (
        <React.Fragment key={section.id}>
          <CateringMenuSection
            title={section.title}
            subtitle={section.subtitle}
            orderUrl={ORDER_URL}
            items={section.items}
          />
          
          {section.id === "menu-4-cbs" && (
            <CateringAddOns 
              addons={[
                { name: "Fries HALF TRAY", price: "$40" },
                { name: "Fries FULL TRAY", price: "$75" }
              ]} 
              orderUrl={ORDER_URL}
            />
          )}
        </React.Fragment>
      ))}
      <MenuCTA />
      <ContactSection />
    </div>
  );
}