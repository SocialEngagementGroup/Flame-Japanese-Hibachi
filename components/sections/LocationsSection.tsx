"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { activeLocations, comingSoonLocations } from "@/data/locationsData";

import "swiper/css";
import "swiper/css/pagination";
import dynamic from "next/dynamic";

const CinematicLocationsMap = dynamic(() => import("@/components/map/CinematicLocationsMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-900 animate-pulse" />
});

const LocationsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<typeof activeLocations[0] | null>(activeLocations[0]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapRef = useRef<any>(null);
  const lastUpdateRef = useRef<number>(0);

  const googleMapsUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Flame Japanese Hibachi ${address}`)}`;

  // Scroll listener: fires exactly when a card's top edge hits the map box top
  useEffect(() => {
    const handleScroll = () => {
      const mapBox = document.getElementById("desktop-map-container");
      if (!mapBox) return;

      const triggerY = mapBox.getBoundingClientRect().top;
      let bestIndex = -1;
      let minDist = Infinity;

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        // Card is active if the trigger line is inside it
        if (rect.top <= triggerY + 2 && rect.bottom > triggerY + 2) {
          bestIndex = index;
        }
        // Fallback: closest card top to trigger line
        const dist = Math.abs(rect.top - triggerY);
        if (dist < minDist) {
          minDist = dist;
          if (bestIndex === -1) bestIndex = index;
        }
      });

      if (bestIndex !== -1) {
        const now = Date.now();
        if (now - lastUpdateRef.current > 300) {
          const loc = activeLocations[bestIndex];
          setSelectedLocation((prev) => {
            if (prev?.id !== loc.id) {
              mapRef.current?.flyToLocation(loc.id);
              lastUpdateRef.current = now;
              return loc;
            }
            return prev;
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleCardClick = (loc: typeof activeLocations[0]) => {
    window.open(googleMapsUrl(loc.address), "_blank");
  };

  return (
    <section className="w-full max-w-[1980px] mx-auto bg-[#F0EDED] dark:bg-black px-[var(--space-lg)] relative overflow-visible py-[var(--space-2xl)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-lg)] items-start">
        {/* Left Side: Sticky Info and Map */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="space-y-12">
            <div>
              <h3 className="heading-h3 mb-[var(--space-xl)]">
                <span className="text-black dark:text-white block transition-colors duration-300">FIND YOUR</span>
                <span className="text-primary block">FLAME</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-[14px] md:text-[16px] mb-10 max-w-sm leading-relaxed font-medium transition-colors duration-300">
                Experience the heat near you. Browse our active restaurants or see where we're striking next.
              </p>

              {/* Map Container */}
              <div id="desktop-map-container" className="w-full h-[400px] md:h-[600px] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 relative overflow-hidden group mb-12 hidden md:block transition-colors duration-300 shadow-2xl">
                <CinematicLocationsMap 
                  ref={mapRef} 
                  height="100%" 
                  showUI={false} 
                />
              </div>

              {/* Coming Soon Section */}
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                <span className="text-primary text-[12px] md:text-[20px] font-black tracking-[3px] uppercase mb-3 block font-sans">COMING SOON</span>
                {comingSoonLocations.map((loc) => (
                  <div key={loc.id} className="border-b border-black/10 dark:border-white/10 pb-4 transition-colors duration-300">
                    <h4 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300 uppercase">{loc.name}</h4>
                    <p className="text-gray-600 dark:text-gray-500 text-[13px] font-medium transition-colors duration-300 mb-2">{loc.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-primary text-[11px] font-bold uppercase tracking-widest font-sans">OPEN UNTIL {loc.openUntil}</span>
                      <span className="text-gray-400 dark:text-gray-600 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 font-sans">{loc.distance}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full md:w-[300px] border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 py-4 text-[12px] font-black tracking-[3px] uppercase transition-all">
                VIEW ALL LOCATIONS
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Desktop (Scrollable) / Mobile (Horizontal Slider) */}
        <div className="w-full flex flex-col items-center lg:items-end lg:py-0">
          {/* Desktop Version */}
          <div className="hidden lg:block w-full max-w-[900px] pb-[438px]">
            {/* Invisible spacer to align first card with map box top */}
            <div className="invisible" aria-hidden="true">
              <h3 className="heading-h3 mb-[var(--space-xl)]">
                <span className="block">FIND YOUR</span>
                <span className="block">FLAME</span>
              </h3>
              <p className="text-[14px] md:text-[16px] mb-10 max-w-sm leading-relaxed font-medium">
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
                className={`w-full min-h-[244px] p-[var(--space-lg)] border transition-all duration-300 cursor-pointer group flex flex-col justify-center relative overflow-hidden ${selectedLocation?.id === loc.id
                  ? "bg-primary border-primary shadow-2xl shadow-primary/40 scale-[1.01] z-10"
                  : "bg-[#1C1B1B] border-white/5 hover:bg-zinc-900"
                  }`}
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />

                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black tracking-[3px] uppercase font-sans ${selectedLocation?.id === loc.id ? "text-white" : "text-primary"}`}>OPEN NOW</span>
                </div>

                <h4 className={`heading-h4 transition-colors leading-tight max-w-[90%] mb-6 uppercase ${selectedLocation?.id === loc.id ? "text-white" : "text-white group-hover:text-primary"
                  }`}>
                  {loc.name}
                  <span className={`block text-[14px] font-normal mt-1 normal-case ${selectedLocation?.id === loc.id ? "text-white" : "text-gray-400"}`}>{loc.address}</span>
                </h4>

                <div className="flex flex-wrap gap-8 items-center">
                  <div className={`flex items-center gap-3 text-[12px] md:text-[14px] ${selectedLocation?.id === loc.id ? "text-white" : "text-primary"}`}>
                    <Phone size={16} />
                    <span className="font-bold">{loc.phone}</span>
                  </div>
                  <div className={`flex items-center gap-3 text-[12px] md:text-[14px] ${selectedLocation?.id === loc.id ? "text-white" : "text-primary"}`}>
                    <Clock size={16} />
                    <span className="font-bold uppercase">{loc.hours}</span>
                  </div>
                </div>

                {/* Map Indicator */}
                {selectedLocation?.id === loc.id && (
                  <div className="absolute top-4 right-4 text-white">
                    <MapPin size={20} className="animate-bounce" />
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Mobile Version (Slider) */}
          <div className="lg:hidden w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.1}
              loop={true}
              onSlideChange={(swiper) => {
                const index = swiper.realIndex;
                const loc = activeLocations[index];
                setSelectedLocation(loc);
                mapRef.current?.flyToLocation(loc.id);
              }}
              className="w-full h-auto"
            >
              {activeLocations.map((loc) => (
                <SwiperSlide key={loc.id}>
                  <div
                    onClick={() => handleCardClick(loc)}
                    className={`w-full h-auto min-h-[244px] p-6 border flex flex-col justify-center relative overflow-hidden cursor-pointer ${selectedLocation?.id === loc.id ? "bg-zinc-900 border-primary" : "bg-[#1C1B1B] border-white/5"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-primary text-[10px] font-black tracking-[3px] uppercase font-sans">OPEN NOW</span>
                    </div>

                    <h4 className={`heading-h4 mb-4 leading-tight uppercase ${selectedLocation?.id === loc.id ? "text-primary" : "text-white"
                      }`}>
                      {loc.name}
                      <span className="block text-[12px] font-normal text-gray-400 mt-1 normal-case">{loc.address}</span>
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary text-[12px]">
                        <Phone size={14} />
                        <span className="font-bold">{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-primary text-[12px]">
                        <Clock size={14} />
                        <span className="font-bold uppercase">{loc.hours}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="w-full h-[350px] mt-6 rounded-lg overflow-hidden border border-white/10">
              <CinematicLocationsMap 
                height="100%" 
                showUI={false} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
