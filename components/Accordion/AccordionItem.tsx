// components/Accordion/AccordionItem.tsx

"use client";

import { IoChevronDown } from "react-icons/io5";
import { AccordionContentBlock } from "./accordion.types";

type Props = {
    question: string;
    answer: AccordionContentBlock[];
    isLast?: boolean;
    isOpen: boolean;
    onClick: () => void;
};

export default function AccordionItem({
    question,
    answer,
    isLast = false,
    isOpen,
    onClick,
}: Props) {
    return (
        <div className={`${isLast ? "" : "border-b border-primary"} py-3 md:py-6`}>
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-start justify-between gap-4 text-left cursor-pointer md:gap-5"
            >
                <span
                    className={`font-serif text-[20px] font-semibold leading-[30px] md:text-[24px] md:leading-[28px] ${isOpen ? "text-primary" : "text-foreground"
                        }`}
                >
                    {question}
                </span>

                <IoChevronDown
                    className={`mt-1 shrink-0 text-primary transition-transform duration-300 md:mt-2 ${isOpen ? "rotate-180" : ""
                        }`}
                    style={{ width: "40px", height: "35px" }}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[5000px] pt-3 md:pt-5" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col gap-3 md:gap-5">
                    {answer.map((block, index) => {
                        switch (block.type) {
                            case "paragraph":
                                return (
                                    <p
                                        key={index}
                                        className="font-serif text-[18px] font-normal leading-[38px] text-foreground md:text-[20px] md:leading-[36px]"
                                    >
                                        {block.content}
                                    </p>
                                );

                            case "muted":
                                return (
                                    <p
                                        key={index}
                                        className="font-serif text-[12px] font-normal leading-[18px] text-muted-foreground md:text-[20px] md:leading-[32px]"
                                    >
                                        {block.content}
                                    </p>
                                );

                            case "subheading":
                                return (
                                    <h4
                                        key={index}
                                        className="font-serif text-[12px] font-semibold leading-[18px] text-foreground md:text-[24px] md:leading-[32px]"
                                    >
                                        {block.content}
                                    </h4>
                                );

                            case "list":
                                return (
                                    <ul
                                        key={index}
                                        className="ml-4 list-disc space-y-1 pl-5 font-serif text-[18px] leading-[30px] text-foreground md:space-y-2 md:text-[20px] md:leading-[36px]"
                                    >
                                        {block.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}