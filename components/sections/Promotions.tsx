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
    <section className="w-full bg-black py-5 md:py-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-7 md:mb-16">
          <h2 className="font-serif text-[28px] md:text-[36px] font-black uppercase tracking-[1px]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <div key={index} className="group relative aspect-[378.67/278] overflow-hidden bg-zinc-900">
              <img
                src={promo.image}
                alt={promo.name}
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-[20px] font-black uppercase leading-tight mb-2">
                  {promo.name}
                </h3>
                <p className="text-primary font-black text-[14px]">
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
