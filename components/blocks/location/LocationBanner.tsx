import Link from "next/link";
import type { Location } from "@/lib/types";
import ChangeLocationButton from "./ChangeLocationButton";

type LocationPageLabel = "menu" | "catering" | "store" | "blog";

interface LocationBannerProps {
  location: Location;
  pageLabel: LocationPageLabel;
}

const locationSections: Array<{ label: string; section: LocationPageLabel }> = [
  { label: "Menu", section: "menu" },
  { label: "Catering", section: "catering" },
  { label: "Store", section: "store" },
  { label: "Blog", section: "blog" },
];

/** Thin bar at the top of a per-location page confirming which store the visitor landed on. */
export default function LocationBanner({
  location,
  pageLabel,
}: LocationBannerProps) {
  return (
    <div className="w-full border-b border-[#FF7808]/20 bg-background px-5 py-3 text-small text-zinc-600 dark:text-zinc-300">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        <span className="text-center">
          Viewing {pageLabel} for{" "}
          <span className="font-bold text-[#FF7808]">{location.name}</span>
          {" · "}
          <ChangeLocationButton />
        </span>
        <nav aria-label={`${location.name} pages`} className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {locationSections.map(({ label, section }) => (
            <Link
              key={section}
              href={`/${section}/${location.slug}`}
              aria-current={section === pageLabel ? "page" : undefined}
              className={
                section === pageLabel
                  ? "font-bold text-[#FF7808]"
                  : "underline decoration-[#FF7808]/40 underline-offset-2 hover:text-[#FF7808]"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
