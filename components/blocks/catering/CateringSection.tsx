"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import type { Swiper as SwiperType } from "swiper";
import { ORDER_URL } from "@/lib/constants";

import "swiper/css";

const slides = [
  {
    image: "/homepage/menu/HIBACHI.png",
    label: "LIMITED SPECIAL",
    title: "LUNCH RUSH BOX",
    description: "$12.99",
    href: "/menu",
    buttonText: "CLAIM OFFER",
  },
  {
    image: "/homepage/menu/SUSHI.png",
    label: "WEEKEND PERKS",
    title: "Double Flame Points",
    description: "EARN 2X POINTS",
    href: "/menu",
    buttonText: "LEARN MORE",
  },
  {
    image: "/homepage/menu/SUSHI.png",
    label: "WEEKEND PERKS",
    title: "Double Flame Points",
    description: "EARN 2X POINTS",
    href: "/menu",
    buttonText: "LEARN MORE",
  },
  {
    image: "/homepage/menu/BENTO.png",
    label: "CATERING SPECIAL",
    title: "Signature Bento Box",
    description: "STARTING AT $15.99",
    href: "/menu",
    buttonText: "ORDER NOW",
  },
  {
    image: "/homepage/menu/WINGS  TENDERS.png",
    label: "WEEKEND PERKS",
    title: "Crispy Wings & Tenders",
    description: "TRY OUR NEW SAUCES",
    href: "/menu",
    buttonText: "VIEW MENU",
  },
  {
    image: "/homepage/menu/FLAME LOADED FRIES.png",
    label: "CATERING SPECIAL",
    title: "Flame Loaded Fries",
    description: "A CROWD FAVORITE",
    href: "/menu",
    buttonText: "ORDER NOW",
  },
];

const CateringSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full py-[var(--space-2xl)] overflow-hidden bg-[#FFFFFF] dark:bg-black transition-colors duration-300">
      {/* Header — constrained to content width */}
      <div className="w-full flex items-center justify-between px-[var(--space-lg)] mb-[var(--space-xl)]">
          <h3 className="heading-h3 text-left">
            <span className="text-[#1C1B1B] dark:text-white transition-colors duration-300">FLAME MONTHLY </span>
            <span className="text-primary">PROMOTIONS</span>
          </h3>

        {/* Arrow Buttons */}
        <div className="hidden md:flex gap-2 shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 md:w-11 md:h-11 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
            aria-label="Previous"
          >
            <FaArrowLeftLong size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 md:w-11 md:h-11 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
            aria-label="Next"
          >
            <FaArrowRightLong size={20} />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="px-[var(--space-lg)]">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          loopAdditionalSlides={slides.length}
          grabCursor={true}
          breakpoints={{
            500: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            1100: {
              slidesPerView: 3.3,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 4.3,
              spaceBetween: 24,
            },
            2000: {
              slidesPerView: 5.3,
              spaceBetween: 24,
            },
          }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full h-[clamp(340px,50vh,500px)] overflow-hidden group"
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
                  <h5 className="heading-h5 mb-1">
                    {slide.title}
                  </h5>
                  {/* @ts-ignore */}
                  {slide.description && (
                    <p className="text-primary font-black text-small md:text-lg mb-4">
                      {/* @ts-ignore */}
                      {slide.description}
                    </p>
                  )}
                  <span className="secondary-button">
                    {/* @ts-ignore */}
                    {slide.buttonText || "LEARN MORE"}
                  </span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile arrows — below the cards */}
        <div className="flex md:hidden justify-center gap-2 mt-[var(--space-md)]">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
            aria-label="Previous"
          >
            <FaArrowLeftLong size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
            aria-label="Next"
          >
            <FaArrowRightLong size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
