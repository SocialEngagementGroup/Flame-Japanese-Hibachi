import React, { Suspense } from "react";
import BlogSearchInput from "./BlogSearchInput";
import BlogCategoryFilter from "./BlogCategoryFilter";
import BlogResults from "./BlogResults";
import BlogResultsSkeleton from "./BlogResultsSkeleton";

type BlogGridProps = {
  categories: string[];
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
};

export default function BlogGrid({ categories, searchParams }: BlogGridProps) {
  const query = searchParams.q;
  const category = searchParams.category;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // Build a key that changes whenever parameters change to re-trigger Suspense
  const suspenseKey = `${query}-${category}-${page}`;

  return (
    <section className="w-full bg-background px-4 sm:px-5 md:px-8 py-[var(--space-xl)] transition-colors duration-300">
      <BlogSearchInput />

      <BlogCategoryFilter categories={categories} />

      <Suspense key={suspenseKey} fallback={<BlogResultsSkeleton />}>
        <BlogResults query={query} category={category} page={page} />
      </Suspense>
    </section>
  );
}
