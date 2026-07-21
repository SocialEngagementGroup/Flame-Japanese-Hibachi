"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Last-resort boundary: this replaces the root layout entirely, so there is no
 * navbar, no theme provider, and no next/font variables. Everything here is
 * therefore self-contained and avoids the font tokens the rest of the site
 * relies on — a stylesheet that half-loads is how these screens end up looking
 * broken in exactly the moment they need to look deliberate.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error.digest ?? "", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        <main className="min-h-screen flex items-center justify-center px-6 py-16">
          <div className="max-w-[560px] text-center">
            <p className="text-[#FF7808] text-[12px] font-bold uppercase tracking-[3px] mb-4">
              Flame Japanese Hibachi
            </p>

            <h1 className="text-[28px] sm:text-[40px] font-black uppercase leading-tight mb-4">
              SOMETHING WENT{" "}
              <span className="text-[#FF7808]">SERIOUSLY WRONG.</span>
            </h1>

            <p className="text-white/70 text-[15px] leading-relaxed mb-8">
              The site hit an unexpected error. Reloading usually clears it. If
              it doesn&apos;t, please call your nearest location and we&apos;ll
              take your order or enquiry directly.
            </p>

            <button
              type="button"
              onClick={reset}
              className="bg-[#FF7808] hover:brightness-110 text-white px-8 py-4 text-[12px] font-black tracking-[3px] uppercase transition-all"
            >
              Reload
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
