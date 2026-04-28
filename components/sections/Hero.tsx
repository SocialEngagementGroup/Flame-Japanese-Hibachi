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
        <div className="max-w-2xl text-white text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
          <p className="font-sans text-[11px] md:text-[24px] font-medium tracking-[4px] md:tracking-[2px] uppercase mb-4 text-primary drop-shadow-md">
            SIZZLING PERFECTION, EVERY TIME.
          </p>

          <h1 className="font-serif text-[48px] lg:text-[96px] font-extrabold leading-[1.1] uppercase mb-10 tracking-[1px] drop-shadow-lg">
            IGNITE YOUR <br />
            <span className="text-white">SENSES.</span>
          </h1>

          <Link
            href="/order"
            className="flex md:inline-flex w-[280px] md:w-auto items-center justify-center bg-primary hover:bg-secondary text-white px-8 md:px-12 py-4 md:py-5 text-[14px] md:text-[16px] font-black tracking-[2px] transition-all uppercase active:scale-[0.98]"
          >
            ORDER NOW
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Hero;
