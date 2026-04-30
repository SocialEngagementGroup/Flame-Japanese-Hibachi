"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const slides = [
  {
    image: "/BG/Homepage-menu/HIBACHI.png",
    label: "CATERING SPECIAL",
    title: "Classic Hibachi Experience",
    href: "/menu",
  },
  {
    image: "/BG/Homepage-menu/SUSHI.png",
    label: "WEEKEND PERKS",
    title: "Double Flame Points",
    href: "/menu",
  },
  {
    image: "/BG/Homepage-menu/FLAME COMBO.png",
    label: "WEEKEND PERKS",
    title: "Double Flame Points",
    href: "/menu",
  },
  {
    image: "/BG/Homepage-menu/BENTO.png",
    label: "CATERING SPECIAL",
    title: "Signature Bento Box",
    href: "/menu",
  },
  {
    image: "/BG/Homepage-menu/WINGS  TENDERS.png",
    label: "WEEKEND PERKS",
    title: "Crispy Wings & Tenders",
    href: "/menu",
  },
  {
    image: "/BG/Homepage-menu/FLAME LOADED FRIES.png",
    label: "CATERING SPECIAL",
    title: "Flame Loaded Fries",
    href: "/menu",
  },
];

const CateringSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full py-10 md:py-16 overflow-hidden bg-[#F0EDED] dark:bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-12 mb-6 md:mb-8">
        <h3 className="heading-h3 text-black dark:text-white leading-tight">
          CATER WITH US <br className="hidden md:block" />
          <span className="text-primary">FOR YOUR NEXT EVENT</span>
        </h3>

        {/* Arrow Buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 md:w-11 md:h-11 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 md:w-11 md:h-11 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="px-4 md:px-12">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          grabCursor={true}
          breakpoints={{
            500: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
          }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <Link
                href={slide.href}
                className="relative block w-full h-[340px] md:h-[500px] overflow-hidden group"
              >
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text — bottom left */}
                <div className="absolute bottom-0 left-0 p-5 md:p-7">
                  <p className="item-label mb-2">
                    {slide.label}
                  </p>
                  <h5 className="heading-h5 mb-4">
                    {slide.title}
                  </h5>
                  <span className="secondary-button">
                    LEARN MORE
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CateringSection;
