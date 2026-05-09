import { activeLocations, comingSoonLocations } from "@/data/locationsData";
import type { Location, ComingSoonLocation } from "@/lib/types";

export function getActiveLocations(): Location[] {
  return activeLocations;
}

export function getComingSoonLocations(): ComingSoonLocation[] {
  return comingSoonLocations;
}
