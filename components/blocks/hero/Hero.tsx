"use client";

import React from "react";
import { ORDER_URL } from "@/lib/constants";

type HeroProps = {
  tagline?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
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
  description,
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
      : "items-center min-[1100px]:items-start mx-auto min-[1100px]:mx-0 max-w-[65ch]";

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
            className={`heading-h1 ${
              description ? "mb-[var(--space-md)]" : "mb-[var(--space-xl)]"
            } ${align === "center" ? "!text-center" : ""}`}
          >
            {title}
          </h1>

          {description && (
            <p className="w-full max-w-[779px] min-h-[192px] flex flex-col justify-center text-white text-center font-raleway text-[16px] font-semibold leading-[25px] tracking-[3px] uppercase mb-[var(--space-xl)]">
              {description}
            </p>
          )}

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
