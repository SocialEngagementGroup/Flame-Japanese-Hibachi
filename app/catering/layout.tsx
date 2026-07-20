import React from "react";
import type { ReactNode } from "react";
import CateringHero from "@/components/blocks/catering/CateringHero";
import CateringMenuSection from "@/components/blocks/catering/CateringMenuSection";
import CateringAddOns from "@/components/blocks/catering/CateringAddOns";
import { cateringMenuSections } from "@/lib/data/catering";
import MenuCTA from "@/components/blocks/menu/menupage/MenuCTA";
import ContactSection from "@/components/blocks/contact/ContactSection";

// Shared by /catering and /catering/[location]. Layouts persist across
// sibling route navigations in the App Router, so switching stores re-renders
// only the page (JSON-LD + banner) below — the hero video and this heavy
// client tree (catering cards) and their images never unmount, decode, or
// refetch on a location switch.
export default function CateringLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <CateringHero />
      {children}

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
