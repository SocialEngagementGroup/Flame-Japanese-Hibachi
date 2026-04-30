"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[65vh] min-h-[480px] md:h-[78vh] md:min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg-desk.png"
          alt="Flame Japanese Hibachi Hero"
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src="/hero-bg-mob.png"
          alt="Flame Japanese Hibachi Hero Mobile"
          className="block md:hidden w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 h-full w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-2xl flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          <p className="hero-paragraph mb-4">
            SIZZLING PERFECTION, EVERY TIME.
          </p>

          <h1 className="heading-h1 mb-10">
            IGNITE YOUR <br />
            <span className="text-white">SENSES.</span>
          </h1>

          <Link
            href="/order"
            className="hero-button"
          >
            ORDER NOW
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Hero;
