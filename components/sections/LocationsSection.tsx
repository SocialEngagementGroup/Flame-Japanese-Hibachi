"use client";

import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const locations = [
  {
    address: "123 PEACHTREE ST, ATLANTA, GA",
    phone: "(404) 555-0199",
    hours: "11:00 AM - 10:00 PM",
    isOpen: true,
  },
  {
    address: "456 BUCKHEAD AVE, ATLANTA, GA",
    phone: "(404) 555-0200",
    hours: "11:00 AM - 10:00 PM",
    isOpen: true,
  },
  {
    address: "789 MIDTOWN PL, ATLANTA, GA",
    phone: "(404) 555-0201",
    hours: "11:00 AM - 11:00 PM",
    isOpen: true,
  },
  {
    address: "321 PIEDMONT RD, ATLANTA, GA",
    phone: "(404) 555-0202",
    hours: "11:00 AM - 10:00 PM",
    isOpen: true,
  },
  {
    address: "555 MARIETTA ST, ATLANTA, GA",
    phone: "(404) 555-0203",
    hours: "11:00 AM - 10:00 PM",
    isOpen: true,
  },
];

const LocationsSection = () => {
  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black px-6 md:px-12 relative overflow-visible py-0 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Sticky Info and Map */}
        <div className="lg:sticky lg:top-24 self-start py-10 md:py-20">
          <div className="space-y-12">
            <div>
              <h3 className="heading-h3 mb-6">
                <span className="text-black dark:text-white block transition-colors duration-300">FIND YOUR</span>
                <span className="text-primary block">FLAME</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-[14px] md:text-[16px] mb-10 max-w-sm leading-relaxed font-medium transition-colors duration-300">
                Experience the heat near you. Browse our active restaurants or see where we're striking next.
              </p>
              
              <div className="aspect-[16/9] bg-zinc-200 dark:bg-zinc-900 border border-black/5 dark:border-white/5 relative overflow-hidden group mb-12 hidden md:block transition-colors duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-40 dark:opacity-30 grayscale transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full animate-pulse" />
                    <MapPin size={40} className="text-primary relative z-10" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="border-b border-black/10 dark:border-white/10 pb-6 transition-colors duration-300">
                  <span className="text-primary text-[12px] md:text-[20px] font-black tracking-[3px] uppercase mb-3 block">COMING SOON</span>
                  <h4 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300">MANHATTAN FLAGSHIP</h4>
                  <p className="text-gray-600 dark:text-gray-500 text-[13px] mb-2 font-medium transition-colors duration-300">123 Broadway, New York, NY 10012</p>
                  <div className="flex items-center gap-4">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-widest">OPEN UNTIL 11 PM</span>
                    <span className="text-gray-400 dark:text-gray-600 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">2.4 MILES AWAY</span>
                  </div>
                </div>
                
                <div className="pb-6">
                  <h4 className="heading-h4 text-black dark:text-white mb-1 transition-colors duration-300">BROOKLYN HEIGHTS</h4>
                  <p className="text-gray-600 dark:text-gray-500 text-[13px] mb-2 font-medium transition-colors duration-300">456 Atlantic Ave, Brooklyn, NY 11217</p>
                  <div className="flex items-center gap-4">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-widest">OPEN UNTIL 10 PM</span>
                    <span className="text-gray-400 dark:text-gray-600 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">4.8 MILES AWAY</span>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full md:w-[300px] border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 py-4 text-[12px] font-black tracking-[3px] uppercase transition-all">
                VIEW ALL LOCATIONS
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Desktop (Scrollable) / Mobile (Horizontal Slider) */}
        <div className="w-full flex flex-col items-center lg:items-end py-10 lg:py-0">
          {/* Desktop Version */}
          <div className="hidden lg:block w-full max-w-[640px] space-y-6">
            {locations.map((loc, index) => (
              <div 
                key={index} 
                className="bg-[#1C1B1B] w-full h-[244px] p-8 md:p-10 border border-white/5 hover:bg-zinc-900 transition-all cursor-pointer group flex flex-col justify-center relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-primary text-[10px] font-black tracking-[3px] uppercase">OPEN NOW</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                </div>
                
                <h4 className="heading-h4 text-white group-hover:text-primary transition-colors leading-tight max-w-[90%] mb-6">
                  {loc.address}
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
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full h-auto"
            >
              {locations.map((loc, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#1C1B1B] w-full h-[244px] p-6 border border-white/5 flex flex-col justify-center relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-primary text-[10px] font-black tracking-[3px] uppercase">OPEN NOW</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                    
                    <h4 className="heading-h4 text-white mb-4 leading-tight">
                      {loc.address}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
