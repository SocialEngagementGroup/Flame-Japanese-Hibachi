"use client";

import React from "react";
import Link from "next/link";

const CateringSection = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Catering Background"
          className="w-full h-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-white font-serif text-[40px] md:text-[60px] font-black uppercase leading-none mb-6">
          CATER WITH US <br />
          FOR NEXT EVENT
        </h2>
        
        <p className="text-gray-300 text-[14px] md:text-[16px] max-w-xl mb-10 leading-relaxed font-sans uppercase tracking-widest">
          From office lunches to wedding receptions, bring Flame Japanese Hibachi flavor to your next gathering.
        </p>

        <Link
          href="/catering"
          className="bg-white text-black hover:bg-primary hover:text-white px-10 py-4 text-[14px] font-black tracking-[2px] transition-all uppercase"
        >
          CATERING MENU
        </Link>
      </div>
    </section>
  );
};

export default CateringSection;
