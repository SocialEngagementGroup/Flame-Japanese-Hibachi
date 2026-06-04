"use client";

import { useState } from "react";
import PrivacyAccordionRenderer from "@/components/Accordion/PrivacyAccordionRenderer";
import { termsConditionsSections } from "@/lib/data/terms-conditions-data";

export default function TermsConditionsContent() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(termsConditionsSections.map((_, i) => i))
  );

  const toggle = (i: number) =>
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="flex flex-col gap-5 md:gap-10 px-4 pb-20 2xl:px-0">
      {termsConditionsSections.map((section, index) => (
        <PrivacyAccordionRenderer
          key={index}
          section={section}
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}