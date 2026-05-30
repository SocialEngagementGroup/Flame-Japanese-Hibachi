"use client";

import { useState } from "react";
import Hero from "@/components/blocks/hero/Hero";
import PrivacyAccordionRenderer from "@/components/Accordion/PrivacyAccordionRenderer";
import { termsConditionsSections } from "@/lib/data/terms-conditions-data";

const TermsConditionsPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

            <div className="flex flex-col gap-5 md:gap-10 px-4 pb-20 pt-10 2xl:px-0">
                {termsConditionsSections.map((section, index) => (
                    <PrivacyAccordionRenderer
                        key={index}
                        section={section}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>
        </main>
    );
};

export default TermsConditionsPage;
