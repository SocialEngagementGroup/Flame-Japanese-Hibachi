"use client";

import React from "react";
import Link from "next/link";

const HeroCTA = () => {
  return (
    <section className="w-full bg-card py-5">
      <div className="w-[95%] max-w-[1440px] mx-auto md:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <h2 className="font-serif text-[18px] md:text-[22px] font-black uppercase tracking-[2px] text-foreground whitespace-nowrap">
          JOIN FLAME HIBACHI NOW
        </h2>
        
        <div className="flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-4">
          <Link
            href="/auth/signup"
            className="flex-1 sm:flex-none flex items-center justify-center text-center bg-primary hover:bg-secondary text-white px-2 sm:px-6 py-3 text-[9px] sm:text-[12px] font-black tracking-[1px] sm:tracking-[1.5px] transition-all uppercase h-full sm:h-auto sm:whitespace-nowrap"
          >
            CREATE ACCOUNT OR SIGN IN
          </Link>
          
          <Link
            href="/promotions"
            className="flex-1 sm:flex-none flex items-center justify-center text-center border border-foreground text-foreground hover:bg-foreground hover:text-background px-2 sm:px-6 py-3 text-[9px] sm:text-[12px] font-black tracking-[1px] sm:tracking-[1.5px] transition-all uppercase h-full sm:h-auto sm:whitespace-nowrap"
          >
            REDEEM DISCOUNT CODE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;
