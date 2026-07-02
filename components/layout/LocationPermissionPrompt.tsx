"use client";

import { MapPin, X } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

export default function LocationPermissionPrompt() {
  const {
    promptVisible,
    outsideServiceAreaVisible,
    requestLocation,
    dismissPrompt,
    dismissOutsideServiceArea,
  } = useNearestLocation();

  if (!promptVisible && !outsideServiceAreaVisible) return null;

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
                onClick={requestLocation}
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
          </div>
        </div>
      </div>
    </div>
  );
}
