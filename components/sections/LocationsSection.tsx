"use client";

import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

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
];

const LocationsSection = () => {
  return (
    <section className="w-full bg-black py-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Info and Map */}
        <div>
          <h2 className="font-serif text-[36px] md:text-[48px] font-black uppercase tracking-[1px] leading-tight mb-6">
            <span className="text-white">FIND YOUR </span>
            <span className="text-primary">FLAME</span>
          </h2>
          <p className="text-gray-400 text-[14px] md:text-[16px] mb-10 max-w-md leading-relaxed">
            Experience the heat how you like it. Find our active restaurants or see where we're firing up next.
          </p>
          
          <div className="aspect-video bg-zinc-900 border border-white/5 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
              alt="Map" 
              className="w-full h-full object-cover opacity-50 grayscale transition-all group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin size={40} className="text-primary animate-bounce" />
            </div>
          </div>
          
          <div className="mt-10 space-y-6">
            <div>
              <span className="text-primary text-[12px] font-black tracking-widest uppercase">COMING SOON</span>
              <h4 className="text-white font-black uppercase mt-2">MANHATTAN FLAGSHIP</h4>
            </div>
            <div>
              <span className="text-primary text-[12px] font-black tracking-widest uppercase">COMING SOON</span>
              <h4 className="text-white font-black uppercase mt-2">BROOKLYN HEIGHTS</h4>
            </div>
          </div>
        </div>

        {/* Right Side: Locations List */}
        <div className="space-y-4">
          {locations.map((loc, index) => (
            <div 
              key={index} 
              className="bg-[#111111] p-8 border border-white/5 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary text-[10px] font-black tracking-widest uppercase">OPEN NOW</span>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
              
              <h3 className="text-white font-serif text-[20px] font-black uppercase tracking-[1px] mb-6 group-hover:text-primary transition-colors">
                {loc.address}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-400 text-[12px]">
                  <Phone size={14} className="text-primary" />
                  <span>{loc.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-[12px]">
                  <Clock size={14} className="text-primary" />
                  <span>{loc.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
