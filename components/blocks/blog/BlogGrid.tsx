import React, { Suspense } from "react";
import BlogSearchInput from "./BlogSearchInput";
import BlogClearFilters from "./BlogClearFilters";
import BlogCategoryFilter from "./BlogCategoryFilter";
import BlogLocationFilter from "./BlogLocationFilter";
import BlogResults from "./BlogResults";
import BlogResultsSkeleton from "./BlogResultsSkeleton";
import { getBlogCategoriesForLocation } from "@/lib/data/blog-data";
import { getActiveLocations } from "@/lib/api/locations";

type BlogGridProps = {
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
    location?: string;
  };
  /** Fixed location on a hub page - hides the location filter. */
  location?: string;
  /** Master page - shows the location filter (reads ?location=). */
  showLocationFilter?: boolean;
};

export default function BlogGrid({
  searchParams,
  location,
  showLocationFilter,
}: BlogGridProps) {
  const query = searchParams.q;
  const category = searchParams.category;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // A hub fixes the location; the master page reads it from the filter.
  const effectiveLocation = location ?? searchParams.location;

  // Category options recompute for whatever location is in scope.
  const categories = getBlogCategoriesForLocation(effectiveLocation);
  const locations = showLocationFilter
    ? getActiveLocations().map((l) => ({ slug: l.slug, name: l.name }))
    : [];

  // Re-trigger Suspense whenever any filter changes.
  const suspenseKey = `${effectiveLocation ?? ""}-${query}-${category}-${page}`;

  return (
    <section className="w-full bg-background px-4 sm:px-5 md:px-8 py-[var(--space-xl)] transition-colors duration-300">
      <BlogSearchInput />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-[var(--space-xl)]">
        <span className="text-small font-semibold uppercase tracking-[3px] text-muted-foreground">
          Filter <span className="font-black text-foreground">posts</span>
        </span>

        <div className="flex flex-wrap items-center gap-3">
          {/* Clear button - only when a filter is active. */}
          <BlogClearFilters />
          {/* Left: category, whose options change with the location. */}
          <BlogCategoryFilter categories={categories} />
          {/* Right: location, master page only. */}
          {showLocationFilter && <BlogLocationFilter locations={locations} />}
        </div>
      </div>

      <Suspense key={suspenseKey} fallback={<BlogResultsSkeleton />}>
        <BlogResults
          query={query}
          category={category}
          page={page}
          location={effectiveLocation}
        />
      </Suspense>
    </section>
  );
}
