"use client";

import React from "react";
import { ORDER_URL } from "@/lib/constants";

type HeroProps = {
  tagline?: React.ReactNode;
  title?: React.ReactNode;
  ctaLabel?: string | null;
  ctaHref?: string;
  align?: "left" | "center";
  fullHeight?: boolean;
  bgImageDesk?: string;
  bgImageMob?: string;
};

const Hero = ({
  tagline = "SIZZLING PERFECTION, EVERY TIME.",
  title = (
    <>
      IGNITE YOUR <br />
      <span className="text-white">SENSES.</span>
    </>
  ),
  ctaLabel = "ORDER NOW",
  ctaHref = ORDER_URL,
  align = "left",
  fullHeight = true,
  bgImageDesk = "/homepage/hero/hero-bg-desk.png",
  bgImageMob = "/homepage/hero/hero-bg-mob.png",
}: HeroProps) => {
  const alignmentClass =
    align === "center"
      ? "items-center mx-auto text-center max-w-none"
      : "items-center lg:items-start mx-auto lg:mx-0 max-w-[65ch]";

  const sizingClass = fullHeight
    ? "flex-1 min-h-[320px]"
    : "min-h-[380px] md:min-h-[460px] py-[var(--space-2xl)]";

  return (
    <section className={`relative ${sizingClass} w-full overflow-hidden flex items-center`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageDesk}
          alt="Flame Japanese Hibachi Hero"
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src={bgImageMob}
          alt="Flame Japanese Hibachi Hero Mobile"
          className="block md:hidden w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-[var(--space-lg)]">
        <div className={`flex flex-col ${alignmentClass}`}>
          <p
            className={`hero-paragraph mb-[var(--space-sm)] ${
              align === "center" ? "!text-center" : ""
            }`}
          >
            {tagline}
          </p>

          <h1
            className={`heading-h1 mb-[var(--space-xl)] ${
              align === "center" ? "!text-center" : ""
            }`}
          >
            {title}
          </h1>

          {ctaLabel && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>

    </section>
  );
};

export default Hero;
