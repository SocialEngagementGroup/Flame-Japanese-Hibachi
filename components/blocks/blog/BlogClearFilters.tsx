"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * Clears the active blog filters (search, category and location) back to the
 * current page's base URL. Renders nothing until at least one filter is set, and
 * keeps the scroll position so the list doesn't jump to the top.
 */
export default function BlogClearFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasActiveFilter = ["q", "category", "location"].some((key) =>
    searchParams.get(key),
  );

  if (!hasActiveFilter) return null;

  const clear = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <button
      type="button"
      onClick={clear}
      className="inline-flex shrink-0 items-center gap-1.5 border border-border px-3 py-3 text-small font-black uppercase tracking-[2px] text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
    >
      <X className="w-4 h-4 shrink-0" />
      Clear
    </button>
  );
}
