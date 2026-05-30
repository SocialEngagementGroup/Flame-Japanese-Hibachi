// components/Accordion/AccordionSection.tsx

"use client";

import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { AccordionSectionProps } from "./accordion.types";

export default function AccordionSection({
    title,
    items,
}: AccordionSectionProps) {
    // All items open by default; toggle on click adds/removes that index.
    const [openIndices, setOpenIndices] = useState<Set<number>>(
        () => new Set(items.map((_, i) => i))
    );

    const toggle = (i: number) =>
        setOpenIndices((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    return (
        <section className="accordion-section mx-auto w-full md:w-[80%] overflow-hidden border border-primary bg-background">
            <div className="bg-primary px-4 py-3 md:px-8 md:py-5">
                <h2 className="text-center font-serif text-[16px] font-extrabold uppercase leading-[24px] text-white md:text-left md:text-[24px] md:leading-[24px] md:tracking-[4.8px]">
                    {title}
                </h2>
            </div>

            <div className="p-4 md:p-8">
                {items.map((item, index) => (
                    <AccordionItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isLast={index === items.length - 1}
                        isOpen={openIndices.has(index)}
                        onClick={() => toggle(index)}
                    />
                ))}
            </div>
        </section>
    );
}