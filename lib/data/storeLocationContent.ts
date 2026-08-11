/**
 * Unique per-location SEO copy for /store/[location] - meta description and
 * FAQ schema, keyed by the same `slug` used everywhere else
 * (data/locationsData.ts). Feeds `generateMetadata()`, the visible store FAQ
 * accordion, and the matching FAQPage JSON-LD.
 *
 * Sourced from the 14 location page briefs. Two source files used the
 * store's old working name rather than its published slug - "Northern Pkwy"
 * and "Forest Hill" - both are keyed here under their real
 * locationsData.ts slugs (`northern-pkwy-baltimore-md`,
 * `forest-hill-richmond-va`) so they match the `[location]` route param. The
 * same data renders visibly in StoreFaqs and powers the matching FAQPage
 * JSON-LD, so the structured data never describes hidden content.
 */

export interface StoreLocationFaq {
  question: string;
  answer: string;
}

export interface StoreLocationContent {
  /** Meta description for generateMetadata - already sized for search snippets. */
  metaDescription: string;
  faqs: StoreLocationFaq[];
}

/** Content date for the first complete 14-location store-page release.
 * Sitemap generation uses this stable value instead of pretending every
 * deployment changed the pages. Update it only when store-page content changes. */
export const STORE_PAGES_LAST_MODIFIED = "2026-08-11";

export const storeLocationContent: Record<string, StoreLocationContent> = {
  "baltimore-md": {
    metaDescription:
      "Halal hibachi, sushi and boba in Baltimore, MD at 5230 Moravia Rd, Suite B. Order online for pickup, delivery or catering, or call +1 410-858-4910 today.",
    faqs: [
      {
        question: "Is Flame Japanese Hibachi in Baltimore halal?",
        answer:
          "Yes. The entire menu at our Moravia Road location is halal, with no pork served, stored or cooked anywhere on the premises, and sauces made in house rather than bought from a distributor.",
      },
      {
        question: "Where is Flame Japanese Hibachi located in Baltimore?",
        answer:
          "We're at 5230 Moravia Rd, Suite B, Baltimore, MD 21206, in Northeast Baltimore a few minutes from Belair-Edison, Frankford, Hamilton and Morgan State University.",
      },
      {
        question: "Do you deliver near Morgan State University?",
        answer:
          "Yes, delivery and pickup are both available through our online ordering, and we're a short drive from campus.",
      },
      {
        question: "What are your hours?",
        answer:
          "Monday through Saturday 11AM to 10PM, Sunday 11AM to 9PM. Hours can shift on holidays, so check our Google Business Profile if you're planning a late visit.",
      },
    ],
  },

  "northern-pkwy-baltimore-md": {
    metaDescription:
      "Halal hibachi, sushi and boba in Baltimore, MD at 4460 W Northern Parkway. Order online for pickup, delivery or catering, or call +1 410-801-8279 today.",
    faqs: [
      {
        question: "Is Flame on Northern Parkway halal?",
        answer:
          "Yes, the full menu is halal, with no pork served, stored or cooked on the premises, and sauces made in house.",
      },
      {
        question: "How close are you to Pimlico Race Course?",
        answer:
          "We're a few minutes away on West Northern Parkway. Pimlico is currently closed for reconstruction and the Preakness returns there in 2027.",
      },
      {
        question: "Where exactly are you located?",
        answer:
          "4460 W Northern Parkway, Baltimore, MD 21215, on the western run of Northern Parkway near Park Heights and Reisterstown Road.",
      },
      {
        question: "Do you serve Pikesville and Mount Washington?",
        answer:
          "Yes, both are a short drive, along with Cheswolde, Cross Country and Fallstaff.",
      },
    ],
  },

  "laurel-md": {
    metaDescription:
      "Halal hibachi, sushi and boba in Laurel, MD. Visit us at 13600 Baltimore Ave, Suite 310, order online, or call +1 240-360-5080 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is the Laurel location halal?",
        answer:
          "Yes, the entire menu, with no pork on the premises and sauces made in house rather than bought in.",
      },
      {
        question: "Are you close to Fort Meade?",
        answer:
          "Yes, we're on the Route 1 corridor a short drive from Fort Meade, and popular for quick lunch orders during the work week.",
      },
      {
        question: "What is your address in Laurel?",
        answer:
          "13600 Baltimore Ave, Suite 310, Laurel, MD 20707, near Towne Centre at Laurel.",
      },
      {
        question: "Do you cater office lunches?",
        answer:
          "Yes, catering starts at $15.99 per person, and we regularly run recurring office orders for teams along the Route 1 corridor.",
      },
    ],
  },

  "pasadena-md": {
    metaDescription:
      "Halal hibachi, sushi and boba in Pasadena, MD at 8036 Ritchie Hwy, Suite 1-C. Order online for pickup, delivery or catering, or call +1 443-628-6850 today.",
    faqs: [
      {
        question: "Is Flame in Pasadena halal?",
        answer:
          "Yes, the entire menu is halal with no pork served, stored or cooked on the premises.",
      },
      {
        question: "Where are you located on Ritchie Highway?",
        answer:
          "8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122, on the main Ritchie Highway run.",
      },
      {
        question: "Do you have gluten-free options?",
        answer:
          "No, this is not a gluten-free kitchen. Soy sauce contains wheat and the fryer is shared.",
      },
      {
        question: "How far are you from Glen Burnie and Severna Park?",
        answer:
          "Both are about ten minutes away, with Lake Shore and Riviera Beach even closer.",
      },
    ],
  },

  "aberdeen-md": {
    metaDescription:
      "Halal hibachi, sushi and boba in Aberdeen, MD. Visit us at 939 Beards Hill Rd, order online, or call +1 443-327-8349 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Aberdeen halal?",
        answer:
          "Yes, the entire menu, with no pork served, stored or cooked on the premises, and sauces made in house.",
      },
      {
        question: "Are you near I-95?",
        answer:
          "Yes, about two minutes from Exit 85 via Route 22, a popular stop for halal travelers on the corridor between Baltimore and Delaware.",
      },
      {
        question: "What is your address?",
        answer: "939 Beards Hill Rd, Aberdeen, MD 21001.",
      },
      {
        question: "Are you close to Ripken Stadium?",
        answer:
          "Yes, a few minutes away, and we regularly handle team and group orders around game days.",
      },
    ],
  },

  "manassas-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Manassas, VA. Visit us at 9522 Liberia Ave, order online, or call +1 703-789-8289 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Manassas halal?",
        answer:
          "Yes, the full menu, with no pork on the premises and sauces made in house rather than bought from a distributor.",
      },
      {
        question: "Where is your Manassas location?",
        answer:
          "9522 Liberia Ave, Manassas, VA 20110, on the main corridor through Old Town Manassas.",
      },
      {
        question: "Do you cater for Ramadan and Eid?",
        answer:
          "Yes, we run iftar and Eid catering every year. Book at least two to three weeks ahead for the busiest dates.",
      },
      {
        question: "Do you serve Centreville and Woodbridge?",
        answer:
          "Yes, both are a short drive, along with Signal Hill, Yorkshire and Manassas Park.",
      },
    ],
  },

  "alexandria-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Alexandria, VA. Visit us at 6676 Richmond Hwy, order online, or call +1 571-683-3199 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame on Richmond Highway halal?",
        answer:
          "Yes, the entire menu is halal, with no pork served, stored or cooked on the premises.",
      },
      {
        question: "How close are you to Fort Belvoir?",
        answer:
          "A short drive north on Richmond Highway, making us a regular stop for anyone stationed at or working near the installation.",
      },
      {
        question: "What is your exact address?",
        answer:
          "6676 Richmond Hwy, Alexandria, VA 22306, in the Hybla Valley and Groveton stretch of the corridor.",
      },
      {
        question: "Do you have dine-in seating?",
        answer:
          "Yes, this is a full dine-in restaurant as well as a pickup and delivery counter.",
      },
    ],
  },

  "seven-corners-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Falls Church, VA. Visit us at 6379 Seven Corners Center, order online, or call +1 571-480-5161 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame at Seven Corners halal?",
        answer:
          "Yes, the entire menu, with no pork served, stored or cooked on the premises, and sauces made in house.",
      },
      {
        question: "Where exactly are you inside Seven Corners?",
        answer:
          "6379 Seven Corners Center, Falls Church, VA 22044, at the Route 7 and Route 50 junction next to Eden Center.",
      },
      {
        question: "Do you serve Bailey's Crossroads and Annandale?",
        answer:
          "Yes, both are close by, along with Falls Church City, Arlington and Tysons.",
      },
      {
        question: "Is your sushi halal?",
        answer:
          "Yes. We control for alcohol in sushi rice, eel sauce and imitation crab by making our sauces in house rather than buying them in.",
      },
    ],
  },

  "bristow-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Bristow, VA. Visit us at 10286 Bristow Center Dr, order online, or call +1 703-420-2339 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Bristow halal?",
        answer:
          "Yes, the full menu is halal, with no pork on the premises and sauces made in house.",
      },
      {
        question: "Are you near Jiffy Lube Live?",
        answer:
          "Yes, a short drive off Linton Hall Road. Note that outside food is not allowed inside the venue, so plan to eat before the show.",
      },
      {
        question: "What is your address in Bristow?",
        answer:
          "10286 Bristow Center Dr, Bristow, VA 20136, off Linton Hall Road.",
      },
      {
        question: "Do you cater youth sports teams?",
        answer:
          "Yes, we regularly run team orders after practices and games for squads across Braemar, Victory Lakes and the surrounding area.",
      },
    ],
  },

  "forest-hill-richmond-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Richmond, VA. Visit us at 7037 Forest Hill Ave, Suite B, order online, or call +1 804-997-7009 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is the Forest Hill Avenue location halal?",
        answer:
          "Yes, the entire menu, with no pork served, stored or cooked on the premises, and sauces made in house.",
      },
      {
        question: "Are you close to James River Park?",
        answer:
          "Yes, a few minutes from both the Reedy Creek and Buttermilk trail entrances.",
      },
      {
        question: "Where are you on Forest Hill Avenue?",
        answer: "7037 Forest Hill Ave, Suite B, Richmond, VA 23225.",
      },
      {
        question: "Do you serve customers from north of the James River?",
        answer:
          "Yes, we're roughly fifteen minutes from Carytown, the Fan and VCU depending on the bridge and time of day.",
      },
    ],
  },

  "mechanicsville-va": {
    metaDescription:
      "Halal hibachi, sushi and boba in Mechanicsville, VA at 7354 Bell Creek Rd. Order online for pickup, delivery or catering, or call +1 804-789-8540 today.",
    faqs: [
      {
        question: "Is Flame in Mechanicsville halal?",
        answer:
          "Yes, the entire menu, with no pork served, stored or cooked on the premises, and sauces made in house rather than bought from a distributor.",
      },
      {
        question: "Where is your Bell Creek Road location?",
        answer: "7354 Bell Creek Rd, Mechanicsville, VA 23111.",
      },
      {
        question: "Are you close to Richmond Raceway?",
        answer:
          "Yes, a short drive, and race weekends bring a real spike in local demand.",
      },
      {
        question: "Do you serve Hanover Courthouse and Atlee?",
        answer:
          "Yes, both are nearby, along with Rural Point and Richmond's Northside.",
      },
    ],
  },

  "philadelphia-pa": {
    metaDescription:
      "Halal hibachi, sushi and boba in Philadelphia, PA. Visit us at 101 E Olney Avenue, order online, or call +1 215-344-6444 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Philadelphia halal?",
        answer:
          "Yes, the entire menu is halal, with no pork served, stored or cooked on the premises.",
      },
      {
        question: "What is your address in Philadelphia?",
        answer: "101 E Olney Avenue, Philadelphia, PA 19120.",
      },
      {
        question: "Are you near La Salle and Temple University?",
        answer:
          "Yes, both are a short trip from our Olney Avenue location, and we're a popular budget option for students.",
      },
      {
        question: "Do you offer delivery in North Philadelphia?",
        answer:
          "Yes, through our online ordering, alongside pickup and dine-in.",
      },
    ],
  },

  "tamarac-fl": {
    metaDescription:
      "Halal hibachi, sushi and boba in Tamarac, FL. Visit us at 5707 University Dr, order online, or call +1 954-953-8848 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Tamarac halal?",
        answer:
          "Yes, the full menu is halal, with no pork on the premises and sauces made in house.",
      },
      {
        question: "What is your address in Tamarac?",
        answer: "5707 University Dr, Tamarac, FL 33321.",
      },
      {
        question: "Do you serve Coral Springs and Sunrise?",
        answer:
          "Yes, both are a short drive, and we're roughly central to Coral Springs, Sunrise, North Lauderdale and Parkland.",
      },
      {
        question: "Are you open during hurricane season?",
        answer:
          "Hours can change during an active storm watch or warning. Check our Google Business Profile or call ahead if a storm is approaching.",
      },
    ],
  },

  "royal-palm-beach-fl": {
    metaDescription:
      "Halal hibachi, sushi and boba in Royal Palm Beach, FL. Visit us at 9940 Belvedere Rd, Suite F, order online, or call +1 561-766-1038 for pickup, delivery or catering.",
    faqs: [
      {
        question: "Is Flame in Royal Palm Beach halal?",
        answer:
          "Yes, the full menu is halal, with no pork on the premises and sauces made in house.",
      },
      {
        question: "What is your address?",
        answer: "9940 Belvedere Rd, Suite F, Royal Palm Beach, FL 33411.",
      },
      {
        question: "Are you close to Wellington's equestrian show grounds?",
        answer:
          "Yes, a short drive, and we see a real seasonal increase in orders during equestrian season.",
      },
      {
        question: "Do you cater private parties?",
        answer:
          "Yes, catering starts at $15.99 per person, and Build Your Own Platter works well for groups with mixed preferences.",
      },
    ],
  },
};

/** All active stores currently have unique content here (14/14). Falls back
 * gracefully - a future store without an entry just skips the FAQ schema and
 * meta description falls back to a generated default, since /store/[location]
 * itself keys off `data/locationsData.ts`, not this file. */
export function getStoreLocationContent(
  slug: string
): StoreLocationContent | undefined {
  return storeLocationContent[slug];
}
