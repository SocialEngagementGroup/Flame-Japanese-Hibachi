"use client";

import { useState } from "react";
import PrivacyAccordionRenderer from "@/components/Accordion/PrivacyAccordionRenderer";
import { privacyPolicySections } from "@/lib/data/privacy-policy-data";

export default function PrivacyPolicyContent() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(privacyPolicySections.map((_, i) => i))
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
      {privacyPolicySections.map((section, index) => (
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