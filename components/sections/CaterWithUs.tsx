"use client";

import React from "react";
import Link from "next/link";

const CaterWithUs = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/homepage/catering/caterwithusmobile.png" />
          <img
            src="/homepage/catering/caterwithus.png"
            alt="Cater with us for next event"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#1E1E1E]/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full w-full max-w-[1440px] mx-auto px-[var(--space-lg)] flex flex-col justify-center items-center text-center">
        <h2 className="text-[24px] md:text-[72px] font-black text-white mb-4 md:mb-6 uppercase leading-tight md:leading-[1.1]">
          CATER WITH US<br />
          FOR NEXT EVENT
        </h2>

        <p className="text-white text-[16px] md:text-[20px] font-medium max-w-[650px] mb-8 md:mb-10 leading-relaxed">
          From office lunches to wedding receptions, we bring the hibachi theater and world-class sushi to you.
        </p>

        <Link
          href="/catering"
          className="bg-white text-black font-black uppercase text-[14px] md:text-[16px] tracking-widest px-8 py-3 md:px-10 md:py-4 hover:bg-primary hover:text-white transition-all duration-300"
        >
          CATERING MENU
        </Link>
      </div>
    </section>
  );
};

export default CaterWithUs;
