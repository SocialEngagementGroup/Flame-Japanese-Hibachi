// components/Accordion/AccordionSection.tsx

"use client";

import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { AccordionSectionProps } from "./accordion.types";

export default function AccordionSection({
    title,
    items,
}: AccordionSectionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="accordion-section mx-auto w-[80%] overflow-hidden border border-primary bg-background">
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
                        isOpen={activeIndex === index}
                        onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }
                    />
                ))}
            </div>
        </section>
    );
}