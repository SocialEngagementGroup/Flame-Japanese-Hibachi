"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterSelect, { type SelectGroup } from "@/components/ui/FilterSelect";

type BlogLocationFilterProps = {
  locations: { slug: string; name: string }[];
};

/**
 * Location filter for the master /blog page. Sits beside the category filter and
 * combines with it. Because the categories available depend on the location,
 * changing the location clears the category so the category dropdown always
 * offers valid options for the new scope.
 */
export default function BlogLocationFilter({ locations }: BlogLocationFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocation = searchParams.get("location") || "All";

  const groups: SelectGroup[] = [
    {
      options: [
        { value: "All", label: "All Locations" },
        ...locations.map((location) => ({
          value: location.slug,
          label: location.name,
        })),
      ],
    },
  ];

  const selectLocation = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (location !== "All") {
      params.set("location", location);
    } else {
      params.delete("location");
    }
    params.delete("category"); // categories depend on the location
    params.delete("page");
    // scroll: false keeps the reader where they are instead of jumping to the top.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-[170px] shrink-0 sm:w-[230px]">
      <FilterSelect
        label="Filter by location"
        value={currentLocation}
        onChange={selectLocation}
        groups={groups}
        placeholder="All Locations"
      />
    </div>
  );
}
