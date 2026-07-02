"use client";

import React from "react";
import { MapPin, X } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

const LocationPermissionPrompt = () => {
  const { promptVisible, requestLocation, dismissPrompt } = useNearestLocation();
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (!promptVisible) {
      setEntered(false);
      return;
    }
    // A short delay (instead of requestAnimationFrame, which can be paused in
    // backgrounded/inactive tabs) ensures the browser paints the "not entered"
    // state first, so the transition to "entered" actually animates in.
    const id = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(id);
  }, [promptVisible]);

  if (!promptVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Enable location"
      className="fixed inset-x-0 bottom-0 z-[9998] flex justify-center px-[var(--space-lg)] pb-[var(--space-lg)] sm:justify-end sm:pb-[var(--space-xl)] sm:pr-[var(--space-xl)]"
    >
      <div
        className={`relative w-full max-w-[420px] bg-[#1C1B1B] border border-white/10 shadow-2xl p-[var(--space-lg)] transition-all duration-300 ease-out ${
          entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <button
          onClick={dismissPrompt}
          aria-label="Dismiss"
          className="absolute top-3 right-3 text-white/50 hover:text-primary transition-colors p-1"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 bg-primary/15 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <h3 className="heading-h5 text-white uppercase leading-tight mb-1">
              Find Your Nearest Flame
            </h3>
            <p className="text-gray-400 text-small font-medium leading-relaxed">
              Allow location to skip the search and order from the store closest to you.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-[var(--space-md)]">
          <button
            onClick={requestLocation}
            className="flex-1 bg-primary hover:bg-secondary text-white px-4 py-3.5 text-small font-black tracking-[1.5px] uppercase transition-all"
          >
            Allow Location
          </button>
          <button
            onClick={dismissPrompt}
            className="flex-1 border-2 border-white/20 text-white hover:border-white px-4 py-3.5 text-small font-black tracking-[1.5px] uppercase transition-all"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionPrompt;
