"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { ORDER_URL } from "@/lib/constants";
import type { CateringPackage } from "@/lib/types";
import CateringCard from "./CateringCard";

interface CateringMenuSectionProps {
    title: string;
    subtitle: string;
    orderUrl?: string;
    items: CateringPackage[];
}

const swiperBreakpoints = {
    320: { slidesPerView: 1.05, spaceBetween: 16 },
    390: { slidesPerView: 1.12, spaceBetween: 16 },
    500: { slidesPerView: 1.45, spaceBetween: 16 },
    640: { slidesPerView: 2.05, spaceBetween: 16 },
    768: { slidesPerView: 2.35, spaceBetween: 18 },
};

const CateringMenuSection: React.FC<CateringMenuSectionProps> = ({
    title,
    subtitle,
    orderUrl = ORDER_URL,
    items,
}) => {
    const [activeCardId, setActiveCardId] = useState("");
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const maxDetailsCount = Math.max(
        1,
        ...items.map((item) => item.details.length),
    );

    const detailsMinHeight = maxDetailsCount * 32 + 56;


    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const activateCard = (id: string) => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }

        setActiveCardId(id);
    };

    const resetToDefaultCard = () => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = setTimeout(() => {
            setActiveCardId("");
        }, 140);
    };

    return (
        <section className="w-full bg-white pt-6 pb-4 transition-colors duration-300 sm:py-12 md:py-16 xl:py-16 dark:bg-[#101010]">
            <div className="w-full px-4 sm:px-5 md:px-8">
                <div className="mb-4 text-center md:mb-10">
                    <h2 className="font-[family-name:var(--font-serif-next)] text-[28px] font-black uppercase leading-[36px] tracking-wide text-[#1C1B1B] sm:text-[30px] sm:leading-none md:text-[36px] dark:text-white">
                        {title}
                    </h2>

                    <p className="mt-2 font-['Raleway'] text-[20px] font-medium uppercase tracking-[2px] text-[#FF7808] sm:text-[22px] md:mt-5 md:text-[24px]">
                        {subtitle}
                    </p>
                </div>

                {/* Desktop / laptop grid */}
                <div className="hidden w-full overflow-visible pb-[70px] lg:block">
                    <div className="grid grid-cols-3 items-start gap-5 overflow-visible xl:grid-cols-4">
                        {items.map((item) => (
                            <CateringCard
                                key={item.id}
                                item={item}
                                isActive={activeCardId === item.id}
                                orderUrl={orderUrl}
                                detailsMinHeight={detailsMinHeight}
                                onActivate={activateCard}
                                onReset={resetToDefaultCard}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile / tablet swiper */}
                <div className="w-full overflow-hidden lg:hidden">
                    <div className="-ml-4 py-4 pl-4">
                        <Swiper
                            grabCursor={true}
                            breakpoints={swiperBreakpoints}
                            className="!overflow-visible"
                        >
                            {items.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <CateringCard
                                        item={item}
                                        isActive={activeCardId === item.id}
                                        orderUrl={orderUrl}
                                        detailsMinHeight={detailsMinHeight}
                                        onActivate={activateCard}
                                        onReset={resetToDefaultCard}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CateringMenuSection;