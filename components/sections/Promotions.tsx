"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promos = [
  {
    name: "LUNCH RUSH BOX",
    description: "$12.99",
    image: "/hero-bg.png",
  },
  {
    name: "DOUBLE FLAME POINTS",
    description: "EARN 2X POINTS",
    image: "/hero-bg.png",
  },
  {
    name: "STUDENT DISCOUNT",
    description: "15% OFF",
    image: "/hero-bg.png",
  },
];

const Promotions = () => {
  return (
    <section className="w-full bg-black py-[var(--space-2xl)] px-[var(--space-lg)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-[var(--space-xl)] gap-6">
          <h2 className="heading-h3 text-center md:text-left">
            <span className="text-white">FLAME MONTHLY </span>
            <span className="text-primary">PROMOTIONS</span>
          </h2>
          
          <div className="flex gap-2">
            <button className="bg-[#111111] hover:bg-primary text-white p-3 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="bg-[#111111] hover:bg-primary text-white p-3 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[var(--gap-md)]">
          {promos.map((promo, index) => (
            <div key={index} className="group relative aspect-[378.67/278] overflow-hidden bg-zinc-900">
              <img
                src={promo.image}
                alt={promo.name}
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-[var(--font-h4)] font-black uppercase leading-tight mb-2">
                  {promo.name}
                </h3>
                <p className="text-primary font-black text-[var(--font-small)]">
                  {promo.description}
                </p>
                
                <div className="mt-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href="/promotions" className="text-white text-[12px] font-bold underline uppercase tracking-widest">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
