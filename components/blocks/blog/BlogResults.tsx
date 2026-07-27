import React from "react";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import { searchBlogPosts } from "@/lib/data/blog-data";

export default function BlogResults({
  query,
  category,
  page,
}: {
  query?: string;
  category?: string;
  page?: number;
}) {
  const { posts, totalPages, page: currentPage } = searchBlogPosts({
    q: query,
    category,
    page,
  });

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-body text-muted-foreground text-center py-[var(--space-xl)]">
          No articles match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3! gap-x-[var(--gap-lg)] gap-y-[var(--space-xl)]">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <BlogPagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
