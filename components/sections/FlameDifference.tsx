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
    <section className="w-full max-w-[1980px] mx-auto bg-[#FFFFFF] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1806px] mx-auto">
        <h3 className="heading-h3 text-center mb-[var(--space-xl)]">
          <span className="text-black dark:text-white transition-colors duration-300">
            THE{" "}
          </span>
          <span className="text-primary">FLAME </span>
          <span className="text-black dark:text-white transition-colors duration-300">
            DIFFERENCE
          </span>
        </h3>

        <div className="grid grid-cols-2 min-[1100px]:grid-cols-4 gap-[var(--gap-sm)] w-full">
          {features.map((feature, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center text-center p-3 md:p-[var(--space-lg)] transition-all duration-300 border w-full h-full aspect-[3/4.2] min-[1100px]:aspect-[281/375] bg-[#EBEBEB] dark:bg-[#131313] border-transparent dark:border-white/5 hover:bg-primary dark:hover:bg-primary"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className={`w-[clamp(50px,10vw,120px)] h-[clamp(50px,10vw,120px)] object-contain mb-2 md:mb-[var(--space-md)] transition-all duration-300 ${isFirst
                    ? "[filter:invert(48%)_sepia(94%)_saturate(2682%)_hue-rotate(2deg)_brightness(103%)_contrast(103%)] group-hover:![filter:brightness(0)_invert(1)]"
                    : "group-hover:![filter:brightness(0)_invert(1)]"
                    }`}
                />

                <h4
                  className={`heading-h4 mb-2 md:mb-4 min-h-[36px] md:min-h-[64px] flex items-center text-center transition-colors duration-300 ${isFirst
                    ? "text-[#1C1B1B] dark:text-white group-hover:!text-white"
                    : "text-[#1C1B1B] dark:text-white group-hover:!text-white"
                    }`}
                >
                  {feature.title}
                </h4>

                <p
                  className={`box-description max-w-[240px] transition-colors duration-300 ${isFirst
                    ? "text-[#717171] dark:text-gray-400 group-hover:!text-white/90"
                    : "text-[#717171] dark:text-gray-400 group-hover:!text-white/90"
                    }`}
                >
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