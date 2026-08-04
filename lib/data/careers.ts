import type { JobDepartment, JobPosting } from "@/lib/types";
import { getActiveLocations, getComingSoonLocations } from "@/lib/api/locations";

/**
 * Placeholder openings for the careers board.
 *
 * These are illustrative postings - the pay ranges, requirements and perks are
 * written to be realistic for each market, but they are not live requisitions.
 * Wire a real ATS (Greenhouse, Workable, an "apply" webhook, etc.) into
 * CareersJobBoard's apply action before treating any of these as a real hire.
 *
 * Store-based roles set `locationSlug` to a slug in data/locationsData.ts so the
 * board's location filter is generated from actual stores. Corporate roles omit
 * it and carry their own `locationLabel`.
 */

/** Ordering + copy for each department chip and the grouped view. */
export const jobDepartments: { key: JobDepartment; blurb: string }[] = [
  { key: "Culinary", blurb: "The line, the grill, the theater of the meal." },
  { key: "Front of House", blurb: "First hello to last thank-you." },
  { key: "Management", blurb: "Run the shift, grow the team, own the numbers." },
  { key: "Catering & Events", blurb: "Feed 200 guests without breaking a sweat." },
  { key: "Delivery & Logistics", blurb: "Get it there hot and on time." },
  { key: "Corporate", blurb: "Build the brand behind the brand." },
];

/** Store label without the trailing state, matched from the locations source. */
function storeLabel(slug: string): string {
  const store = getActiveLocations().find((l) => l.slug === slug);
  return store ? store.name : slug;
}

const CORAL_SPRINGS_ADDRESS = "6291 West Sample Rd, Coral Springs, FL 33067";

export const jobPostings: JobPosting[] = [
  {
    id: "cashier-coral-springs",
    slug: "cashier-coral-springs-fl",
    title: "Cashier",
    department: "Front of House",
    employmentType: "Full-time",
    locationLabel: "Coral Springs, FL",
    addressLine: CORAL_SPRINGS_ADDRESS,
    summary:
      "The first and last face our Coral Springs guests see. Run the register with speed and a smile.",
    description:
      "Flame Japanese Hibachi is a fast-growing hibachi restaurant brand with locations across Maryland, Virginia, Florida, and Pennsylvania. We're looking for a friendly, detail-oriented Cashier to join our Coral Springs team as the first and last point of contact for our guests.",
    responsibilities: [
      "Greet guests warmly and manage the front register with accuracy and speed",
      "Process orders, payments, and refunds using our POS system",
      "Handle to-go and DoorDash order pickups efficiently",
      "Keep the front-of-house area clean, organized, and guest-ready",
      "Answer phone calls and assist with basic guest inquiries",
      "Communicate clearly with kitchen and serving staff to keep orders moving",
    ],
    requirements: [
      "Prior cashier or customer service experience preferred, not required",
      "Strong communication and basic math skills",
      "Ability to stay calm and friendly during busy rushes",
      "Reliable and punctual",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Now hiring",
  },
  {
    id: "barista-coral-springs",
    slug: "barista-coral-springs-fl",
    title: "Barista",
    department: "Front of House",
    employmentType: "Full-time",
    locationLabel: "Coral Springs, FL",
    addressLine: CORAL_SPRINGS_ADDRESS,
    summary:
      "Craft coffee, tea and specialty drinks alongside the hibachi menu at our Coral Springs store.",
    description:
      "Flame Japanese Hibachi is expanding across multiple states and is looking for an energetic Barista at our Coral Springs location to craft quality beverages and deliver a great guest experience alongside our hibachi menu.",
    responsibilities: [
      "Prepare coffee, tea, and specialty beverages to recipe and quality standards",
      "Take and process beverage and food orders accurately",
      "Maintain a clean, stocked, and organized beverage station",
      "Provide friendly, prompt service to every guest",
      "Follow food safety and sanitation guidelines",
      "Support front-of-house team during peak hours",
    ],
    requirements: [
      "Barista or food service experience a plus, not required",
      "Comfortable working in a fast-paced environment",
      "Positive attitude and strong attention to detail",
      "Available for flexible shifts, including weekends",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Now hiring",
  },
  {
    id: "operations-manager-coral-springs",
    slug: "restaurant-operations-manager-coral-springs-fl",
    title: "Restaurant Operations Manager",
    department: "Management",
    employmentType: "Full-time",
    locationLabel: "Coral Springs, FL",
    addressLine: CORAL_SPRINGS_ADDRESS,
    summary:
      "Oversee daily operations at our Coral Springs store and keep every hibachi visit consistent.",
    description:
      "Flame Japanese Hibachi is seeking an experienced Restaurant Operations Manager to oversee daily operations at our Coral Springs location, ensuring guests get a consistent, high-quality hibachi experience every visit.",
    responsibilities: [
      "Oversee day-to-day restaurant operations, staffing, and scheduling",
      "Manage inventory, ordering, and vendor relationships",
      "Train, coach, and supervise front-of-house and kitchen staff",
      "Ensure compliance with food safety, health, and safety standards",
      "Monitor labor and food costs to meet budget targets",
      "Handle guest concerns and ensure high service standards",
      "Support hiring and onboarding of new team members",
    ],
    requirements: [
      "2+ years of restaurant management or supervisory experience",
      "Strong leadership, organizational, and problem-solving skills",
      "Working knowledge of POS systems and inventory management",
      "ServSafe certification (or willingness to obtain)",
      "Ability to work nights, weekends, and holidays as needed",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Now hiring",
  },
  {
    id: "line-cook-coral-springs",
    slug: "line-cook-coral-springs-fl",
    title: "Line Cook",
    department: "Culinary",
    employmentType: "Full-time",
    locationLabel: "Coral Springs, FL",
    addressLine: CORAL_SPRINGS_ADDRESS,
    summary:
      "Prepare high-quality hibachi dishes in a fast-paced Coral Springs kitchen.",
    description:
      "Flame Japanese Hibachi is hiring a skilled Line Cook for our Coral Springs location to prepare high-quality hibachi dishes in a fast-paced kitchen environment.",
    responsibilities: [
      "Prepare and cook menu items to recipe and quality standards",
      "Set up and maintain a clean, organized cooking station",
      "Follow food safety, sanitation, and portion control guidelines",
      "Work efficiently with the kitchen team to ensure timely order fulfillment",
      "Monitor food quality and freshness throughout service",
      "Assist with prep work and inventory as needed",
    ],
    requirements: [
      "Prior line cook or kitchen experience preferred",
      "Ability to work in a fast-paced, high-heat kitchen environment",
      "Knowledge of basic food safety practices",
      "Strong teamwork and communication skills",
      "Available for flexible shifts, including evenings and weekends",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Now hiring",
  },
  {
    id: "hibachi-grill-chef-baltimore",
    slug: "hibachi-grill-chef-baltimore-md",
    title: "Hibachi Grill Chef",
    department: "Culinary",
    employmentType: "Full-time",
    locationSlug: "baltimore-md",
    locationLabel: storeLabel("baltimore-md"),
    summary:
      "Own the teppan and cook hibachi to a consistent standard through a busy line.",
    description:
      "Flame Japanese Hibachi is a fast-growing hibachi restaurant brand with locations across Maryland, Virginia, Florida, and Pennsylvania. Our Baltimore store on Moravia Road is one of our busiest, and the grill is the heart of it. The Hibachi Grill Chef cooks proteins, rice and vegetables to a consistent standard while keeping the station clean and the line moving.",
    responsibilities: [
      "Grill hibachi chicken, steak, shrimp and vegetables to recipe and quality standards",
      "Keep the teppan, hood and prep area clean and up to food-safety standards",
      "Manage cook times so the counter never waits on the grill",
      "Portion consistently across single plates and large catering trays",
      "Flag low prep early so the team can restock before service runs out",
    ],
    requirements: [
      "1+ year on a hot line; teppan or hibachi experience preferred",
      "Comfortable working over an open grill for a full shift",
      "ServSafe Food Handler card (or willingness to obtain)",
      "Reliable, fast and calm under pressure",
      "Weekend and evening availability",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "line-cook-manassas",
    slug: "line-cook-manassas-va",
    title: "Line Cook",
    department: "Culinary",
    employmentType: "Full-time",
    locationSlug: "manassas-va",
    locationLabel: storeLabel("manassas-va"),
    summary:
      "Prep, portion and plate alongside the grill team at our Manassas store.",
    description:
      "Flame Japanese Hibachi is hiring a Line Cook for our Manassas location on Liberia Avenue. The Line Cook keeps the grill fed and the plates moving, handling prep, sauces, the fryer and assembly in a fast-paced kitchen.",
    responsibilities: [
      "Execute daily prep lists for proteins, vegetables, rice and house sauces",
      "Assemble and plate orders quickly and accurately during service",
      "Hold the fryer and sauce stations and cover the grill when needed",
      "Follow first-in-first-out rotation and label every prepped item",
      "Break down and deep-clean your station at close",
    ],
    requirements: [
      "Prior kitchen experience preferred, not required",
      "Able to lift 40 lbs and stay on your feet through a shift",
      "Willing to learn the teppan grill",
      "Evening and weekend availability",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "kitchen-steward-aberdeen",
    slug: "kitchen-steward-aberdeen-md",
    title: "Kitchen Steward / Dishwasher",
    department: "Culinary",
    employmentType: "Part-time",
    locationSlug: "aberdeen-md",
    locationLabel: storeLabel("aberdeen-md"),
    summary:
      "Keep the dish pit and kitchen moving at our Aberdeen store.",
    description:
      "Flame Japanese Hibachi is looking for a dependable Kitchen Steward at our Aberdeen location. A clean kitchen is a fast kitchen, and the Steward keeps pans, utensils and stations cycling so the line never slows down.",
    responsibilities: [
      "Run dishes, trays and smallwares through the machine and restock stations",
      "Keep floors, drains and the dish area clean and safe",
      "Take out trash and recycling and break down boxes",
      "Help with light prep when the pit is caught up",
    ],
    requirements: [
      "No experience needed",
      "Reliable and able to work at a steady pace on your feet",
      "Evening and weekend availability",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "server-alexandria",
    slug: "team-member-server-alexandria-va",
    title: "Server / Team Member",
    department: "Front of House",
    employmentType: "Full-time",
    locationSlug: "alexandria-va",
    locationLabel: storeLabel("alexandria-va"),
    summary:
      "Take care of guests at the counter and in the dining room on Richmond Highway.",
    description:
      "Flame Japanese Hibachi is hiring a Server at our Alexandria location on Richmond Highway. You are the face of Flame, greeting guests, taking and expediting orders, and making sure every guest leaves happy.",
    responsibilities: [
      "Greet and serve guests warmly at the counter and on the floor",
      "Enter orders accurately and expedite them from the line",
      "Answer questions about the menu, including Halal and allergen information",
      "Keep the dining room, drink station and restrooms clean through service",
      "Handle pickup and delivery-app handoffs smoothly",
    ],
    requirements: [
      "Customer-service experience preferred, not required",
      "Warm, upbeat and unflappable during a rush",
      "Comfortable on a POS or tablet system",
      "Weekend and evening availability",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "shift-leader-forest-hill",
    slug: "shift-leader-forest-hill-richmond-va",
    title: "Shift Leader",
    department: "Management",
    employmentType: "Full-time",
    locationSlug: "forest-hill-richmond-va",
    locationLabel: storeLabel("forest-hill-richmond-va"),
    summary:
      "Run the floor and the line during your shift at our Forest Hill store.",
    description:
      "Flame Japanese Hibachi is hiring a Shift Leader at our Forest Hill store in Richmond. The Shift Leader is the manager on the floor, opening or closing the store, directing the team through service and solving problems in real time.",
    responsibilities: [
      "Open or close the store, including cash and safe procedures",
      "Direct front-of-house and back-of-house staff through the shift",
      "Handle guest issues and make them right on the spot",
      "Run line checks, temperature logs and cleanliness standards",
      "Hand off a clean, accurate shift to the next leader",
    ],
    requirements: [
      "1+ year in a restaurant, with some lead or key-holder experience",
      "Calm, decisive and able to coach in the moment",
      "ServSafe Manager certification (or willingness to obtain)",
      "Full open and close availability including weekends",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "catering-coordinator-philadelphia",
    slug: "catering-coordinator-philadelphia-pa",
    title: "Catering Coordinator",
    department: "Catering & Events",
    employmentType: "Full-time",
    locationSlug: "philadelphia-pa",
    locationLabel: storeLabel("philadelphia-pa"),
    summary:
      "Turn quote requests into flawless events across our Philadelphia market.",
    description:
      "Flame Japanese Hibachi is hiring a Catering Coordinator for our Philadelphia market. You are the person clients talk to before the food ever leaves the kitchen, responding to quote requests, building packages and coordinating each event end to end.",
    responsibilities: [
      "Respond quickly to catering quote requests and follow up on leads",
      "Build custom packages and accurate quotes from our catering menu",
      "Confirm headcount, timing, setup and dietary needs with each client",
      "Coordinate kitchen prep, staffing and logistics for each event",
      "Keep an organized calendar and hand captains a clean event brief",
    ],
    requirements: [
      "2+ years in catering sales, events or hospitality coordination",
      "Excellent written and phone communication",
      "Organized enough to juggle a dozen events at once",
      "Comfortable with spreadsheets and simple CRMs",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
  {
    id: "assistant-manager-tamarac",
    slug: "assistant-manager-tamarac-fl",
    title: "Assistant Restaurant Manager",
    department: "Management",
    employmentType: "Full-time",
    locationSlug: "tamarac-fl",
    locationLabel: storeLabel("tamarac-fl"),
    summary:
      "Second-in-command at our Tamarac store for people, standards and results.",
    description:
      "Flame Japanese Hibachi is hiring an Assistant Restaurant Manager for our Tamarac store on University Drive. You partner with the General Manager to run the store day to day, lead shifts, develop the crew and step up when the GM is out.",
    responsibilities: [
      "Lead opening and closing shifts and hold the team to brand standards",
      "Hire, onboard and coach hourly team members",
      "Manage inventory orders, waste and labor to target",
      "Own food-safety and Halal-handling compliance on your shifts",
      "Read the daily numbers and act on them",
    ],
    requirements: [
      "2+ years restaurant experience, 1+ in a supervisory role",
      "Track record leading and developing a team",
      "Comfortable with inventory, scheduling and basic P&L",
      "ServSafe Manager certification (or willingness to obtain)",
    ],
    perks: ["Employee discount", "Flexible working hours"],
    status: "Closed",
    listingStatus: "closed",
  },
];

export type LocationFilterGroup = {
  label: string;
  options: { value: string; label: string }[];
};

/** Filter value for a coming-soon location - namespaced so it can never collide
 * with a store slug or a corporate label, and so the board can tell it apart. */
export const comingSoonValue = (name: string) => `soon:${name}`;

/** Names of coming-soon locations, keyed by their filter value - lets the board
 * show an "opening soon" message instead of a generic empty state. */
export const comingSoonLocationValues = new Set(
  getComingSoonLocations().map((l) => comingSoonValue(l.name)),
);

/**
 * Location options for the board's filter, grouped for the dropdown.
 *
 * Shows the FULL footprint, not just locations that currently have a posting:
 * every open store, the corporate/regional roles, and every coming-soon
 * location. Selecting a store or coming-soon location with no live posting
 * lands on the board's empty state, which invites the candidate to send a
 * résumé - the point of listing them.
 */
export function getCareerLocationGroups(): LocationFilterGroup[] {
  const comingSoon = getComingSoonLocations();
  const comingSoonNames = new Set(comingSoon.map((l) => l.name));

  const openStores = getActiveLocations()
    .map((l) => ({ value: l.slug, label: l.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Location labels used by postings that have no store slug.
  const labelOnly = [
    ...new Set(
      jobPostings.filter((j) => !j.locationSlug).map((j) => j.locationLabel),
    ),
  ];
  const postedLabels = new Set(labelOnly);

  // Corporate/regional = label-only postings that aren't a coming-soon store.
  const corporate = labelOnly
    .filter((label) => !comingSoonNames.has(label))
    .map((label) => ({ value: label, label }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Opening soon: every coming-soon location. If it already has active postings
  // (a store hiring ahead of opening), use the label as its value so selecting
  // it shows those roles; otherwise use the namespaced soon: value that drives
  // the "get on the list" empty state.
  const upcoming = comingSoon
    .map((l) => ({
      value: postedLabels.has(l.name) ? l.name : comingSoonValue(l.name),
      label: l.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const groups: LocationFilterGroup[] = [];
  if (openStores.length) groups.push({ label: "Open stores", options: openStores });
  if (corporate.length)
    groups.push({ label: "Corporate & regional", options: corporate });
  if (upcoming.length)
    groups.push({ label: "Opening soon", options: upcoming });
  return groups;
}
