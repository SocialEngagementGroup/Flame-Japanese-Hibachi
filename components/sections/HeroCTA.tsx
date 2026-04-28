"use client";

import React from "react";
import Link from "next/link";

const HeroCTA = () => {
  return (
    <section className="w-full bg-[#111111] py-5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <h2 className="font-serif text-[18px] md:text-[22px] font-black uppercase tracking-[2px] text-white whitespace-nowrap">
          JOIN FLAME HIBACHI NOW
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-primary hover:bg-secondary text-white px-6 py-3 text-[12px] font-black tracking-[1.5px] transition-all uppercase whitespace-nowrap"
          >
            CREATE ACCOUNT OR SIGN IN
          </Link>
          
          <Link
            href="/promotions"
            className="border border-white hover:bg-white hover:text-black text-white px-6 py-3 text-[12px] font-black tracking-[1.5px] transition-all uppercase whitespace-nowrap"
          >
            REDEEM DISCOUNT CODE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;
