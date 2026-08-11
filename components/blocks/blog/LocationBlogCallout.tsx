import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocationLabel } from "@/lib/api/locations";
import type { Location } from "@/lib/types";

/** Direct crawl path from each location landing page to its local blog hub. */
export default function LocationBlogCallout({ location }: { location: Location }) {
  const label = getLocationLabel(location);

  return (
    <aside className="w-full border-y border-primary/15 bg-primary/5 px-4 py-[var(--space-lg)] sm:px-5 md:px-8">
      <div className="mx-auto flex w-full max-w-[1430px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-small font-black uppercase tracking-[3px] text-primary">
            Local guides
          </p>
          <p className="mt-1 text-body font-semibold text-foreground">
            Explore halal hibachi guides and local stories from our {label} kitchen.
          </p>
        </div>
        <Link
          href={`/blog/${location.slug}`}
          className="inline-flex shrink-0 items-center gap-1 self-start text-small font-black uppercase tracking-[2px] text-primary underline underline-offset-4 transition-colors hover:text-foreground sm:self-auto"
        >
          Visit the {label} blog
          <ArrowUpRight size={14} aria-hidden className="shrink-0" />
        </Link>
      </div>
    </aside>
  );
}
