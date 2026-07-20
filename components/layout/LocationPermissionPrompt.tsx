"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, MapPin, X } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

// Matches FindFlamePopup's pattern: only carry the visitor to the new
// store's page if they're already viewing a location-specific menu/catering
// page, otherwise the generic page's own auto-redirect (or just the updated
// navbar label) is enough.
const LOCATION_PAGE_PATTERN = /^\/(menu|catering)\/[^/]+$/;

/** Shared button treatment, so every control in these cards is the same
 * height and weight instead of each one hand-rolling its padding. */
const BTN_BASE =
  "inline-flex h-11 items-center justify-center px-[var(--space-md)] text-small font-black uppercase tracking-[1.5px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black";
const BTN_PRIMARY = `${BTN_BASE} bg-primary text-white hover:bg-secondary active:scale-[0.97]`;
const BTN_GHOST = `${BTN_BASE} text-white/60 hover:text-white`;

/**
 * The shell both cards share — position, framing, icon, heading and close
 * button. Previously each variant repeated all of this, so they had already
 * drifted apart slightly.
 *
 * Deliberately bottom-anchored with no backdrop: this is a soft ask, not a
 * blocking dialog. FindFlamePopup (the store picker) is the modal one; this
 * must stay dismissible and out of the way.
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
  // Escape closes it, matching FindFlamePopup.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex justify-center p-[var(--space-md)]">
      <div
        role="dialog"
        aria-modal="false"
        aria-label={title}
        className="pointer-events-auto w-full max-w-[520px] border border-white/10 bg-black text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-start gap-[var(--gap-sm)] border-b border-white/5 p-[var(--space-md)]">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-white"
          >
            <MapPin className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </span>
          <h2 className="heading-h4 min-w-0 flex-1 pt-1 text-white">{title}</h2>
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className="-mr-1 -mt-1 shrink-0 p-1 text-white/50 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-[var(--space-md)]">{children}</div>
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
      className="mt-[var(--gap-sm)] flex items-start justify-between gap-[var(--gap-sm)] border-l-2 border-primary bg-primary/10 px-3 py-2"
    >
      <p className="text-small leading-relaxed text-white/90">{children}</p>
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
  // prompt again — a plain retry silently fails with no feedback at all.
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
      if (resolved) {
        // A ZIP lookup is just as deliberate a pick as a Find-a-Flame
        // selection — persist it the same way, and if already on a
        // location-specific page, carry the visitor to that store's page
        // instead of leaving them on the old store's menu/order links.
        selectLocation(resolved.id);
        const locationPageMatch = pathname.match(LOCATION_PAGE_PATTERN);
        if (locationPageMatch) {
          router.push(`/${locationPageMatch[1]}/${resolved.slug}`);
        }
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
        <p className="text-small leading-relaxed text-white/70">
          We currently support online ordering in the United States only.
          You&apos;re welcome to browse the menu, or pick a U.S. location with
          Find a Flame.
        </p>
        <button
          type="button"
          onClick={dismissOutsideServiceArea}
          className={`${BTN_PRIMARY} mt-[var(--space-md)] w-full sm:w-auto`}
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
      <p className="text-small leading-relaxed text-white/70">
        Share your location and we&apos;ll show your closest store and its
        ordering link.
      </p>

      <div className="mt-[var(--space-md)] flex flex-wrap items-center gap-[var(--gap-sm)]">
        <button
          type="button"
          onClick={handleUseLocation}
          className={`${BTN_PRIMARY} flex-1 sm:flex-none`}
        >
          Use location
        </button>
        <button type="button" onClick={dismissPrompt} className={BTN_GHOST}>
          Not now
        </button>
      </div>

      {locationBlocked && (
        <Notice
          onDismiss={() => setLocationBlocked(false)}
          dismissLabel="Dismiss location-blocked message"
        >
          Location is blocked for this site in your browser settings. Enable it
          there, or use the ZIP box below.
        </Notice>
      )}

      <form
        onSubmit={handleZipSubmit}
        className="mt-[var(--space-md)] border-t border-white/10 pt-[var(--space-md)]"
      >
        <label
          htmlFor="location-zip"
          className="mb-2 block text-small font-black uppercase tracking-[1.5px] text-white/50"
        >
          Or enter your ZIP
        </label>
        <div className="flex gap-2">
          <input
            id="location-zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="21206"
            value={zip}
            disabled={zipSubmitting}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setZipError(null);
            }}
            className="h-11 min-w-0 flex-1 border border-white/10 bg-white/5 px-3 text-small text-white placeholder-white/30 transition-colors focus:border-primary focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={zipSubmitting || zip.length !== 5}
            // Faded orange on black reads as muddy brown, so the disabled
            // state drops the fill entirely rather than lowering its opacity.
            className={`${BTN_BASE} w-[76px] bg-primary text-white hover:bg-secondary active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-white/30 disabled:ring-1 disabled:ring-inset disabled:ring-white/10 disabled:hover:bg-transparent`}
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
