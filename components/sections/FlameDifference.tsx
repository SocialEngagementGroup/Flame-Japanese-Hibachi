"use client";

import React from "react";

const features = [
  {
    title: "100% HALAL",
    description: "Every plate is served with stringent Halal standards.",
    icon: "/homepage/difference/halal.webm",
  },
  {
    title: "FRESH DAILY PREP",
    description: "Every plate is cooked fresh when you order.",
    icon: "/homepage/difference/fire.webm",
  },
  {
    title: "READY IN MINUTES",
    description: "Every plate is served hot in just a few minutes.",
    icon: "/homepage/difference/bolt1.webm",
  },
  {
    title: "IN HOUSE SAUCE",
    description: "Every plate is served with our unique in-house sauces.",
    icon: "/homepage/difference/sauce.webm",
  },
];

const FlameDifference = () => {
  return (
    <section className="w-full max-w-[1980px] mx-auto bg-white dark:bg-black py-10 md:py-[var(--space-2xl)] px-4 md:px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1806px] mx-auto">
        <h3 className="heading-h3 text-center mb-8 md:mb-[var(--space-xl)]">
          <span className="text-black dark:text-white">THE </span>
          <span className="text-primary">FLAME </span>
          <span className="text-black dark:text-white">DIFFERENCE</span>
        </h3>

        <div className="grid grid-cols-2 min-[1100px]:grid-cols-4 gap-3 md:gap-[var(--gap-sm)] w-full">
          {features.map((feature, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={index}
                className="
                  group
                  flex flex-col items-center text-center
                  bg-[#EBEBEB] dark:bg-[#131313]
                  border border-transparent dark:border-white/5
                  hover:bg-primary dark:hover:bg-primary
                  transition-all duration-300

                  px-3 py-5
                  min-h-[245px]
                  overflow-hidden

                  sm:min-h-[270px]
                  md:min-h-[320px]
                  md:px-[var(--space-lg)] md:py-8

                  min-[1100px]:aspect-[281/375]
                  min-[1100px]:min-h-0
                  min-[1100px]:justify-center
                "
              >
                <video
                  src={feature.icon}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`
                    object-contain
                    w-[72px] h-[72px]
                    sm:w-[90px] sm:h-[90px]
                    md:w-[126px] md:h-[120px]
                    mb-4
                    transition-all duration-300
                    ${isFirst
                      ? "[filter:invert(48%)_sepia(94%)_saturate(2682%)_hue-rotate(2deg)_brightness(103%)_contrast(103%)] group-hover:![filter:brightness(0)_invert(1)]"
                      : "group-hover:![filter:brightness(0)_invert(1)]"
                    }
                  `}
                />

                <h4
                  className="
                    text-[#1C1B1B] dark:text-white group-hover:!text-white
                    transition-colors duration-300
                    font-extrabold
                    text-[16px] leading-[1.15]
                    sm:text-[18px]
                    md:text-[24px]
                    mb-3
                    max-w-[150px]
                    md:max-w-[240px]
                  "
                >
                  {feature.title}
                </h4>

                <p
                  className="
                    text-[#717171] dark:text-gray-400 group-hover:!text-white/90
                    transition-colors duration-300
                    text-[15px] leading-[1.45]
                    sm:text-[16px]
                    md:text-[22px]
                    max-w-[145px]
                    sm:max-w-[170px]
                    md:max-w-[240px]
                  "
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