import Hero from "@/components/blocks/hero/Hero";
import StoreGoodFoodEnergy from "@/components/blocks/store/StoreGoodFoodEnergy";
import StoreLocalFlame from "@/components/blocks/store/StoreLocalFlame";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Store",
  description:
    "Shop Flame Japanese Hibachi merchandise, sauces, and gift cards.",
  path: "/store",
});

export default function StorePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title="LAUREL OUTLET"
        description="YOUR LAUREL DESTINATION FOR MADE-TO-ORDER HALAL HIBACHI, SUSHI, WINGS, AND MORE. FRESHLY PREPARED, PACKED WITH FLAVOR, AND READY WHENEVER THE CRAVING HITS."
        ctaLabel="VIEW THE MENU"
        ctaHref="/menu/laurel-md"
        secondaryCtaLabel="CATER FROM US"
        secondaryCtaHref="/catering/laurel-md"
        align="center"
        fullHeight={false}
        bgVideo={null}
        bgImageDesk="/store/store-hero-bg.png"
        bgImageMob="/store/store-hero-bg.png"
        blurBackground
      />

      <div className="w-full md:w-[80%] mx-auto">
        <StoreLocalFlame />
      </div>

      <StoreGoodFoodEnergy />

      <ContactSection />
    </div>
  );
}
