"use client";

import React from "react";

const features: {
  title: React.ReactNode;
  description: string;
  icon: string;
}[] = [
  {
    title: (
      <>
        100%<br className="md:hidden" /> HALAL
      </>
    ),
    description: "Every plate is served with strict Halal standards.",
    icon: "/homepage/difference/halal.webm",
  },
  {
    title: "FRESH DAILY PREP",
    description: "Every plate is cooked fresh when you order.",
    icon: "/homepage/difference/fire.webm",
  },
  {
    title: "READY IN MINUTES",
    description: "Every plate is served piping hot in minutes.",
    icon: "/homepage/difference/bolt1.webm",
  },
  {
    title: "IN HOUSE SAUCE",
    description: "Every plate is paired with our in-house sauces.",
    icon: "/homepage/difference/sauce.webm",
  },
];

const FlameDifference = () => {
  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
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
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center px-4 py-8 md:p-[var(--space-lg)] border w-full min-h-[380px] md:min-h-[480px] min-[1100px]:min-h-[520px] bg-[#EBEBEB] dark:bg-[#131313] border-transparent dark:border-white/5"
            >
              {/* Icon — fixed frame so the headline below sits at the same line on every card */}
              <div className="w-[clamp(80px,24vw,120px)] h-[clamp(80px,24vw,120px)] md:w-[clamp(160px,20vw,260px)] md:h-[clamp(160px,20vw,260px)] flex items-center justify-center mb-3 md:mb-[var(--space-md)]">
                <video
                  src={feature.icon}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <h4 className="heading-h4 mb-2 md:mb-4 min-h-[2.4em] flex items-center justify-center leading-[1.2] text-[#1C1B1B] dark:text-white px-1">
                {feature.title}
              </h4>

              <p className="box-description max-w-[240px] text-[#717171] dark:text-gray-400">
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