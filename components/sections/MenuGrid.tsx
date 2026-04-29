"use client";

import React from "react";
import Link from "next/link";

const categories = [
  {
    name: "BUILD YOUR OWN PLATTER",
    href: "/menu/platter",
    image: "/BG/Homepage-menu/BUILD YOUR OWN PLATTER.png",
    mobileImage: "/BG/Homepage-menu/build-your-own-platter-mobile.png",
  },
  {
    name: "HIBACHI",
    href: "/menu/hibachi",
    image: "/BG/Homepage-menu/HIBACHI.png",
    mobileImage: "/BG/Homepage-menu/hibachi-mobile.png",
  },
  {
    name: "FLAME COMBO",
    href: "/menu/combo",
    image: "/BG/Homepage-menu/FLAME COMBO.png",
    mobileImage: "/BG/Homepage-menu/flame-combo-mobile.png",
  },
  {
    name: "BENTO",
    href: "/menu/bento",
    image: "/BG/Homepage-menu/BENTO.png",
    mobileImage: "/BG/Homepage-menu/bento-mobile.png",
  },
  {
    name: "SUSHI",
    href: "/menu/sushi",
    image: "/BG/Homepage-menu/SUSHI.png",
    mobileImage: "/BG/Homepage-menu/sushi-mobile.png",
  },
  {
    name: "WINGS / TENDERS",
    href: "/menu/wings",
    image: "/BG/Homepage-menu/WINGS  TENDERS.png",
    mobileImage: "/BG/Homepage-menu/wings-tenders-mobile.png",
  },
  {
    name: "FLAME LOADED FRIES",
    href: "/menu/fries",
    image: "/BG/Homepage-menu/FLAME LOADED FRIES.png",
  },
  {
    name: "BOBA TEA / SMOOTHIES / DRINKS",
    href: "/menu/drinks",
    image: "/BG/Homepage-menu/BOBA TEA  SMOOTHIES  Drinks.png",
  },
  {
    name: "ADD ONS",
    href: "/menu/addons",
    image: "/BG/Homepage-menu/ADD ONS.png",
  },
];

const MenuGrid = () => {
  return (
    <section className="w-full bg-background py-10 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-[1806px] mx-auto">

        {/* Header */}
        <div className="flex justify-center md:justify-between items-center mb-6 gap-4">
          <h2 className="font-serif text-[24px] md:text-[48px] font-black uppercase tracking-[1px] leading-none text-center md:text-left w-full md:w-auto">
            <span className="text-foreground transition-colors duration-300">FLAME JAPANESE </span>
            <span className="text-primary transition-colors duration-300">MENU</span>
          </h2>

          <Link
            href="/menu"
            className="hidden md:block text-foreground text-[11px] font-bold uppercase tracking-[2px] border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all whitespace-nowrap"
          >
            VIEW FULL MENU
          </Link>
        </div>

        {/* Grid - 3 cols, aspect ratio 378.67×278 */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-3">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className="group relative aspect-[378.67/278] overflow-hidden bg-card"
            >
              {/* Responsive image: mobile-specific crop on small screens */}
              <picture className="absolute inset-0 w-full h-full">
                {cat.mobileImage && (
                  <source media="(max-width: 768px)" srcSet={cat.mobileImage} />
                )}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>

              {/* Text — left on desktop, center on mobile */}
              <div className="absolute inset-0 flex items-end justify-center md:justify-start pb-3 md:pb-4 px-2 md:px-4">
                <h3 className="text-white font-serif text-[15px] md:text-[24px] font-black uppercase tracking-[0.5px] leading-tight text-center md:text-left">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuGrid;
