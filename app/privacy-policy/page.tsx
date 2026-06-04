import { getCanonicalUrl } from "@/lib/seo/seo";
import PrivacyPolicyContent from "@/components/blocks/privacy/PrivacyPolicyContent";
import Hero from "@/components/blocks/hero/Hero";
import AccordionEffectiveDate from "@/components/Accordion/AccordionEffectiveDate";

export const metadata = {

  description:
    "Read how Flame Japanese Hibachi collects, uses and protects your personal information when you visit the site, place an order or contact our team.",
  alternates: {
    canonical: getCanonicalUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Hero
        tagline="FLAME JAPANESE HIBACHI"
        title={
          <>
            PRIVACY <span className="text-white">POLICY</span>
          </>
        }
        description="We respect your privacy and are committed to protecting your personal information. Read our policy to learn more."
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgImageDesk="/faq/hero/faq-hero-desk.png"
        bgImageMob="/faq/hero/faq-hero-mob.png"
      />
      <AccordionEffectiveDate />
      <PrivacyPolicyContent />
    </main>
  );
}