import React from "react";
import type { ReactNode } from "react";
import CateringHero from "@/components/blocks/catering/CateringHero";
import CateringMenuSection from "@/components/blocks/catering/CateringMenuSection";
import CateringAddOns from "@/components/blocks/catering/CateringAddOns";
import CateringQuoteModal from "@/components/blocks/catering/CateringQuoteModal";
import CateringQuoteBar from "@/components/blocks/catering/CateringQuoteBar";
import { CateringQuoteProvider } from "@/components/providers/CateringQuoteProvider";
import { cateringAddOns, cateringMenuSections } from "@/lib/data/catering";
import MenuCTA from "@/components/blocks/menu/menupage/MenuCTA";
import ContactSection from "@/components/blocks/contact/ContactSection";

// Shared by /catering and /catering/[location]. Layouts persist across
// sibling route navigations in the App Router, so switching stores re-renders
// only the page (JSON-LD + banner) below — the hero video and this heavy
// client tree (catering cards) and their images never unmount, decode, or
// refetch on a location switch.
export default function CateringLayout({ children }: { children: ReactNode }) {
  return (
    <CateringQuoteProvider>
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

            <CateringAddOns
              addons={cateringAddOns.filter(
                (addon) => addon.afterSectionId === section.id,
              )}
            />
          </React.Fragment>
        ))}
        <MenuCTA />
        <ContactSection />

        <CateringQuoteBar />
        <CateringQuoteModal />
      </div>
    </CateringQuoteProvider>
  );
}
