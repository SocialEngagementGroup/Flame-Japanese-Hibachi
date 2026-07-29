"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { getLocationLabel } from "@/lib/api/locations";

/**
 * Back link on a blog post. It follows the visitor's currently selected store
 * (same source as the footer's Blog link) rather than the post's own location,
 * so it always returns them to the hub they are browsing from. Falls back to the
 * all-blogs page when no store is selected yet.
 */
export default function BlogBackLink() {
  const { nearest } = useNearestLocation();
  const href = nearest?.slug ? `/blog/${nearest.slug}` : "/blog";
  const label = nearest ? `${getLocationLabel(nearest)} Blog` : "All Blogs";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-small font-black uppercase tracking-[2px] text-primary hover:opacity-80 transition-opacity mb-[var(--space-lg)]"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
