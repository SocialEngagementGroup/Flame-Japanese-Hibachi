"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function BlogCategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "All";
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset page
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-[var(--space-xl)]">
      <span 
        className="text-small font-semibold uppercase tracking-[3px] text-muted-foreground"
        style={{ fontFamily: "Work Sans" }}
      >
        Browse by{" "}
        <span className="font-black text-foreground">Category</span>
      </span>

      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-1 sm:gap-2 border-2 border-primary px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-small font-black uppercase tracking-[2px] sm:tracking-[3px] text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          aria-expanded={isOpen}
          style={{ fontFamily: "Work Sans" }}
        >
          {currentCategory}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {isOpen && (
          <ul className="animate-dialog-card absolute right-0 top-full mt-2 min-w-[220px] origin-top-right bg-card border-2 border-primary divide-y divide-primary/15 shadow-2xl shadow-black/30 z-10 overflow-hidden">
            {["All", ...categories].map((category) => {
              const isSelected = currentCategory === category;
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => selectCategory(category)}
                    className={`w-full text-left px-5 py-3 text-small uppercase tracking-[1px] border-0 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                      isSelected
                        ? "bg-primary text-white font-black"
                        : "text-foreground font-semibold hover:bg-primary hover:text-white"
                    }`}
                    style={{ fontFamily: "Work Sans" }}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
