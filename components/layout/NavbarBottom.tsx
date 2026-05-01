"use client";

import React from "react";
import Link from "next/link";

const NavbarBottom = () => {
  const locations = [
    "BALTIMORE, MD",
    "MANASSAS, VA",
    "LAUREL, MD",
    "ALEXANDRIA, VA",
    "FORESTHILL, VA",
  ];

  return (
    <section className="w-full bg-[#242323] py-0 flex items-center h-[50px] overflow-hidden">
      <div className="w-full px-[var(--space-lg)] flex items-center h-full relative">
        {/* Social Icons - Left Aligned */}
        <div className="flex-none flex items-center gap-2.5 sm:gap-5 text-white z-20 -ml-2 sm:ml-0">
          <Link href="https://facebook.com" target="_blank" className="hover:opacity-80 transition-all flex items-center justify-center">
            <img src="/socialicon-navbr/facebook.svg" alt="Facebook" className="w-[18px] h-[18px] sm:w-6 sm:h-6 object-contain brightness-0 invert" />
          </Link>

          <Link href="https://instagram.com" target="_blank" className="hover:opacity-80 transition-all flex items-center justify-center">
            <img src="/socialicon-navbr/instagram.svg" alt="Instagram" className="w-[18px] h-[18px] sm:w-6 sm:h-6 object-contain brightness-0 invert" />
          </Link>

          <Link href="https://tiktok.com" target="_blank" className="hover:opacity-80 transition-all flex items-center justify-center">
            <img src="/socialicon-navbr/tiktok.svg" alt="TikTok" className="w-[18px] h-[18px] sm:w-6 sm:h-6 object-contain brightness-0 invert" />
          </Link>

          <Link href="https://youtube.com" target="_blank" className="hover:opacity-80 transition-all flex items-center justify-center">
            <img src="/socialicon-navbr/youtube.svg" alt="YouTube" className="w-[18px] h-[18px] sm:w-6 sm:h-6 object-contain brightness-0 invert" />
          </Link>
        </div>

        {/* Location Marquee - Fills the gap */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center ml-4 mr-0 sm:mx-8">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-[var(--gap-lg)]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-20">
                {locations.map((loc, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-2 text-white/90 text-[var(--font-small)] font-bold tracking-[1.5px] uppercase">
                    <img src="/locainicon/pin1.png" alt="Location" className="w-3 h-3 sm:w-4 sm:h-4 object-contain brightness-100" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Gradients for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#242323] to-transparent z-10" />
          <div className="hidden sm:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#242323] to-transparent z-10" />
        </div>

        <div className="hidden min-[1100px]:flex flex-none items-center h-full z-20">
          <Link
            href="/order"
            className="bg-primary hover:bg-secondary text-white w-[147.31px] h-[36px] max-[1300px]:w-[125px] max-[1300px]:h-[32px] flex items-center justify-center font-medium text-[16px] max-[1300px]:text-[14px] tracking-[1.2px] transition-all uppercase"
          >
            ORDER NOW
          </Link>
          {/* Alignment spacer - to align with SIGN IN instead of Cart */}
          <div className="w-[calc(var(--gap-md)_+_24px)] max-[1300px]:w-[34px] shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default NavbarBottom;
