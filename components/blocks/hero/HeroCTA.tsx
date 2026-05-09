"use client";

import React from "react";
import { ORDER_URL } from "@/lib/constants";

const HeroCTA = () => {
  return (
    <section className="w-full bg-background py-[var(--space-sm)] md:py-[var(--space-md)] transition-colors duration-300">
      <div className="w-[95%] max-w-[1440px] mx-auto md:px-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 lg:gap-12">
        <h2 className="heading-h2 text-center md:text-left">
          JOIN FLAME HIBACHI NOW
        </h2>

        <div className="flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-4">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center text-center bg-primary hover:bg-secondary text-white px-2 sm:px-6 py-3 text-small font-black tracking-[1px] sm:tracking-[1.5px] transition-all uppercase h-full sm:h-auto sm:whitespace-nowrap"
          >
            CREATE ACCOUNT OR SIGN IN
          </a>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center text-center border border-foreground text-foreground hover:bg-foreground hover:text-background px-2 sm:px-6 py-3 text-small font-black tracking-[1px] sm:tracking-[1.5px] transition-all uppercase h-full sm:h-auto sm:whitespace-nowrap"
          >
            REDEEM DISCOUNT CODE
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;
