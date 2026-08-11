import type { ReactNode } from "react";
import StoreHero from "@/components/blocks/store/StoreHero";
import StoreLocalFlame from "@/components/blocks/store/StoreLocalFlame";
import StoreGoodFoodEnergy from "@/components/blocks/store/StoreGoodFoodEnergy";
import StoreFaqs from "@/components/blocks/store/StoreFaqs";
import ContactSection from "@/components/blocks/contact/ContactSection";

// Shared by /store and /store/[location]. Layouts persist across sibling
// route navigations in the App Router, so switching stores re-renders only
// the page (JSON-LD + the location-specific SEO copy) below -
// StoreLocalFlame, StoreGoodFoodEnergy and their images never unmount,
// decode, or refetch on a location switch. The hero reads the city from the
// route param itself, which is why it can live up here instead of in the
// page.
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <StoreHero />
      {children}

      <div className="w-full md:w-[80%] mx-auto">
        <StoreLocalFlame />
      </div>

      <StoreGoodFoodEnergy />

      <StoreFaqs />

      <ContactSection />
    </div>
  );
}
