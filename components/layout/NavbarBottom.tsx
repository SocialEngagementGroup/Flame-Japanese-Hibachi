"use client";

import React from "react";
import Link from "next/link";
import { ORDER_URL } from "@/lib/constants";

const NavbarBottom = () => {
  const locations = [
    "BALTIMORE, MD",
    "MANASSAS, VA",
    "LAUREL, MD",
    "PASADENA, MD",
    "ALEXANDRIA, VA",
    "FORESTHILL, VA",
    "TAMARAC, FL",
    "SEVEN CORNERS, VA",
    "NORTHERN PKWY, MD",
    "PHILADELPHIA, PA",
    "ROYAL PALM BEACH, FL",
    "ABERDEEN, MD",
  ];

  return (
    <section className="w-full bg-[#242323] py-0 flex items-center h-[50px] overflow-hidden">
      <div className="w-full px-[var(--space-lg)] flex items-center h-full relative">
        {/* Social Icons - Left Aligned */}
        <div className="flex-none flex items-center gap-1.5 sm:gap-3 text-white z-20">
          {[
            { href: "https://www.facebook.com/flamejapanesehibachi", alt: "Facebook", src: "/socialicon-navbr/facebook.svg", nudge: "" },
            { href: "https://www.instagram.com/flamejapanesehibachi?igsh=MTNmNHMycXo0ZHl2bA%3D%3D&utm_source=qr", alt: "Instagram", src: "/socialicon-navbr/instagram.svg", nudge: "" },
            { href: "https://www.tiktok.com/@flame.japanese.hi?_r=1&_t=ZT-95mfJglR2ez", alt: "TikTok", src: "/socialicon-navbr/tiktok.svg", nudge: "" },
            { href: "https://www.youtube.com/@flamejapanesehibachi", alt: "YouTube", src: "/socialicon-navbr/youtube.svg", nudge: "translate-y-[2px]" },
          ].map((l) => (
            <Link
              key={l.alt}
              href={l.href}
              target="_blank"
              className="hover:opacity-80 transition-all flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 shrink-0"
            >
              <img
                src={l.src}
                alt={l.alt}
                className={`w-[18px] h-[18px] sm:w-6 sm:h-6 object-contain brightness-0 invert ${l.nudge}`}
              />
            </Link>
          ))}
        </div>

        {/* Location Marquee - Fills the gap */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center ml-4 mr-0 sm:mx-8">
          <div className="animate-marquee [animation-duration:240s] whitespace-nowrap flex items-center gap-16 pr-16">
            {[...Array(2)].flatMap((_, i) =>
              locations.map((loc, idx) => (
                <div key={`${i}-${idx}`} aria-hidden={i === 1} className="flex items-center gap-2 text-white/90 font-serif font-medium text-[14px] leading-[16px] tracking-[1.2px] uppercase">
                  <img src="/locainicon/pin1.png" alt="Location" className="w-3 h-3 sm:w-4 sm:h-4 object-contain brightness-100" />
                  <span>{loc}</span>
                </div>
              ))
            )}
          </div>
          {/* Gradients for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#242323] to-transparent z-10" />
          <div className="hidden sm:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#242323] to-transparent z-10" />
        </div>

        <div className="hidden min-[1100px]:flex flex-none items-center h-full z-20">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-secondary text-white w-[147.31px] h-[36px] max-[1300px]:w-[125px] max-[1300px]:h-[32px] flex items-center justify-center font-medium text-base max-[1300px]:text-small tracking-[1.2px] transition-all uppercase"
          >
            ORDER NOW
          </a>
          {/* Alignment spacer - to align with SIGN IN instead of Cart */}
          <div className="w-[calc(var(--gap-md)_+_24px)] max-[1300px]:w-[34px] shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default NavbarBottom;
