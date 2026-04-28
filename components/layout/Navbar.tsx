"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
    { name: "HOME", href: "/" },
    { name: "MENU", href: "/menu" },
    { name: "CATERING", href: "/catering" },
    { name: "LOCATIONS", href: "/locations" },
    { name: "PROMOTIONS", href: "/promotions" },
    { name: "JOIN FLAME", href: "/join" },
  ];



  return (
    <nav
      className={`transition-all duration-300 font-serif bg-black ${isScrolled
        ? "py-3"
        : "max-[1100px]:py-5 py-0"
        }`}
    >
      <div className="w-full px-4 md:px-12 flex items-center justify-between relative">
        {/* Left: Mobile Sign In / Desktop Logo */}
        <div className="flex-none flex justify-start items-center z-10">
          <button className="max-[1100px]:flex hidden border-2 border-white text-white w-[100px] h-[30px] items-center justify-center hover:bg-white hover:text-black transition-all text-[14px] font-black tracking-[1px] uppercase">
            SIGN IN
          </button>

          <div className="hidden min-[1100px]:block">
            <Link href="/" className="flex items-center group">
              <img
                src="/site-logo/FJH-logo-white.png"
                alt="Flame Japanese Hibachi"
                width={190}
                height={72}
                className="object-contain brightness-100 transition-all w-[165px] h-[62px] min-[1440px]:w-[190px] min-[1440px]:h-[72px]"
              />
            </Link>
          </div>
        </div>

        {/* Center: Mobile Logo / Desktop Links */}
        <div className="flex-none flex items-center justify-center">
          {/* Mobile Logo - Absolute Centered */}
          <div className="min-[1100px]:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <img
                src="/site-logo/FJH-logo-white.png"
                alt="Flame Japanese Hibachi"
                width={130}
                height={54}
                className="object-contain"
                style={{ width: '130px', height: '54px' }}
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden min-[1100px]:flex items-center justify-center gap-6 min-[1440px]:gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white hover:text-primary text-[11px] min-[1440px]:text-[14px] font-black tracking-[1.2px] leading-[16px] transition-colors relative group uppercase transition-all duration-300 ${isActive ? "text-primary" : ""
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-full h-[2.5px] bg-primary transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}></span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-none flex items-center justify-end gap-6 min-[1100px]:gap-8 z-10">
          {/* Find a Flame */}
          <button className="hidden min-[1100px]:flex items-center gap-1.5 min-[1440px]:gap-2 text-white hover:text-primary transition-colors">
            <MapPin size={17} className="min-[1440px]:w-5 min-[1440px]:h-5" strokeWidth={2.5} />
            <span className="text-[11px] min-[1440px]:text-[14px] font-black tracking-[1.2px] uppercase">FIND A FLAME</span>
          </button>

          {/* Theme Toggle - Desktop Only */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden min-[1100px]:flex text-white hover:text-primary transition-colors p-1"
            aria-label="Toggle Theme"
          >
            {mounted ? (theme === "dark" ? <Sun size={19} className="min-[1440px]:w-[22px] min-[1440px]:h-[22px]" /> : <Moon size={19} className="min-[1440px]:w-[22px] min-[1440px]:h-[22px]" />) : <div className="w-[19px] h-[19px] min-[1440px]:w-[22px] min-[1440px]:h-[22px]" />}
          </button>

          {/* Sign In - Desktop Only */}
          <button className="hidden min-[1100px]:flex border-2 border-white text-white w-[140px] h-[32px] min-[1440px]:h-[35px] items-center justify-center hover:bg-white hover:text-black transition-all text-[11px] min-[1440px]:text-[14px] font-black tracking-[1.2px] uppercase">
            SIGN IN
          </button>

          {/* Cart - Desktop Only */}
          <button className="hidden min-[1100px]:block relative text-white hover:text-primary transition-colors">
            <img
              src="/site-logo/shop-card-icon.png"
              alt="Cart"
              className="w-5 h-5 min-[1440px]:w-6 min-[1440px]:h-6 object-contain brightness-100"
            />
            <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-black w-4 h-4 min-[1440px]:w-5 min-[1440px]:h-5 flex items-center justify-center rounded-full shadow-lg">
              0
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`min-[1100px]:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 z-50 transition-all active:scale-95 ${isMobileMenuOpen ? "hidden" : "block"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`min-[1100px]:hidden fixed inset-0 bg-black/98 backdrop-blur-xl transition-all duration-300 ease-in-out z-40 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-6 top-6 text-white hover:text-primary transition-colors p-2 z-50"
          aria-label="Close Menu"
        >
          <X size={32} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-5 px-6 pt-20">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-white text-base font-bold tracking-[2px] uppercase hover:text-primary transition-all duration-300 ${isActive ? "text-primary" : ""
                  } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="w-full max-w-[240px] h-[1px] bg-white/10 my-4" />

          <div className="flex flex-col items-center gap-6 w-full">
            {/* Theme & Cart Row */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                <span className="text-[10px] font-bold tracking-widest uppercase">THEME</span>
              </button>

              <button className="relative text-white hover:text-primary transition-colors flex flex-col items-center gap-2">
                <ShoppingCart size={24} strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  0
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase">CART</span>
              </button>
            </div>

            <button className="flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase">
              <MapPin size={18} />
              <span>FIND A FLAME</span>
            </button>

            <button className="bg-primary text-white w-full max-w-[240px] py-4 font-black tracking-[2px] uppercase text-[15px] hover:bg-white hover:text-black transition-all shadow-lg shadow-primary/20">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
