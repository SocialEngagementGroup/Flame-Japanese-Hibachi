"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

type MinimalPost = {
  slug: string;
  title: string;
};

export default function BlogPostsDropdown({ categories }: { categories: string[] }) {
  const router = useRouter();
  
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
    const params = new URLSearchParams();
    if (category !== "All") {
      params.set("category", category);
    }
    router.push(`/blog?${params.toString()}`);
    setIsOpen(false);
  };

  const dropdownItems = ["All", ...categories];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-1 sm:gap-2 border-2 border-primary px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-small font-black uppercase tracking-[2px] sm:tracking-[3px] transition-colors duration-300 ${
          isOpen ? "bg-primary text-white" : "text-primary hover:bg-primary hover:text-white"
        }`}
        aria-expanded={isOpen}
        style={{ fontFamily: "Work Sans" }}
      >
        ALL
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <ul className="animate-dialog-card absolute right-0 top-full mt-2 w-max min-w-[200px] max-w-[300px] sm:max-w-[400px] origin-top-right bg-card border-2 border-primary divide-y divide-primary/15 shadow-2xl shadow-black/30 z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {dropdownItems.map((category) => {
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => selectCategory(category)}
                  className={`w-full text-left px-5 py-3 text-small tracking-[1px] border-0 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary font-semibold text-foreground hover:bg-primary hover:text-white uppercase`}
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
  );
}
