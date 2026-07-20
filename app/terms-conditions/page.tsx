import { buildPageMetadata } from "@/lib/seo/seo";
import TermsConditionsContent from "@/components/blocks/terms/TermsConditionsContent";
import Hero from "@/components/blocks/hero/Hero";
import AccordionEffectiveDate from "@/components/Accordion/AccordionEffectiveDate";

export const metadata = buildPageMetadata({
  title: "Terms and Conditions",
  description:
    "The terms and conditions that govern your use of the Flame Japanese Hibachi website, online ordering experience and catering inquiry services.",
  path: "/terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <main>
      <Hero
        tagline="FLAME JAPANESE HIBACHI"
        title={
          <>
            TERMS &<br />
            <span className="text-primary">CONDITIONS</span>
          </>
        }
        description="Please read these terms and conditions carefully before using our website or placing an order."
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgImageDesk="/faq/hero/faq-hero-desk.png"
        bgImageMob="/faq/hero/faq-hero-mob.png"
      />
      <AccordionEffectiveDate />
      <TermsConditionsContent />
    </main>
  );
}