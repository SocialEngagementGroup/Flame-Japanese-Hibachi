"use client";

import React from "react";
import Image from "next/image";
import { useOrderUrl } from "@/lib/geo/useOrderUrl";

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
  /** Still frame shown while the video buffers — on a slow connection this is
   * what the visitor actually looks at first, so it wants to be small. Unlike
   * bgImageDesk it can't go through next/image (the <video> poster attribute
   * takes a plain URL), so pass a pre-optimized file. Defaults to bgImageDesk. */
  posterSrc?: string;
  /** Pass null to opt out of the default homepage hero video — pages that only
   * want a still background must do this, or they inherit a 26 MB autoplaying
   * MP4 they never asked for. */
  bgVideo?: string | null;
  heightClass?: string;
};

/** Every hero .mp4 in public/ ships alongside a `-hevc.mp4` sibling encoded for
 * Apple devices. If one is ever missing the browser just skips that <source>
 * and uses the H.264 file, so this stays safe by default. */
const toHevcSrc = (src: string) => src.replace(/\.mp4$/, "-hevc.mp4");

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
  ctaHref,
  align = "left",
  fullHeight = true,
  bgImageDesk = "/homepage/hero/hero-bg-desk.png",
  bgImageMob = "/homepage/hero/hero-bg-mob.png",
  posterSrc,
  bgVideo = "/homepage/hero/flame-japanese-hibachi-hero.mp4",
  heightClass,
}: HeroProps) => {
  const orderUrl = useOrderUrl();
  const resolvedCtaHref = ctaHref ?? orderUrl;

  const alignmentClass =
    align === "center"
      ? "items-center mx-auto text-center max-w-none"
      : "items-center min-[1100px]:items-start mx-auto min-[1100px]:mx-0 max-w-[65ch]";

  const sizingClass =
    heightClass ??
    (fullHeight
      ? "flex-1 min-h-[320px]"
      : "min-h-[380px] md:min-h-[460px] py-[var(--space-2xl)]");

  return (
    <section className={`relative ${sizingClass} w-full overflow-hidden flex items-center`}>
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {bgVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc ?? bgImageDesk}
          >
            {/* Safari/iOS is the only engine that decodes HEVC, and it picks
                the first source it can play — so Apple devices get the much
                smaller HEVC file and everyone else falls through to H.264.
                This is what fixes the long black hero on iPhones/Macs. */}
            <source
              src={toHevcSrc(bgVideo)}
              type='video/mp4; codecs="hvc1"'
            />
            <source src={bgVideo} type="video/mp4" />
          </video>
        ) : (
          <>
            {/* Both variants stay in the DOM (CSS decides which is visible),
                so `sizes` is what stops the hidden one from being downloaded
                at full width: below md the desktop image resolves to the
                smallest generated variant instead of a full-bleed one, and
                vice versa. Without this both heroes download in full. */}
            <Image
              src={bgImageDesk}
              alt="Flame Japanese Hibachi Hero"
              fill
              sizes="(max-width: 767px) 16px, 100vw"
              priority
              className="hidden md:block object-cover"
            />
            <Image
              src={bgImageMob}
              alt="Flame Japanese Hibachi Hero Mobile"
              fill
              sizes="(max-width: 767px) 100vw, 16px"
              priority
              className="block md:hidden object-cover"
            />
          </>
        )}
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
              href={resolvedCtaHref}
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
