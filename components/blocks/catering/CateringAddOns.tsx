"use client";

import React from "react";
import { useCateringQuote } from "@/components/providers/CateringQuoteProvider";
import { maxQtyFor } from "@/lib/catering/quote";
import type { CateringAddOn } from "@/lib/types";

interface CateringAddOnsProps {
  addons: CateringAddOn[];
}

/** The stepper used to be a link to the ordering platform showing a hardcoded
 *  "0" - it now drives the real quote state. */
const Stepper = ({
  addOn,
  size,
}: {
  addOn: CateringAddOn;
  size: "mobile" | "desktop";
}) => {
  const { addOnQty, setAddOnQty } = useCateringQuote();
  const qty = addOnQty(addOn.id);
  const max = maxQtyFor(addOn);

  const box =
    size === "mobile"
      ? "h-[26px] min-w-[70px] text-[12px]"
      : "h-[32px] min-w-[90px] text-[14px]";

  return (
    <div
      className={`flex items-center justify-between bg-[#D9D9D9] dark:bg-[#373737] px-2 shrink-0 ${box}`}
    >
      <button
        type="button"
        onClick={() => setAddOnQty(addOn.id, qty - 1)}
        disabled={qty <= 0}
        aria-label={`Remove ${addOn.name}`}
        className="w-1/3 h-full flex items-center justify-center text-black dark:text-white disabled:opacity-40 hover:opacity-70 transition-opacity"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-1/3 text-center font-['Work_Sans'] font-semibold text-black dark:text-white"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => setAddOnQty(addOn.id, qty + 1)}
        disabled={qty >= max}
        aria-label={`Add ${addOn.name}`}
        className="w-1/3 h-full flex items-center justify-center text-black dark:text-white disabled:opacity-40 hover:opacity-70 transition-opacity"
      >
        +
      </button>
    </div>
  );
};

const CateringAddOns: React.FC<CateringAddOnsProps> = ({ addons }) => {
  if (!addons || addons.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center pt-0 pb-6 bg-white dark:bg-[#101010]">
      <h3 className="font-['Work_Sans'] text-center text-[28px] md:text-[32px] font-black uppercase text-[#1C1B1B] dark:text-white leading-[59px] mb-4">
        ADD ONS
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6 lg:gap-16 w-full max-w-[1200px] mx-auto px-4 sm:px-4">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className="w-full max-w-[360px] md:max-w-none md:w-auto mx-auto md:mx-0 md:flex md:flex-row md:items-center md:justify-center md:gap-3 lg:gap-4"
          >
            {/* Mobile: name on top, price + stepper on same row */}
            <div className="flex flex-col md:hidden">
              <span className="font-['Work_Sans'] text-[14px] font-bold uppercase text-[#FF7808] leading-[26px]">
                {addon.name}
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-['Work_Sans'] text-[14px] font-normal uppercase text-[#FF7808] leading-[26px]">
                  {addon.price}
                </span>
                <Stepper addOn={addon} size="mobile" />
              </div>
            </div>

            {/* Desktop: single row */}
            <span className="hidden md:block font-['Work_Sans'] text-[24px] font-normal uppercase text-[#FF7808] text-center whitespace-nowrap leading-[59px]">
              {addon.name} - {addon.price}
            </span>
            <div className="hidden md:block">
              <Stepper addOn={addon} size="desktop" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateringAddOns;
