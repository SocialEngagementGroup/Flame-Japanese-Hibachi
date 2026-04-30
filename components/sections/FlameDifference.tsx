"use client";

import React from "react";

const features = [
  {
    title: "100% HALAL",
    description: "Every plate is served with stringent Halal standards.",
    icon: "/homepage/difference/halalfood.svg",
    isPrimary: true,
  },
  {
    title: "FRESH DAILY PREP",
    description: "Every plate is cooked fresh when you order.",
    icon: "/homepage/difference/flame.svg",
    isPrimary: false,
  },
  {
    title: "READY IN MINUTES",
    description: "Every plate is served hot in just a few minutes.",
    icon: "/homepage/difference/thunder.svg",
    isPrimary: false,
  },
  {
    title: "IN HOUSE SAUCE",
    description: "Every plate is served with our unique in-house sauces.",
    icon: "/homepage/difference/food.svg",
    isPrimary: false,
  },
];

const FlameDifference = () => {
  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-black py-5 md:py-20 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-[1806px] mx-auto">
        <h3 className="heading-h3 text-center mb-7 md:mb-16">
          <span className="text-black dark:text-white transition-colors duration-300">THE </span>
          <span className="text-primary">FLAME </span>
          <span className="text-black dark:text-white transition-colors duration-300">DIFFERENCE</span>
        </h3>

        <div className="grid grid-cols-2 min-[1100px]:grid-cols-4 gap-3 md:gap-5 w-full">
          {features.map((feature, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={index}
                className={`group flex flex-col items-center justify-center text-center p-4 md:p-10 transition-all duration-300 border w-full aspect-[3/4] min-[1100px]:aspect-[281/375] ${
                  isFirst
                    ? "bg-primary border-primary"
                    : "bg-[#EBEBEB] dark:bg-[#131313] border-transparent dark:border-white/5 hover:bg-primary dark:hover:bg-primary"
                }`}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className={`w-[60px] h-[60px] md:w-[126px] md:h-[120px] object-contain mb-4 md:mb-5 transition-all duration-300 ${
                    isFirst ? "![filter:brightness(0)_invert(1)]" : "group-hover:![filter:brightness(0)_invert(1)]"
                  }`}
                />
                <h4 className={`heading-h4 mb-2 md:mb-4 min-h-[36px] md:min-h-[64px] flex items-center text-center transition-colors duration-300 ${
                  isFirst ? "text-white" : "text-[#1C1B1B] dark:text-white group-hover:!text-white"
                }`}>
                  {feature.title}
                </h4>
                <p className={`box-description max-w-[240px] transition-colors duration-300 ${
                  isFirst ? "text-white/90" : "text-[#717171] dark:text-gray-400 group-hover:!text-white/90"
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlameDifference;
