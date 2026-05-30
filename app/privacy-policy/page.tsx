"use client";

import { useState } from "react";
import Hero from "@/components/blocks/hero/Hero";
import AccordionSearchBox from "@/components/Accordion/AccordionSearchBox";
import PrivacyAccordionRenderer from "@/components/Accordion/PrivacyAccordionRenderer";
import { privacyPolicySections } from "@/lib/data/privacy-policy-data";

const PrivacyPolicyPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    // All sections open by default; toggling collapses/reopens an individual section.
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

            <AccordionSearchBox
                value={searchQuery}
                onChange={setSearchQuery}
            />

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
        </main>
    );
};

export default PrivacyPolicyPage;
