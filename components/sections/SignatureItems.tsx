"use client";

import React from "react";
import Link from "next/link";

const items = [
  {
    name: "CHICKEN BEEF & SHRIMP FLAME COMBO",
    price: "$24.99",
    image: "/hero-bg.png",
  },
  {
    name: "SALMON AND SHRIMP FLAME COMBO",
    price: "$21.99",
    image: "/hero-bg.png",
  },
  {
    name: "CHICKEN HIBACHI",
    price: "$15.99",
    image: "/hero-bg.png",
  },
];

const SignatureItems = () => {
  return (
    <section className="w-full bg-black py-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-serif text-[28px] md:text-[36px] font-black uppercase tracking-[1px] text-center mb-16">
          <span className="text-white">MOST LOVED FLAME </span>
          <span className="text-primary">SIGNATURE ITEMS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-zinc-900 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-white font-serif text-[16px] font-black uppercase tracking-[1px] leading-tight mb-2">
                {item.name}
              </h3>
              <p className="text-primary font-serif font-black text-[14px]">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
