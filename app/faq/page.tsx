import Hero from "@/components/blocks/hero/Hero";
import AccordionEffectiveDate from "@/components/Accordion/AccordionEffectiveDate";
import AccordionRenderer from "@/components/Accordion/AccordionRenderer";
import type { AccordionContentBlock } from "@/components/Accordion/accordion.types";
import { faqSections } from "@/lib/data/faq-data";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Flame Japanese Hibachi - Halal certification, ordering, catering, locations, hours, allergens and franchise opportunities.",
  path: "/faq",
});

function getAnswerText(answer: AccordionContentBlock[]) {
  return answer
    .map((block) => {
      if (block.type === "paragraph" || block.type === "muted" || block.type === "subheading") {
        return block.content;
      }

      if (block.type === "list") {
        return block.items.join(" ");
      }

      if (block.type === "table") {
        return [block.headers.join(" "), ...block.rows.map((row) => row.join(" "))].join(" ");
      }

      return "";
    })
    .join(" ")
    .trim();
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: getAnswerText(item.answer),
      },
    }))
  ),
};

const FAQPage = () => {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title={
          <>
            FREQUENTLY ASKED <br />
            <span className="text-white">QUESTIONS</span>
          </>
        }
        description="Have questions about ordering, your data, or how we protect your privacy? We've got answers."
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgImageDesk="/faq/hero/faq-hero-desk.png"
        bgImageMob="/faq/hero/faq-hero-mob.png"
      />

      <AccordionEffectiveDate />

      <div className="flex flex-col gap-5 md:gap-10 px-4 pb-20 2xl:px-0">
        {faqSections.map((section, index) => (
          <AccordionRenderer key={index} section={section} />
        ))}
      </div>
    </main>
  );
};

export default FAQPage;