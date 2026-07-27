"use client";

import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function BlogPagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-[var(--space-2xl)]">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          aria-label="Previous page"
        >
          <FaArrowLeftLong size={16} />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary opacity-30 bg-transparent transition-colors duration-300"
          aria-label="Previous page"
        >
          <FaArrowLeftLong size={16} />
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
        const isCurrent = pageNumber === currentPage;
        return (
          <Link
            key={pageNumber}
            href={createPageUrl(pageNumber)}
            className={`w-[55px] h-[55px] flex items-center justify-center font-sans font-black text-[20px] border-2 border-primary transition-colors duration-300 ${
              isCurrent
                ? "bg-primary text-white"
                : "bg-transparent text-muted-foreground hover:bg-primary hover:text-white"
            }`}
            aria-current={isCurrent ? "page" : undefined}
            style={{ fontFamily: "Work Sans" }}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
          aria-label="Next page"
        >
          <FaArrowRightLong size={16} />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-9 h-9 flex items-center justify-center border-2 border-primary text-primary opacity-30 bg-transparent transition-colors duration-300"
          aria-label="Next page"
        >
          <FaArrowRightLong size={16} />
        </button>
      )}
    </div>
  );
}
