"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Search, Phone, Clock, MapPin } from "lucide-react";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
import { haversineDistanceMiles } from "@/lib/geo/distance";
import { formatDistance } from "@/lib/geo/formatDistance";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";

const activeLocations = getActiveLocations();

const googleMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Flame Japanese Hibachi ${address}`
  )}`;

const LOCATION_PAGE_PATTERN = /^\/(menu|catering|store)\/[^/]+$/;

// Open state comes from NearestLocationProvider, not props, so every trigger
// (navbar button, "Not your location?" on a location page) opens this same
// single instance - mounted once in app/layout.tsx.
const FindFlamePopup: React.FC = () => {
  const {
    nearest,
    origin,
    selectLocation,
    findFlameOpen: open,
    closeFindFlame: onClose,
  } = useNearestLocation();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number>(activeLocations[0].id);
  const [mapSrc, setMapSrc] = useState("");

  // Once the visitor's own coordinates are known, every store gets a distance
  // and the list sorts nearest-first - previously only the nearest store showed
  // one, so "is the Laurel or Baltimore branch closer to me?" was unanswerable.
  // With no origin (no GPS/IP/ZIP yet, or a purely manual pick) there is no
  // "here" to measure from, so distances are omitted.
  //
  // Either way the active store is pinned to the top afterwards. Someone who
  // deliberately picked a farther branch still expects to find it first, and
  // sorting it back into the middle of the list reads as having lost their
  // choice. Everything below it stays ordered nearest-first.
  const sortedActiveLocations = useMemo(() => {
    const withDistance = activeLocations.map((location) => ({
      ...location,
      distanceMiles: origin ? haversineDistanceMiles(origin, location) : null,
    }));

    const ordered = origin
      ? withDistance.sort(
          (a, b) => (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0)
        )
      : withDistance;

    if (!nearest) return ordered;
    const idx = ordered.findIndex((l) => l.id === nearest.id);
    if (idx <= 0) return ordered;
    const pinned = [...ordered];
    const [active] = pinned.splice(idx, 1);
    pinned.unshift(active);
    return pinned;
  }, [nearest, origin]);

  useEffect(() => {
    if (open && nearest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync highlighted card when the active location changes
      setSelectedId(nearest.id);
    }
  }, [open, nearest]);

  // Opening the popup is a strong intent signal a store switch is coming, so
  // warm the router cache. The heavy menu/catering tree lives in the layout and
  // is already mounted, so each of these payloads is only the page delta (~4 KB)
  // - cheap enough to prefetch every store, which makes any pick instant.
  // Still staggered so 14 requests don't land as one burst.
  useEffect(() => {
    if (!open) return;
    const base = pathname.startsWith("/catering")
      ? "catering"
      : pathname.startsWith("/store")
        ? "store"
        : pathname.startsWith("/blog")
          ? "blog"
          : "menu";
    let i = 0;
    const id = setInterval(() => {
      if (i >= sortedActiveLocations.length) {
        clearInterval(id);
        return;
      }
      router.prefetch(`/${base}/${sortedActiveLocations[i].slug}`);
      i++;
    }, 100);
    return () => clearInterval(id);
  }, [open, pathname, router, sortedActiveLocations]);

  const handleLocationSelect = (storeId: number) => {
    setSelectedId(storeId);
    selectLocation(storeId);
    onClose();

    // If already viewing a location-specific menu/catering/store page, switching stores
    // here should carry the visitor to that same page for the newly picked store -
    // otherwise the page keeps showing the old store's menu/order links until reload.
    const store = activeLocations.find((l) => l.id === storeId);
    if (!store) return;

    const locationPageMatch = pathname.match(LOCATION_PAGE_PATTERN);
    if (locationPageMatch) {
      router.push(`/${locationPageMatch[1]}/${store.slug}`);
      return;
    }

    // The blog reuses one /blog/[slug] route for both location hubs and posts,
    // so only redirect when the current slug is actually a location hub - never
    // yank a reader off an article they're partway through.
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
    if (blogMatch && getLocationBySlug(blogMatch[1])) {
      router.push(`/blog/${store.slug}`);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      // "" (not "unset") preserves the CSS overflow-x: clip that keeps the navbar fixed
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const filteredActive = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedActiveLocations;
    return sortedActiveLocations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
    );
  }, [query, sortedActiveLocations]);

  const selected =
    activeLocations.find((l) => l.id === selectedId) ?? activeLocations[0];

  // Debounce the Google Maps iframe src so rapid store clicks don't reload the map every time.
  useEffect(() => {
    const id = setTimeout(() => {
      setMapSrc(
        `https://maps.google.com/maps?q=${encodeURIComponent(
          `Flame Japanese Hibachi ${selected.address}`
        )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`
      );
    }, 300);
    return () => clearTimeout(id);
  }, [selected.address]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Find a Flame"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[1100px] max-h-[90vh] bg-[#F0EDED] dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-[var(--space-lg)] pt-[var(--space-lg)] pb-[var(--space-md)] border-b border-black/5 dark:border-white/5">
          <div>
            <h3 className="heading-h3">
              {/* Always "FIND YOUR FLAME" - this is the brand line, not a
                  readout of the active store. The selected store is already
                  named in the navbar and pinned to the top of the list below. */}
              <span className="text-black dark:text-white">FIND YOUR </span>
              <span className="text-primary">FLAME</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-small leading-relaxed font-medium mt-2 max-w-md">
              Pick a location to view it on the map or get directions.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-black dark:text-white hover:text-primary transition-colors p-2 -mr-2"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-[var(--space-lg)] pt-[var(--space-md)]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, state, or address"
              className="w-full bg-white dark:bg-[#1C1B1B] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 pl-11 pr-4 py-3 text-small font-medium focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-lg)] px-[var(--space-lg)] py-[var(--space-md)] overflow-y-auto flex-1">
          <div className="order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <div className="w-full h-[260px] lg:h-[460px] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/10 overflow-hidden shadow-2xl">
              <iframe
                title="Selected Flame Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                src={mapSrc}
              />
            </div>
            <a
              href={googleMapsUrl(selected.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[var(--space-md)] w-full bg-primary hover:bg-secondary text-white py-4 text-small font-black tracking-[3px] uppercase transition-all flex items-center justify-center gap-2"
            >
              <MapPin size={16} strokeWidth={2.5} />
              GET DIRECTIONS
            </a>
          </div>

          <div className="order-2 lg:order-1">
            <span className="text-primary text-small font-black tracking-[3px] uppercase block font-sans mb-3">
              OPEN NOW
            </span>
            {filteredActive.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-small">
                No matching locations.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredActive.map((loc) => {
                  const isSelected = loc.id === selectedId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationSelect(loc.id)}
                      className={`w-full text-left p-[var(--space-md)] border transition-all relative overflow-hidden ${
                        isSelected
                          ? "bg-zinc-900 border-primary"
                          : "bg-[#1C1B1B] border-white/5 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <h4
                          className={`heading-h4 leading-tight uppercase ${
                            isSelected ? "text-primary" : "text-white"
                          }`}
                        >
                          {loc.name}
                          <span className="block text-small font-normal text-gray-400 mt-1 normal-case">
                            {loc.address}
                          </span>
                        </h4>
                        {isSelected && (
                          <MapPin
                            size={20}
                            className="text-primary animate-bounce shrink-0"
                          />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                        <div className="flex items-center gap-2 text-primary text-small">
                          <Phone size={14} />
                          <span className="font-bold">{loc.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary text-small">
                          <Clock size={14} />
                          <span className="font-bold uppercase">
                            {loc.hours}
                          </span>
                        </div>
                        {loc.distanceMiles !== null && (
                          <div className="flex items-center gap-2 text-primary text-small">
                            <MapPin size={14} />
                            <span className="font-bold uppercase">
                              {formatDistance(loc.distanceMiles)}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindFlamePopup;
