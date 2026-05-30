"use client";

import { useState } from "react";

import Hero from "@/components/blocks/hero/Hero";

import AccordionSearchBox from "@/components/Accordion/AccordionSearchBox";

import AccordionRenderer from "@/components/Accordion/AccordionRenderer";

import { faqSections } from "@/lib/data/faq-data";

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main>
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

            <AccordionSearchBox
                value={searchQuery}
                onChange={setSearchQuery}
            />

            <div className="flex flex-col gap-5 md:gap-10 px-4 pb-20 2xl:px-0">
                {faqSections.map((section, index) => (
                    <AccordionRenderer
                        key={index}
                        section={section}
                    />
                ))}
            </div>
        </main>
    );
};

export default FAQPage;