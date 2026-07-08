import Hero from "@/components/blocks/hero/Hero";
import InteractiveMenu from "@/components/blocks/menu/menupage/InteractiveMenu";
import ContactSection from "@/components/blocks/contact/ContactSection";
import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";
import { getCanonicalUrl } from "@/lib/seo/seo";

export const metadata = {
  title: "Menu — Halal Hibachi, Sushi, Bento & Boba",
  description:
    "Browse the full Flame Japanese Hibachi menu: hibachi platters, sushi rolls, bento boxes, loaded fries, wings, smoothies and boba. 100% Halal, freshly prepared.",
  alternates: {
    canonical: getCanonicalUrl("/menu"),
  },
};


export default function MenuPage() {
  return (
    <div className="flex flex-col w-full">
      <LocationAutoRedirect basePath="/menu" />
      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title={
          <>
            <span className="block md:inline whitespace-nowrap">SAVOR THE </span>
            <span className="block md:inline whitespace-nowrap">FLAVORS.</span>
          </>
        }
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgImageDesk="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-mob.png"
        bgImageMob="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-desk.png"
      />

      <InteractiveMenu />
      <ContactSection />
    </div>
  );
}

