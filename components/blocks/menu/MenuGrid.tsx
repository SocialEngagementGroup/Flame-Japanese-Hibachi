"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useOrderUrl } from "@/lib/geo/useOrderUrl";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

type MenuCategory = {
  name: string;
  href: string;
  image: string;
  mobileImage?: string;
  external?: boolean;
};

const staticCategorySections: {
  name: string;
  section: string;
  image: string;
  mobileImage?: string;
}[] = [
  {
    name: "HIBACHI",
    section: "section-hibachi",
    image: "/homepage/menu/HIBACHI.png",
    mobileImage: "/homepage/menu/hibachi-mobile.png",
  },
  {
    name: "FLAME COMBO",
    section: "section-combo",
    image: "/homepage/menu/FLAME COMBO.png",
    mobileImage: "/homepage/menu/flame-combo-mobile.png",
  },
  {
    name: "BENTO",
    section: "section-bento",
    image: "/homepage/menu/BENTO.png",
    mobileImage: "/homepage/menu/bento-mobile.png",
  },
  {
    name: "SUSHI",
    section: "section-sushi",
    image: "/homepage/menu/SUSHI.png",
    mobileImage: "/homepage/menu/sushi-mobile.png",
  },
  {
    name: "WINGS/TENDERS",
    section: "section-wings",
    image: "/homepage/menu/WINGS  TENDERS.png",
    mobileImage: "/homepage/menu/wings-tenders-mobile.png",
  },
  {
    name: "FLAME LOADED FRIES",
    section: "section-fries",
    image: "/homepage/menu/FLAME LOADED FRIES.png",
  },
  {
    name: "BOBA TEA/SMOOTHIES",
    section: "section-boba",
    image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
  },
  {
    name: "ADD ONS/APPETIZER",
    section: "section-addons",
    image: "/homepage/menu/ADD ONS.png",
  },
];

const cardClassName =
  "group relative aspect-[275.67/280] md:aspect-[378.67/278] overflow-hidden bg-card";

const MenuGrid = () => {
  const orderUrl = useOrderUrl();
  const { nearest } = useNearestLocation();
  // Route straight to the visitor's known location page when we have one, so
  // the tap skips the edge proxy's location-detection redirect entirely.
  const menuBase = nearest ? `/menu/${nearest.slug}` : "/menu";
  const categories: MenuCategory[] = [
    {
      name: "BUILD YOUR OWN PLATTER",
      href: orderUrl,
      external: true,
      image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
      mobileImage: "/homepage/menu/build-your-own-platter-mobile.png",
    },
    ...staticCategorySections.map((cat) => ({
      name: cat.name,
      href: `${menuBase}#${cat.section}`,
      image: cat.image,
      mobileImage: cat.mobileImage,
    })),
  ];

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
            href={orderUrl}
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
                {cat.mobileImage ? (
                  <>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="33vw"
                      className="hidden md:block object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
                    />
                    <Image
                      src={cat.mobileImage}
                      alt={cat.name}
                      fill
                      sizes="33vw"
                      className="block md:hidden object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
                    />
                  </>
                ) : (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
                  />
                )}

                {/* Default gradient overlay for resting readability - fades out on hover */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1/2 transition-opacity duration-500 z-10 opacity-100 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.45) 45%, #000 100%)",
                  }}
                />

                {/* Orange bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF7808] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-50" />

                {/* Label band - hugs the text with equal top/bottom padding; turns orange on hover */}
                <div className="absolute bottom-0 left-0 w-full flex items-center justify-center md:justify-start px-2 md:px-[var(--space-lg)] py-5 md:py-6 z-30 transition-colors duration-500 group-hover:bg-[#FF7808]">
                  <div className="heading-h4 text-white text-center md:text-left scale-[0.8] md:scale-100 break-words [overflow-wrap:anywhere] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)] group-hover:[text-shadow:none]">
                    {/* Allow long slash-joined names (e.g. BOBA TEA/SMOOTHIES) to wrap at the slash on narrow mobile cards */}
                    {cat.name.replace(/\//g, "/​")}
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
