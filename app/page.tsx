import Hero from "@/components/blocks/hero/Hero";
import HeroCTA from "@/components/blocks/hero/HeroCTA";
import MenuGrid from "@/components/blocks/menu/MenuGrid";
import FlameDifference from "@/components/blocks/about/FlameDifference";
import SignatureItems from "@/components/blocks/menu/SignatureItems";
import CaterWithUs from "@/components/blocks/catering/CaterWithUs";
// import FranchiseSection from "@/components/blocks/franchise/FranchiseSection"; // Phase 2 - re-enable when franchise inquiries open
import CateringSection from "@/components/blocks/catering/CateringSection";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { getCanonicalUrl } from "@/lib/seo/seo";

export const metadata = {
  title: "Flame Japanese Hibachi | Halal Hibachi, Sushi & Bento",
  description:
    "100% Halal Japanese hibachi cooked fresh in front of you, plus sushi, bento, loaded fries and boba. Find a Flame Japanese Hibachi location or order online today.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.flamehibachi.com/#organization",
  name: "Flame Japanese Hibachi",
  url: "https://www.flamehibachi.com",
  logo: "https://www.flamehibachi.com/site-logo/FJH-logo-white.png",
  image: "https://www.flamehibachi.com/homepage/hero/hero-bg-desk.png",
  email: "ask@flamejapanesehibachi.com",
  telephone: "+1-888-786-5411",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5411c Backlick Rd",
    addressLocality: "Springfield",
    addressRegion: "VA",
    postalCode: "22151",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/flamejapanesehibachi",
    "https://www.instagram.com/flamejapanesehibachi",
    "https://www.tiktok.com/@flame.japanese.hi",
    "https://www.youtube.com/@flamejapanesehibachi",
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />

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
      {/* <FranchiseSection /> - Phase 2 */}
    </div>
  );
}