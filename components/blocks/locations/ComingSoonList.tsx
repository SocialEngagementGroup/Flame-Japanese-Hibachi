"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ComingSoonLocation } from "@/lib/types";

type ComingSoonListProps = {
  locations: ComingSoonLocation[];
  maxHeightClass: string;
  gapClass: string;
  paddingClass: string;
  /** Mobile wraps the OPEN UNTIL / distance line; desktop keeps it on one row. */
  wrap?: boolean;
};

const ITEM_FOCUS_MS = 550;

/**
 * Coming-soon list with a one-time "magnifying glass" scroll hint: the first
 * time it enters the viewport, it auto-scrolls through each location —
 * briefly enlarging/bolding the one in focus — then eases back to the top.
 * Purely a hint: nothing here disables the user's own scrolling, before,
 * during, or after.
 */
const ComingSoonList = ({
  locations,
  maxHeightClass,
  gapClass,
  paddingClass,
  wrap = false,
}: ComingSoonListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasPlayedRef = useRef(false);
  const [magnifiedIndex, setMagnifiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || locations.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const playScrollHint = async () => {
      for (let i = 0; i < locations.length; i++) {
        setMagnifiedIndex(i);
        itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        await wait(ITEM_FOCUS_MS);
      }
      setMagnifiedIndex(null);
      container.scrollTo({ top: 0, behavior: "smooth" });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          observer.disconnect();
          void playScrollHint();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, [locations]);

  return (
    <div
      ref={containerRef}
      className={`${gapClass} ${maxHeightClass} overflow-y-auto overflow-x-hidden ${paddingClass} scrollbar-hide`}
    >
      {locations.map((loc, index) => (
        <div
          key={loc.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className={`border-b border-black/10 dark:border-white/10 pb-4 origin-left transition-transform duration-500 ease-out will-change-transform ${
            magnifiedIndex === index ? "scale-[1.05] relative z-10" : "scale-100"
          }`}
        >
          <h3
            className={`heading-h4 mb-1 uppercase transition-colors duration-500 ${
              magnifiedIndex === index ? "text-primary" : "text-black dark:text-white"
            }`}
          >
            {loc.name}
          </h3>
          <p
            className={`text-small mb-2 transition-all duration-500 ${
              magnifiedIndex === index
                ? "font-bold text-gray-800 dark:text-gray-300"
                : "font-medium text-gray-600 dark:text-gray-500"
            }`}
          >
            {loc.address}
          </p>
          <div className={`flex items-center gap-4 ${wrap ? "flex-wrap" : ""}`}>
            <span className="text-primary text-small font-bold uppercase tracking-widest font-sans">
              OPEN UNTIL {loc.openUntil}
            </span>
            <span className="text-gray-400 dark:text-gray-600 text-small font-bold uppercase tracking-widest transition-colors duration-300 font-sans">
              {loc.distance}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComingSoonList;
