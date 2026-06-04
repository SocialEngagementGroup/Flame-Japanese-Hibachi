"use client";

import React from "react";

const MenuCTA = () => {
  return (
    <section className="relative w-full h-auto md:h-[610px] mt-16 overflow-hidden bg-[#0d0d0d] px-5 py-5 md:py-0">

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/menupage/cta/bg.png')" }}
      />

      {/* Banner Layout: col on mobile → row on desktop */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full items-center max-w-[1765px] mx-auto">

        {/* Images: 3 side by side */}
        <div className="flex flex-row items-center gap-3 w-full md:w-[62%]">
          <div
            className="flex-1 h-[300px] md:h-[490px] bg-cover bg-center"
            style={{ backgroundImage: 'url("/menupage/cta/rectangle-298.png")', boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)' }}
          />
          <div
            className="flex-1 h-[300px] md:h-[490px] bg-cover bg-center"
            style={{ backgroundImage: 'url("/menupage/cta/rectangle-299.png")', boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)' }}
          />
          <div
            className="flex-1 h-[300px] md:h-[490px] bg-cover bg-center"
            style={{ backgroundImage: 'url("/menupage/cta/rectangle-300.png")', boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)' }}
          />
        </div>

        {/* Text + Button */}
        <div className="flex flex-col items-center md:items-end justify-center w-full md:w-[38%] py-8 md:py-0 md:px-10">
          <div className="text-white font-['Raleway'] font-black not-italic uppercase text-center md:text-right text-[24px] md:text-[72px] leading-[23px] md:leading-[74px] drop-shadow-lg">
            <span className="block">BUILD YOUR</span>
            <span className="block text-[#FF7808]">OWN PLATTER</span>
          </div>

          <a
            href="https://order.online/business/~13770567"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-[176px] md:w-[220px] h-[44px] md:h-[54px] flex items-center justify-center font-['Raleway'] not-italic uppercase text-[10px] md:text-sm font-semibold md:font-black leading-[20px] md:leading-normal tracking-[1.4px] md:tracking-[3px] text-[#1C1B1B] md:text-black border-2 border-white bg-white transition-all duration-300 hover:bg-[#FF7808] hover:border-[#FF7808] hover:text-white shadow-lg"
          >
            START BUILDING
          </a>
        </div>

      </div>
    </section>
  );
};

export default MenuCTA;
