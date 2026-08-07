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
 * during, or after - and if the visitor scrolls the list themselves while
 * the hint is still running, the hint bails out immediately instead of
 * fighting their scroll position and snapping it back to the top once it
 * finishes.
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

    // Scrolls only the list's own scrollTop - never itemRefs[i].scrollIntoView(),
    // which walks up every scrollable ancestor (including the page) and was
    // dragging the whole page's scroll position along with it.
    //
    // The offset is measured with getBoundingClientRect rather than
    // item.offsetTop: offsetTop is relative to the nearest *positioned*
    // ancestor, and this container is static, so items measured past it to
    // whatever happened to be `relative` further up. That made every target
    // off by a constant - harmless-looking on desktop, but on mobile the
    // offset was large enough that item 0 already computed past the end, so
    // the list slammed to the bottom on the first step and highlighted items
    // that were scrolled out of sight.
    const scrollItemIntoContainer = (item: HTMLDivElement) => {
      const itemTop =
        item.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop;
      const itemBottom = itemTop + item.offsetHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;

      if (itemTop < viewTop) {
        container.scrollTo({ top: itemTop, behavior: "smooth" });
      } else if (itemBottom > viewBottom) {
        container.scrollTo({ top: itemBottom - container.clientHeight, behavior: "smooth" });
      }
    };

    // Any sign the visitor is driving the scroll themselves cancels the hint
    // outright - otherwise the loop below keeps moving the container over
    // their input, and the "ease back to top" at the end would snap their
    // own scroll position back to 0 once the hint finishes.
    let userTookOver = false;
    const markUserTookOver = () => {
      userTookOver = true;
    };

    // Separate from userTookOver: the hint is a chain of awaited timeouts, so
    // without this it keeps setting state and scrolling a detached container
    // after a client-side navigation away mid-hint.
    let cancelled = false;
    container.addEventListener("wheel", markUserTookOver, { passive: true });
    container.addEventListener("touchstart", markUserTookOver, { passive: true });
    container.addEventListener("pointerdown", markUserTookOver, { passive: true });

    const playScrollHint = async () => {
      for (let i = 0; i < locations.length; i++) {
        if (cancelled || userTookOver) break;
        setMagnifiedIndex(i);
        const item = itemRefs.current[i];
        if (item) scrollItemIntoContainer(item);
        await wait(ITEM_FOCUS_MS);
      }
      if (cancelled) return;
      setMagnifiedIndex(null);
      if (!userTookOver) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }
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

    return () => {
      cancelled = true;
      observer.disconnect();
      container.removeEventListener("wheel", markUserTookOver);
      container.removeEventListener("touchstart", markUserTookOver);
      container.removeEventListener("pointerdown", markUserTookOver);
    };
  }, [locations]);

  return (
    <div
      ref={containerRef}
      className={`${gapClass} ${maxHeightClass} overflow-y-auto overflow-x-hidden overscroll-contain ${paddingClass} scrollbar-hide`}
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
