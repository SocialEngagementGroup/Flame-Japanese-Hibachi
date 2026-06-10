"use client";

import React from "react";
import Link from "next/link";
import { ORDER_URL } from "@/lib/constants";

const categories = [
  {
    name: "BUILD YOUR OWN PLATTER",
    href: ORDER_URL,
    external: true,
    image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
    mobileImage: "/homepage/menu/build-your-own-platter-mobile.png",
  },
  {
    name: "HIBACHI",
    href: "/menu#section-hibachi",
    image: "/homepage/menu/HIBACHI.png",
    mobileImage: "/homepage/menu/hibachi-mobile.png",
  },
  {
    name: "FLAME COMBO",
    href: "/menu#section-combo",
    image: "/homepage/menu/FLAME COMBO.png",
    mobileImage: "/homepage/menu/flame-combo-mobile.png",
  },
  {
    name: "BENTO",
    href: "/menu#section-bento",
    image: "/homepage/menu/BENTO.png",
    mobileImage: "/homepage/menu/bento-mobile.png",
  },
  {
    name: "SUSHI",
    href: "/menu#section-sushi",
    image: "/homepage/menu/SUSHI.png",
    mobileImage: "/homepage/menu/sushi-mobile.png",
  },
  {
    name: "WINGS/TENDERS",
    href: "/menu#section-wings",
    image: "/homepage/menu/WINGS  TENDERS.png",
    mobileImage: "/homepage/menu/wings-tenders-mobile.png",
  },
  {
    name: "FLAME LOADED FRIES",
    href: "/menu#section-fries",
    image: "/homepage/menu/FLAME LOADED FRIES.png",
  },
  {
    name: "BOBA TEA/SMOOTHIES",
    href: "/menu#section-boba",
    image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
  },
  {
    name: "ADD ONS/APPETIZER",
    href: "/menu#section-addons",
    image: "/homepage/menu/ADD ONS.png",
  },
];

const cardClassName =
  "group relative aspect-[275.67/280] md:aspect-[378.67/278] overflow-hidden bg-card";

const MenuGrid = () => {
  return (
    <section className="w-full bg-background py-[var(--space-lg)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto">

        {/* Header */}
        <div className="flex justify-center md:justify-between items-center mb-[var(--space-xl)] gap-4">
          <div className="heading-h3 text-center md:text-left w-full md:w-auto">
            <span className="text-foreground transition-colors duration-300">FLAME JAPANESE </span>
            <span className="text-primary transition-colors duration-300">MENU</span>
          </div>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-foreground text-small font-bold uppercase tracking-[2px] border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all whitespace-nowrap"
          >
            VIEW FULL MENU
          </a>
        </div>

        {/* Grid - Fixed 3 columns with standardized gap */}
        <div className="grid grid-cols-3 gap-[var(--gap-sm)]">
          {categories.map((cat, index) => {
            const inner = (
              <>
                {/* Responsive image: mobile-specific crop on small screens. Zooms on hover. */}
                <picture className="absolute inset-0 w-full h-full z-0">
                  {cat.mobileImage && (
                    <source media="(max-width: 768px)" srcSet={cat.mobileImage} />
                  )}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                  />
                </picture>

                {/* Default gradient overlay for resting readability — fades out on hover */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1/2 transition-opacity duration-500 z-10 opacity-100 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.45) 45%, #000 100%)",
                  }}
                />

                {/* Orange bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF7808] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-50" />

                {/* Label band — hugs the text with equal top/bottom padding; turns orange on hover */}
                <div className="absolute bottom-0 left-0 w-full flex items-center justify-center md:justify-start px-2 md:px-[var(--space-lg)] py-5 md:py-6 z-30 transition-colors duration-500 group-hover:bg-[#FF7808]">
                  <div className="heading-h4 text-white text-center md:text-left scale-[0.8] md:scale-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)] group-hover:[text-shadow:none]">
                    {cat.name}
                  </div>
                </div>
              </>
            );

            return cat.external ? (
              <a
                key={index}
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {inner}
              </a>
            ) : (
              <Link key={index} href={cat.href} className={cardClassName}>
                {inner}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MenuGrid;
