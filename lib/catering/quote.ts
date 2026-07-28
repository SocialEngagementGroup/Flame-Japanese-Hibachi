import { cateringAddOns, cateringMenuSections } from "@/lib/data/catering";
import type { CateringAddOn, CateringPackage } from "@/lib/types";

export type QuoteLine = { id: string; qty: number };

export type ResolvedPackage = CateringPackage & {
  menuId: string;
  menuTitle: string;
  unitPrice: number;
};

export type EstimateLine = {
  kind: "package" | "addon";
  id: string;
  label: string;
  /** What the quantity means, spelled out - "100 PEOPLE", "× 120 guests". */
  detail: string;
  qty: number;
  total: number;
};

export type Estimate = { lines: EstimateLine[]; subtotal: number };

/** "$1,500" → 1500. Anything unparseable is 0 rather than NaN. */
export const parsePrice = (price: string): number => {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
};

const packageIndex = new Map<string, ResolvedPackage>(
  cateringMenuSections.flatMap((section) =>
    section.items.map(
      (item) =>
        [
          item.id,
          {
            ...item,
            menuId: section.id,
            menuTitle: section.title,
            unitPrice: parsePrice(item.price),
          },
        ] as const,
    ),
  ),
);

const addOnIndex = new Map(cateringAddOns.map((a) => [a.id, a] as const));

export const findPackage = (id: string): ResolvedPackage | null =>
  packageIndex.get(id) ?? null;

export const findAddOn = (id: string): CateringAddOn | null =>
  addOnIndex.get(id) ?? null;

export const allPackages = (): ResolvedPackage[] => [...packageIndex.values()];

/**
 * How many guests a package feeds, or null when it isn't measured in people -
 * the wings menu is sold by the piece ("150 PIECES"), so it must not count
 * toward the headcount coverage check.
 */
export const packageCapacity = (pkg: ResolvedPackage): number | null => {
  const match = pkg.people.match(/^(\d+)\s*PEOPLE$/i);
  return match ? Number(match[1]) : null;
};

/** Per-person add-ons are all-or-nothing; only flat ones take a real quantity. */
export const maxQtyFor = (addOn: CateringAddOn): number =>
  addOn.unit === "per_person" ? 1 : 99;

/**
 * Prices a quote.
 *
 * Per-person add-ons multiply by the *event headcount*, not by the combined
 * capacity of the chosen packages - someone ordering a 100-guest tray for 120
 * people still wants 120 spring rolls. The multiplier is surfaced in the UI so
 * a customer who disagrees corrects the headcount rather than being quietly
 * overcharged.
 *
 * Delivery, tax and any on-site chef fee are deliberately absent: they depend
 * on the venue, which is why every total shown is labelled an estimate.
 */
export function calculateEstimate(
  packages: QuoteLine[],
  addons: QuoteLine[],
  headcount: number,
): Estimate {
  const guests = Number.isFinite(headcount) && headcount > 0 ? headcount : 0;
  const lines: EstimateLine[] = [];

  for (const line of packages) {
    const pkg = findPackage(line.id);
    if (!pkg || line.qty < 1) continue;
    lines.push({
      kind: "package",
      id: pkg.id,
      label: pkg.menuTitle,
      detail: pkg.people,
      qty: line.qty,
      total: pkg.unitPrice * line.qty,
    });
  }

  for (const line of addons) {
    const addOn = findAddOn(line.id);
    if (!addOn || line.qty < 1) continue;
    const perPerson = addOn.unit === "per_person";
    const qty = Math.min(line.qty, maxQtyFor(addOn));
    lines.push({
      kind: "addon",
      id: addOn.id,
      label: addOn.name,
      detail: perPerson ? `× ${guests} guests` : `× ${qty}`,
      qty,
      total: addOn.unitPrice * (perPerson ? guests : qty),
    });
  }

  return {
    lines,
    subtotal: lines.reduce((sum, line) => sum + line.total, 0),
  };
}

/** Total guests the chosen packages cover, for the headcount coverage nudge. */
export function coveredGuests(packages: QuoteLine[]): number {
  return packages.reduce((sum, line) => {
    const pkg = findPackage(line.id);
    if (!pkg) return sum;
    const capacity = packageCapacity(pkg);
    return capacity === null ? sum : sum + capacity * line.qty;
  }, 0);
}

export const formatMoney = (amount: number): string =>
  `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/** One-line rendering of the whole order, for the lead sheet and Chat card. */
export const summariseEstimate = (estimate: Estimate): string =>
  estimate.lines
    .map(
      (line) =>
        `${line.qty}× ${line.label} (${line.detail}) ${formatMoney(line.total)}`,
    )
    .join("; ");
