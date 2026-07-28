/**
 * Types for the careers board (/careers).
 *
 * A JobPosting is authored in lib/data/careers.ts. Store-based roles reference a
 * real store through `locationSlug` (a slug in data/locationsData.ts) so the
 * board's location filter and the "where" line stay in sync with the single
 * source of truth for stores. Corporate / multi-store roles leave `locationSlug`
 * unset and carry their own `locationLabel` (e.g. "Corporate HQ · Baltimore, MD").
 */

export type JobDepartment =
  | "Culinary"
  | "Front of House"
  | "Management"
  | "Catering & Events"
  | "Delivery & Logistics"
  | "Corporate";

export type EmploymentType = "Full-time" | "Part-time";

export type JobPosting = {
  id: string;
  /** Stable, URL-safe id used for anchors and the mailto subject line. */
  slug: string;
  title: string;
  department: JobDepartment;
  employmentType: EmploymentType;
  /**
   * Slug of the store this role sits in (see data/locationsData.ts). Omit for
   * corporate / multi-store roles that have no single storefront.
   */
  locationSlug?: string;
  /** Display label for the role's location, always set (derived for store roles). */
  locationLabel: string;
  /** Full street address shown on the detail page. For store roles it's derived
   * from the location; set it directly for roles with no store slug. */
  addressLine?: string;
  /** Optional pay range - not currently surfaced in the UI. */
  compensation?: string;
  /** One-line hook shown on the card. */
  summary: string;
  /** Opening ("About Us") paragraph shown at the top of the detail view. */
  description: string;
  /** Bulleted responsibilities. */
  responsibilities: string[];
  /** Bulleted qualifications. */
  requirements: string[];
  /** Bulleted benefits. */
  perks: string[];
  /** Short status badge, e.g. "Actively interviewing" - kept dateless on purpose. */
  status?: string;
  /**
   * Whether the posting is still open. "active" (or omitted) shows by default;
   * "closed" is a filled/old role, hidden unless the board's Filled/All view is
   * selected. Lets the team retire a posting without deleting its page.
   */
  listingStatus?: "active" | "closed";
};
