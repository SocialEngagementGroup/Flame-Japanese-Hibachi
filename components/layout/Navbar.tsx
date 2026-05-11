"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import { ORDER_URL } from "@/lib/constants";
import FindFlamePopup from "@/components/layout/FindFlamePopup";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFindFlameOpen, setIsFindFlameOpen] = useState(false);
  const desktopVideoRef = React.useRef<HTMLVideoElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch((e) => console.log("Desktop video autoplay error:", e));
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch((e) => console.log("Mobile video autoplay error:", e));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "MENU", href: ORDER_URL, external: true },
    { name: "CATERING", href: "/catering", external: false },
    { name: "LOCATIONS", href: "/locations", external: false },
    { name: "PROMOTIONS", href: ORDER_URL, external: true },
    { name: "JOIN FLAME", href: ORDER_URL, external: true },
  ];

  return (
    <nav
      className={`transition-all duration-300 font-serif bg-black py-5 md:py-0 border-b border-white/5 relative z-50`}
    >
      <div className="w-full px-[var(--space-lg)] flex items-center justify-between relative">
        {/* Left: Mobile Sign In / Desktop Logo */}
        <div className="flex-none flex justify-start items-center z-10">
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="max-[1100px]:flex hidden border-2 border-white text-white w-[100px] max-[500px]:w-[85px] h-[30px] max-[500px]:h-[26px] items-center justify-center hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-[0.97] transition-all text-small font-black tracking-[1px] uppercase">
            SIGN IN
          </a>
          <div className="hidden min-[1100px]:block">
            <Link href="/" className="flex items-center group">
              <video
                ref={desktopVideoRef}
                autoPlay
                loop
                muted
                playsInline
                poster="/site-logo/FJH-logo-white.png"
                className="object-contain brightness-100 transition-all"
                style={{ width: '190px', height: '72px' }}
              >
                <source src="/site-logo/logo-v2.webm" type="video/webm" />
                <img src="/site-logo/FJH-logo-white.png" alt="Flame Japanese Hibachi" className="w-[190px] h-[72px] object-contain" />
              </video>
            </Link>
          </div>
        </div>

        {/* Center: Mobile Logo / Desktop Links */}
        <div className="flex-none flex items-center justify-center">
          {/* Mobile Logo - Absolute Centered */}
          <div className="mobile-logo-wrapper min-[1100px]:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <video
                ref={mobileVideoRef}
                autoPlay
                loop
                muted
                playsInline
                poster="/site-logo/FJH-logo-white.png"
                className="object-contain"
                style={{ width: '190px', height: '72px' }}
              >
                <source src="/site-logo/logo-v2.webm" type="video/webm" />
                <img src="/site-logo/FJH-logo-white.png" alt="Flame Japanese Hibachi" className="w-[190px] h-[72px] object-contain" />
              </video>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden min-[1100px]:flex items-center justify-center gap-[var(--gap-lg)] max-[1300px]:gap-[12px]">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              const className = `text-white hover:text-primary text-small font-black tracking-[1.2px] leading-[16px] transition-colors relative group uppercase transition-all duration-300 ${isActive ? "text-primary" : ""}`;
              const underline = (
                <span className={`absolute -bottom-2 left-0 w-full h-[2.5px] bg-primary transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              );
              return link.external ? (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.name}
                  {underline}
                </a>
              ) : (
                <Link key={link.name} href={link.href} className={className}>
                  {link.name}
                  {underline}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-none flex items-center justify-end gap-[var(--gap-md)] max-[1300px]:gap-[10px] z-10">
          {/* Find a Flame */}
          <button
            onClick={() => setIsFindFlameOpen(true)}
            className="hidden min-[1100px]:flex items-center gap-[var(--gap-xs)] text-white hover:text-primary transition-colors"
          >
            <MapPin size={17} className="w-[18px] h-[18px] max-[1300px]:w-[14px] max-[1300px]:h-[14px]" strokeWidth={2.5} />
            <span className="text-small font-black tracking-[1.2px] uppercase">FIND A FLAME</span>
          </button>

          {/* Theme Toggle - Desktop Only */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden min-[1100px]:flex text-white hover:text-primary transition-colors p-1"
            aria-label="Toggle Theme"
          >
            {mounted ? (
              theme === "dark" ? <Sun size={19} className="max-[1300px]:w-[14px] max-[1300px]:h-[14px] min-[1440px]:w-[22px] min-[1440px]:h-[22px]" /> : <Moon size={19} className="max-[1300px]:w-[14px] max-[1300px]:h-[14px] min-[1440px]:w-[22px] min-[1440px]:h-[22px]" />
            ) : (
              <div className="w-[19px] h-[19px] max-[1300px]:w-[14px] max-[1300px]:h-[14px] min-[1440px]:w-[22px] min-[1440px]:h-[22px]" />
            )}
          </button>

          {/* Sign In - Desktop Only */}
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="hidden min-[1100px]:flex border-2 border-white text-white w-[147.31px] h-[36px] max-[1300px]:w-[125px] max-[1300px]:h-[32px] items-center justify-center hover:bg-white hover:text-black hover:-translate-y-0.5 active:scale-[0.97] transition-all text-base max-[1300px]:text-small font-medium tracking-[1.2px] uppercase">
            SIGN IN
          </a>

          {/* Cart - Desktop Only */}
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="hidden min-[1100px]:block relative text-white hover:text-primary transition-colors">
            <img
              src="/site-logo/shop-card-icon.png"
              alt="Cart"
              className="w-6 h-6 object-contain brightness-100"
            />
            <span className="absolute -top-1.5 -right-2 bg-primary text-white text-small font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
              0
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`min-[1100px]:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 z-50 transition-all active:scale-95 ${isMobileMenuOpen ? "hidden" : "block"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="w-7 h-7 max-[500px]:w-[23px] max-[500px]:h-[23px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`min-[1100px]:hidden fixed inset-0 bg-black transition-all duration-300 z-[9999] h-screen w-screen ${isMobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-6 top-6 text-white hover:text-primary transition-colors p-2 z-[10000]"
          aria-label="Close Menu"
        >
          <X className="w-8 h-8 max-[500px]:w-[27px] max-[500px]:h-[27px]" strokeWidth={2.5} />
        </button>

        <div 
          className="flex flex-col items-center justify-start h-full gap-8 max-[500px]:gap-[27px] px-6 pt-24 max-[500px]:pt-[70px] overflow-y-auto bg-black"
        >
          <Link 
            href="/" 
            className={`transition-all duration-700 delay-100 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/site-logo/FJH-logo-white.png"
              className="object-contain w-[200px] h-[80px] max-[500px]:w-[170px] max-[500px]:h-[68px]"
            >
              <source src="/site-logo/logo-v2.webm" type="video/webm" />
              <img src="/site-logo/FJH-logo-white.png" alt="Flame Japanese Hibachi" className="w-[200px] h-[80px] max-[500px]:w-[170px] max-[500px]:h-[68px] object-contain" />
            </video>
          </Link>

          <div className="flex flex-col items-center gap-7 max-[500px]:gap-[22px] w-full mt-8 max-[500px]:mt-6">
            {navLinks.map((link, index) => {
              const isActive = !link.external && pathname === link.href;
              const className = `text-white text-2xl max-[500px]:text-lg font-black tracking-[3px] max-[500px]:tracking-[2px] uppercase hover:text-primary transition-all duration-300 ${isActive ? "text-primary" : ""} ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`;
              const style = { transitionDelay: `${(index + 2) * 100}ms` };
              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={style}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={className}
                  style={style}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="w-full max-w-[280px] max-[500px]:max-w-[240px] h-[1px] bg-white/20 my-6 max-[500px]:my-4" />

          <div className="flex flex-col items-center gap-8 max-[500px]:gap-[27px] w-full pb-10">
            {/* Theme & Cart Row */}
            <div className="flex items-center gap-12 max-[500px]:gap-10">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="w-7 h-7 max-[500px]:w-[23px] max-[500px]:h-[23px]" /> : <Moon className="w-7 h-7 max-[500px]:w-[23px] max-[500px]:h-[23px]" />
                ) : (
                  <div className="w-7 h-7 max-[500px]:w-[23px] max-[500px]:h-[23px]" />
                )}
                <span className="text-small font-bold tracking-widest uppercase">THEME</span>
              </button>

              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-white hover:text-primary transition-colors flex flex-col items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-7 h-7 max-[500px]:w-[23px] max-[500px]:h-[23px]" strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-small font-black w-5 h-5 max-[500px]:w-4 max-[500px]:h-4 flex items-center justify-center rounded-full">
                  0
                </span>
                <span className="text-small font-bold tracking-widest uppercase">CART</span>
              </a>
            </div>

            <button
              className="flex items-center gap-3 max-[500px]:gap-2 text-white hover:text-primary transition-colors text-base max-[500px]:text-sm font-black tracking-widest uppercase mt-4 max-[500px]:mt-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFindFlameOpen(true);
              }}
            >
              <MapPin className="w-[22px] h-[22px] max-[500px]:w-[18px] max-[500px]:h-[18px]" />
              <span>FIND A FLAME</span>
            </button>

            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white w-full max-w-[280px] max-[500px]:max-w-[240px] py-5 max-[500px]:py-4 font-black tracking-[3px] max-[500px]:tracking-[2px] uppercase text-base max-[500px]:text-small hover:bg-white hover:text-black hover:-translate-y-1 active:scale-[0.97] transition-all shadow-xl shadow-primary/30 mt-4 max-[500px]:mt-2 text-center flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ORDER NOW
            </a>
          </div>
        </div>
      </div>

      <FindFlamePopup open={isFindFlameOpen} onClose={() => setIsFindFlameOpen(false)} />
    </nav>
  );
};

export default Navbar;
