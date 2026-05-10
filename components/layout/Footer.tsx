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
            <p className="text-gray-400 text-small leading-relaxed mb-[var(--space-lg)] max-w-[420px]">
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
              <h4 className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-500 mb-6">COMPANY</h4>
              <ul className="space-y-6">
                {["VALUES", "CAREERS", "INVESTORS"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="font-serif font-normal text-[14px] leading-[22px] tracking-[1.2px] uppercase text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Links (Box 3) */}
            <div className="flex flex-col items-center lg:items-start lg:mt-[88px]">
              <h4 className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-500 mb-6">SERVICE</h4>
              <ul className="space-y-6">
                {["CATERING", "GIFT CARDS", "SUPPORT"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="font-serif font-normal text-[14px] leading-[22px] tracking-[1.2px] uppercase text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* App Download (Box 4) */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto lg:mt-[88px]">
            <h4 className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-500 mb-6">DOWNLOAD OUR APP</h4>
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
              <Link href="#" className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-600 hover:text-white transition-colors">PRIVACY POLICY</Link>
              <Link href="#" className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-600 hover:text-white transition-colors">TERMS OF SERVICE</Link>
            </div>
            <p className="font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-600 text-right">
              © {new Date().getFullYear()} FLAME JAPANESE HIBACHI. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Mobile Layout: stacked centered */}
          <div className="flex md:hidden flex-col items-center text-center gap-2 font-sans font-semibold text-[15px] leading-[20px] tracking-[1px] uppercase text-gray-600 w-full">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
            <p>© {new Date().getFullYear()} FLAME JAPANESE HIBACHI. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcons = () => {
  const iconClass = "hover:opacity-80 transition-opacity flex items-center justify-center w-[36px] h-[36px] shrink-0";
  const imgClass = "w-[22px] h-[22px] object-contain brightness-0 invert";

  const links: { href: string; alt: string; src: string; external?: boolean; nudge?: string }[] = [
    { href: "mailto:ask@flamejapanesehibachi.com", alt: "Email", src: "/socialicon-navbr/envelope.svg" },
    { href: "https://www.facebook.com/flamejapanesehibachi", alt: "Facebook", src: "/socialicon-navbr/facebook.svg", external: true },
    { href: "https://www.instagram.com/flamejapanesehibachi?igsh=MTNmNHMycXo0ZHl2bA%3D%3D&utm_source=qr", alt: "Instagram", src: "/socialicon-navbr/instagram.svg", external: true },
    { href: "https://www.tiktok.com/@flame.japanese.hi?_r=1&_t=ZT-95mfJglR2ez", alt: "TikTok", src: "/socialicon-navbr/tiktok.svg", external: true },
    { href: "https://www.youtube.com/@flamejapanesehibachi", alt: "YouTube", src: "/socialicon-navbr/youtube.svg", external: true, nudge: "translate-y-[2px]" },
  ];

  return (
    <>
      {links.map((l) => (
        <Link
          key={l.alt}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          className={iconClass}
        >
          <img src={l.src} alt={l.alt} className={`${imgClass} ${l.nudge ?? ""}`} />
        </Link>
      ))}
    </>
  );
}

export default Footer;
