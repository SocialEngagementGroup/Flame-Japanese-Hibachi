"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

// Custom SVG Social Icons (Outline Style)
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

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
            <FacebookIcon size={12} />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <InstagramIcon size={12} />
          </Link>
          <Link href="https://tiktok.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <TikTokIcon size={12} />
          </Link>
          <Link href="https://youtube.com" target="_blank" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 rounded-[5px] hover:text-primary hover:border-primary transition-all">
            <YoutubeIcon size={12} />
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
        <div className="hidden lg:flex flex-none items-center h-full z-20">
          <Link
            href="/order"
            className="bg-primary hover:bg-secondary text-white w-[160px] h-[44px] flex items-center justify-center font-black text-[14px] tracking-[1.5px] transition-all uppercase"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NavbarBottom;
