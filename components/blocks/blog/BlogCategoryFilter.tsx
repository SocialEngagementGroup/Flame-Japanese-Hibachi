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
        { value: "All", label: "All Categories" },
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
    // scroll: false keeps the reader where they are instead of jumping to the top.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-[150px] shrink-0 sm:w-[200px]">
      <FilterSelect
        label="Filter by category"
        value={currentCategory}
        onChange={selectCategory}
        groups={groups}
        placeholder="All Categories"
      />
    </div>
  );
}
