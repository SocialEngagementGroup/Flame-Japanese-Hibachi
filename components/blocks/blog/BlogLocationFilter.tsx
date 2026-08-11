"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    // Each location has a canonical, server-rendered hub. Navigate there
    // instead of creating a duplicate /blog?location=... view.
    router.push(location === "All" ? "/blog" : `/blog/${location}`);
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
