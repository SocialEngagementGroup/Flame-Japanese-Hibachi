"use client";

import React from "react";

const FranchiseSection = () => {
  return (
    <section className="w-full bg-[#111111] py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-[28px] md:text-[40px] font-black uppercase tracking-[1px] text-white leading-tight mb-4">
          BECOME A FLAME JAPANESE HIBACHI <br />
          FRANCHISE
        </h2>
        <p className="text-gray-300 text-[12px] md:text-[14px] mb-12 uppercase tracking-[2px] font-bold">
          JOIN THE FASTEST GROWING HIBACHI BRAND IN THE NATION
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">FULL NAME</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full bg-transparent border border-[#ff7a00] px-6 py-4 text-[#ff7a00] placeholder:text-[#ff7a00] text-[14px] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">PHONE NUMBER</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000"
              className="w-full bg-transparent border border-[#ff7a00] px-6 py-4 text-[#ff7a00] placeholder:text-[#ff7a00] text-[14px] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-transparent border border-[#ff7a00] px-6 py-4 text-[#ff7a00] placeholder:text-[#ff7a00] text-[14px] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">INTERESTED LOCATION</label>
            <input 
              type="text" 
              placeholder="City, State"
              className="w-full bg-transparent border border-[#ff7a00] px-6 py-4 text-[#ff7a00] placeholder:text-[#ff7a00] text-[14px] outline-none transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="md:col-span-2 bg-[#ff7a00] hover:bg-[#e66e00] text-black py-5 text-[14px] font-black tracking-[3px] uppercase mt-4 transition-all"
          >
            SUBMIT APPLICATION
          </button>
        </form>
      </div>
    </section>
  );
};

export default FranchiseSection;
