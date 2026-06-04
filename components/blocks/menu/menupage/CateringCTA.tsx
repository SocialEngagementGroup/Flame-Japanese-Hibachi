"use client";

import React from "react";
import Link from "next/link";

const CateringCTA = () => {
  return (
    <section 
      className="relative w-full h-[350px] md:h-[470px] overflow-hidden bg-cover bg-center px-5 py-5 md:py-0 bg-[url('/menupage/catering-bg.png')]"
    >
      {/* Optional dark gradient overlay to ensure text contrast on desktop and mobile */}
      <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent"></div>

      <div className="relative z-10 flex flex-col items-center md:items-start justify-center w-full h-full max-w-[1765px] mx-auto">
        
        {/* Title */}
     <div className="font-['Raleway'] font-black not-italic uppercase text-center md:text-left text-[24px] md:text-[72px] leading-[27px] md:leading-[72px] tracking-[-1px] md:tracking-normal drop-shadow-lg">
  <span className="block">
    <span className="text-[#FF7808]">CATER</span>
    <span className="text-white"> WITH US</span>
  </span>
  <span className="block mt-1 md:mt-0">
    <span className="text-white">FOR </span>
    <span className="text-[#FF7808]">NEXT EVENT</span>
  </span> 
</div>
        
        {/* Subtext */}
        <p className="mt-3 md:mt-4 text-[#FFF] md:text-[rgba(255,255,255,0.80)] font-['Raleway'] font-normal md:font-medium text-center md:text-left text-[10px] md:text-[18px] leading-[17px] md:leading-[28px] max-w-[90%] md:max-w-2xl drop-shadow-md">
          From office lunches to wedding receptions, we bring the hibachi theater<br className="hidden md:block" /> and world-class sushi to you.
        </p>
        
        {/* Button */}
        <Link
          href="/catering"
          className="mt-6 md:mt-8 w-[176px] md:w-[220px] h-[44px] md:h-[54px] flex items-center justify-center font-['Raleway'] not-italic uppercase text-[10px] md:text-sm font-semibold md:font-black leading-[20px] md:leading-normal tracking-[1.4px] md:tracking-[3px] text-[#1C1B1B] md:text-black border-2 border-white bg-white transition-all duration-300 hover:bg-[#FF7808] hover:border-[#FF7808] hover:text-white shadow-lg"
        >
          CATERING MENU
        </Link>
      </div>
    </section>
  );
};

export default CateringCTA;
