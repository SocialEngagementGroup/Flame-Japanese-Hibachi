"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import type { Swiper as SwiperType } from "swiper";
import BlogCard, { type BlogCardData } from "./BlogCard";

import "swiper/css";

/**
 * Auto-rotating carousel of blog cards - replaces the old numbered pagination.
 * Autoplay advances on its own; `loop` gives a seamless cycle once there are
 * enough cards, and `rewind` keeps a short list rotating back to the start.
 */
export default function BlogSlider({ posts }: { posts: BlogCardData[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Swiper's loop mode needs at least ~2x slidesPerView cards to duplicate; with
  // fewer, rewind keeps the auto-rotation going without the loop warning.
  const enableLoop = posts.length > 6;

  return (
    <div className="mt-[var(--space-lg)]">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={24}
        slidesPerView={1.1}
        loop={enableLoop}
        rewind={!enableLoop}
        grabCursor
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1100: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.slug} className="h-auto">
            <BlogCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Manual controls - the slider still auto-rotates on its own. */}
      <div className="flex justify-center gap-3 mt-[var(--space-xl)]">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          aria-label="Previous article"
        >
          <FaArrowLeftLong size={16} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          aria-label="Next article"
        >
          <FaArrowRightLong size={16} />
        </button>
      </div>
    </div>
  );
}
