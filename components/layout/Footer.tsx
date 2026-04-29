"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d0d0d] pt-20 pb-10 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">

          {/* Logo and About (Left side on desktop) */}
          <div className="flex flex-col max-w-sm">
            <img
              src="/site-logo/FJH-logo-white.png"
              alt="Flame Japanese Hibachi"
              className="h-12 lg:h-16 object-contain mb-6 self-start"
            />
            <p className="text-gray-400 text-[11px] lg:text-[13px] leading-relaxed mb-8">
              Experience the heat of the grill and the precision of the blade.<br className="hidden lg:block" /> Authentic Japanese flavors, modern theater.
            </p>
            {/* Desktop Social Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <SocialIcons />
            </div>
          </div>

          {/* Links and App Download (Right side on desktop) */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 w-full lg:w-auto justify-between lg:justify-end">

            {/* Links Section (Side by side on mobile) */}
            <div className="flex gap-16 md:gap-24">
              {/* Company */}
              <div>
                <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">COMPANY</h4>
                <ul className="space-y-4">
                  {["VALUES", "CAREERS", "INVESTORS"].map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-white hover:text-[#ff7a00] text-[11px] font-bold uppercase tracking-widest transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service */}
              <div>
                <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">SERVICE</h4>
                <ul className="space-y-4">
                  {["CATERING", "GIFT CARDS", "SUPPORT"].map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-white hover:text-[#ff7a00] text-[11px] font-bold uppercase tracking-widest transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* App Download */}
            <div className="flex flex-col w-full md:w-auto">
              <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">DOWNLOAD OUR APP</h4>
              <div className="flex flex-col gap-4">
                <img src="https://placehold.co/180x50/111111/FFFFFF/png?text=App+Store" alt="Download on the App Store" className="h-[45px] object-contain border border-white/20 cursor-pointer hover:border-white transition-colors" />
                <img src="https://placehold.co/180x50/111111/FFFFFF/png?text=Google+Play" alt="Get it on Google Play" className="h-[45px] object-contain border border-white/20 cursor-pointer hover:border-white transition-colors" />
              </div>
            </div>

          </div>

          {/* Mobile Social Icons */}
          <div className="flex lg:hidden items-center gap-5 mt-4">
            <SocialIcons />
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Desktop Left: Policies */}
          <div className="hidden md:flex gap-8">
            <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">TERMS OF SERVICE</Link>
          </div>

          {/* Mobile Order: Copyright then Policies */}
          <p className="text-gray-600 text-[10px] font-bold tracking-[2px] uppercase text-left md:text-right w-full md:w-auto">
            © {new Date().getFullYear()} FLAME JAPANESE HIBACHI. ALL RIGHTS RESERVED.
          </p>

          <div className="flex md:hidden gap-8 mt-2 w-full justify-between">
            <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcons = () => {
  return (
    <>
      <Link href="mailto:info@flamehibachi.com" className="hover:opacity-80 transition-opacity flex items-center justify-center border border-white/20 rounded-md w-[32px] h-[32px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </Link>
      <Link href="https://facebook.com" target="_blank" className="hover:opacity-80 transition-opacity flex items-center justify-center border border-white/20 rounded-md w-[32px] h-[32px]">
        <img src="/socialicon-navbr/facebook.svg" alt="Facebook" className="w-[16px] h-[16px] object-contain brightness-0 invert" />
      </Link>
      <Link href="https://instagram.com" target="_blank" className="hover:opacity-80 transition-opacity flex items-center justify-center border border-white/20 rounded-md w-[32px] h-[32px]">
        <img src="/socialicon-navbr/instagram.svg" alt="Instagram" className="w-[16px] h-[16px] object-contain brightness-0 invert" />
      </Link>
      <Link href="https://tiktok.com" target="_blank" className="hover:opacity-80 transition-opacity flex items-center justify-center border border-white/20 rounded-md w-[32px] h-[32px]">
        <img src="/socialicon-navbr/tiktok.svg" alt="TikTok" className="w-[16px] h-[16px] object-contain brightness-0 invert" />
      </Link>
      <Link href="https://youtube.com" target="_blank" className="hover:opacity-80 transition-opacity flex items-center justify-center border border-white/20 rounded-md w-[32px] h-[32px]">
        <img src="/socialicon-navbr/youtube.svg" alt="YouTube" className="w-[16px] h-[16px] object-contain brightness-0 invert" />
      </Link>
    </>
  );
}

export default Footer;
