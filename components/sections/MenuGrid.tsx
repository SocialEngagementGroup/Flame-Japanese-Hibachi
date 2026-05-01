"use client";

import React from "react";
import Link from "next/link";

const categories = [
  {
    name: "BUILD YOUR OWN PLATTER",
    href: "/menu/platter",
    image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
    mobileImage: "/homepage/menu/build-your-own-platter-mobile.png",
  },
  {
    name: "HIBACHI",
    href: "/menu/hibachi",
    image: "/homepage/menu/HIBACHI.png",
    mobileImage: "/homepage/menu/hibachi-mobile.png",
  },
  {
    name: "FLAME COMBO",
    href: "/menu/combo",
    image: "/homepage/menu/FLAME COMBO.png",
    mobileImage: "/homepage/menu/flame-combo-mobile.png",
  },
  {
    name: "BENTO",
    href: "/menu/bento",
    image: "/homepage/menu/BENTO.png",
    mobileImage: "/homepage/menu/bento-mobile.png",
  },
  {
    name: "SUSHI",
    href: "/menu/sushi",
    image: "/homepage/menu/SUSHI.png",
    mobileImage: "/homepage/menu/sushi-mobile.png",
  },
  {
    name: "WINGS / TENDERS",
    href: "/menu/wings",
    image: "/homepage/menu/WINGS  TENDERS.png",
    mobileImage: "/homepage/menu/wings-tenders-mobile.png",
  },
  {
    name: "FLAME LOADED FRIES",
    href: "/menu/fries",
    image: "/homepage/menu/FLAME LOADED FRIES.png",
  },
  {
    name: "BOBA TEA / SMOOTHIES / DRINKS",
    href: "/menu/drinks",
    image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
  },
  {
    name: "ADD ONS",
    href: "/menu/addons",
    image: "/homepage/menu/ADD ONS.png",
  },
];

const MenuGrid = () => {
  return (
    <section className="w-full max-w-[1980px] mx-auto bg-background py-[var(--space-lg)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto">

        {/* Header */}
        <div className="flex justify-center md:justify-between items-center mb-[var(--space-xl)] gap-4">
          <h3 className="heading-h3 text-center md:text-left w-full md:w-auto">
            <span className="text-foreground transition-colors duration-300">FLAME JAPANESE </span>
            <span className="text-primary transition-colors duration-300">MENU</span>
          </h3>

          <Link
            href="/menu"
            className="hidden md:block text-foreground text-[11px] font-bold uppercase tracking-[2px] border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all whitespace-nowrap"
          >
            VIEW FULL MENU
          </Link>
        </div>

        {/* Grid - Fixed 3 columns with standardized gap */}
        <div className="grid grid-cols-3 gap-[var(--gap-sm)]">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className="group relative aspect-[275.67/280] md:aspect-[378.67/278] overflow-hidden bg-card"
            >
              {/* Responsive image: mobile-specific crop on small screens */}
              <picture className="absolute inset-0 w-full h-full">
                {cat.mobileImage && (
                  <source media="(max-width: 768px)" srcSet={cat.mobileImage} />
                )}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </picture>

              {/* Text — Bottom Centered on mobile, bottom-left on desktop */}
              <div className="absolute inset-0 flex items-end justify-center md:justify-start pb-6 md:pb-[var(--space-lg)] px-2 md:px-[var(--space-lg)] bg-black/20 md:bg-transparent">
                <h4 className="heading-h4 text-white text-center md:text-left scale-[0.8] md:scale-100">
                  {cat.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuGrid;
