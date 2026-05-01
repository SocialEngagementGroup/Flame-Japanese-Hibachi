"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Footer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Footer video autoplay error:", e));
    }
  }, []);
  return (
    <footer className="w-full bg-[#131313] pt-[var(--space-2xl)] pb-[var(--space-xl)] px-[var(--space-lg)] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-[var(--gap-lg)] mb-[var(--space-2xl)] w-full text-center lg:text-left">

          {/* Logo and About (Box 1) */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
            <video
              ref={videoRef}
              src="/site-logo/logo-v2.webm"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              className="h-12 lg:h-16 object-contain mb-6"
            />
            <p className="text-gray-400 text-[var(--font-small)] leading-relaxed mb-[var(--space-lg)] max-w-[420px]">
              Experience the heat of the grill and the precision of the blade. Authentic Japanese flavors, modern theater.
            </p>
            {/* Desktop Social Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <SocialIcons />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-[var(--gap-lg)] w-full lg:w-auto lg:contents">
            {/* Company Links (Box 2) */}
            <div className="flex flex-col items-center lg:items-start lg:mt-[88px]">
              <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">COMPANY</h4>
              <ul className="space-y-6">
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
            <div className="flex flex-col items-center lg:items-start lg:mt-[88px]">
              <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">SERVICE</h4>
              <ul className="space-y-6">
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
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto lg:mt-[88px]">
            <h4 className="text-gray-500 font-black text-[10px] tracking-[2px] uppercase mb-6">DOWNLOAD OUR APP</h4>
            <div className="flex flex-col gap-4 w-full sm:w-auto items-center lg:items-end">
              <img src="/footer-apps/app-store.svg" alt="Download on the App Store" className="h-[48px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              <img src="/footer-apps/google-play.svg" alt="Get it on Google Play" className="h-[48px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
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
