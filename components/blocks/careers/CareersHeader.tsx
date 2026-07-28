import React from "react";
import Image from "next/image";

/**
 * Compact, image-backed page header for /careers. Replaces the full-screen
 * autoplaying hero - same brand energy, no video. Copy is intentionally
 * location-agnostic so it reads the same however the brand grows.
 */
const CareersHeader = () => (
  <section className="relative w-full overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image
        src="/homepage/hero/hero-bg-desk.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      {/* Warm brand wash + darken so white type stays legible on any frame */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40 z-10" />
    </div>

    <div className="relative z-20 max-w-[1430px] mx-auto px-[var(--space-lg)] py-[var(--space-2xl)]">
      <p className="hero-paragraph mb-[var(--space-sm)]">Careers</p>

      <h1 className="heading-h1 mb-[var(--space-md)]">
        COME WORK <br className="hidden sm:block" />
        <span className="text-primary">WITH FLAME.</span>
      </h1>

      <p className="max-w-[680px] text-white/85 text-body leading-relaxed text-center min-[1100px]:text-left mx-auto min-[1100px]:mx-0">
        From the teppan grill to the catering van to the corner office - build a
        career with a team that cooks fresh, moves fast and promotes from within.
        Find the role that fits you below.
      </p>
    </div>
  </section>
);

export default CareersHeader;
