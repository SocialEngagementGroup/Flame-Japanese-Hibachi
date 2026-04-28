"use client";

import React from "react";
import Link from "next/link";

const categories = [
  { name: "BUILD YOUR OWN PLATTER", href: "/menu/platter" },
  { name: "HIBACHI", href: "/menu/hibachi" },
  { name: "FLAME COMBO", href: "/menu/combo" },
  { name: "BENTO", href: "/menu/bento" },
  { name: "SUSHI", href: "/menu/sushi" },
  { name: "WINGS / TENDERS", href: "/menu/wings" },
  { name: "FLAME LOADED FRIES", href: "/menu/fries" },
  { name: "BOBA TEA / SMOOTHIES / DRINKS", href: "/menu/drinks" },
  { name: "ADD ONS", href: "/menu/addons" },
];

const MenuGrid = () => {
  return (
    <section className="w-full bg-black py-10 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="font-serif text-[24px] md:text-[32px] font-black uppercase tracking-[1px]">
            <span className="text-white">FLAME JAPANESE </span>
            <span className="text-primary">MENU</span>
          </h2>
          
          <Link 
            href="/menu" 
            className="text-white text-[11px] font-bold uppercase tracking-[2px] border-b border-white pb-1 hover:text-primary hover:border-primary transition-all"
          >
            VIEW FULL MENU
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href={cat.href}
              className="group relative aspect-[378.67/278] overflow-hidden bg-zinc-900"
            >
              {/* Background Image (Placeholder for now) */}
              <img
                src="/hero-bg.png"
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              
              {/* Text Overlay Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="relative z-10">
                  <h3 className="text-white font-serif text-[18px] md:text-[22px] font-black leading-tight uppercase tracking-[1px] drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>
                
                {/* Subtle corner accent like in the mockup */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 -translate-x-12 translate-y-12 rotate-45 pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuGrid;
