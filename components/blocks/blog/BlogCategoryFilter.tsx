"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterSelect, { type SelectGroup } from "@/components/ui/FilterSelect";

export default function BlogCategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";

  const groups: SelectGroup[] = [
    {
      options: [
        { value: "All", label: "All" },
        ...categories.map((category) => ({ value: category, label: category })),
      ],
    },
  ];

  const selectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset page
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-[var(--space-xl)]">
      <span className="text-small font-semibold uppercase tracking-[3px] text-muted-foreground">
        Browse by{" "}
        <span className="font-black text-foreground">Category</span>
      </span>

      {/* Shared FilterSelect - same dropdown used on the careers page. */}
      <div className="w-[160px] shrink-0 sm:w-[220px]">
        <FilterSelect
          label="Filter by category"
          value={currentCategory}
          onChange={selectCategory}
          groups={groups}
          placeholder="All"
        />
      </div>
    </div>
  );
}
