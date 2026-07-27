"use client";

import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import BlogCard, { type BlogCardData } from "./BlogCard";

const POSTS_PER_PAGE = 3;

type BlogRelatedPostsProps = {
  posts: BlogCardData[];
};

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  const [page, setPage] = useState(1);

  if (posts.length === 0) return null;

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="w-full bg-background px-4 sm:px-5 md:px-8 py-[var(--space-2xl)] transition-colors duration-300">
      <h2
        className="mb-[var(--space-xl)]"
        style={{
          color: "#FFF",
          fontFamily: "Raleway",
          fontSize: "48px",
          fontStyle: "normal",
          fontWeight: 800,
          lineHeight: "53px",
          letterSpacing: "4.8px",
          textTransform: "uppercase",
        }}
      >
        Keep Reading
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3! gap-x-[var(--gap-lg)] gap-y-[var(--space-xl)]">
        {paginatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-[var(--space-2xl)]">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary transition-colors duration-300"
            aria-label="Previous page"
          >
            <FaArrowLeftLong size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`w-[55px] h-[55px] flex items-center justify-center font-sans font-black text-[20px] border-2 border-primary transition-colors duration-300 ${
                  pageNumber === currentPage
                    ? "bg-primary text-white"
                    : "bg-transparent text-muted-foreground hover:bg-primary hover:text-white"
                }`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary transition-colors duration-300"
            aria-label="Next page"
          >
            <FaArrowRightLong size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
