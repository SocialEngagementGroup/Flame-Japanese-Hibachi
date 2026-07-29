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
  /** Still frame shown while the video buffers - on a slow connection this is
   * what the visitor actually looks at first, so it wants to be small. Unlike
   * bgImageDesk it can't go through next/image (the <video> poster attribute
   * takes a plain URL), so pass a pre-optimized file. Defaults to bgImageDesk. */
  posterSrc?: string;
  /** Pass null to opt out of the default homepage hero video - pages that only
   * want a still background must do this, or they inherit a 26 MB autoplaying
   * MP4 they never asked for. */
  bgVideo?: string | null;
  heightClass?: string;
  /** Softens the still background with a blur + a touch more darkening, the
   * way /careers subdues its header photo so the type stays legible. Only
   * affects the image branch (bgVideo={null}); ignored for the video hero. */
  blurBackground?: boolean;
};

/** Every hero .mp4 in public/ ships alongside a `-hevc.mp4` sibling encoded for
 * Apple devices. If one is ever missing the browser just skips that <source>
 * and uses the H.264 file, so this stays safe by default. */
const toHevcSrc = (src: string) => src.replace(/\.mp4$/, "-hevc.mp4");

/**
 * Decides when - and whether - the hero video should start downloading.
 *
 * An `autoPlay` <video> defaults to `preload="auto"`, so the browser pulls the
 * whole file as part of the initial page load, competing with the CSS, JS,
 * fonts and images needed to render anything at all. The hero is 7-8 MB, so on
 * anything short of fast wifi that is the page "loading slowly" - even though
 * the poster it needs to paint is only 86 KB.
 *
 * So: hold the <source> elements back until the browser is idle. The poster
 * paints immediately, then the video attaches and fades in. Nothing about the
 * design changes; it just stops blocking first paint.
 *
 * It also stays a still image entirely when playing it would be unwanted or
 * expensive: reduced-motion users, Data Saver, and 2G/slow-2G connections.
 */
function useDeferredVideo(enabled: boolean) {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType))
      return;

    const start = () => setShouldLoad(true);

    let idleId: number | undefined;
    let timerId: number | undefined;

    // Idle alone isn't enough: the main thread goes idle while the network is
    // still busy, so requestIdleCallback on its own fired ~170ms in and the
    // video went straight back to competing with the rest of the page. Wait
    // for `load` (critical resources done) and *then* for idle.
    const scheduleAfterLoad = () => {
      // The timeout is the backstop: on a busy main thread idle may never come.
      // Safari only shipped requestIdleCallback in 16.4, so fall back to a timer.
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timerId = window.setTimeout(start, 300);
      }
    };

    if (document.readyState === "complete") {
      scheduleAfterLoad();
    } else {
      window.addEventListener("load", scheduleAfterLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleAfterLoad);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [enabled]);

  return shouldLoad;
}

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
  blurBackground = false,
}: HeroProps) => {
  const orderUrl = useOrderUrl();
  const resolvedCtaHref = ctaHref ?? orderUrl;

  // In-page anchors ("#open-roles") and internal routes ("/menu") must stay in
  // the same tab - only external ordering links open in a new one. Without this
  // a hash CTA would spawn a blank tab instead of scrolling.
  const ctaIsInternal =
    resolvedCtaHref.startsWith("#") || resolvedCtaHref.startsWith("/");

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const loadVideo = useDeferredVideo(Boolean(bgVideo));

  // Adding <source> children doesn't make an already-mounted <video> fetch
  // them - it needs an explicit load(). autoPlay then takes over, since the
  // element is muted.
  React.useEffect(() => {
    if (loadVideo) videoRef.current?.load();
  }, [loadVideo]);

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
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            // Nothing is fetched until useDeferredVideo says so - see there for
            // why. Until then the poster is the hero, and it is only ~86 KB.
            preload="none"
            poster={posterSrc ?? bgImageDesk}
          >
            {loadVideo && (
              <>
                {/* Safari/iOS is the only engine that decodes HEVC, and it
                    picks the first source it can play - so Apple devices get
                    the much smaller HEVC file and everyone else falls through
                    to H.264. This is what fixes the long black hero on
                    iPhones/Macs. */}
                <source
                  src={toHevcSrc(bgVideo)}
                  type='video/mp4; codecs="hvc1"'
                />
                <source src={bgVideo} type="video/mp4" />
              </>
            )}
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
              className={`hidden md:block object-cover ${
                blurBackground ? "blur-[3px] scale-105" : ""
              }`}
            />
            <Image
              src={bgImageMob}
              alt="Flame Japanese Hibachi Hero Mobile"
              fill
              sizes="(max-width: 767px) 100vw, 16px"
              priority
              className={`block md:hidden object-cover ${
                blurBackground ? "blur-[3px] scale-105" : ""
              }`}
            />
          </>
        )}
        {/* Dark overlay to ensure text readability - a touch heavier when the
            image is blurred, since blur lifts the photo's contrast. */}
        <div
          className={`absolute inset-0 z-10 ${
            blurBackground ? "bg-black/55" : "bg-black/40"
          }`}
        />
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

          {/* The description's height comes from its text. A fixed min-height
              here used to add ~140px of empty space to every hero carrying one,
              making those pages visibly taller than the menu and catering
              heroes for no reason a reader could see. */}
          {description && (
            <p className="w-full max-w-[779px] text-white text-center font-raleway text-[16px] font-semibold leading-[25px] tracking-[3px] uppercase mb-[var(--space-xl)]">
              {description}
            </p>
          )}

          {ctaLabel && (
            <a
              href={resolvedCtaHref}
              target={ctaIsInternal ? undefined : "_blank"}
              rel={ctaIsInternal ? undefined : "noopener noreferrer"}
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
