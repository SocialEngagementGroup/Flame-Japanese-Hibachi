"use client";

import React, { useEffect, useRef, useState } from "react";

import { useCateringQuote } from "@/components/providers/CateringQuoteProvider";
import type { CateringPackage } from "@/lib/types";
import CateringCard from "./CateringCard";

interface CateringMenuSectionProps {
    title: string;
    subtitle: string;
    items: CateringPackage[];
    cardVariant?: "catering" | "shop";
}

const CateringMenuSection: React.FC<CateringMenuSectionProps> = ({
    title,
    subtitle,
    items,
    cardVariant = "catering",
}) => {
    const { openQuote } = useCateringQuote();
    const [activeCardId, setActiveCardId] = useState("");
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const maxDetailsCount = Math.max(1, ...items.map((item) => item.details.length));
    const detailsMinHeight = maxDetailsCount * 32 + 56;

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    const activateCard = (id: string) => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        setActiveCardId(id);
    };

    const resetToDefaultCard = () => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => setActiveCardId(""), 140);
    };

    return (
        <section className="w-full bg-white pt-6 pb-0 transition-colors duration-300 sm:pt-12 sm:pb-0 md:pt-16 md:pb-0 xl:pt-16 xl:pb-0 dark:bg-[#101010]">
            <div className="w-full px-4 sm:px-5 md:px-8">
                <div className="mb-4 text-center md:mb-10">
                    <h2 className="font-['Work_Sans'] text-[28px] font-black uppercase leading-[36px] tracking-wide text-[#1C1B1B] sm:text-[30px] sm:leading-none md:text-[36px] dark:text-white">
                        {title}
                    </h2>
                    <p className="mt-2 font-['Work_Sans'] text-[20px] font-medium uppercase tracking-[2px] text-[#FF7808] sm:text-[22px] md:mt-5 md:text-[24px]">
                        {subtitle}
                    </p>
                </div>

                {/* Desktop grid (xl+) - all variants */}
                <div className="hidden w-full overflow-visible pb-[70px] xl:block">
                    <div className="grid grid-cols-3 items-start gap-5 overflow-visible xl:grid-cols-4">
                        {items.map((item) => (
                            <CateringCard
                                key={item.id}
                                item={item}
                                isActive={activeCardId === item.id}
                                onRequestQuote={openQuote}
                                detailsMinHeight={detailsMinHeight}
                                onActivate={activateCard}
                                onReset={resetToDefaultCard}
                                cardVariant={cardVariant}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile / tablet - every section uses the same compact vertical list
                    (the shop variant is desktop-only) so all sections look consistent. */}
                <div className="xl:hidden w-full">
                    <div className="space-y-3">
                        {items.map((item) => (
                            <CateringCard
                                key={item.id}
                                item={item}
                                isActive={activeCardId === item.id}
                                onRequestQuote={openQuote}
                                detailsMinHeight={detailsMinHeight}
                                onActivate={activateCard}
                                onReset={resetToDefaultCard}
                                cardVariant="catering"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CateringMenuSection;
