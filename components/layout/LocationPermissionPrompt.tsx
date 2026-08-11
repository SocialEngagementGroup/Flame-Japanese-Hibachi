"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, MapPin, X } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

// Matches FindFlamePopup's pattern: only carry the visitor to the new
// store's page if they're already viewing a location-specific menu/catering/store
// page, otherwise the generic page's own auto-redirect (or just the updated
// navbar label) is enough.
const LOCATION_PAGE_PATTERN = /^\/(menu|catering|store)\/[^/]+$/;

/** Shared button treatment, so every control in these cards is the same
 * height and weight instead of each one hand-rolling its padding. */
const BTN_BASE =
  "inline-flex h-12 items-center justify-center px-[var(--space-md)] text-small font-black uppercase tracking-[1.5px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black";
const BTN_PRIMARY = `${BTN_BASE} bg-primary text-white hover:bg-secondary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(255,120,8,0.6)]`;
const BTN_GHOST = `${BTN_BASE} text-white/50 hover:text-white`;

/**
 * The shell both cards share - backdrop, framing, icon, heading and close
 * button. Previously each variant repeated all of this, so they had already
 * drifted apart slightly.
 */
function PromptCard({
  title,
  onDismiss,
  dismissLabel,
  children,
}: {
  title: string;
  onDismiss: () => void;
  dismissLabel: string;
  children: ReactNode;
}) {
  // Escape closes it, and the page behind is locked while it's open -
  // matching FindFlamePopup. "" rather than "unset" on cleanup so the CSS
  // overflow-x: clip that keeps the navbar fixed stays in effect.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-[var(--space-md)]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="animate-dialog-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onDismiss}
      />

      <div className="animate-dialog-card relative w-full max-w-[440px] border border-white/10 bg-[#0A0A0A] text-center text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)]">
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="absolute right-3 top-3 p-1.5 text-white/40 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="px-[var(--space-lg)] pb-[var(--space-lg)] pt-[var(--space-xl)]">
          <span
            aria-hidden
            className="mx-auto mb-[var(--space-md)] flex h-14 w-14 items-center justify-center bg-primary text-white shadow-[0_12px_36px_-8px_rgba(255,120,8,0.7)]"
          >
            <MapPin className="h-7 w-7" strokeWidth={2.5} />
          </span>

          <h2 className="heading-h4 text-white">{title}</h2>

          {children}
        </div>
      </div>
    </div>
  );
}

/** Inline error/notice strip. Announced to screen readers as it appears. */
function Notice({
  children,
  onDismiss,
  dismissLabel,
}: {
  children: ReactNode;
  onDismiss: () => void;
  dismissLabel: string;
}) {
  return (
    <div
      role="alert"
      className="mt-[var(--gap-sm)] flex items-start gap-[var(--gap-sm)] border border-primary/30 bg-primary/10 px-3 py-2 text-left"
    >
      <p className="flex-1 text-small leading-relaxed text-white/90">
        {children}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={dismissLabel}
        className="shrink-0 text-white/50 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function LocationPermissionPrompt() {
  const {
    promptVisible,
    outsideServiceAreaVisible,
    requestLocation,
    dismissPrompt,
    dismissOutsideServiceArea,
    resolveFromCoordinates,
    selectLocation,
  } = useNearestLocation();
  const router = useRouter();
  const pathname = usePathname();
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState<string | null>(null);
  const [zipSubmitting, setZipSubmitting] = useState(false);
  const [locationBlocked, setLocationBlocked] = useState(false);

  if (!promptVisible && !outsideServiceAreaVisible) return null;

  // Once a visitor blocks the browser's location permission, it won't
  // prompt again - a plain retry silently fails with no feedback at all.
  // Check the permission state first so we can explain what happened
  // instead of just re-showing the same card with no explanation.
  const handleUseLocation = async () => {
    if (navigator.permissions?.query) {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation",
        });
        if (result.state === "denied") {
          setLocationBlocked(true);
          return;
        }
      } catch {}
    }
    setLocationBlocked(false);
    requestLocation();
  };

  const handleZipSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setZipError("Enter a 5-digit ZIP code.");
      return;
    }

    setZipSubmitting(true);
    setZipError(null);
    try {
      const res = await fetch(`/api/geo/zip/${zip}`);
      if (!res.ok) {
        setZipError("We couldn't find that ZIP code.");
        return;
      }
      const coordinates = (await res.json()) as { lat: number; lng: number };
      const resolved = resolveFromCoordinates(coordinates);
      if (!resolved) {
        // A real ZIP that resolves outside the service area used to leave the
        // form looking like nothing happened - the submit succeeded, no error
        // appeared, and the visitor was left staring at an unchanged prompt.
        setZipError("We don't have a location near that ZIP code yet.");
        return;
      }
      // A ZIP lookup is just as deliberate a pick as a Find-a-Flame selection -
      // persist it the same way, and if already on a location-specific page,
      // carry the visitor to that store's page instead of leaving them on the
      // old store's menu/order links.
      selectLocation(resolved.id);
      const locationPageMatch = pathname.match(LOCATION_PAGE_PATTERN);
      if (locationPageMatch) {
        router.push(`/${locationPageMatch[1]}/${resolved.slug}`);
      }
    } catch {
      setZipError("Something went wrong. Please try again.");
    } finally {
      setZipSubmitting(false);
    }
  };

  if (outsideServiceAreaVisible) {
    return (
      <PromptCard
        title="Thanks for visiting Flame"
        onDismiss={dismissOutsideServiceArea}
        dismissLabel="Close service area message"
      >
        <p className="mx-auto mt-[var(--space-sm)] max-w-[34ch] text-small leading-relaxed text-white/60">
          We currently support online ordering in the United States only.
          You&apos;re welcome to browse the menu, or pick a U.S. location with
          Find a Flame.
        </p>
        <button
          type="button"
          onClick={dismissOutsideServiceArea}
          className={`${BTN_PRIMARY} mt-[var(--space-lg)] w-full`}
        >
          Got it
        </button>
      </PromptCard>
    );
  }

  return (
    <PromptCard
      title="Find your nearest Flame"
      onDismiss={dismissPrompt}
      dismissLabel="Close location prompt"
    >
      <p className="mx-auto mt-[var(--space-sm)] max-w-[32ch] text-small leading-relaxed text-white/60">
        Share your location and we&apos;ll show your closest store and its
        ordering link.
      </p>

      <button
        type="button"
        onClick={handleUseLocation}
        className={`${BTN_PRIMARY} mt-[var(--space-lg)] w-full`}
      >
        Use location
      </button>
      <button
        type="button"
        onClick={dismissPrompt}
        className={`${BTN_GHOST} mt-1 w-full`}
      >
        Not now
      </button>

      {locationBlocked && (
        <Notice
          onDismiss={() => setLocationBlocked(false)}
          dismissLabel="Dismiss location-blocked message"
        >
          Location is blocked for this site in your browser settings. Enable it
          there, or use the ZIP box below.
        </Notice>
      )}

      {/* Divider with the alternative spelled out, so the ZIP box reads as a
          second option rather than a stray input. */}
      <div className="mt-[var(--space-lg)] flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-small font-black uppercase tracking-[1.5px] text-white/30">
          or
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleZipSubmit} className="mt-[var(--space-md)]">
        <label htmlFor="location-zip" className="sr-only">
          Enter your ZIP code
        </label>
        <div className="flex gap-2">
          <input
            id="location-zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="Enter your ZIP code"
            value={zip}
            disabled={zipSubmitting}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setZipError(null);
            }}
            className="h-12 min-w-0 flex-1 border border-white/10 bg-white/[0.04] px-4 text-center text-small text-white placeholder-white/30 transition-colors focus:border-primary focus:bg-white/[0.07] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={zipSubmitting || zip.length !== 5}
            // Faded orange on black reads as muddy brown, so the disabled
            // state drops the fill entirely rather than lowering its opacity.
            className={`${BTN_BASE} w-[84px] bg-primary text-white hover:bg-secondary active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-white/30 disabled:shadow-none disabled:ring-1 disabled:ring-inset disabled:ring-white/10 disabled:hover:bg-transparent`}
          >
            {zipSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-label="Checking" />
            ) : (
              "Go"
            )}
          </button>
        </div>
      </form>

      {zipError && (
        <Notice
          onDismiss={() => {
            setZipError(null);
            setZip("");
          }}
          dismissLabel="Dismiss ZIP error"
        >
          {zipError}
        </Notice>
      )}
    </PromptCard>
  );
}
