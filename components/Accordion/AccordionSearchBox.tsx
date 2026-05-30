"use client";

import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function AccordionSearchBox({ value, onChange }: Props) {
    return (
        <div className="mx-auto w-full max-w-[1200px] px-4 py-3 md:px-5 md:py-5">
            <label htmlFor="accordion-search" className="sr-only">
                Search
            </label>

            <div className="mt-3 flex h-[44px] w-full items-center border-t border-r border-l border-primary border-b-2 px-3 md:mt-5 md:h-[60px]">
                <input
                    id="accordion-search"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search Frequently Asked Questions"
                    className="h-full flex-1 bg-transparent font-serif text-[14px] font-normal text-primary placeholder:text-primary outline-none md:text-[20px]"
                />

                {value ? (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        aria-label="Clear search"
                        className="flex h-5 w-5 items-center justify-center text-primary"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                ) : (
                    <FaSearch className="h-5 w-5 shrink-0 text-primary" />
                )}
            </div>

            <p className="mx-0 my-5 text-center font-sans text-[12px] font-semibold uppercase leading-[20px] tracking-[3px] text-white/50 md:m-[38px] md:text-[20px] md:leading-6 md:tracking-[4.8px]">
                <span className="block md:inline">Effective Date: May 19, 2025</span>
                <span className="hidden md:inline">&nbsp; |&nbsp; </span>
                <span className="block md:inline">Last Updated: May 19, 2025</span>
            </p>
        </div>
    );
}