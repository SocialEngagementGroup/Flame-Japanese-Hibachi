"use client";

import React from "react";

const features = [
  {
    title: "100% HALAL",
    description: "Every plate is served with stringent Halal standards.",
    icon: "/icons/halalfood.svg",
    isPrimary: true,
  },
  {
    title: "FRESH DAILY PREP",
    description: "Every plate is cooked fresh when you order.",
    icon: "/icons/flame.svg",
    isPrimary: false,
  },
  {
    title: "READY IN MINUTES",
    description: "Every plate is served hot in just a few minutes.",
    icon: "/icons/thunder.svg",
    isPrimary: false,
  },
  {
    title: "IN HOUSE SAUCE",
    description: "Every plate is served with our unique in-house sauces.",
    icon: "/icons/food.svg",
    isPrimary: false,
  },
];

const FlameDifference = () => {
  return (
    <section className="w-full bg-black py-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-serif text-[28px] md:text-[36px] font-black uppercase tracking-[1px] text-center mb-16">
          <span className="text-white">THE </span>
          <span className="text-primary">FLAME </span>
          <span className="text-white">DIFFERENCE</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center p-10 transition-all duration-300 border border-white/5 ${
                feature.isPrimary ? "bg-primary" : "bg-[#111111] hover:bg-[#1a1a1a]"
              }`}
            >
              <img 
                src={feature.icon}
                alt={feature.title}
                className="w-[126px] h-[120px] object-contain mb-6"
              />
              <h3 className="text-white font-serif text-[24px] font-black uppercase tracking-[1px] mb-4">
                {feature.title}
              </h3>
              <p className={`text-[18px] leading-relaxed max-w-[280px] ${
                feature.isPrimary ? "text-white/90" : "text-gray-400"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlameDifference;
