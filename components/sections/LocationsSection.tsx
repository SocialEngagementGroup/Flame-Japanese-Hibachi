"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { activeLocations, comingSoonLocations } from "@/data/locationsData";

import "swiper/css";
import "swiper/css/pagination";

const LocationsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(activeLocations[0]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
              <div className="w-full h-[400px] md:h-[500px] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 relative overflow-hidden group mb-12 hidden md:block transition-colors duration-300 shadow-2xl">
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
          <div className="hidden lg:block w-full max-w-[900px] space-y-6 pb-[438px]">
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
                  <span className="text-primary text-[10px] font-black tracking-[3px] uppercase font-sans">OPEN NOW</span>
                </div>

                <h4 className={`heading-h4 transition-colors leading-tight max-w-[90%] mb-6 uppercase ${selectedLocation.id === loc.id ? "text-primary" : "text-white group-hover:text-primary"
                  }`}>
                  {loc.name}
                  <span className="block text-[14px] font-normal text-gray-400 mt-1 normal-case">{loc.address}</span>
                </h4>

                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center gap-3 text-primary text-[12px] md:text-[14px]">
                    <Phone size={16} />
                    <span className="font-bold">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary text-[12px] md:text-[14px]">
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

          {/* Mobile Version (Slider) */}
          <div className="lg:hidden w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.1}
              loop={true}
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
                    className={`w-full h-auto min-h-[244px] p-6 border flex flex-col justify-center relative overflow-hidden cursor-pointer ${selectedLocation.id === loc.id ? "bg-zinc-900 border-primary" : "bg-[#1C1B1B] border-white/5"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-primary text-[10px] font-black tracking-[3px] uppercase font-sans">OPEN NOW</span>
                    </div>

                    <h4 className={`heading-h4 mb-4 leading-tight uppercase ${selectedLocation.id === loc.id ? "text-primary" : "text-white"
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

            {/* Mobile Map Display */}
            <div className="w-full h-[250px] mt-6 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title="Flame Japanese Hibachi Mobile Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapSrc}
                className=""
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
