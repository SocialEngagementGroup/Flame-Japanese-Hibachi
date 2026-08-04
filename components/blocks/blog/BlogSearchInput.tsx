"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Suggestion = {
  title: string;
  slug: string;
  category: string;
  image: string;
};

export default function BlogSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
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

  // Debounce API call for suggestions
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const abortController = new AbortController();
    
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blog/search-suggestions?q=${encodeURIComponent(q)}`, {
          signal: abortController.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions);
          setIsOpen(true);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Failed to fetch suggestions", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [query]);

  // Sync state if URL changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateUrl = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }
    params.delete("page"); // Reset page
    // scroll: false keeps the reader in place rather than jumping to the top.
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        router.push(`/blog/${suggestions[activeIndex].slug}`);
        setIsOpen(false);
      } else {
        updateUrl(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="max-w-[800px] mx-auto mb-[var(--space-lg)] relative">
      <div className="relative border border-b-2 border-primary flex items-center px-2 py-2 sm:px-[13px] sm:py-[11px]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder="Search FJH Blogs"
          className="w-full bg-transparent text-primary placeholder:text-primary/70 text-body outline-none"
          aria-expanded={isOpen}
          role="combobox"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
        {isLoading ? (
           <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
           <button type="button" onClick={() => updateUrl(query)}>
             <Search className="text-primary shrink-0" size={20} />
           </button>
        )}
      </div>

      {(isOpen || isLoading) && query.trim().length >= 2 && (
        <div 
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-primary divide-y divide-primary/15 shadow-2xl z-20 max-h-[400px] overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-primary font-sans font-bold tracking-[1px] uppercase text-small">Searching...</div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground font-sans">No matches found.</div>
          ) : (
            suggestions.map((suggestion, idx) => {
              const isActive = activeIndex === idx;
              return (
                <Link
                  key={suggestion.slug}
                  href={`/blog/${suggestion.slug}`}
                  role="option"
                  aria-selected={isActive}
                  className={`flex items-center gap-4 p-3 transition-colors group hover:bg-primary ${isActive ? "bg-primary" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative w-12 h-12 shrink-0 bg-muted overflow-hidden">
                    <Image src={suggestion.image} alt={suggestion.title} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`truncate font-serif transition-colors ${isActive ? "text-white" : "text-foreground group-hover:text-white"}`}>
                      {suggestion.title}
                    </span>
                    <span className={`text-xs uppercase tracking-wider font-sans transition-colors ${isActive ? "text-white/80" : "text-muted-foreground group-hover:text-white/80"}`}>
                      {suggestion.category}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
