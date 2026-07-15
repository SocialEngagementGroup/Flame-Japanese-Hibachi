"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { useOrderUrl } from "@/lib/geo/useOrderUrl";

import "swiper/css";

const items = [
  {
    name: "CHICKEN BEEF SHRIMP FLAME COMBO",
    price: "$14.85",
    image: "/homepage/menu/FLAME COMBO.png",
  },
  {
    name: "SALMON AND SHRIMP FLAME COMBO",
    price: "$12.85",
    image: "/menupage/flame-combo/salmon-and-shrimp.jpg",
  },
  {
    name: "CHICKEN HIBACHI",
    price: "$9.85",
    image: "/menupage/hibachi/chicken-hibachi-plate.jpg",
  },
  {
    name: "CHICKEN & BEEF BENTO",
    price: "$13.85",
    image: "/homepage/menu/BENTO.png",
  },
  {
    name: "CALIFORNIA ROLL",
    price: "$7.85",
    image: "/homepage/menu/SUSHI.png",
  },
  {
    name: "CHICKEN TENDERS (5 PC)",
    price: "$11.99",
    image: "/homepage/menu/WINGS  TENDERS.png",
  },
  {
    name: "FLAME LOADED FRIES",
    price: "$9.85",
    image: "/homepage/menu/FLAME LOADED FRIES.png",
  },
];

const SignatureItems = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const orderUrl = useOrderUrl();

  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-black py-[var(--space-2xl)] overflow-hidden transition-colors duration-300">
      {/* Header — constrained to content width */}
      <div className="w-full flex items-center justify-between px-[var(--space-lg)] mb-[var(--space-xl)]">
        <h2 className="heading-h3 text-left">
          <span className="text-[#1C1B1B] dark:text-white transition-colors duration-300">
            MOST LOVED FLAME{" "}
          </span>
          <span className="text-primary"> SIGNATURE ITEMS</span>
        </h2>

        <div className="hidden md:flex gap-2 shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 md:w-11 md:h-11 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous"
          >
            <FaArrowLeftLong size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 md:w-11 md:h-11 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
            aria-label="Next"
          >
            <FaArrowRightLong size={20} />
          </button>
        </div>
      </div>

      {/* Slider — full width */}
      <div className="px-[var(--space-lg)]">
        <Swiper
          modules={[Autoplay, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          loop={items.length >= 10}
          grabCursor={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            500: { slidesPerView: 1.2, spaceBetween: 16 },
            768: { slidesPerView: 2.3, spaceBetween: 16 },
            1100: { slidesPerView: 3.2, spaceBetween: 20 },
            1600: { slidesPerView: 4.2, spaceBetween: 24 },
            2000: { slidesPerView: 5.2, spaceBetween: 24 },
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[1.15/1] overflow-hidden bg-[#EBEBEB] dark:bg-zinc-900 mb-[var(--space-md)] transition-colors duration-300">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1600px) 20vw, (min-width: 1100px) 30vw, (min-width: 768px) 40vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="heading-h4 text-[#1C1B1B] dark:text-white mb-2 transition-colors duration-300 line-clamp-2 md:min-h-[2.4em] leading-[1.2]">
                  {item.name}
                </h3>
                <p className="item-price">{item.price}</p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile arrows — below the cards */}
        <div className="flex md:hidden justify-center gap-2 mt-[var(--space-md)]">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous"
          >
            <FaArrowLeftLong size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
            aria-label="Next"
          >
            <FaArrowRightLong size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
