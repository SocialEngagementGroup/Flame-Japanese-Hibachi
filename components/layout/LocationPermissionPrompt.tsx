"use client";

import { useState, type FormEvent } from "react";
import { Loader2, MapPin, X } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

export default function LocationPermissionPrompt() {
  const {
    promptVisible,
    outsideServiceAreaVisible,
    requestLocation,
    dismissPrompt,
    dismissOutsideServiceArea,
    resolveFromCoordinates,
  } = useNearestLocation();
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
      resolveFromCoordinates(coordinates);
    } catch {
      setZipError("Something went wrong. Please try again.");
    } finally {
      setZipSubmitting(false);
    }
  };

  if (outsideServiceAreaVisible) {
    return (
      <div className="fixed inset-x-0 bottom-4 z-[1000] flex justify-center px-4">
        <div className="relative w-full max-w-md border border-white/10 bg-black text-white shadow-2xl">
          <button
            type="button"
            onClick={dismissOutsideServiceArea}
            aria-label="Close service area message"
            className="absolute right-3 top-3 p-1 text-white/70 transition-colors hover:text-primary"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <div className="flex gap-3 p-5 pr-11">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-white">
              <MapPin className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-serif text-base font-black uppercase tracking-[1.2px]">
                Thanks for visiting Flame
              </h2>
              <p className="mt-2 text-small leading-relaxed text-white/75">
                We currently operate and support online ordering only in the
                United States. You are welcome to browse our menu and choose a
                U.S. location with Find a Flame.
              </p>
              <button
                type="button"
                onClick={dismissOutsideServiceArea}
                className="mt-4 bg-primary px-4 py-3 text-small font-black uppercase tracking-[1.5px] text-white transition-colors hover:bg-secondary"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-[1000] flex justify-center px-4">
      <div className="relative w-full max-w-md border border-white/10 bg-black text-white shadow-2xl">
        <button
          type="button"
          onClick={dismissPrompt}
          aria-label="Close location prompt"
          className="absolute right-3 top-3 p-1 text-white/70 transition-colors hover:text-primary"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="flex gap-3 p-5 pr-11">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-white">
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-serif text-base font-black uppercase tracking-[1.2px]">
              Find your nearest Flame
            </h2>
            <p className="mt-2 text-small leading-relaxed text-white/75">
              Allow location access to show your nearest store and order link.
              If location is blocked, enable it in your browser site settings.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleUseLocation}
                className="bg-primary px-4 py-3 text-small font-black uppercase tracking-[1.5px] text-white transition-colors hover:bg-secondary"
              >
                Use location
              </button>
              <button
                type="button"
                onClick={dismissPrompt}
                className="px-4 py-3 text-small font-black uppercase tracking-[1.5px] text-white/70 transition-colors hover:text-white"
              >
                Not now
              </button>
            </div>
            {locationBlocked && (
              <div className="mt-3 flex items-start justify-between gap-3 border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-small text-red-400">
                  Location is blocked in your browser for this site. Enable
                  it in your browser&apos;s site settings, or use the ZIP box
                  below.
                </p>
                <button
                  type="button"
                  onClick={() => setLocationBlocked(false)}
                  aria-label="Dismiss location-blocked message"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            )}

            <form
              onSubmit={handleZipSubmit}
              className="mt-4 flex gap-2 border-t border-white/10 pt-4"
            >
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Or enter your ZIP code"
                value={zip}
                disabled={zipSubmitting}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, ""));
                  setZipError(null);
                }}
                className="min-w-0 flex-1 bg-white/10 px-3 py-2 text-small text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={zipSubmitting}
                className="flex w-[64px] items-center justify-center bg-primary px-4 py-2 text-small font-black uppercase tracking-[1.5px] text-white transition-colors hover:bg-secondary disabled:opacity-50"
              >
                {zipSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Go"
                )}
              </button>
            </form>
            {zipError && (
              <div className="mt-3 flex items-start justify-between gap-3 border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-small text-red-400">{zipError}</p>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setZipError(null);
                      setZip("");
                    }}
                    className="text-small font-black uppercase tracking-[1px] text-white/80 transition-colors hover:text-white"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => setZipError(null)}
                    aria-label="Dismiss ZIP error"
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
