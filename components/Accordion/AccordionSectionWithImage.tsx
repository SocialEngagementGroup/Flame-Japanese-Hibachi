// components/Accordion/AccordionSectionWithImage.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import AccordionItem from "./AccordionItem";
import { AccordionSectionWithImageProps } from "./accordion.types";

export default function AccordionSectionWithImage({
    title,
    imageSrc,
    imageAlt,
    items,
}: AccordionSectionWithImageProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const topItems = items.slice(0, 2);
    const bottomItems = items.slice(2);

    return (
        <section className="accordion-section mx-auto w-[80%] overflow-hidden border border-primary bg-background">
            <div className="bg-primary px-4 py-3 md:px-8 md:py-5">
                <h2 className="text-center font-serif text-[16px] font-extrabold uppercase leading-[24px] text-white md:text-left md:text-[24px] md:leading-[24px] md:tracking-[4.8px]">
                    {title}
                </h2>
            </div>

            <div className="grid gap-4 px-4 pt-4 md:items-start md:gap-8 md:px-8 md:pt-8 lg:grid-cols-[320px_1fr]">
                <div className="relative h-[220px] overflow-hidden md:mt-[29px] md:h-[382px]">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1500px) 320px, 320px"
                        className="object-cover"
                    />
                </div>

                <div className="md:mt-[29px]">
                    {topItems.map((item, index) => (
                        <AccordionItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isLast={bottomItems.length === 0 && index === topItems.length - 1}
                            isOpen={activeIndex === index}
                            onClick={() =>
                                setActiveIndex(activeIndex === index ? null : index)
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="px-4 pb-4 md:px-8 md:pb-8">
                {bottomItems.map((item, index) => {
                    const actualIndex = index + topItems.length;

                    return (
                        <AccordionItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isLast={index === bottomItems.length - 1}
                            isOpen={activeIndex === actualIndex}
                            onClick={() =>
                                setActiveIndex(
                                    activeIndex === actualIndex ? null : actualIndex
                                )
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
}