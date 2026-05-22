import Hero from "@/components/blocks/hero/Hero";
import InteractiveMenu from "@/components/blocks/menu/menupage/InteractiveMenu";
import ContactSection from "@/components/blocks/contact/ContactSection";

export const metadata = {
  title: "Menu | Flame Japanese Hibachi",
  description:
    "Explore our menu. Sizzling perfection, every time. Savor the flavors.",
};

export default function MenuPage() {
  return (
    <div className="flex flex-col w-full">
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

