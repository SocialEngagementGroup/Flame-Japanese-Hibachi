"use client";

import { useState, type ReactNode } from "react";

interface MapEmbedProps {
  src: string;
  title: string;
  /** Sizing/border/background classes for the map's wrapper - the embed fills it. */
  className?: string;
  /** Passed to the wrapper div - e.g. an anchor other code scrolls to. */
  id?: string;
  /** Extra classes appended to the iframe itself, e.g. a loading-state opacity fade. */
  iframeClassName?: string;
  onLoad?: () => void;
  /** Loader spinners / decorative borders rendered above the iframe. */
  children?: ReactNode;
}

/**
 * Google's classic `output=embed` iframe hijacks the page scroll to zoom the
 * map the moment the cursor rests over it, popping up a "Use Ctrl+scroll to
 * zoom the map" overlay every time. This blocks that: a transparent click
 * guard sits over the iframe until the visitor deliberately clicks the map,
 * so an ordinary page scroll never reaches it. Moving the mouse off the map
 * re-arms the guard, via `onMouseLeave` on this component's own wrapper
 * (not the guard div - a `pointer-events: none` element cannot receive its
 * own mouse events, so the listener has to live one level up).
 */
export default function MapEmbed({
  src,
  title,
  className = "",
  id,
  iframeClassName = "",
  onLoad,
  children,
}: MapEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div id={id} className={className} onMouseLeave={() => setActive(false)}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        onLoad={onLoad}
        className={`absolute inset-0 h-full w-full ${iframeClassName}`}
        frameBorder={0}
        scrolling="no"
      />
      {children}
      {!active && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={() => setActive(true)}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      )}
    </div>
  );
}
