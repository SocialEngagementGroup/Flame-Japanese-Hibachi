import React from "react";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import { searchBlogPosts } from "@/lib/data/blog-data";

export default function BlogResults({
  query,
  category,
  page,
  location,
}: {
  query?: string;
  category?: string;
  page?: number;
  /** When set, scope to a location hub: common posts + that location's dedicated. */
  location?: string;
}) {
  const { posts, totalPages, page: currentPage } = searchBlogPosts({
    q: query,
    category,
    location,
    page,
    // 3-column grid x 5 rows per page on desktop.
    limit: 15,
  });

  if (posts.length === 0) {
    const isFiltered = Boolean(query) || Boolean(category && category !== "All");
    return (
      <p className="text-body text-muted-foreground text-center py-[var(--space-2xl)]">
        {isFiltered
          ? "No articles match your search."
          : "Articles are coming soon — check back shortly."}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3! gap-x-[var(--gap-lg)] gap-y-[var(--space-xl)]">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <BlogPagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
