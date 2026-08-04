"use client";

import React from "react";
import { useCateringQuote } from "@/components/providers/CateringQuoteProvider";
import { calculateEstimate, formatMoney } from "@/lib/catering/quote";

/**
 * Floating summary that appears once anything is in the quote.
 *
 * Without it, adding a second package means reopening the modal after every
 * card - this lets someone scroll all five menus, accumulate as they go, and
 * open the form once at the end.
 *
 * The total shown ignores per-person add-ons, which can't be priced until the
 * guest count is entered in the modal; the modal's own total is the complete one.
 */
export default function CateringQuoteBar() {
  const { packages, addons, lineCount, open, openQuote } = useCateringQuote();

  if (lineCount === 0 || open) return null;

  const estimate = calculateEstimate(packages, addons, 0);

  return (
    <>
      {/* The bar is fixed, so this reserves the space it covers - otherwise the
          last ~90px of the catering page, including the contact form's submit
          button, sits permanently underneath it. Padding on <body> doesn't work
          here: body is height-constrained with border-box, so the padding is
          absorbed instead of extending the document. */}
      <div aria-hidden className="h-[90px] shrink-0" />

      <div className="fixed bottom-0 left-0 right-0 z-[900] px-4 pb-4 pointer-events-none">
        <div className="max-w-[900px] mx-auto pointer-events-auto">
          <button
            type="button"
            onClick={() => openQuote()}
            className="w-full flex items-center justify-between gap-4 bg-primary hover:bg-primary/90 text-white px-5 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] transition-colors"
          >
            <span className="text-small font-black uppercase tracking-[2px]">
              {lineCount} {lineCount === 1 ? "item" : "items"}
              <span className="opacity-80 font-bold">
                {" "}
                · Est. {formatMoney(estimate.subtotal)}
              </span>
            </span>
            <span className="text-small font-black uppercase tracking-[3px] whitespace-nowrap">
              Request Quote →
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
