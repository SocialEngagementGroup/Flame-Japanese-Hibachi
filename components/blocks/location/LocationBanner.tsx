import Link from "next/link";
import type { Location } from "@/lib/types";

interface LocationBannerProps {
  location: Location;
  /** Human label for what kind of page this is, e.g. "menu" or "catering". */
  pageLabel: string;
}

/** Thin bar at the top of a per-location page confirming which store the visitor landed on. */
export default function LocationBanner({
  location,
  pageLabel,
}: LocationBannerProps) {
  return (
    <div className="w-full border-b border-[#FF7808]/20 bg-background px-5 py-3 text-center text-small text-zinc-600 dark:text-zinc-300">
      Viewing {pageLabel} for{" "}
      <span className="font-bold text-[#FF7808]">{location.name}</span>
      {" · "}
      <Link
        href="/locations"
        className="underline underline-offset-2 hover:text-[#FF7808]"
      >
        Not your location?
      </Link>
    </div>
  );
}
