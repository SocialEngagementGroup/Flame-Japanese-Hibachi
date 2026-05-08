"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import type { Swiper as SwiperType } from "swiper";
import {
  getActiveLocations,
  getComingSoonLocations,
} from "@/lib/api/locations";

const activeLocations = getActiveLocations();
const comingSoonLocations = getComingSoonLocations();

import "swiper/css";
import "swiper/css/pagination";

const LocationsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(activeLocations[0]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `Flame Japanese Hibachi ${selectedLocation.address}`
  )}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;

  const googleMapsUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Flame Japanese Hibachi ${address}`)}`;

  // Intersection Observer for scroll-sync
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when card is in the upper part of the scroll area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setSelectedLocation(activeLocations[index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (loc: typeof activeLocations[0]) => {
    window.open(googleMapsUrl(loc.address), "_blank");
  };

  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black px-[var(--space-lg)] relative overflow-visible py-[var(--space-2xl)] transition-colors duration-300">
      {/* MOBILE LAYOUT — heading → map → cards → coming soon → button */}
      <div className="lg:hidden max-w-[600px] mx-auto">
        <h3 className="heading-h3 mb-[var(--space-md)]">
          <span className="text-black dark:text-white transition-colors duration-300">FIND YOUR </span>
          <span className="text-primary">FLAME</span>
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-small leading-relaxed font-medium mb-[var(--space-lg)] transition-colors duration-300">
          Experience the heat near you. Browse our active restaurants or see where we're striking next.
        </p>

        {/* Mobile Map */}
        <div className="w-full h-[220px] mb-[var(--space-lg)] overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-300">
          <iframe
            title="Flame Japanese Hibachi Mobile Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapSrc}
          ></iframe>
        </div>

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
              setSelectedLocation(activeLocations[index]);
            }}
            className="w-full h-auto"
          >
            {activeLocations.map((loc) => (
              <SwiperSlide key={loc.id}>
                <div
                  onClick={() => handleCardClick(loc)}
                  className={`w-full h-[260px] p-5 border flex flex-col justify-center relative overflow-hidden cursor-pointer ${
                    selectedLocation.id === loc.id
                      ? "bg-zinc-900 border-primary"
                      : "bg-[#1C1B1B] border-white/5"
                  }`}
                >
                  <span className="text-primary text-small font-black tracking-[3px] uppercase font-sans mb-3">
                    OPEN NOW
                  </span>
                  <h4
                    className={`heading-h4 mb-3 leading-tight uppercase ${
                      selectedLocation.id === loc.id ? "text-primary" : "text-white"
                    }`}
                  >
                    {loc.name}
                    <span className="block text-small font-normal text-gray-400 mt-1 normal-case">
                      {loc.address}
                    </span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary text-small">
                      <Phone size={14} />
                      <span className="font-bold">{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-small">
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
              className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
              aria-label="Previous"
            >
              <FaArrowLeftLong size={20} />
            </button>
            <button
              onClick={() => mobileSwiperRef.current?.slideNext()}
              className="w-9 h-9 bg-[#1C1B1B] text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
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
              <h4 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300 uppercase">
                {loc.name}
              </h4>
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

        <button className="w-full border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 py-4 text-small font-black tracking-[3px] uppercase transition-all">
          VIEW ALL LOCATIONS
        </button>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid max-w-[1800px] mx-auto grid-cols-2 gap-[var(--gap-lg)] items-start">
        {/* Left Side: Sticky Info and Map */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="space-y-12">
            <div>
              <h3 className="heading-h3 mb-[var(--space-xl)]">
                <span className="text-black dark:text-white block transition-colors duration-300">FIND YOUR</span>
                <span className="text-primary block">FLAME</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-10 max-w-sm leading-relaxed font-medium transition-colors duration-300">
                Experience the heat near you. Browse our active restaurants or see where we're striking next.
              </p>

              {/* Map Container */}
              <div className="w-full h-[500px] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 relative overflow-hidden group mb-12 transition-colors duration-300 shadow-2xl">
                <iframe
                  title="Flame Japanese Hibachi Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={mapSrc}
                  className="transition-all duration-700"
                ></iframe>
                {/* Overlay for aesthetic */}
                <div className="absolute inset-0 pointer-events-none border-[10px] border-white/5 dark:border-black/5"></div>
              </div>

              {/* Coming Soon Section */}
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                <span className="text-primary text-xl font-black tracking-[3px] uppercase mb-3 block font-sans">COMING SOON</span>
                {comingSoonLocations.map((loc) => (
                  <div key={loc.id} className="border-b border-black/10 dark:border-white/10 pb-4 transition-colors duration-300">
                    <h4 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300 uppercase">{loc.name}</h4>
                    <p className="text-gray-600 dark:text-gray-500 text-small font-medium transition-colors duration-300 mb-2">{loc.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-primary text-small font-bold uppercase tracking-widest font-sans">OPEN UNTIL {loc.openUntil}</span>
                      <span className="text-gray-400 dark:text-gray-600 text-small font-bold uppercase tracking-widest transition-colors duration-300 font-sans">{loc.distance}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-[300px] border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 py-4 text-small font-black tracking-[3px] uppercase transition-all">
                VIEW ALL LOCATIONS
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Desktop Scrollable Cards */}
        <div className="w-full flex flex-col items-end py-0">
          <div className="block w-full max-w-[900px] pb-[438px]">
            {/* Spacer — mirrors the left-column heading+paragraph height so the first card aligns with the map */}
            <div className="invisible" aria-hidden="true">
              <h3 className="heading-h3 mb-[var(--space-xl)]">
                <span className="block">FIND YOUR</span>
                <span className="block">FLAME</span>
              </h3>
              <p className="text-base mb-10 max-w-sm leading-relaxed font-medium">
                Experience the heat near you. Browse our active restaurants or see where we're striking next.
              </p>
            </div>
            <div className="space-y-6">
            {activeLocations.map((loc, index) => (
              <div
                key={loc.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                onClick={() => handleCardClick(loc)}
                className={`w-full min-h-[244px] p-[var(--space-lg)] border transition-all cursor-pointer group flex flex-col justify-center relative overflow-hidden ${selectedLocation.id === loc.id
                  ? "bg-zinc-900 border-primary"
                  : "bg-[#1C1B1B] border-white/5 hover:bg-zinc-900"
                  }`}
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />

                <div className="flex justify-between items-start mb-4">
                  <span className="text-primary text-small font-black tracking-[3px] uppercase font-sans">OPEN NOW</span>
                </div>

                <h4 className={`heading-h4 transition-colors leading-tight max-w-[90%] mb-6 uppercase ${selectedLocation.id === loc.id ? "text-primary" : "text-white group-hover:text-primary"
                  }`}>
                  {loc.name}
                  <span className="block text-small font-normal text-gray-400 mt-1 normal-case">{loc.address}</span>
                </h4>

                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center gap-3 text-primary text-small">
                    <Phone size={16} />
                    <span className="font-bold">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary text-small">
                    <Clock size={16} />
                    <span className="font-bold uppercase">{loc.hours}</span>
                  </div>
                </div>

                {/* Map Indicator */}
                {selectedLocation.id === loc.id && (
                  <div className="absolute top-4 right-4 text-primary">
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
