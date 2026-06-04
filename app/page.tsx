import Hero from "@/components/blocks/hero/Hero";
import HeroCTA from "@/components/blocks/hero/HeroCTA";
import MenuGrid from "@/components/blocks/menu/MenuGrid";
import FlameDifference from "@/components/blocks/about/FlameDifference";
import SignatureItems from "@/components/blocks/menu/SignatureItems";
import CaterWithUs from "@/components/blocks/catering/CaterWithUs";
// import FranchiseSection from "@/components/blocks/franchise/FranchiseSection"; // Phase 2 — re-enable when franchise inquiries open
import CateringSection from "@/components/blocks/catering/CateringSection";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { getCanonicalUrl } from "@/lib/seo/seo";


export const metadata = {
  title: "Flame Japanese Hibachi | Halal Hibachi, Sushi & Bento",
  description: "100% Halal Japanese hibachi cooked fresh in front of you, plus sushi, bento, loaded fries and boba. Find a Flame Japanese Hibachi location or order online today.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col min-h-[calc(100dvh-100px)] md:min-h-[calc(100dvh-115px)]">
        <Hero />
        <HeroCTA />
      </div>
      <MenuGrid />
      <FlameDifference />
      <SignatureItems />
      <CaterWithUs />
      <CateringSection />
      <LocationsSection />
      <ContactSection />
      {/* <FranchiseSection /> — Phase 2 */}
    </div>
  );
}
