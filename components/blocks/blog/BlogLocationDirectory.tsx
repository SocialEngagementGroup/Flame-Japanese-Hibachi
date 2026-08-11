import Link from "next/link";
import { getActiveLocations, getLocationLabel } from "@/lib/api/locations";

/**
 * Crawlable entry points to every location blog hub. The location dropdown is
 * useful for people, but it navigates with client-side JavaScript; these plain
 * anchors make the same hubs discoverable without requiring interaction.
 */
export default function BlogLocationDirectory() {
  const locations = getActiveLocations();

  return (
    <nav
      aria-label="Blog locations"
      className="w-full border-b border-primary/15 bg-background px-4 py-[var(--space-lg)] sm:px-5 md:px-8"
    >
      <div className="mx-auto w-full md:w-[80%]">
        <p className="mb-3 text-small font-black uppercase tracking-[3px] text-primary">
          Browse local stories
        </p>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/blog/${location.slug}`}
              className="border border-primary/35 px-3 py-2 text-small font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              {getLocationLabel(location)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
