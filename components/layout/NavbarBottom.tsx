"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";



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
      <div className="w-full px-6 md:px-12 flex items-center h-full relative">
        {/* Social Icons - Left Aligned */}
        <div className="flex-none flex items-center gap-2 sm:gap-3 text-white/70 z-20">
          <Link href="https://facebook.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <img src="/socialicon-navbr/social-media 1.png" alt="Facebook" className="w-3 h-3 object-contain" />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <img src="/socialicon-navbr/instagram 1.png" alt="Instagram" className="w-3 h-3 object-contain" />
          </Link>
          <Link href="https://tiktok.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <img src="/socialicon-navbr/social-media (1) 1.png" alt="TikTok" className="w-3 h-3 object-contain" />
          </Link>
          <Link href="https://youtube.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <img src="/socialicon-navbr/youtube 1.png" alt="YouTube" className="w-3 h-3 object-contain" />
          </Link>
        </div>

        {/* Location Marquee - Fills the gap */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-20">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-20">
                {locations.map((loc, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-1.5 sm:gap-2 text-white/90 text-[10px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.5px] uppercase">
                    <MapPin size={12} className="text-primary" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Gradients for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#242323] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#242323] to-transparent z-10" />
        </div>

        {/* Order Now Button - Right Aligned */}
        <div className="hidden min-[1100px]:flex flex-none items-center h-full z-20">
          <Link
            href="/order"
            className="bg-primary hover:bg-secondary text-white w-[140px] xl:w-[160px] h-[44px] flex items-center justify-center font-black text-[14px] tracking-[1.5px] transition-all uppercase"
          >
            ORDER NOW
          </Link>
          {/* Alignment spacer - adjusted to 56px to match Icon(24) + Gap(32) */}
          <div className="w-[56px] shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default NavbarBottom;
