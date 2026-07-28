"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import type { EmploymentType, JobPosting } from "@/lib/types";
import {
  comingSoonLocationValues,
  getCareerLocationGroups,
  jobPostings,
} from "@/lib/data/careers";
import FilterSelect, { type SelectGroup } from "@/components/ui/FilterSelect";

const ALL = "all";

type ListingView = "open" | "closed" | "all";

const LISTING_VIEWS: { value: ListingView; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
  { value: "all", label: "All" },
];

const EMPLOYMENT_TYPES: EmploymentType[] = ["Full-time", "Part-time"];

const selectClass =
  "w-full bg-transparent border border-border focus:border-primary px-4 py-3 text-body text-[#1C1B1B] dark:text-white outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer";

const labelClass =
  "block text-[#1C1B1B] dark:text-gray-400 text-[13px] font-black uppercase tracking-widest mb-2";

const JobCard = ({ job }: { job: JobPosting }) => {
  const closed = job.listingStatus === "closed";
  return (
  <Link
    href={`/careers/${job.slug}`}
    className={`group text-left flex flex-col h-full bg-white dark:bg-[#111111] border p-[var(--space-lg)] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 ${
      closed
        ? "border-border opacity-70 hover:opacity-100"
        : "border-border hover:border-primary/50"
    }`}
  >
    {closed && (
      <div className="mb-4">
        <span className="inline-block bg-primary text-white text-[11px] font-black uppercase tracking-[2px] px-2.5 py-1">
          Closed
        </span>
      </div>
    )}

    <h3 className="heading-h4 text-[#1C1B1B] dark:text-white mb-2 group-hover:text-primary transition-colors">
      {job.title}
    </h3>

    <p className="text-small text-gray-600 dark:text-gray-400 leading-relaxed mb-[var(--space-md)] flex-1">
      {job.summary}
    </p>

    <div className="mb-[var(--space-md)]">
      <span className="flex items-center gap-2 text-small text-gray-700 dark:text-gray-300">
        <MapPin className="w-4 h-4 text-primary shrink-0" />
        {job.locationLabel}
      </span>
    </div>

    <div className="flex items-center justify-between pt-[var(--space-md)] border-t border-border">
      <span className="text-[12px] font-black uppercase tracking-[2px] text-gray-500 dark:text-gray-400">
        {job.employmentType}
      </span>
      <span className="text-[13px] font-black uppercase tracking-[2px] text-primary">
        {closed ? "View details →" : "View role →"}
      </span>
    </div>
  </Link>
  );
};

const CareersJobBoard = () => {
  const [location, setLocation] = useState<string>(ALL);
  const [employment, setEmployment] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [listingView, setListingView] = useState<ListingView>("open");

  const sectionRef = useRef<HTMLElement>(null);

  // After a filter changes the list can shrink, leaving the viewport parked over
  // the footer. Bring the top of the results section back into view so the first
  // job is visible. The section top is stable (it sits above the cards), so we
  // scroll synchronously rather than waiting for the re-render.
  const scrollToResults = () => {
    const section = sectionRef.current;
    if (!section) return;
    const top =
      section.getBoundingClientRect().top + window.scrollY - 120; // clear navbar
    // Only pull the view up - never push it down if the results are already
    // above the fold.
    if (window.scrollY > top + 4) {
      window.scrollTo(0, Math.max(0, top));
    }
  };

  const locationGroups = useMemo(() => getCareerLocationGroups(), []);

  // Option groups for the custom dropdowns (each leads with its "All" choice).
  const locationSelectGroups: SelectGroup[] = [
    { options: [{ value: ALL, label: "All locations" }] },
    ...locationGroups,
  ];
  const employmentSelectGroups: SelectGroup[] = [
    {
      options: [
        { value: ALL, label: "All types" },
        ...EMPLOYMENT_TYPES.map((t) => ({ value: t, label: t })),
      ],
    },
  ];

  const isClosed = (job: JobPosting) => job.listingStatus === "closed";

  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobPostings.filter((job) => {
      const jobLocationValue = job.locationSlug ?? job.locationLabel;
      if (location !== ALL && jobLocationValue !== location) return false;
      if (employment !== ALL && job.employmentType !== employment) return false;
      if (q) {
        const haystack = `${job.title} ${job.summary} ${job.locationLabel}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [location, employment, query]);

  const counts = useMemo(
    () => ({
      all: baseFiltered.length,
      open: baseFiltered.filter((j) => !isClosed(j)).length,
      closed: baseFiltered.filter(isClosed).length,
    }),
    [baseFiltered],
  );

  const filtered = useMemo(() => {
    if (listingView === "open") return baseFiltered.filter((j) => !isClosed(j));
    if (listingView === "closed") return baseFiltered.filter(isClosed);
    return baseFiltered;
  }, [baseFiltered, listingView]);

  const hasActiveFilters =
    location !== ALL ||
    employment !== ALL ||
    query.trim() !== "" ||
    listingView !== "open";

  // A coming-soon location legitimately has no live roles yet - say so, rather
  // than showing the generic "no matches" copy.
  const comingSoonSelected =
    location !== ALL && comingSoonLocationValues.has(location);
  const comingSoonLabel = comingSoonSelected ? location.replace(/^soon:/, "") : "";

  const clearAll = () => {
    setLocation(ALL);
    setEmployment(ALL);
    setQuery("");
    setListingView("open");
  };

  return (
    <section
      ref={sectionRef}
      id="open-roles"
      className="w-full bg-[#F7F5F5] dark:bg-[#070907] py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300 scroll-mt-[120px]"
    >
      <div className="max-w-[1430px] mx-auto grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-[var(--gap-lg)] items-start">
        {/* ── Left rail: filter navigation ───────────────────────────── */}
        <aside className="lg:sticky lg:top-[130px] bg-white dark:bg-[#111111] border border-border p-[var(--space-lg)]">
          <div className="flex items-center justify-between gap-2 mb-[var(--space-lg)] text-[#1C1B1B] dark:text-white">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span className="text-small font-black uppercase tracking-[2px]">
                Filter Openings
              </span>
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-[1px] text-primary hover:opacity-80 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="space-y-[var(--space-lg)]">
            <div>
              <label htmlFor="filter-search" className={labelClass}>
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="filter-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chef, driver, manager…"
                  className={`${selectClass} pl-9`}
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Status - reads as the primary nav for the list */}
            <div>
              <span className={labelClass}>Status</span>
              <div className="flex flex-col gap-2">
                {LISTING_VIEWS.map((view) => {
                  const selected = listingView === view.value;
                  return (
                    <button
                      key={view.value}
                      type="button"
                      onClick={() => {
                        setListingView(view.value);
                        scrollToResults();
                      }}
                      aria-pressed={selected}
                      className={`flex items-center justify-between px-4 py-2.5 text-[13px] font-black uppercase tracking-[1.5px] border transition-colors ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "border-border text-gray-600 dark:text-gray-300 hover:border-primary/60 hover:text-primary"
                      }`}
                    >
                      <span>{view.label}</span>
                      <span className={selected ? "text-white/80" : "text-gray-400"}>
                        {counts[view.value]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className={labelClass}>Location</span>
              <FilterSelect
                label="Location"
                value={location}
                onChange={(v) => {
                  setLocation(v);
                  scrollToResults();
                }}
                groups={locationSelectGroups}
              />
            </div>

            <div>
              <span className={labelClass}>Job type</span>
              <FilterSelect
                label="Job type"
                value={employment}
                onChange={(v) => {
                  setEmployment(v);
                  scrollToResults();
                }}
                groups={employmentSelectGroups}
              />
            </div>
          </div>
        </aside>

        {/* ── Right column: results ──────────────────────────────────── */}
        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--gap-lg)]">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-[var(--space-2xl)] px-[var(--space-lg)] border border-dashed border-border">
              {comingSoonSelected ? (
                <>
                  <span className="inline-block bg-primary/10 text-primary text-[12px] font-black uppercase tracking-[2px] px-3 py-1 mb-4">
                    Opening Soon
                  </span>
                  <p className="heading-h4 text-[#1C1B1B] dark:text-white mb-2">
                    {`${comingSoonLabel} isn't open just yet`}
                  </p>
                  <p className="text-body text-gray-600 dark:text-gray-400 mb-[var(--space-lg)] max-w-[560px] mx-auto">
                    We staff new stores a few weeks before the doors open. Send
                    us your résumé now and you&apos;ll be first in line when{" "}
                    {comingSoonLabel} starts hiring.
                  </p>
                  <a
                    href={`mailto:mohammedrhaque@gmail.com?subject=${encodeURIComponent(
                      `Future opening - ${comingSoonLabel}`,
                    )}`}
                    className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 text-small font-black tracking-[3px] uppercase transition-all"
                  >
                    Get On The List
                  </a>
                </>
              ) : (
                <>
                  <p className="heading-h4 text-[#1C1B1B] dark:text-white mb-2">
                    No roles match those filters
                  </p>
                  <p className="text-body text-gray-600 dark:text-gray-400 mb-[var(--space-lg)]">
                    Try widening your search - or send us your résumé and
                    we&apos;ll reach out when something opens.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 text-small font-black tracking-[3px] uppercase transition-all"
                  >
                    Reset Filters
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareersJobBoard;
