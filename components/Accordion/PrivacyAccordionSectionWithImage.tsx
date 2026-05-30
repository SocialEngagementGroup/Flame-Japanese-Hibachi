"use client";

import { useState } from "react";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";
import { AccordionItemType } from "./accordion.types";

export type PrivacyAccordionSectionWithImageProps = {
    title: string;
    imageSrc: string;
    imageAlt: string;
    items: AccordionItemType[];
    isOpen: boolean;
    onToggle: () => void;
};

export default function PrivacyAccordionSectionWithImage({
    title,
    imageSrc,
    imageAlt,
    items,
    isOpen,
    onToggle,
}: PrivacyAccordionSectionWithImageProps) {
    return (
        <div className="accordion-section mx-auto w-[80%] overflow-hidden border border-primary bg-background">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between bg-primary px-4 py-3 hover:translate-y-0 active:scale-100 md:px-8 md:py-3"
            >
                <h2 className="text-left font-serif text-[16px] font-extrabold uppercase leading-[24px] text-white md:text-[22px] md:leading-[32px] md:tracking-[4.8px]">
                    {title}
                </h2>
                <IoChevronDown
                    className={`shrink-0 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    style={{ width: "30px", height: "30px" }}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[5000px] border-t border-primary" : "max-h-0"
                    }`}
            >
                <div className="grid gap-4 p-4 md:items-start md:gap-8 md:p-8 lg:grid-cols-[320px_1fr]">
                    <div className="relative h-[220px] overflow-hidden md:h-[382px]">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1500px) 320px, 320px"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-6">
                        {items.map((item, index) => (
                            <div key={item.id} className="flex flex-col gap-3 md:gap-5">
                                {item.question && (
                                    <h3 className="font-serif text-[18px] font-bold leading-[30px] text-white md:text-[22px] md:leading-[32px]">
                                        {item.question}
                                    </h3>
                                )}

                                <div className="flex flex-col gap-3 md:gap-5">
                                    {item.answer.map((block, blockIndex) => {
                                        switch (block.type) {
                                            case "paragraph":
                                                return (
                                                    <p
                                                        key={blockIndex}
                                                        className="font-serif text-[16px] font-normal leading-[30px] text-foreground md:text-[18px] md:leading-[32px]"
                                                    >
                                                        {block.content}
                                                    </p>
                                                );
                                            case "muted":
                                                return (
                                                    <p
                                                        key={blockIndex}
                                                        className="font-serif text-[14px] font-normal leading-[24px] text-muted-foreground md:text-[16px] md:leading-[28px]"
                                                    >
                                                        {block.content}
                                                    </p>
                                                );
                                            case "subheading":
                                                return (
                                                    <h4
                                                        key={blockIndex}
                                                        className="font-serif text-[16px] font-bold leading-[24px] text-foreground md:text-[20px] md:leading-[32px] mt-4"
                                                    >
                                                        {block.content}
                                                    </h4>
                                                );
                                            case "list":
                                                return (
                                                    <ul
                                                        key={blockIndex}
                                                        className="ml-4 list-disc space-y-1 pl-5 font-serif text-[16px] leading-[30px] text-foreground md:space-y-2 md:text-[18px] md:leading-[32px]"
                                                    >
                                                        {block.items.map((listItem, itemIndex) => (
                                                            <li key={itemIndex}>{listItem}</li>
                                                        ))}
                                                    </ul>
                                                );
                                            case "table":
                                                return (
                                                    <div key={blockIndex} className="mt-6 overflow-x-auto">
                                                        <table className="w-full min-w-[500px] border-collapse border border-primary/30 text-left font-serif text-[14px] md:text-[16px]">
                                                            <thead>
                                                                <tr className="bg-primary/10">
                                                                    {block.headers.map((header, hIndex) => (
                                                                        <th key={hIndex} className="border border-primary/30 px-4 py-3 font-bold text-white">
                                                                            {header}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {block.rows.map((row, rIndex) => (
                                                                    <tr key={rIndex} className="even:bg-primary/5">
                                                                        {row.map((cell, cIndex) => (
                                                                            <td key={cIndex} className="border border-primary/30 px-4 py-3 text-foreground">
                                                                                {cell}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
