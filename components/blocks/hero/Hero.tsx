"use client";

import React from "react";
import { ORDER_URL } from "@/lib/constants";

const Hero = () => {
  return (
    <section className="relative flex-1 min-h-[320px] w-full overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/homepage/hero/hero-bg-desk.png"
          alt="Flame Japanese Hibachi Hero"
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src="/homepage/hero/hero-bg-mob.png"
          alt="Flame Japanese Hibachi Hero Mobile"
          className="block md:hidden w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-[var(--space-lg)]">
        <div className="max-w-[65ch] flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          <p className="hero-paragraph mb-[var(--space-sm)]">
            SIZZLING PERFECTION, EVERY TIME.
          </p>

          <h1 className="heading-h1 mb-[var(--space-xl)]">
            IGNITE YOUR <br />
            <span className="text-white">SENSES.</span>
          </h1>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            ORDER NOW
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
