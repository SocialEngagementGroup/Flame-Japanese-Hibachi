"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { AccordionItemType } from "./accordion.types";
import { linkify } from "@/lib/linkify";

export type PrivacyAccordionSectionProps = {
    title: string;
    items: AccordionItemType[]; // Since Privacy Policy has no 'questions', we just use the answer blocks
    isOpen: boolean;
    onToggle: () => void;
};

// Based on the screenshot, the Privacy Accordion has the title in the orange bar which acts as the toggle.
// Then the content is displayed in a black box below with an orange border.
export default function PrivacyAccordionSection({
    title,
    items,
    isOpen,
    onToggle,
}: PrivacyAccordionSectionProps) {
    return (
        <div className="accordion-section mx-auto w-full md:w-[80%] overflow-hidden border border-primary bg-background">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between bg-primary p-3 cursor-pointer hover:translate-y-0 active:scale-100"
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
                className={`grid overflow-hidden transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="min-h-0 border-t border-primary p-4 md:p-8">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-3 md:gap-5 mb-8 last:mb-0">
                            {/* If there's a question (like 2.1 Information You Provide Directly), render it as a subtitle */}
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
                                                    {linkify(block.content)}
                                                </p>
                                            );
                                        case "muted":
                                            return (
                                                <p
                                                    key={blockIndex}
                                                    className="font-serif text-[14px] font-normal leading-[24px] text-muted-foreground md:text-[16px] md:leading-[28px]"
                                                >
                                                    {linkify(block.content)}
                                                </p>
                                            );
                                        case "subheading":
                                            return (
                                                <h4
                                                    key={blockIndex}
                                                    className="font-serif text-[16px] font-bold leading-[24px] text-foreground md:text-[20px] md:leading-[32px] mt-4"
                                                >
                                                    {linkify(block.content)}
                                                </h4>
                                            );
                                        case "list":
                                            return (
                                                <ul
                                                    key={blockIndex}
                                                    className="ml-4 list-disc space-y-1 pl-5 font-serif text-[16px] leading-[30px] text-foreground md:space-y-2 md:text-[18px] md:leading-[32px]"
                                                >
                                                    {block.items.map((listItem, itemIndex) => (
                                                        <li key={itemIndex}>{linkify(listItem)}</li>
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
                                                                            {linkify(cell)}
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
    );
}
