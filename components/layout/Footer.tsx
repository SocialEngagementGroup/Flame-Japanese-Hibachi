"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#131313] pt-20 pb-10 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8 mb-20 w-full text-center lg:text-left">

          {/* Logo and About (Box 1) */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
            <img
              src="/site-logo/FJH-logo-white.png"
              alt="Flame Japanese Hibachi"
              className="h-12 lg:h-16 object-contain mb-6"
            />
            <p className="text-gray-400 text-[11px] lg:text-[13px] leading-relaxed mb-8 max-w-[280px]">
              Experience the heat of the grill and the precision of the blade. Authentic Japanese flavors, modern theater.
            </p>
            {/* Desktop Social Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <SocialIcons />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-16 w-full lg:w-auto lg:contents">
            {/* Company Links (Box 2) */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">COMPANY</h4>
              <ul className="space-y-4">
                {["VALUES", "CAREERS", "INVESTORS"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Links (Box 3) */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">SERVICE</h4>
              <ul className="space-y-4">
                {["CATERING", "GIFT CARDS", "SUPPORT"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* App Download (Box 4) */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">DOWNLOAD OUR APP</h4>
            <div className="flex flex-col gap-4 w-full sm:w-auto items-center lg:items-end">
              <img src="https://placehold.co/180x50/111111/FFFFFF/png?text=App+Store" alt="Download on the App Store" className="h-[45px] object-contain border border-white/20 cursor-pointer hover:border-white transition-colors" />
              <img src="https://placehold.co/180x50/111111/FFFFFF/png?text=Google+Play" alt="Get it on Google Play" className="h-[45px] object-contain border border-white/20 cursor-pointer hover:border-white transition-colors" />
            </div>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-2 w-full">
            <SocialIcons />
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 w-full">
          {/* Desktop Left: Policies */}
          <div className="hidden md:flex justify-between items-center gap-6">
            <div className="flex gap-8">
              <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">PRIVACY POLICY</Link>
              <Link href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">TERMS OF SERVICE</Link>
            </div>
            <p className="text-gray-600 text-[10px] font-bold tracking-[2px] uppercase text-right">
              © {new Date().getFullYear()} FLAME JAPANESE HIBACHI. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Mobile Layout: Split Layout */}
          <div className="flex md:hidden justify-between items-start text-[9px] text-gray-600 font-bold tracking-[2px] uppercase w-full">
            <div className="flex flex-col text-left leading-relaxed">
              <span>© {new Date().getFullYear()} FLAME</span>
              <span>JAPANESE HIBACHI.</span>
              <span>ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex flex-col text-right leading-relaxed gap-1">
              <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
              <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcons = () => {
  const iconClass = "hover:opacity-80 transition-opacity flex items-center justify-center w-[36px] h-[36px]";
  const baseImgClass = "object-contain brightness-0 invert";
  const standardImgClass = `w-[24px] h-[24px] ${baseImgClass}`;
  const smallImgClass = `w-[21px] h-[21px] -translate-y-[2px] ${baseImgClass}`;

  return (
    <>
      <Link href="mailto:info@flamehibachi.com" className={iconClass}>
        <img src="/socialicon-navbr/envelope.svg" alt="Email" className={smallImgClass} />
      </Link>
      <Link href="https://facebook.com" target="_blank" className={iconClass}>
        <img src="/socialicon-navbr/facebook.svg" alt="Facebook" className={standardImgClass} />
      </Link>
      <Link href="https://instagram.com" target="_blank" className={iconClass}>
        <img src="/socialicon-navbr/instagram.svg" alt="Instagram" className={standardImgClass} />
      </Link>
      <Link href="https://tiktok.com" target="_blank" className={iconClass}>
        <img src="/socialicon-navbr/tiktok.svg" alt="TikTok" className={standardImgClass} />
      </Link>
      <Link href="https://youtube.com" target="_blank" className={iconClass}>
        <img src="/socialicon-navbr/youtube.svg" alt="YouTube" className={smallImgClass} />
      </Link>
    </>
  );
}

export default Footer;
