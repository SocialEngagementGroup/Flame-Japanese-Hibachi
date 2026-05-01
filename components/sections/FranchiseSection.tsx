"use client";

import React from "react";

const FranchiseSection = () => {
  return (
    <section className="w-full max-w-[1980px] mx-auto bg-[#F0EDED] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1430px] mx-auto text-center">
        <h3 className="heading-h3 text-[#1C1B1B] dark:text-white mb-[var(--space-xl)] transition-colors duration-300">
          BECOME A FLAME JAPANESE HIBACHI <br />
          FRANCHISE
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-[var(--font-small)] mb-[var(--space-lg)] uppercase tracking-[2px] font-bold transition-colors duration-300">
          JOIN THE FASTEST GROWING HIBACHI BRAND IN THE NATION
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-md)] text-left">
          <div className="space-y-2">
            <label className="text-[#1C1B1B] dark:text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1 transition-colors duration-300">FULL NAME</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-transparent border border-[#ff7a00] px-[var(--space-md)] py-[var(--space-md)] text-[#ff7a00] placeholder:text-[#ff7a00] text-[var(--font-body)] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#1C1B1B] dark:text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1 transition-colors duration-300">PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-transparent border border-[#ff7a00] px-[var(--space-md)] py-[var(--space-md)] text-[#ff7a00] placeholder:text-[#ff7a00] text-[var(--font-body)] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#1C1B1B] dark:text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1 transition-colors duration-300">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-transparent border border-[#ff7a00] px-[var(--space-md)] py-[var(--space-md)] text-[#ff7a00] placeholder:text-[#ff7a00] text-[var(--font-body)] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#1C1B1B] dark:text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1 transition-colors duration-300">INTERESTED LOCATION</label>
            <input
              type="text"
              placeholder="City, State"
              className="w-full bg-transparent border border-[#ff7a00] px-[var(--space-md)] py-[var(--space-md)] text-[#ff7a00] placeholder:text-[#ff7a00] text-[var(--font-body)] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-[#ff7a00] hover:bg-[#e66e00] text-white py-5 text-[14px] font-black tracking-[3px] uppercase mt-4 transition-all"
          >
            SUBMIT APPLICATION
          </button>
        </form>
      </div>
    </section>
  );
};

export default FranchiseSection;
