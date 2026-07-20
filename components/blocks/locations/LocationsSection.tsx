"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import type { Swiper as SwiperType } from "swiper";
import {
  getActiveLocations,
  getComingSoonLocations,
} from "@/lib/api/locations";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { haversineDistanceMiles } from "@/lib/geo/distance";
import { formatDistance } from "@/lib/geo/formatDistance";
import "swiper/css";
import "swiper/css/pagination";

const activeLocations = getActiveLocations();
const comingSoonLocations = getComingSoonLocations();

type LocationsSectionProps = {
  leftHeader?: React.ReactNode;
  hideMap?: boolean;
  hideFindYourFlame?: boolean;
  hideViewAll?: boolean;
};

const LocationsSection = ({
  leftHeader,
  hideMap = false,
  hideFindYourFlame = false,
  hideViewAll = false,
}: LocationsSectionProps = {}) => {
  const [selectedLocation, setSelectedLocation] = useState(activeLocations[0]);
  const [mapLoading, setMapLoading] = useState(false);
  const { nearest, origin } = useNearestLocation();

  /** Distance from the visitor to a store, or null when we simply don't know.
   * Only a shared location (GPS/IP/ZIP) produces an origin — a store picked by
   * hand doesn't, and inventing a number there is what previously showed
   * "0.0 MI AWAY" to someone who had never shared their location at all.
   * Works from anywhere in the world; being outside the delivery area affects
   * ordering, not whether a distance can be measured. */
  const distanceTo = (loc: { lat: number; lng: number }) =>
    origin ? haversineDistanceMiles(origin, loc) : null;
  const findYourFlameText = "FLAME";
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const nearestAppliedRef = useRef(false);

  // Nearest store moves to the top of the list once geolocation resolves.
  // Falls back to the default (unsorted) order when no nearest store is known yet.
  const sortedActiveLocations = React.useMemo(() => {
    if (!nearest) return activeLocations;
    const idx = activeLocations.findIndex((l) => l.id === nearest.id);
    if (idx <= 0) return activeLocations;
    const copy = [...activeLocations];
    const [match] = copy.splice(idx, 1);
    copy.unshift(match);
    return copy;
  }, [nearest]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset map spinner when the selected location changes
    setMapLoading(true);
  }, [selectedLocation.id]);

  // Seed the highlighted card to the nearest store the first time it resolves,
  // so the top card's highlight/map matches the newly-reordered list.
  useEffect(() => {
    if (nearest && !nearestAppliedRef.current) {
      nearestAppliedRef.current = true;
      const match = activeLocations.find((l) => l.id === nearest.id);
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time seed once geolocation resolves, guarded by nearestAppliedRef
        setSelectedLocation(match);
        mobileSwiperRef.current?.slideTo(0, 0);
      }
    }
  }, [nearest]);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `Flame Japanese Hibachi ${selectedLocation.address}`
  )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;

  const googleMapsUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Flame Japanese Hibachi ${address}`)}`;

  // Scroll listener for perfectly aligning the active card with the map box top
  useEffect(() => {
    const handleScroll = () => {
      const mapBox = document.getElementById("desktop-map-container");
      if (!mapBox) return;

      // The trigger line is the top of the map box. Once the sticky left column
      // releases (it's taller on pages that show the VIEW ALL button), the map
      // scrolls away and activation would freeze a couple cards early. Pin the
      // trigger to the map's "stuck" position (sticky top-24 = 96px + the map's
      // fixed offset inside the column) so the last cards still cross it.
      const mapRect = mapBox.getBoundingClientRect();
      const stickyEl = document.getElementById("desktop-sticky-container");
      const stuckTriggerY = stickyEl
        ? 96 + (mapRect.top - stickyEl.getBoundingClientRect().top)
        : mapRect.top;
      const triggerY = Math.max(mapRect.top, stuckTriggerY);

      // Check if we are at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      let bestIndex = -1;
      let minDistance = Infinity;
      let closestIndex = 0;

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        // 1. Check if the trigger line is inside the card (with a small buffer)
        if (rect.top <= triggerY + 20 && rect.bottom > triggerY + 20) {
          bestIndex = index;
        }

        // 2. Fallback to the closest card
        const dist = Math.abs(rect.top - triggerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });

      let finalIndex = isAtBottom ? sortedActiveLocations.length - 1 : (bestIndex !== -1 ? bestIndex : closestIndex);

      // Force last card if we've scrolled 10px past the second-to-last card's activation point
      if (finalIndex === sortedActiveLocations.length - 2 && sortedActiveLocations.length >= 2) {
        const secondLastCard = cardRefs.current[sortedActiveLocations.length - 2];
        if (secondLastCard) {
          const rect = secondLastCard.getBoundingClientRect();
          if (triggerY - rect.top > 12) {
            finalIndex = sortedActiveLocations.length - 1;
          }
        }
      }

      if (finalIndex !== -1) {
        setSelectedLocation((prev) => {
          if (prev.id !== sortedActiveLocations[finalIndex].id) {
            return sortedActiveLocations[finalIndex];
          }
          return prev;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sortedActiveLocations]);

  const handleCardClick = (loc: typeof activeLocations[0]) => {
    window.open(googleMapsUrl(loc.address), "_blank");
  };

  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black px-[var(--space-lg)] relative overflow-visible py-[var(--space-2xl)] transition-colors duration-300">
      {/* MOBILE LAYOUT — heading → map → cards → coming soon → button */}
      <div className="lg:hidden max-w-[600px] mx-auto">
        {leftHeader && <div className="mb-[var(--space-xl)]">{leftHeader}</div>}

        {!hideFindYourFlame && (
          <>
            <h2 className="heading-h3 mb-[var(--space-md)]">
              <span className="text-black dark:text-white transition-colors duration-300">FIND YOUR </span>
              <span className="text-primary">{findYourFlameText}</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-small leading-relaxed font-medium mb-[var(--space-lg)] transition-colors duration-300">
              Experience the heat near you. Browse our active restaurants or see where we&apos;re striking next.
            </p>
          </>
        )}

        {/* Mobile Map */}
        {!hideMap && (
          <div className="w-full h-[220px] mb-[var(--space-lg)] overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-300 relative bg-zinc-200 dark:bg-zinc-900">
            <iframe
              title="Flame Japanese Hibachi Mobile Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              src={mapSrc}
              onLoad={() => setMapLoading(false)}
              className={`transition-opacity duration-500 ease-in-out ${mapLoading ? 'opacity-0' : 'opacity-100'}`}
            ></iframe>
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${mapLoading ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Mobile Cards Swiper */}
        <div className="mb-[var(--space-xl)]">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={12}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => {
              mobileSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const index = swiper.realIndex;
              setSelectedLocation(sortedActiveLocations[index]);
            }}
            className="w-full h-auto"
          >
            {sortedActiveLocations.map((loc) => (
              <SwiperSlide key={loc.id}>
                <div
                  id={loc.slug}
                  onClick={() => handleCardClick(loc)}
                  className={`w-full h-[260px] p-5 border flex flex-col justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${selectedLocation.id === loc.id
                    ? "bg-primary border-primary shadow-2xl shadow-primary/40"
                    : "bg-[#1C1B1B] border-white/5"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-small font-black tracking-[3px] uppercase font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                      OPEN NOW
                    </span>
                    {distanceTo(loc) !== null && (
                      <span className={`text-small font-black uppercase font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                        {formatDistance(distanceTo(loc)!)}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`heading-h4 mb-3 leading-tight uppercase text-white`}
                  >
                    {loc.name}
                    <span className={`block text-small font-normal mt-1 normal-case ${selectedLocation.id === loc.id ? "text-white" : "text-gray-400"}`}>
                      {loc.address}
                    </span>
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-small font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                      <Phone size={14} />
                      <span className="font-bold">{loc.phone}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-small font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                      <Clock size={14} />
                      <span className="font-bold uppercase">{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile arrows — below the cards */}
          <div className="flex justify-center gap-2 mt-[var(--space-md)]">
            <button
              onClick={() => mobileSwiperRef.current?.slidePrev()}
              className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
              aria-label="Previous"
            >
              <FaArrowLeftLong size={20} />
            </button>
            <button
              onClick={() => mobileSwiperRef.current?.slideNext()}
              className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 active:scale-95 transition-all"
              aria-label="Next"
            >
              <FaArrowRightLong size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Coming Soon */}
        <div className="mb-[var(--space-lg)]">
          <span className="text-primary text-small font-black tracking-[3px] uppercase block font-sans mb-4">
            COMING SOON
          </span>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
            {comingSoonLocations.map((loc) => (
              <div
                key={loc.id}
                className="border-b border-black/10 dark:border-white/10 pb-4 transition-colors duration-300"
              >
                <h3 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300 uppercase">
                  {loc.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-500 text-small font-medium transition-colors duration-300 mb-2">
                  {loc.address}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
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
        </div>

        {!hideViewAll && (
          <Link href="/locations" className="w-full max-w-[378.66px] sm:w-[378.66px] h-[52px] py-[16px] mx-auto border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 font-serif font-bold text-[12px] leading-[16px] tracking-[1.2px] text-center uppercase flex items-center justify-center transition-all">
            VIEW ALL LOCATIONS
          </Link>
        )}
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid max-w-[1800px] mx-auto grid-cols-2 gap-[var(--gap-lg)] items-start">
        {/* Left Side: Sticky Info and Map */}
        <div id="desktop-sticky-container" className="lg:sticky lg:top-24 self-start">
          <div className="space-y-12">
            <div>
              {leftHeader && <div className="mb-[var(--space-xl)]">{leftHeader}</div>}

              {!hideFindYourFlame && (
                <>
                  <h2 className="heading-h3 mb-[var(--space-xl)] whitespace-nowrap text-left">
                    <span className="text-black dark:text-white transition-colors duration-300">FIND YOUR </span>
                    <span className="text-primary">{findYourFlameText}</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-10 max-w-sm leading-relaxed font-medium transition-colors duration-300">
                    Experience the heat near you. Browse our active restaurants or see where we&apos;re striking next.
                  </p>
                </>
              )}

              {/* Map Container */}
              {!hideMap && (
                <div id="desktop-map-container" className="w-full h-[500px] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 relative overflow-hidden group mb-12 transition-colors duration-300 shadow-2xl">
                  <iframe
                    title="Flame Japanese Hibachi Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    loading="lazy"
                    src={mapSrc}
                    onLoad={() => setMapLoading(false)}
                    className={`transition-opacity duration-500 ease-in-out ${mapLoading ? 'opacity-0' : 'opacity-100'}`}
                  ></iframe>
                  {/* Loader */}
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${mapLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 pointer-events-none border-[10px] border-white/5 dark:border-black/5 z-10"></div>
                </div>
              )}

              {/* Coming Soon Section */}
              <div className="mt-12 relative">
                <span className="text-primary text-xl font-black tracking-[3px] uppercase mb-6 block font-sans sticky top-0 bg-[#F0EDED] dark:bg-black py-2 z-10 transition-colors">COMING SOON</span>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                  {comingSoonLocations.map((loc) => (
                    <div key={loc.id} className="border-b border-black/10 dark:border-white/10 pb-4 transition-colors duration-300">
                      <h3 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300 uppercase">{loc.name}</h3>
                      <p className="text-gray-600 dark:text-gray-500 text-small font-medium transition-colors duration-300 mb-2">{loc.address}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-primary text-small font-bold uppercase tracking-widest font-sans">OPEN UNTIL {loc.openUntil}</span>
                        <span className="text-gray-400 dark:text-gray-600 text-small font-bold uppercase tracking-widest transition-colors duration-300 font-sans">{loc.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!hideViewAll && (
                <Link href="/locations" className="mt-8 w-[378.66px] max-w-full h-[52px] py-[16px] border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 font-serif font-bold text-[12px] leading-[16px] tracking-[1.2px] text-center uppercase flex items-center justify-center transition-all">
                  VIEW ALL LOCATIONS
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Desktop Scrollable Cards */}
        <div className="w-full flex flex-col items-start py-0">
          <div className={`block w-full max-w-[900px] ${hideMap ? "" : `${hideViewAll ? "lg:pb-[52.7vh]" : "lg:pb-[calc(52.7vh+84px)]"} pb-[var(--space-xl)]`}`}>
            {/* Spacer — mirrors the left-column heading height so the first card aligns with the map / leftHeader */}
            <div className="invisible" aria-hidden="true" id="desktop-spacer">
              {leftHeader ? (
                <div className="mb-[var(--space-xl)]">{leftHeader}</div>
              ) : (
                <>
                  <h2 className="heading-h3 mb-[var(--space-xl)] whitespace-nowrap text-left">
                    <span className="text-black dark:text-white transition-colors duration-300">FIND YOUR </span>
                    <span className="text-primary">{findYourFlameText}</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-10 max-w-sm leading-relaxed font-medium transition-colors duration-300">
                    Experience the heat near you. Browse our active restaurants or see where we&apos;re striking next.
                  </p>
                </>
              )}
            </div>
            <div className="space-y-6">
              {sortedActiveLocations.map((loc, index) => (
                <div
                  key={loc.id}
                  id={loc.slug}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index}
                  onClick={() => handleCardClick(loc)}
                  className={`w-full min-h-[244px] p-[var(--space-lg)] border transition-all duration-300 cursor-pointer group flex flex-col justify-center relative overflow-hidden ${selectedLocation.id === loc.id
                    ? "bg-primary border-primary shadow-2xl shadow-primary/40 scale-[1.02] z-10"
                    : "bg-[#1C1B1B] border-white/5 hover:bg-zinc-900"
                    }`}
                >
                  {/* Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />

                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-small font-black tracking-[3px] uppercase font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>OPEN NOW</span>
                    {distanceTo(loc) !== null && (
                      <span className={`text-small font-black uppercase font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                        {formatDistance(distanceTo(loc)!)}
                      </span>
                    )}
                  </div>

                  <h3 className={`heading-h4 transition-colors leading-tight max-w-[90%] mb-6 uppercase ${selectedLocation.id === loc.id ? "text-white" : "text-white group-hover:text-primary"
                    }`}>
                    {loc.name}
                    <span className={`block text-small font-normal mt-1 normal-case ${selectedLocation.id === loc.id ? "text-white" : "text-gray-400"}`}>{loc.address}</span>
                  </h3>

                  <div className="flex flex-wrap gap-8 items-center">
                    <div className={`flex items-center gap-3 text-small font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                      <Phone size={16} />
                      <span className="font-bold">{loc.phone}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-small font-sans ${selectedLocation.id === loc.id ? "text-white" : "text-primary"}`}>
                      <Clock size={16} />
                      <span className="font-bold uppercase">{loc.hours}</span>
                    </div>
                  </div>

                  {/* Map Indicator */}
                  {selectedLocation.id === loc.id && (
                    <div className="absolute top-4 right-4 text-white">
                      <MapPin size={20} className="animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
