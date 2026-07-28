"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Slim top progress bar (GitHub-style) shown during client-side route changes.
 * Starts when an internal link is clicked and completes once the new pathname
 * commits. Self-contained - no external dependency.
 */
export default function TopLoader() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  const widthRef = useRef(0);
  const loadingRef = useRef(false);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  const setW = (w: number) => {
    widthRef.current = w;
    setWidth(w);
  };

  const clearTimers = () => {
    if (trickleRef.current) clearInterval(trickleRef.current);
    if (doneRef.current) clearTimeout(doneRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
    trickleRef.current = null;
    doneRef.current = null;
    resetRef.current = null;
  };

  const start = () => {
    clearTimers();
    loadingRef.current = true;
    setVisible(true);
    setW(8);
    trickleRef.current = setInterval(() => {
      const current = widthRef.current;
      if (current >= 90) return;
      setW(Math.min(90, current + Math.max(0.5, (90 - current) * 0.08)));
    }, 200);
  };

  const complete = () => {
    if (!loadingRef.current) return;
    loadingRef.current = false;
    clearTimers();
    setW(100);
    doneRef.current = setTimeout(() => {
      setVisible(false);
      resetRef.current = setTimeout(() => setW(0), 250);
    }, 250);
  };

  // Start the bar on internal link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Skip external links and same-page (hash / query-only) navigation.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      start();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // start() is stable for our purposes; attach the listener once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Complete once the new route's pathname has committed.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Clear any pending timers on unmount.
  useEffect(() => () => clearTimers(), []);

  if (!visible && width === 0) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${width}%`,
        background: "var(--primary)",
        zIndex: 100000,
        opacity: visible ? 1 : 0,
        transition: "width 0.2s ease, opacity 0.3s ease",
        pointerEvents: "none",
      }}
    />
  );
}
