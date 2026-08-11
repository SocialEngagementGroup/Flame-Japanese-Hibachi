"use client";

import { useParams } from "next/navigation";
import AccordionSection from "@/components/Accordion/AccordionSection";
import { getLocationBySlug, getLocationLabel } from "@/lib/api/locations";
import { getStoreLocationContent } from "@/lib/data/storeLocationContent";

/**
 * Visible counterpart to the FAQPage JSON-LD on /store/[location]. Google
 * requires structured data to describe content readers can actually see.
 */
export default function StoreFaqs() {
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const location = slug ? getLocationBySlug(slug) : undefined;
  const content = slug ? getStoreLocationContent(slug) : undefined;

  if (!location || !content || content.faqs.length === 0) return null;

  const items = content.faqs.map((faq, index) => ({
    id: `${location.slug}-store-faq-${index + 1}`,
    question: faq.question,
    answer: [{ type: "paragraph" as const, content: faq.answer }],
  }));

  return (
    <section className="w-full bg-background px-[var(--space-lg)] py-[var(--space-2xl)]">
      <div className="mx-auto w-full md:w-[80%]">
        <AccordionSection
          title={`${getLocationLabel(location)} Location FAQs`}
          items={items}
          className="md:w-full"
        />
      </div>
    </section>
  );
}
