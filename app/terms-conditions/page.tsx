"use client";

import { useState } from "react";
import Hero from "@/components/blocks/hero/Hero";
import AccordionEffectiveDate from "@/components/Accordion/AccordionEffectiveDate";
import PrivacyAccordionRenderer from "@/components/Accordion/PrivacyAccordionRenderer";
import { termsConditionsSections } from "@/lib/data/terms-conditions-data";

const TermsConditionsPage = () => {
    // All sections open by default; toggling collapses/reopens an individual section.
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
        </main>
    );
};

export default TermsConditionsPage;
