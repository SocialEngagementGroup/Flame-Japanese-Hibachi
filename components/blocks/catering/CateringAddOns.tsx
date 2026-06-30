"use client";

import React, { useState } from "react";

interface AddOn {
  name: string;
  price: string;
}

interface CateringAddOnsProps {
  addons: AddOn[];
  orderUrl?: string;
}

const CateringAddOns: React.FC<CateringAddOnsProps> = ({ addons, orderUrl }) => {

  if (!addons || addons.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center pt-0 pb-6 bg-white dark:bg-[#101010]">
      <h3 className="font-['Work_Sans'] text-center text-[28px] md:text-[32px] font-black uppercase text-[#1C1B1B] dark:text-white leading-[59px] mb-4">
        ADD ONS
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6 lg:gap-16 w-full max-w-[1200px] mx-auto px-4 sm:px-4">
        {addons.map((addon, index) => (
          <div key={index} className="w-full max-w-[360px] md:max-w-none md:w-auto mx-auto md:mx-0 md:flex md:flex-row md:items-center md:justify-center md:gap-3 lg:gap-4">
            {/* Mobile: name on top, price + button on same row */}
            <div className="flex flex-col md:hidden">
              <span className="font-['Work_Sans'] text-[14px] font-bold uppercase text-[#FF7808] leading-[26px]">
                {addon.name}
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-['Work_Sans'] text-[14px] font-normal uppercase text-[#FF7808] leading-[26px]">
                  {addon.price}
                </span>
                <a
                  href={orderUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#D9D9D9] dark:bg-[#373737] px-2 h-[26px] min-w-[70px] shrink-0 hover:opacity-80 transition-opacity"
                >
                  <div className="w-1/3 h-full flex items-center justify-center text-black dark:text-white text-[12px]">-</div>
                  <span className="w-1/3 text-center font-['Work_Sans'] text-[12px] font-semibold text-black dark:text-white">0</span>
                  <div className="w-1/3 h-full flex items-center justify-center text-black dark:text-white text-[12px]">+</div>
                </a>
              </div>
            </div>

            {/* Desktop: single row */}
            <span className="hidden md:block font-['Work_Sans'] text-[24px] font-normal uppercase text-[#FF7808] text-center whitespace-nowrap leading-[59px]">
              {addon.name} — {addon.price}
            </span>
            <a
              href={orderUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-between bg-[#D9D9D9] dark:bg-[#373737] px-2 h-[32px] min-w-[90px] shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-1/3 h-full flex items-center justify-center text-black dark:text-white text-[14px]">-</div>
              <span className="w-1/3 text-center font-['Work_Sans'] text-[14px] font-semibold text-black dark:text-white">0</span>
              <div className="w-1/3 h-full flex items-center justify-center text-black dark:text-white text-[14px]">+</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateringAddOns;
