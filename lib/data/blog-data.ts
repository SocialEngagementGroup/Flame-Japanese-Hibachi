import type { BlogPost, BlogContentBlock } from "@/lib/types/blog";
import type { AccordionItemType } from "@/components/Accordion/accordion.types";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
import { ORDER_URL } from "@/lib/constants";

// Order links resolve from the store's own order.online URL (single source of
// truth in data/locationsData.ts), falling back to the brand-wide URL if a
// store hasn't had its own pasted in yet.
const orderUrlFor = (slug: string): string =>
  getLocationBySlug(slug)?.orderUrl || ORDER_URL;

// Block-builder shorthands keep the post bodies readable.
const h = (content: string): BlogContentBlock => ({ type: "heading", content });
const p = (content: string): BlogContentBlock => ({ type: "paragraph", content });
const links = (items: { label: string; href: string }[]): BlogContentBlock => ({
  type: "links",
  items,
});
const t = (headers: string[], rows: string[][]): BlogContentBlock => ({
  type: "table",
  headers,
  rows,
});
const faqItem = (
  id: string,
  question: string,
  answer: string,
): AccordionItemType => ({
  id,
  question,
  answer: [{ type: "paragraph", content: answer }],
});

// Identical across all fourteen posts (the shared 30% menu boilerplate).
const PLATES_BUILT =
  "**How the plates are built:** every hibachi comes with your choice of any two sides — fried rice, white rice, lo mein noodles or vegetables. Bento boxes arrive loaded already, with hibachi, vegetables, rice or noodles, a 4-piece California Roll, two dumplings and two spring rolls. Extra chicken is $2.95 and extra salmon, beef or shrimp is $3.95, which is usually the cheapest way to stretch one plate across two people. Individual sides run $2.95 to $4.95, and Yum Yum sauce is $0.50.";

/**
 * Topic 01, "Is Hibachi Halal?", localized to each store (Social Engagement
 * Group, July 2026). Each post is dedicated to one location via locationSlugs
 * and shows on /blog plus that store's /blog/[slug] hub.
 *
 * Placeholders from the source doc are intentionally left out until the stores
 * supply them: parking/entrance detail, a real Google review, a local stat, and
 * real on-site photos (temporary menu images are used for now). Order links use
 * each store's real order.online URL.
 */
export const blogPosts: BlogPost[] = [
  // 01 - BALTIMORE, MD
  {
    slug: "is-hibachi-halal-baltimore-md",
    locationSlugs: ["baltimore-md"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? What Baltimore Diners Should Check Before Ordering",
    excerpt:
      "Is hibachi halal? Yes at our Moravia Rd location in Northeast Baltimore. 100% halal hibachi, no pork on site. Order online or call 410-858-4910.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt:
      "Halal chicken hibachi cooking on the grill at Flame Japanese Hibachi in Baltimore, MD",
    intro:
      "Yes, hibachi can be halal, and at our Moravia Road location in Northeast Baltimore it is, all of it, every day. But “hibachi” by itself tells you nothing about whether a plate is halal, which is why the question keeps getting asked. If you have been driving out to Windsor Mill or down to Fells Point looking for a halal dinner that is not another grill or shawarma counter, there is now one on Moravia Road, five minutes from Herring Run Park and a short run from Morgan State. Here is what actually makes hibachi halal or not, and what you will find when you walk into ours.",
    body: [
      h("The three things that decide whether hibachi is halal"),
      p("Hibachi is a cooking method, not an ingredient. That is the first thing to understand, because it means the answer is never about the hibachi. It is about the kitchen behind it. Three things disqualify most hibachi restaurants."),
      p("**The meat.**Chicken, beef and lamb have to come from a halal supplier and be slaughtered to halal standard. Most hibachi restaurants buy commodity meat and have no answer when you ask where it came from."),
      p("**Pork on the premises.**A restaurant serving pork gyoza or bacon fried rice is cooking it on the same flat top as your chicken. Even a kitchen with halal chicken cannot hand you a clean plate when there is pork six inches away on the same steel."),
      p("**Alcohol in the sauce.**This is the one almost nobody checks. Traditional teriyaki, eel sauce and many yum yum recipes are built on mirin or cooking sake. The meat can be perfectly halal and the sauce poured over it is not."),
      p("Flame is built to clear all three. Every location serves a 100% halal menu. There is no pork anywhere in the building, so there is nothing on the grill to avoid. Our sauces are made in house rather than bought in, which is what lets us control what goes into them."),
      p("If you are checking any other hibachi restaurant in Baltimore, those are your three questions: who supplies your meat, is there pork in the building, and what is in your teriyaki. A confident answer to all three is rare."),
      h("At our Northeast Baltimore location"),
      p("We are at 5230 Moravia Road, Suite B, Baltimore, MD 21206, in the Frankford stretch just off the Moravia and Sinclair Lane corridor. If you are coming from Belair-Edison, Hamilton or Lauraville, you are under ten minutes out. From Morgan State it is a straight shot. From Overlea, Parkville and Rosedale it is a quick hop across Pulaski Highway, and the Harbor Tunnel Thruway puts the whole east side within reach."),
      p("The kitchen runs Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive. Order ahead on the app or online and pick up, or eat in and watch the grill work."),
      p("What this location gets asked more than any other: whether the wings are halal too. They are. Same kitchen, same standard, and Old Bay is on the flavor list, which in this city is not optional."),
      h("Getting here, and the neighborhoods we serve"),
      p("Moravia Road is one of the easier addresses in Northeast Baltimore to reach, which is deliberate. From Belair-Edison and Frankford you are five minutes out. Hamilton, Lauraville and Waltherson are inside ten. Overlea, Rosedale and Parkville sit just over Pulaski Highway, and the Harbor Tunnel Thruway pulls in Dundalk and the whole east side without touching downtown."),
      p("If you are coming down from Perry Hall or across from Towson, budget fifteen to twenty minutes depending on the time of day. Erdman Avenue is usually the smoother approach at rush hour than Sinclair Lane."),
      p("One practical note. Everything on this menu is cooked when the order comes in rather than held warm, so a walk-in at 6:30 on a Friday will wait. Ordering online or through the Flame app before you leave the house is the difference between a two-minute stop and a fifteen-minute one."),
      h("What to order at the Baltimore location"),
      p("Chicken Hibachi, $9.85. The entry point and the one most people start with. Comes with your choice of any two sides, so fried rice and vegetables, or lo mein if you want it heavier."),
      p("Chicken, Beef and Shrimp Combo, $14.85. Three proteins on one plate. This is the order for anyone who came in hungry or is feeding two."),
      p("Buffalo Wings, 10 pieces, $14.99. Fourteen flavors including Old Bay, Rim Fire and Mango Habanero. Halal wings in Baltimore are hard to find and these move fast."),
      p("California Roll, $7.85. Sushi from the same halal kitchen, which surprises people who assume they have to choose."),
      p(PLATES_BUILT),
      p("In Baltimore the usual pattern is fried rice and vegetables, with a wing order in the middle of the table to share. If you are ordering for a family, two combos plus a 20-piece will feed four comfortably and still come in under fifty dollars."),
      links([
        { label: "Baltimore hibachi menu", href: "/menu/baltimore-md" },
        { label: "Start an order", href: orderUrlFor("baltimore-md") },
      ]),
      h("Visit us"),
      p("Halal hibachi, cooked to order, on Moravia Road. Flame Japanese Hibachi Baltimore, 5230 Moravia Rd, Suite B, Baltimore, MD 21206. 410-858-4910. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Northern Parkway guide", href: "/blog/is-hibachi-halal-northern-pkwy-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("bal-1", "Is the whole menu halal, or just some items?", "All of it. There is no separate halal section because there is nothing else on the menu. No pork is served, stored or cooked anywhere in the building."),
      faqItem("bal-2", "Are the sauces halal?", "Yes. Our sauces are made in house, which is the reason we can say that. Bought-in teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in from a distributor usually cannot tell you what is in them, which is exactly why we make ours."),
      faqItem("bal-3", "Where can I get halal hibachi in Northeast Baltimore?", "Moravia Road, at 5230 Moravia Rd, Suite B. It is the closest halal Japanese kitchen to Belair-Edison, Frankford, Hamilton and Overlea."),
      faqItem("bal-4", "Is there halal food near Morgan State University?", "Yes. We are a short drive from campus on Moravia Road, and we do pickup and online ordering, which is usually what students want between classes."),
      faqItem("bal-5", "Do you cater for events in Baltimore?", "We do, starting at $15.99 per person. Masjid events, school functions, office lunches and family gatherings. Call the Baltimore store directly at 410-858-4910 so you are talking to the kitchen that will cook it."),
      faqItem("bal-6", "Can I order halal hibachi for delivery in Baltimore?", "Yes, through our online ordering. Pickup is faster if you are close, since everything is cooked when you order rather than held."),
    ],
  },

  // 02 - NORTHERN PARKWAY, MD
  {
    slug: "is-hibachi-halal-northern-pkwy-baltimore-md",
    locationSlugs: ["northern-pkwy-baltimore-md"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Northwest Baltimore Guide to Halal Japanese Food",
    excerpt:
      "Halal hibachi on W Northern Parkway, minutes from Pimlico and Sinai. 100% halal menu, no pork in the kitchen. Order online or call 410-801-8279.",
    author: "Flame Japanese Hibachi Team",
    date: "July 22, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/salmon-hibachi-plate.jpg",
    featuredImageAlt:
      "Halal salmon hibachi at Flame Japanese Hibachi on Northern Parkway, Baltimore",
    intro:
      "Yes, and on West Northern Parkway it is the whole menu, not a section of it. Northwest Baltimore is a part of the city that reads labels. Between Park Heights, Cheswolde and Fallstaff, a lot of households here have spent years asking restaurants direct questions about sourcing and getting vague answers back. So when people ask whether hibachi is halal, they are not asking for reassurance. They are asking what the kitchen actually does. Here is the real answer, and what happens in ours at 4460 W Northern Parkway.",
    body: [
      h("What makes hibachi halal or not"),
      p("Hibachi describes how the food is cooked, not what it is made of. So the question is really about the restaurant, and the honest answer for most hibachi restaurants is no. Here is where they fail."),
      p("**Sourcing.**Halal starts with the supplier. Chicken, beef and lamb have to be slaughtered to halal standard, and a restaurant either has that paperwork or it does not."),
      p("**The shared grill.**Most hibachi kitchens run one flat top for everything on the menu. If pork is on that menu, it has been on that surface. Wiping it down between orders is not the same thing as never cooking pork at all."),
      p("**The sauces.**Teriyaki, eel sauce and a lot of house yum yum are made with mirin or sake. It is the most commonly missed detail in halal dining, because diners check the protein and stop there."),
      p("Flame was set up so none of that applies. The full menu is halal, top to bottom. No pork comes through the door, which means the grill has one job. Sauces are made in our own kitchen instead of bought from a distributor, so we know what is in them."),
      p("Ask those three questions anywhere else you eat hibachi: where does the meat come from, is pork cooked here, and is there mirin in the sauce. If a restaurant hesitates on any of them, you have your answer."),
      h("At our Northern Parkway location"),
      p("We are at 4460 W Northern Parkway, Baltimore, MD 21215, on the western run of Northern Parkway between Park Heights and Reisterstown Road. Pimlico Race Course is a few blocks away. Sinai Hospital is close enough that we see a steady stream of staff on shift breaks. Mount Washington, Cross Country, Fallstaff and Cheswolde are all within a short drive, and Pikesville and Owings Mills are an easy run out Reisterstown Road."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("This store gets more questions about ingredients than any other, which we take as a compliment. If you want to know what is in something, ask at the counter. The staff here are used to it."),
      h("Getting here, and the neighborhoods we serve"),
      p("West Northern Parkway is a straight run for most of Northwest Baltimore. Park Heights and Arlington are minutes away. Mount Washington, Cross Country, Fallstaff and Cheswolde are all inside ten. Reisterstown Road puts Pikesville roughly ten minutes out and Owings Mills about twenty, and Druid Hill Park and the Coppin State side are an easy drive east."),
      p("Sinai Hospital is close enough that shift changes show up in our order volume. Pimlico is a few blocks off, which matters most in May."),
      p("Every plate is cooked to order, not held under a lamp, so the honest answer to “how long” is that it depends on when you arrive. Ordering ahead online or on the app removes the question entirely, and most regulars here have stopped ordering any other way."),
      h("What to order on Northern Parkway"),
      p("Salmon Hibachi, $11.85. Flagged as our best seller across the brand, and it holds up here. Salmon on a hot flat top with two sides."),
      p("Chicken and Beef Combo, $11.85. Two proteins for under twelve dollars, which is the reason it is on the promotions list."),
      p("Brown Sugar Milk Tea, $6.49. The boba menu runs deep, with ten toppings including crystal boba and lychee coconut jelly. Worth knowing if you have teenagers."),
      p("5 pieces Dumplings, $3.95. A cheap add-on that makes a hibachi plate feel like a full dinner."),
      p(PLATES_BUILT),
      p("On Northern Parkway the most common build is a hibachi plate with fried rice and vegetables plus a boba on the way out. If you are feeding a household, the three-protein combo plus a bento and a roll covers a table of four without ordering four separate plates."),
      links([
        { label: "Northern Parkway hibachi menu", href: "/menu/northern-pkwy-baltimore-md" },
        { label: "Start an order", href: orderUrlFor("northern-pkwy-baltimore-md") },
      ]),
      h("Visit us"),
      p("Halal hibachi on West Northern Parkway, cooked when you order it. Flame Japanese Hibachi Northern Parkway, 4460 W Northern Parkway, Baltimore, MD 21215. 410-801-8279. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("northern-pkwy-baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore guide", href: "/blog/is-hibachi-halal-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("np-1", "Is everything on the menu halal?", "Yes. The entire menu, at every location. No pork is served, stored or cooked on the premises."),
      faqItem("np-2", "Is there halal hibachi near Pimlico?", "Yes. We are on West Northern Parkway, a few minutes from the racecourse, and we stay open through the evening if you are coming from an event."),
      faqItem("np-3", "What halal restaurants are near Sinai Hospital?", "We are one of the closest, and we are set up for it. Order online on your way out and pick up without waiting, which is what most of the hospital staff who come in do."),
      faqItem("np-4", "Are the sauces made with alcohol?", "Our sauces are made in house rather than bought in. Store-bought teriyaki and eel sauce commonly contain mirin or cooking sake, which is why we make our own. A kitchen that buys its sauces in from a distributor usually cannot tell you what is in them."),
      faqItem("np-5", "Do you deliver to Pikesville or Mount Washington?", "Delivery runs through our online ordering. Pickup is quicker from either, usually ten to fifteen minutes out."),
      faqItem("np-6", "Can you cater a large event?", "Yes, from $15.99 per person, and we do a lot of them in this part of the city. Call 410-801-8279 to talk through headcount."),
    ],
  },

  // 03 - LAUREL, MD
  {
    slug: "is-hibachi-halal-laurel-md",
    locationSlugs: ["laurel-md"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Laurel, MD Guide for Route 1 Diners",
    excerpt:
      "Halal hibachi on Baltimore Ave in Laurel, MD, close to Fort Meade and Towne Centre. 100% halal, no pork on site. Order online or call 240-360-5080.",
    author: "Flame Japanese Hibachi Team",
    date: "July 21, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/chicken-and-beef-bento.jpg",
    featuredImageAlt:
      "Halal chicken and beef bento box at Flame Japanese Hibachi in Laurel, MD",
    intro:
      "Yes, when the kitchen is built for it, and ours on Baltimore Avenue is. Laurel sits on the Route 1 corridor between College Park and Fort Meade, which is one of the more diverse stretches of road in Maryland and one where a lot of people eat halal by default. The gap here has never been halal food. It has been halal variety. Between the Towne Centre and Main Street you can find plenty of grills and plenty of curry, and almost no Japanese. That is the gap we filled at 13600 Baltimore Ave.",
    body: [
      h("The three questions that decide it"),
      p("The word hibachi refers to a style of cooking, so it carries no halal status of its own. Whether the plate in front of you is halal depends on three decisions the restaurant made long before you sat down."),
      p("**The meat supplier.**Halal chicken, beef and lamb come from suppliers who slaughter to halal standard. This is a purchasing decision and it costs more, which is why most hibachi restaurants skip it."),
      p("**What else is cooked on the grill.**Hibachi runs on a single large flat top. A restaurant with pork on the menu has cooked pork on the same steel as your dinner, and no amount of scraping changes that for a diner who takes halal seriously."),
      p("**What goes into the sauces.**Mirin and cooking sake are standard ingredients in teriyaki and eel sauce. A halal chicken breast finished with a mirin-based glaze is not a halal plate, and this is the step most people never think to check."),
      p("Flame answers all three the same way at every location. The entire menu is halal. Pork is not served, stored or cooked anywhere on the property. Our sauces are made in house, not sourced from a distributor."),
      p("Those are the three questions worth asking any hibachi restaurant before you order: the supplier, the grill and the sauce. Most cannot answer all three."),
      h("At our Laurel location"),
      p("We are at 13600 Baltimore Ave, Suite 310, Laurel, MD 20707, right on the Route 1 corridor. Towne Centre at Laurel is minutes away. Main Street Laurel is a short drive south. Laurel Park is close enough for a pre-race or post-race dinner. If you are coming off the Baltimore-Washington Parkway or I-95, you are a few turns off either."),
      p("That location matters for one group in particular. The Fort Meade workforce runs through this corridor twice a day, and halal lunch options on that commute are thin. Order ahead and it is ready when you pull in."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays. We also serve Burtonsville, Beltsville, Savage, Jessup and the southern end of Columbia, all within about fifteen minutes."),
      h("Getting here, and the towns we serve"),
      p("Baltimore Avenue is the Route 1 spine, which makes this store easy to reach from a wide radius. North Laurel and Savage are minutes away. Beltsville and Burtonsville are inside ten to fifteen. Jessup, Columbia’s southern end, Greenbelt and College Park are all reachable in twenty or less, and Fort Meade is a short run east."),
      p("If you are coming off I-95 or the Baltimore-Washington Parkway, Route 198 and Route 216 both feed straight in."),
      p("Lunch here runs hard from about eleven-thirty to one-thirty, driven by the Fort Meade and Route 1 workforce. Everything is cooked to order, so a walk-in inside that window will wait longer than a pre-order will. Ordering online before you leave the office is what most of our regulars do, and pickup takes about a minute once you arrive."),
      h("What to order in Laurel"),
      p("Chicken and Beef Bento, $13.85. Comes with hibachi, vegetables, rice or noodles, a 4-piece California Roll, 2 dumplings and 2 spring rolls. The best value on the menu for a full lunch you can eat at a desk."),
      p("Chicken Hibachi, $9.85. Under ten dollars with two sides. The default weekday order here."),
      p("Shrimp Tempura Roll, $7.85. Halal sushi, which almost nothing else on this stretch of Route 1 offers."),
      p("Catering from $15.99 per person. Office lunches along the corridor are a real part of what this store does."),
      p(PLATES_BUILT),
      p("For a desk lunch on the Route 1 corridor, the bento is the better call than a hibachi plate, because it travels closed and holds heat. If you are ordering for a team, catering from $15.99 per person is cheaper per head than fourteen individual boxes."),
      links([
        { label: "Laurel hibachi menu", href: "/menu/laurel-md" },
        { label: "Start an order", href: orderUrlFor("laurel-md") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Route 1, ready when you get there. Flame Japanese Hibachi Laurel, 13600 Baltimore Ave, Suite 310, Laurel, MD 20707. 240-360-5080. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("laurel-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Pasadena guide", href: "/blog/is-hibachi-halal-pasadena-md" },
      ]),
    ],
    faq: [
      faqItem("lau-1", "Is all the food halal?", "Yes, the full menu at every Flame location. No pork on the premises at all."),
      faqItem("lau-2", "Is there halal hibachi near Fort Meade?", "Laurel is the closest Flame to the base, on Baltimore Avenue. Order ahead if you are on a lunch window, since everything is cooked to order."),
      faqItem("lau-3", "Where can I get halal food on Route 1 in Laurel?", "We are at 13600 Baltimore Ave, Suite 310, near Towne Centre at Laurel. Plenty of halal on this corridor, very little of it Japanese."),
      faqItem("lau-4", "Do you do office catering in Laurel?", "Yes, from $15.99 per person, and it is a large share of what this store does on weekdays. Call 240-360-5080 to set it up."),
      faqItem("lau-5", "Is the sushi halal too?", "Yes. Same kitchen, same standard. The California Roll, Shrimp Tempura Roll and Hibachi Chicken Roll are all $7.85."),
      faqItem("lau-6", "How long does a pickup order take?", "Everything is cooked when the order comes in rather than held under a lamp, so allow a short wait at peak lunch. Ordering ahead online removes it."),
    ],
  },

  // 04 - PASADENA, MD
  {
    slug: "is-hibachi-halal-pasadena-md",
    locationSlugs: ["pasadena-md"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? What Pasadena and Anne Arundel Diners Should Know",
    excerpt:
      "Halal hibachi on Ritchie Hwy in Pasadena, MD. The halal option Anne Arundel County was missing. Order online or call 443-628-6850 for pickup today.",
    author: "Flame Japanese Hibachi Team",
    date: "July 23, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/chicken-beef-and-shrimp.jpg",
    featuredImageAlt:
      "Halal chicken, beef and shrimp hibachi combo at Flame Japanese Hibachi Pasadena, MD",
    intro:
      "Yes, and if you live in Pasadena you already know how rarely that sentence gets said around here. Anne Arundel County has been one of the thinnest halal markets in Maryland for years. Most families in Lake Shore, Riviera Beach and Severna Park have made the drive north to Baltimore or west to Columbia for a halal dinner, and made it often. We are on Ritchie Highway now, at 8036 Ritchie Hwy, and the drive is over. Here is what makes hibachi halal, and why ours is.",
    body: [
      h("The three things that decide whether hibachi is halal"),
      p("Hibachi is a cooking method, not an ingredient. The answer is never about the hibachi. It is about the kitchen behind it. Three things disqualify most hibachi restaurants."),
      p("**The meat.**Chicken, beef and lamb have to come from a halal supplier and be slaughtered to halal standard. Most hibachi restaurants buy commodity meat and have no answer when you ask where it came from."),
      p("**Pork on the premises.**A restaurant serving pork gyoza or bacon fried rice is cooking it on the same flat top as your chicken. Even a kitchen with halal chicken cannot hand you a clean plate when there is pork six inches away on the same steel."),
      p("**Alcohol in the sauce.**This is the one almost nobody checks. Traditional teriyaki, eel sauce and many yum yum recipes are built on mirin or cooking sake. The meat can be perfectly halal and the sauce poured over it is not."),
      p("Flame clears all three. Every location serves a 100% halal menu. There is no pork anywhere in the building, so there is nothing on the grill to avoid. Our sauces are made in house rather than bought in, which is what lets us control what goes into them."),
      p("Those are also the three questions to ask anywhere else: who supplies your meat, is there pork in the building, and what is in your teriyaki."),
      h("At our Pasadena location"),
      p("We are at 8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122, on the main Ritchie Highway run. Marley Station is close. Glen Burnie is about ten minutes south, Severna Park about ten minutes north, and Lake Shore, Riviera Beach and the Fort Smallwood side are all a short drive east. BWI is roughly twenty minutes out if you are coming off a flight."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Worth saying plainly, because it is the reason this store exists: there is very little halal dining in this part of Anne Arundel County. If you have been driving to Baltimore or Columbia for it, you no longer have to."),
      h("Getting here, and the towns we serve"),
      p("Ritchie Highway does most of the work. Lake Shore, Riviera Beach and Green Haven are minutes away. Glen Burnie is about ten minutes south, Severna Park about ten north, and Fort Smallwood, Orchard Beach and the Bay side are a short drive east. Millersville and Crownsville are inside twenty, and BWI is roughly twenty minutes if you are collecting someone off a flight."),
      p("Annapolis is about twenty-five minutes down Route 2, which is still a shorter halal drive than most families in this county are used to."),
      p("This store draws people from further out than most of ours, simply because there has been so little halal in Anne Arundel County. If you are making a longer drive, order ahead. Everything is cooked fresh when the ticket comes in, so a pre-order means you collect and go rather than arrive and wait."),
      h("What to order in Pasadena"),
      p("Chicken, Beef and Shrimp Combo, $14.85. The family plate. Three proteins, two sides, and enough to share."),
      p("Shrimp Hibachi, $10.85. Chesapeake country runs on seafood, and this one sells accordingly."),
      p("Buffalo Wings, 10 pieces, $14.99. Fourteen flavors including Old Bay. Halal wings in Anne Arundel County are close to nonexistent otherwise."),
      p("Salmon Hibachi, $11.85. Our best-selling item brand-wide."),
      p(PLATES_BUILT),
      p("In Pasadena the weekend pattern is family-size. Two three-protein combos, a wing order and a couple of rolls will comfortably cover four or five people, and it is still a shorter trip than the drive to Baltimore used to be."),
      links([
        { label: "Pasadena hibachi menu", href: "/menu/pasadena-md" },
        { label: "Start an order", href: orderUrlFor("pasadena-md") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Ritchie Highway. No more driving to Baltimore for it. Flame Japanese Hibachi Pasadena, 8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122. 443-628-6850. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("pasadena-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore guide", href: "/blog/is-hibachi-halal-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("pas-1", "Is everything halal?", "Yes, the whole menu. No pork is served, stored or cooked anywhere in the building."),
      faqItem("pas-2", "Are there halal restaurants in Pasadena, MD?", "Very few, which is the honest answer. We are at 8036 Ritchie Hwy, Suite 1-C, and we are the halal Japanese option in this stretch of Anne Arundel County."),
      faqItem("pas-3", "How far is halal food from Severna Park or Glen Burnie?", "Roughly ten minutes either way on Ritchie Highway. That is a meaningful change from the forty-minute drives most families here were making."),
      faqItem("pas-4", "Are the sauces halal?", "Our sauces are made in house. Bought-in teriyaki and eel sauce commonly contain mirin or cooking sake, which is why we make our own. A kitchen that buys its sauces in from a distributor usually cannot tell you what is in them."),
      faqItem("pas-5", "Do you cater in Anne Arundel County?", "Yes, from $15.99 per person. Call 443-628-6850 and speak to the Pasadena kitchen directly."),
      faqItem("pas-6", "Is the seafood halal as well?", "All seafood on the menu comes from the same halal kitchen with no pork or alcohol contact. Salmon and shrimp are on the hibachi, combo, bento and sushi menus."),
    ],
  },

  // 05 - ABERDEEN, MD
  {
    slug: "is-hibachi-halal-aberdeen-md",
    locationSlugs: ["aberdeen-md"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? An Aberdeen, MD Guide for Harford County",
    excerpt:
      "Halal hibachi on Beards Hill Rd in Aberdeen, MD, minutes off I-95 exit 85 and close to APG. 100% halal menu. Order online or call 443-327-8349.",
    author: "Flame Japanese Hibachi Team",
    date: "July 22, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/beef-hibachi-plate.jpg",
    featuredImageAlt:
      "Halal chicken hibachi at Flame Japanese Hibachi in Aberdeen, MD",
    intro:
      "Yes, when the kitchen is set up for it, and ours on Beards Hill Road is. Aberdeen sits at a useful point on the map: two minutes off I-95 at exit 85, close to Aberdeen Proving Ground, and roughly halfway between Baltimore and the Delaware line. That combination means we serve two very different people. Harford County families who were driving to Baltimore for halal, and travelers who have learned the hard way that the I-95 corridor is not generous with halal options. Here is what actually makes hibachi halal.",
    body: [
      h("What makes hibachi halal or not"),
      p("Hibachi describes how the food is cooked, not what it is made of. So the question is really about the restaurant, and the honest answer for most hibachi restaurants is no. Here is where they fail."),
      p("**Sourcing.**Halal starts with the supplier. Chicken, beef and lamb have to be slaughtered to halal standard, and a restaurant either has that paperwork or it does not."),
      p("**The shared grill.**Most hibachi kitchens run one flat top for everything on the menu. If pork is on that menu, it has been on that surface. Wiping it down between orders is not the same thing as never cooking pork at all."),
      p("**The sauces.**Teriyaki, eel sauce and a lot of house yum yum are made with mirin or sake. It is the most commonly missed detail in halal dining, because diners check the protein and stop there."),
      p("Flame was set up so none of that applies. The full menu is halal, top to bottom. No pork comes through the door, which means the grill has one job. Sauces are made in our own kitchen instead of bought from a distributor, so we know what is in them."),
      p("Ask those three questions anywhere else you eat hibachi: where does the meat come from, is pork cooked here, and is there mirin in the sauce."),
      h("At our Aberdeen location"),
      p("We are at 939 Beards Hill Rd, Aberdeen, MD 21001, in the Beards Hill corridor just off Route 22 and about two minutes from I-95 exit 85. Ripken Stadium is close, Aberdeen Proving Ground is a short run, and Havre de Grace, Churchville, Bel Air, Edgewood and Perryville are all inside twenty minutes."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Two things about this store worth knowing. The APG workforce, both service members and contractors, uses it heavily at lunch, and ordering ahead is the difference between a five-minute stop and a twenty-minute one. And if you are driving I-95, we are one of the very few halal kitchens between Baltimore and the Delaware line that is not a gas station."),
      h("Getting here, and the towns we serve"),
      p("Beards Hill Road sits about two minutes from I-95 exit 85, which shapes who walks through the door. Aberdeen and Havre de Grace are minutes away. Churchville, Bel Air and Edgewood are inside fifteen to twenty. Perryville is a short run over the Susquehanna, and Aberdeen Proving Ground is close enough for a lunch break to work."),
      p("If you are driving the corridor between Baltimore and Delaware, we are one of the few halal kitchens on that stretch that is a proper restaurant rather than a convenience stop."),
      p("Everything is cooked to order, which is the point, but it means a walk-in at peak will wait. If you are travelling, order online while you are still twenty minutes out and collect it hot without stopping for long. That is exactly how most of our I-95 customers use this location, and it works."),
      h("What to order in Aberdeen"),
      p("Chicken Hibachi, $9.85. Under ten dollars, two sides included, ready fast. The lunch default here."),
      p("Chicken Tenders Combo, 4 pieces with fries and a drink, $12.99. The order for anyone eating in a car, and halal tenders are not easy to find in Harford County."),
      p("Chicken, Beef and Shrimp Combo, $14.85. For the drive home rather than the drive through."),
      p("Mango Passion Fruit Tea, $6.25. The boba menu is a genuine surprise to most first-time visitors."),
      p(PLATES_BUILT),
      p("For an APG lunch break, the chicken hibachi with fried rice and vegetables is the fastest full plate on the menu. If you are eating in the car on I-95, the tenders combo and the bento both travel better than an open plate does."),
      links([
        { label: "Aberdeen hibachi menu", href: "/menu/aberdeen-md" },
        { label: "Start an order", href: orderUrlFor("aberdeen-md") },
      ]),
      h("Visit us"),
      p("Halal hibachi two minutes off I-95, cooked when you order it. Flame Japanese Hibachi Aberdeen, 939 Beards Hill Rd, Aberdeen, MD 21001. 443-327-8349. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("aberdeen-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore guide", href: "/blog/is-hibachi-halal-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("abe-1", "Is the whole menu halal?", "Yes, every item at every location. No pork is served, stored or cooked on site."),
      faqItem("abe-2", "Is there halal food near Aberdeen Proving Ground?", "Yes. We are on Beards Hill Road, a short drive from the gates, and we handle a lot of lunch orders from APG. Ordering ahead is worth it between noon and one."),
      faqItem("abe-3", "Where can I stop for halal food off I-95 in Maryland?", "Exit 85 at Aberdeen. We are about two minutes off the interstate, which makes us one of the few sit-down halal options on that stretch between Baltimore and Delaware."),
      faqItem("abe-4", "Are the sauces halal?", "Our sauces are made in house rather than bought from a distributor. Store-bought teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("abe-5", "Do you serve Bel Air and Havre de Grace?", "Yes, both are inside twenty minutes, and we do pickup and online ordering for both."),
      faqItem("abe-6", "Can you cater for a group at Ripken Stadium or a local event?", "Yes, catering starts at $15.99 per person. Call 443-327-8349 with your headcount and date."),
    ],
  },

  // 06 - MANASSAS, VA
  {
    slug: "is-hibachi-halal-manassas-va",
    locationSlugs: ["manassas-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Manassas, VA Guide to Halal Japanese Food",
    excerpt:
      "Halal hibachi on Liberia Ave in Manassas, VA. 100% halal menu, no pork in the building, sauces made in house. Order online or call 703-789-8289.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/chicken-and-beef.jpg",
    featuredImageAlt:
      "Halal chicken and beef hibachi combo at Flame Japanese Hibachi in Manassas, VA",
    intro:
      "Yes, and in Manassas that answer matters more than most places. Prince William County has one of the larger and faster growing Muslim populations in the country, and the halal scene here has grown with it. What has not grown with it is halal variety. There is excellent Afghan, Pakistani and Middle Eastern food up and down Liberia Avenue and Sudley Road, and until recently there was almost no halal Japanese anywhere in the county. We are at 9522 Liberia Ave. Here is what makes hibachi halal, and how ours works.",
    body: [
      h("The three questions that decide it"),
      p("The word hibachi refers to a style of cooking, so it carries no halal status of its own. Whether the plate in front of you is halal depends on three decisions the restaurant made long before you sat down."),
      p("**The meat supplier.**Halal chicken, beef and lamb come from suppliers who slaughter to halal standard. This is a purchasing decision and it costs more, which is why most hibachi restaurants skip it."),
      p("**What else is cooked on the grill.**Hibachi runs on a single large flat top. A restaurant with pork on the menu has cooked pork on the same steel as your dinner, and no amount of scraping changes that for a diner who takes halal seriously."),
      p("**What goes into the sauces.**Mirin and cooking sake are standard ingredients in teriyaki and eel sauce. A halal chicken breast finished with a mirin-based glaze is not a halal plate, and this is the step most people never think to check."),
      p("Flame answers all three the same way at every location. The entire menu is halal. Pork is not served, stored or cooked anywhere on the property. Our sauces are made in house, not sourced from a distributor."),
      p("Those are the three questions worth asking any hibachi restaurant before you order: the supplier, the grill and the sauce. Most cannot answer all three."),
      h("At our Manassas location"),
      p("We are at 9522 Liberia Ave, Manassas, VA 20110, on the main Liberia Avenue run. Old Town Manassas is minutes away. Signal Hill, Yorkshire and Manassas Park are close. Sudley Road, Route 28 and Prince William Parkway all feed into us, and the Battlefield is a short drive north."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays. We also serve Centreville, Woodbridge, Dale City and Gainesville. If you are further west out Linton Hall Road, our Bristow location is probably closer."),
      p("Ramadan is the busiest stretch of the year at this store. If you are planning iftar for a group, book catering early. The same is true of Eid, when the two or three days either side fill up faster than any other point in the calendar."),
      h("Getting here, and the towns we serve"),
      p("Liberia Avenue connects most of the city, so this store is a straightforward drive from almost anywhere in Manassas. Old Town, Signal Hill, Yorkshire and Manassas Park are minutes away. Sudley Road and Route 28 bring in the north end, and Prince William Parkway pulls in Woodbridge and Dale City in about twenty minutes. Centreville is a similar run up 28."),
      p("Gainesville, Haymarket and the Linton Hall corridor are closer to our Bristow store, so use whichever is the shorter drive."),
      p("Friday evenings and the whole of Ramadan are the busiest windows here by a distance. Every plate is cooked when the order comes in, so pre-ordering online is the difference between collecting and queuing. For iftar in particular, order well ahead of Maghrib rather than at it, because everyone else has the same idea at the same minute."),
      h("What to order in Manassas"),
      p("Chicken and Beef Combo, $11.85. Two proteins under twelve dollars. The most ordered combo on the menu and it is on our promotions list."),
      p("Green Dragon Roll, $9.85. Halal sushi that does not feel like a compromise, which is rare."),
      p("Loaded Teriyaki Fries, $10.85. Hibachi protein over fries. This is the one teenagers order and then talk about."),
      p("Buffalo Wings, 20 pieces, $27.99. Fourteen flavors. Built for a table, not a person."),
      p(PLATES_BUILT),
      p("For a family table in Manassas, order across proteins rather than doubling up. Two combos, a bento and a roll gives five people something different each, and it works out cheaper than five separate plates."),
      links([
        { label: "Manassas hibachi menu", href: "/menu/manassas-va" },
        { label: "Start an order", href: orderUrlFor("manassas-va") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Liberia Avenue, cooked fresh when you order. Flame Japanese Hibachi Manassas, 9522 Liberia Ave, Manassas, VA 20110. 703-789-8289. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("manassas-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Bristow guide", href: "/blog/is-hibachi-halal-bristow-va" },
      ]),
    ],
    faq: [
      faqItem("man-1", "Is everything on the menu halal?", "Yes. All of it, at every location. No pork is served, stored or cooked on the premises."),
      faqItem("man-2", "Where is halal hibachi in Manassas?", "9522 Liberia Ave, on the main Liberia Avenue corridor, minutes from Old Town Manassas."),
      faqItem("man-3", "Is there halal food near Old Town Manassas?", "Yes, we are a few minutes out on Liberia Avenue, and we do pickup, dine-in and online ordering."),
      faqItem("man-4", "Do you take iftar and Ramadan catering orders?", "Yes, and this store handles a lot of them. Catering starts at $15.99 per person. Call 703-789-8289 well ahead during Ramadan, since dates book out."),
      faqItem("man-5", "Are the sauces made with alcohol?", "Our sauces are made in house instead of bought in. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("man-6", "What is the difference between your Manassas and Bristow locations?", "Same menu, same halal standard, different sides of the county. Bristow is closer if you are out toward Gainesville, Haymarket or Linton Hall."),
    ],
  },

  // 07 - ALEXANDRIA, VA
  {
    slug: "is-hibachi-halal-alexandria-va",
    locationSlugs: ["alexandria-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? An Alexandria, VA Guide for Richmond Highway",
    excerpt:
      "Halal Japanese hibachi on Richmond Hwy in Alexandria, VA, near Hybla Valley and Fort Belvoir. 100% halal. Order online or call 571-683-3199 today.",
    author: "Flame Japanese Hibachi Team",
    date: "July 21, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/salmon-and-shrimp.jpg",
    featuredImageAlt:
      "Halal salmon and shrimp hibachi combo at Flame Japanese Hibachi in Alexandria, VA",
    intro:
      "Yes, and on the Richmond Highway corridor the interesting part of that question is not whether halal food exists. It plainly does. This is one of the most internationally diverse stretches of road in Northern Virginia, and between Penn Daw, Hybla Valley and Groveton you can eat halal Afghan, Ethiopian, Pakistani and West African food within a mile of each other. What has been missing is halal Japanese. We are at 6676 Richmond Hwy. Here is what makes hibachi halal, and what to expect from ours.",
    body: [
      h("The three things that decide whether hibachi is halal"),
      p("Hibachi is a cooking method, not an ingredient. The answer is never about the hibachi. It is about the kitchen behind it. Three things disqualify most hibachi restaurants."),
      p("**The meat.**Chicken, beef and lamb have to come from a halal supplier and be slaughtered to halal standard. Most hibachi restaurants buy commodity meat and have no answer when you ask where it came from."),
      p("**Pork on the premises.**A restaurant serving pork gyoza or bacon fried rice is cooking it on the same flat top as your chicken. Even a kitchen with halal chicken cannot hand you a clean plate when there is pork six inches away on the same steel."),
      p("**Alcohol in the sauce.**This is the one almost nobody checks. Traditional teriyaki, eel sauce and many yum yum recipes are built on mirin or cooking sake. The meat can be perfectly halal and the sauce poured over it is not."),
      p("Flame clears all three. Every location serves a 100% halal menu. There is no pork anywhere in the building, so there is nothing on the grill to avoid. Our sauces are made in house rather than bought in, which is what lets us control what goes into them."),
      p("Those are also the three questions to ask anywhere else on this corridor: who supplies your meat, is there pork in the building, and what is in your teriyaki."),
      h("At our Alexandria location"),
      p("We are at 6676 Richmond Hwy, Alexandria, VA 22306, on the Route 1 corridor in the Hybla Valley and Groveton stretch. Mount Vernon is south of us, Huntington Metro is north, and Fort Belvoir is a short run down Richmond Highway. Beacon Hill, Penn Daw, Kingstowne and the Springfield side are all close."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("This is a heavy pickup store. The Route 1 traffic pattern means most people order ahead, park for two minutes and go. If you want to eat in and watch the grill, the quieter window is mid-afternoon. Old Town Alexandria is about fifteen minutes north if you are coming from that direction."),
      h("Getting here, and the towns we serve"),
      p("Richmond Highway runs straight past the door, which makes this a simple stop from most of the southern Fairfax corridor. Hybla Valley, Groveton, Penn Daw and Beacon Hill are minutes away. Mount Vernon is a short run south and Huntington Metro is close to the north. Fort Belvoir, Kingstowne, Springfield and Franconia are all inside fifteen minutes, and Old Town Alexandria is about fifteen north."),
      p("If you are coming from Arlington or Falls Church, our Seven Corners store is usually the quicker option."),
      p("Route 1 traffic is the main constraint here, not the kitchen. Most people at this location order online, park for two minutes and leave. Everything is cooked when the ticket comes in, so pre-ordering is what turns a Richmond Highway stop into something you can do on a commute rather than a plan you have to make."),
      h("What to order in Alexandria"),
      p("Salmon and Shrimp Combo, $12.85. Two seafood proteins on one plate, and the one this store is known for."),
      p("Shrimp Tempura Roll, $7.85. Halal sushi at a price that makes it an add-on rather than a decision."),
      p("Matcha Milk Tea, $7.15. Ten boba toppings available, from crystal boba to lychee coconut jelly."),
      p("Chicken Hibachi, $9.85. The under-ten-dollar plate, two sides included."),
      p(PLATES_BUILT),
      p("On Richmond Highway most orders leave the building rather than stay in it, so the bento and the combo travel best. If you are eating in, ask for the sides split rather than mixed, which holds better when the plate sits."),
      links([
        { label: "Alexandria hibachi menu", href: "/menu/alexandria-va" },
        { label: "Start an order", href: orderUrlFor("alexandria-va") },
      ]),
      h("Visit us"),
      p("Halal Japanese hibachi on Richmond Highway, made to order. Flame Japanese Hibachi Alexandria, 6676 Richmond Hwy, Alexandria, VA 22306. 571-683-3199. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("alexandria-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Seven Corners guide", href: "/blog/is-hibachi-halal-seven-corners-va" },
      ]),
    ],
    faq: [
      faqItem("alx-1", "Is the whole menu halal?", "Yes, every item. No pork is served, stored or cooked anywhere in the building."),
      faqItem("alx-2", "Is there halal Japanese food on Richmond Highway?", "Yes, at 6676 Richmond Hwy. The corridor has a lot of halal, and very little of it is Japanese, which is the gap we fill."),
      faqItem("alx-3", "Where can I get halal food near Fort Belvoir?", "We are a short drive up Richmond Highway from the base. Ordering ahead online is the fastest route if you are on a lunch break."),
      faqItem("alx-4", "Are the sauces halal?", "Our sauces are made in house, not bought from a distributor. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake, which is why we make ours."),
      faqItem("alx-5", "Do you serve Mount Vernon and Kingstowne?", "Yes, both are inside about fifteen minutes, and we handle pickup and online orders from both."),
      faqItem("alx-6", "How close is the Seven Corners location?", "About twenty minutes north depending on traffic. Same menu and same halal standard, so use whichever is easier from where you are."),
    ],
  },

  // 08 - SEVEN CORNERS, VA
  {
    slug: "is-hibachi-halal-seven-corners-va",
    locationSlugs: ["seven-corners-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Falls Church Guide to Halal Japanese Food",
    excerpt:
      "Halal hibachi at Seven Corners in Falls Church, VA. 100% halal menu, no pork on the grill, in-house sauces. Order online or call 571-480-5161.",
    author: "Flame Japanese Hibachi Team",
    date: "July 22, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/sushi/green-dragon.jpg",
    featuredImageAlt:
      "Halal sushi rolls at Flame Japanese Hibachi in Falls Church, VA",
    intro:
      "Yes, and Seven Corners is probably the best possible place to make that claim, because this is a neighborhood that will check. Between Falls Church, Bailey’s Crossroads and Annandale you have one of the most food-literate stretches in the DC area, and one of the largest Muslim communities in Virginia. People here know the difference between a restaurant that says halal and a restaurant that is built halal. We are at 6379 Seven Corners Center. Here is the difference, in detail.",
    body: [
      h("What makes hibachi halal or not"),
      p("Hibachi describes how the food is cooked, not what it is made of. So the question is really about the restaurant, and the honest answer for most hibachi restaurants is no. Here is where they fail."),
      p("**Sourcing.**Halal starts with the supplier. Chicken, beef and lamb have to be slaughtered to halal standard, and a restaurant either has that paperwork or it does not."),
      p("**The shared grill.**Most hibachi kitchens run one flat top for everything on the menu. If pork is on that menu, it has been on that surface. Wiping it down between orders is not the same thing as never cooking pork at all."),
      p("**The sauces.**Teriyaki, eel sauce and a lot of house yum yum are made with mirin or sake. It is the most commonly missed detail in halal dining, because diners check the protein and stop there."),
      p("Flame was set up so none of that applies. The full menu is halal, top to bottom. No pork comes through the door, which means the grill has one job. Sauces are made in our own kitchen instead of bought from a distributor, so we know what is in them."),
      p("Ask those three questions anywhere else you eat hibachi: where does the meat come from, is pork cooked here, and is there mirin in the sauce. If a restaurant hesitates on any of them, you have your answer."),
      h("At our Seven Corners location"),
      p("We are at 6379 Seven Corners Center, Falls Church, VA 22044, inside the Seven Corners shopping center where Route 7 and Route 50 meet. Eden Center is minutes away. Bailey’s Crossroads is next door, Annandale is a short drive south, and Arlington, Tysons and Skyline are all easy runs."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("This is the store where the ingredient questions get most specific, and the staff here are used to answering them properly rather than nodding. If you want to watch the grill rather than collect from it, the quiet stretch is mid-afternoon, between the lunch and dinner rushes. Evenings from six onward are the busiest, particularly at the end of the week."),
      h("Getting here, and the towns we serve"),
      p("Seven Corners sits where Route 7 and Route 50 cross, which puts a lot of Northern Virginia inside a short drive. Bailey’s Crossroads is next door. Falls Church City, Annandale and Culmore are minutes away. Arlington, Skyline, Tysons and Merrifield are all inside fifteen, and the Beltway pulls in Springfield and McLean not much further out."),
      p("If you are coming up from Mount Vernon or Fort Belvoir, our Alexandria store on Richmond Highway is the shorter run."),
      p("Seven Corners is a genuinely confusing junction and the parking is worse, so give yourself an extra minute the first time. Ordering online before you set off is worth doing here for that reason alone. Everything is cooked when the order lands, so a pre-order means you park once, collect and get back out of the intersection."),
      h("What to order at Seven Corners"),
      p("Chicken, Beef and Shrimp Combo, $14.85. Three proteins, and the plate most tables order at least one of."),
      p("California Roll, $7.85. The cheapest way to find out that halal sushi is a real thing."),
      p("Mango Passion Fruit Tea, $6.25. Ten toppings on the boba menu, including mango popping and rainbow jelly."),
      p("Boneless Wings, 10 pieces, $14.99. Fourteen flavors, from Garlic Parmesan to Thai Chilli to Rim Fire."),
      p(PLATES_BUILT),
      p("At Seven Corners the table order is usually a spread: two combos, a couple of rolls and a wing count for the middle. If you are catering an event, from $15.99 per person, the platters scale better than individual boxes for anything over ten people."),
      links([
        { label: "Seven Corners hibachi menu", href: "/menu/seven-corners-va" },
        { label: "Start an order", href: orderUrlFor("seven-corners-va") },
      ]),
      h("Visit us"),
      p("Halal hibachi at Seven Corners, cooked fresh on a grill that has never seen pork. Flame Japanese Hibachi Seven Corners, 6379 Seven Corners Center, Falls Church, VA 22044. 571-480-5161. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("seven-corners-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Alexandria guide", href: "/blog/is-hibachi-halal-alexandria-va" },
      ]),
    ],
    faq: [
      faqItem("svc-1", "Is the entire menu halal?", "Yes. Every item at every location. No pork is served, stored or cooked anywhere on site."),
      faqItem("svc-2", "Where can I get halal food near Seven Corners and Bailey’s Crossroads?", "We are inside Seven Corners Center at 6379 Seven Corners Center, at the Route 7 and Route 50 junction."),
      faqItem("svc-3", "Is there halal Japanese food in Falls Church?", "Yes. Falls Church has deep halal options across many cuisines, but halal hibachi and halal sushi are rare, which is the specific gap we fill."),
      faqItem("svc-4", "Are the sauces made with mirin or sake?", "Our sauces are made in house rather than bought in, which is exactly why we can answer this question. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("svc-5", "Do you cater in Falls Church and Annandale?", "Yes, from $15.99 per person. Call 571-480-5161. Ramadan and Eid dates book out early."),
      faqItem("svc-6", "Which Flame is closest if I am in Alexandria?", "The Richmond Highway store at 6676 Richmond Hwy, about twenty minutes south."),
    ],
  },

  // 09 - BRISTOW, VA
  {
    slug: "is-hibachi-halal-bristow-va",
    locationSlugs: ["bristow-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Bristow, VA Guide for Western Prince William",
    excerpt:
      "Halal hibachi at Bristow Center, minutes from Jiffy Lube Live and Gainesville. 100% halal menu. Order online or call 703-420-2339 before you go.",
    author: "Flame Japanese Hibachi Team",
    date: "July 23, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/beef-and-shrimp.jpg",
    featuredImageAlt:
      "Build your own halal hibachi platter at Flame Japanese Hibachi in Bristow, VA",
    intro:
      "Yes, when the kitchen is built for it, and ours at Bristow Center is. Western Prince William has grown fast, and the restaurants have not entirely kept up. Families in Braemar, Victory Lakes and out along Linton Hall Road have been driving to Manassas or Centreville for a halal dinner that is not pizza. We are at 10286 Bristow Center Dr, minutes from Jiffy Lube Live and a short run to Gainesville, Haymarket and Nokesville. Here is what actually makes hibachi halal.",
    body: [
      h("The three questions that decide it"),
      p("The word hibachi refers to a style of cooking, so it carries no halal status of its own. Whether the plate in front of you is halal depends on three decisions the restaurant made long before you sat down."),
      p("**The meat supplier.**Halal chicken, beef and lamb come from suppliers who slaughter to halal standard. This is a purchasing decision and it costs more, which is why most hibachi restaurants skip it."),
      p("**What else is cooked on the grill.**Hibachi runs on a single large flat top. A restaurant with pork on the menu has cooked pork on the same steel as your dinner, and no amount of scraping changes that for a diner who takes halal seriously."),
      p("**What goes into the sauces.**Mirin and cooking sake are standard ingredients in teriyaki and eel sauce. A halal chicken breast finished with a mirin-based glaze is not a halal plate, and this is the step most people never think to check."),
      p("Flame answers all three the same way at every location. The entire menu is halal. Pork is not served, stored or cooked anywhere on the property. Our sauces are made in house, not sourced from a distributor."),
      p("Those are the three questions worth asking any hibachi restaurant before you order: the supplier, the grill and the sauce. Most cannot answer all three."),
      h("At our Bristow location"),
      p("We are at 10286 Bristow Center Dr, Bristow, VA 20136, in Bristow Center off Linton Hall Road. Jiffy Lube Live is minutes away, which shapes our summer entirely. Braemar, Victory Lakes and the Patriot High School side are all close, and Gainesville, Haymarket, Nokesville and Manassas are inside fifteen to twenty minutes."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Concert nights are the thing to plan around. On a Jiffy Lube Live show night the four to seven window is our busiest of the week, and it is worth ordering ahead if you are eating before a show. It also means we are one of very few halal options anywhere near that venue, which a lot of people find out the hard way in a parking lot. If you are closer to Liberia Avenue, our Manassas location is probably the quicker stop."),
      h("Getting here, and the towns we serve"),
      p("Bristow Center sits off Linton Hall Road, which is the main artery for this whole side of the county. Braemar, Victory Lakes and the Patriot High School area are minutes away. Gainesville is about ten minutes, Haymarket about fifteen, and Nokesville a short run south. Manassas and Manassas Park are fifteen to twenty east on Route 28."),
      p("Jiffy Lube Live is close enough that we plan around its calendar, and Route 29 and I-66 both feed the area from the west."),
      p("On concert nights the four to seven window is genuinely busy, and every plate is cooked to order rather than held. If you are eating before a show, order online in the afternoon and collect on the way. Youth sports teams do the same thing on Saturdays, usually with a wing count in the twenties or thirties."),
      h("What to order in Bristow"),
      p("**Build Your Own Platter.** The most flexible thing on the menu, and the right call when everyone at the table wants something different."),
      p("Chicken, Beef and Shrimp Combo, $14.85. Three proteins, two sides. The standard order before a show."),
      p("Buffalo Wings, 20 pieces, $27.99. Fourteen flavors, and the order for a team, a tailgate or a group heading to the amphitheater. 30, 50 and 100 piece counts are on the menu too."),
      p("Loaded Steak Fries, $11.85. Hibachi steak over fries, which travels better than a plate does."),
      p(PLATES_BUILT),
      p("For a show night at the amphitheater, the bento and the loaded fries hold up in a car far better than an open hibachi plate. For a team on a Saturday, the 30 and 50 piece wing counts are the cheaper way to feed a bench."),
      links([
        { label: "Bristow hibachi menu", href: "/menu/bristow-va" },
        { label: "Start an order", href: orderUrlFor("bristow-va") },
      ]),
      h("Visit us"),
      p("Halal hibachi in Bristow Center, minutes from the amphitheater. Flame Japanese Hibachi Bristow, 10286 Bristow Center Dr, Bristow, VA 20136. 703-420-2339. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("bristow-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Manassas guide", href: "/blog/is-hibachi-halal-manassas-va" },
      ]),
    ],
    faq: [
      faqItem("bri-1", "Is everything on the menu halal?", "Yes, the entire menu at every location. No pork is served, stored or cooked on the premises."),
      faqItem("bri-2", "Where can I eat halal before a concert at Jiffy Lube Live?", "Here. We are minutes from the venue at Bristow Center, and we are one of the only halal kitchens within easy reach of it. Order ahead on show nights."),
      faqItem("bri-3", "Is there halal food in Bristow or Gainesville?", "Yes. We are the halal Japanese option for western Prince William, serving Bristow, Gainesville, Haymarket, Nokesville and the Linton Hall corridor."),
      faqItem("bri-4", "Are the sauces halal?", "Our sauces are made in house rather than bought from a distributor. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("bri-5", "Can you handle a large order for a team or a party?", "Yes. Wings go up to 100 pieces and catering starts at $15.99 per person. Call 703-420-2339 with numbers and a time."),
      faqItem("bri-6", "How far is the Manassas location?", "About fifteen to twenty minutes east on Linton Hall Road and Route 28. Same menu, same standard."),
    ],
  },

  // 10 - FOREST HILL, RICHMOND, VA
  {
    slug: "is-hibachi-halal-forest-hill-richmond-va",
    locationSlugs: ["forest-hill-richmond-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A South Richmond Guide to Halal Japanese Food",
    excerpt:
      "Halal hibachi on Forest Hill Ave in Richmond, VA. Southside’s halal Japanese option, 100% halal menu. Order online or call 804-997-7009 today.",
    author: "Flame Japanese Hibachi Team",
    date: "July 21, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/salmon-hibachi-plate.jpg",
    featuredImageAlt:
      "Halal salmon hibachi at Flame Japanese Hibachi on Forest Hill Avenue, Richmond VA",
    intro:
      "Yes, and in South Richmond it is worth saying loudly, because almost all of this city’s halal dining sits north of the James. If you live in Stratford Hills, Westover Hills, Bon Air or anywhere along Forest Hill Avenue, you have probably crossed a bridge to eat halal more times than you can count. We are at 7037 Forest Hill Ave, Suite B, on your side of the river. Here is what makes hibachi halal or not, and what happens in our kitchen.",
    body: [
      h("The three things that decide whether hibachi is halal"),
      p("Hibachi is a cooking method, not an ingredient. The answer is never about the hibachi. It is about the kitchen behind it. Three things disqualify most hibachi restaurants."),
      p("**The meat.**Chicken, beef and lamb have to come from a halal supplier and be slaughtered to halal standard. Most hibachi restaurants buy commodity meat and have no answer when you ask where it came from."),
      p("**Pork on the premises.**A restaurant serving pork gyoza or bacon fried rice is cooking it on the same flat top as your chicken. Even a kitchen with halal chicken cannot hand you a clean plate when there is pork six inches away on the same steel."),
      p("**Alcohol in the sauce.**This is the one almost nobody checks. Traditional teriyaki, eel sauce and many yum yum recipes are built on mirin or cooking sake. The meat can be perfectly halal and the sauce poured over it is not."),
      p("Flame clears all three. Every location serves a 100% halal menu. There is no pork anywhere in the building, so there is nothing on the grill to avoid. Our sauces are made in house rather than bought in, which is what lets us control what goes into them."),
      p("Those are also the three questions to ask any hibachi restaurant in Richmond: who supplies your meat, is there pork in the building, and what is in your teriyaki."),
      h("At our Forest Hill location"),
      p("We are at 7037 Forest Hill Ave, Suite B, Richmond, VA 23225, on the Southside stretch of Forest Hill Avenue. Forest Hill Park is close. Stratford Hills and Westover Hills are minutes away, Bon Air is a short run west, and Chippenham Parkway puts Midlothian and the Powhite corridor within easy reach. Carytown and VCU are across the river, roughly fifteen minutes depending on the bridge."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("The James River Park System is a few minutes from the door, which makes this a genuinely good pickup stop before Reedy Creek or the Buttermilk trail. Hibachi in a box travels better than most things do. Weekends run heavier than weeknights here, with Saturday evening the busiest window of the seven. If you are coming from Bon Air or Midlothian, Chippenham Parkway is usually the faster approach at rush hour than Forest Hill Avenue itself."),
      h("Getting here, and the neighborhoods we serve"),
      p("Forest Hill Avenue runs through the middle of Southside, so this store is an easy drive for most of it. Forest Hill, Westover Hills, Stratford Hills and Woodland Heights are minutes away. Bon Air is a short run west, Chippenham Parkway brings in Midlothian and the Powhite corridor, and Manchester and Blackwell are close to the east."),
      p("Across the river, Carytown, the Fan and VCU are roughly fifteen minutes depending on which bridge you take and when."),
      p("The James River Park entrances at Reedy Creek and the Buttermilk trail are a few minutes from the door, which makes this a strong pickup stop before or after. Everything is cooked when the order comes in, so ordering online first means the food is hot and ready rather than something you wait around for at the counter."),
      h("What to order at Forest Hill"),
      p("Salmon Hibachi, $11.85. Our best-selling item across the brand, and the one to try first."),
      p("Hibachi Chicken Roll, $7.85. Hibachi chicken in a sushi roll. It is the most Richmond thing on the menu in that it should not work and does."),
      p("Watermelon Slush, $6.49. In a Richmond July this is not optional."),
      p("Chicken Hibachi, $9.85. Under ten dollars, two sides included, and the student order."),
      p(PLATES_BUILT),
      p("For a trailhead pickup, the bento closes flat and stays hot longer than a plate. For a family dinner on Southside, two combos and a roll across the table covers four without over-ordering."),
      links([
        { label: "Forest Hill hibachi menu", href: "/menu/forest-hill-richmond-va" },
        { label: "Start an order", href: orderUrlFor("forest-hill-richmond-va") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Forest Hill Avenue. No bridge required. Flame Japanese Hibachi Forest Hill, 7037 Forest Hill Ave, Suite B, Richmond, VA 23225. 804-997-7009. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("forest-hill-richmond-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Mechanicsville guide", href: "/blog/is-hibachi-halal-mechanicsville-va" },
      ]),
    ],
    faq: [
      faqItem("fh-1", "Is the whole menu halal?", "Yes. Every item, at every location. No pork is served, stored or cooked anywhere on site."),
      faqItem("fh-2", "Is there halal food in South Richmond?", "Yes, and there was not much before. We are at 7037 Forest Hill Ave, Suite B, which is the halal Japanese option on the Southside without crossing the river."),
      faqItem("fh-3", "How far is Flame from VCU or Carytown?", "Roughly fifteen minutes across the river depending on which bridge you take and the time of day."),
      faqItem("fh-4", "Are the sauces halal?", "Our sauces are made in house instead of bought in. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("fh-5", "Do you deliver to Bon Air and Midlothian?", "Delivery runs through our online ordering. Pickup is usually faster from either, since Chippenham makes the drive short."),
      faqItem("fh-6", "Do you cater in Richmond?", "Yes, from $15.99 per person, on both sides of the river. Call 804-997-7009 to arrange it."),
    ],
  },

  // 11 - MECHANICSVILLE, VA
  {
    slug: "is-hibachi-halal-mechanicsville-va",
    locationSlugs: ["mechanicsville-va"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Mechanicsville and Hanover County Guide",
    excerpt:
      "Halal hibachi on Bell Creek Rd in Mechanicsville, VA. Hanover County’s halal Japanese kitchen. Order online or call 804-789-8540 for pickup.",
    author: "Flame Japanese Hibachi Team",
    date: "July 23, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt:
      "Halal chicken hibachi at Flame Japanese Hibachi in Mechanicsville, VA",
    intro:
      "Yes, and in Hanover County that is a genuinely new sentence. Until recently, eating halal in Mechanicsville meant driving into Richmond, and most families here did it on a schedule rather than a whim. We are at 7354 Bell Creek Rd, off Route 360, and the whole point of this location is that the drive is no longer part of the plan. Here is what makes hibachi halal, why most hibachi is not, and what to expect from ours.",
    body: [
      h("What makes hibachi halal or not"),
      p("Hibachi describes how the food is cooked, not what it is made of. So the question is really about the restaurant, and the honest answer for most hibachi restaurants is no. Here is where they fail."),
      p("**Sourcing.**Halal starts with the supplier. Chicken, beef and lamb have to be slaughtered to halal standard, and a restaurant either has that paperwork or it does not."),
      p("**The shared grill.**Most hibachi kitchens run one flat top for everything on the menu. If pork is on that menu, it has been on that surface. Wiping it down between orders is not the same thing as never cooking pork at all."),
      p("**The sauces.**Teriyaki, eel sauce and a lot of house yum yum are made with mirin or sake. It is the most commonly missed detail in halal dining, because diners check the protein and stop there."),
      p("Flame was set up so none of that applies. The full menu is halal, top to bottom. No pork comes through the door, which means the grill has one job. Sauces are made in our own kitchen instead of bought from a distributor, so we know what is in them."),
      p("Ask those three questions anywhere else you eat hibachi: where does the meat come from, is pork cooked here, and is there mirin in the sauce. If a restaurant hesitates on any of them, you have your answer."),
      h("At our Mechanicsville location"),
      p("We are at 7354 Bell Creek Rd, Mechanicsville, VA 23111, off the Route 360 corridor. Atlee and Rutland are minutes away. Pole Green Park is close. Ashland is a short run north, Glen Allen is west, and Richmond Raceway is about fifteen minutes down 360 toward Henrico."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Here is the part worth being direct about. Hanover County has had close to no halal dining. Families here have been driving twenty-five or thirty minutes each way for years. That is the reason this store opened, and it is why we get a lot of first-time visitors who say they saw the sign and had to check whether we meant it. We did. If you are on the Southside of Richmond, our Forest Hill location is the closer stop."),
      h("Getting here, and the towns we serve"),
      p("Bell Creek Road connects straight to Route 360, which is how most of Hanover County moves. Mechanicsville, Atlee and Rutland are minutes away. Pole Green and the Cold Harbor side are close. Ashland is about twenty minutes north, Glen Allen is a similar run west, and Richmond Raceway and the Henrico line are roughly fifteen down 360."),
      p("If you are further south or across the river, our Forest Hill store on Richmond’s Southside is the closer option."),
      p("A lot of first-time visitors here have driven in from outside the county after hearing about us, so weekends run heavier than a store this size normally would. Everything is cooked to order, so pre-ordering online is worth it on a Friday or Saturday evening. During the week, walk-ins are usually straightforward."),
      h("What to order in Mechanicsville"),
      p("Chicken Hibachi, $9.85. Under ten dollars with two sides. Where most people in Hanover start."),
      p("Chicken and Beef Bento, $13.85. Hibachi, vegetables, rice or noodles, a 4-piece California Roll, 2 dumplings and 2 spring rolls. The most complete plate on the menu."),
      p("Buffalo Wings, 10 pieces, $14.99. Fourteen flavors, and halal wings are otherwise not a thing in this county."),
      p("Tofu Hibachi, $9.85. Worth flagging, because vegetarian options in Hanover are also thin."),
      p(PLATES_BUILT),
      p("In Hanover the most common first order is chicken hibachi with fried rice and vegetables, then people come back and work outward from there. For a family of four, two combos and a bento is the efficient build."),
      links([
        { label: "Mechanicsville hibachi menu", href: "/menu/mechanicsville-va" },
        { label: "Start an order", href: orderUrlFor("mechanicsville-va") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Bell Creek Road. The drive into Richmond is optional now. Flame Japanese Hibachi Mechanicsville, 7354 Bell Creek Rd, Mechanicsville, VA 23111. 804-789-8540. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("mechanicsville-va") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Forest Hill guide", href: "/blog/is-hibachi-halal-forest-hill-richmond-va" },
      ]),
    ],
    faq: [
      faqItem("mec-1", "Is all the food halal?", "Yes, the entire menu at every location. No pork is served, stored or cooked anywhere on the property."),
      faqItem("mec-2", "Is there any halal restaurant in Mechanicsville or Hanover County?", "We are at 7354 Bell Creek Rd, and halal dining in this county is genuinely scarce, which is why we are here."),
      faqItem("mec-3", "How far is halal food from Atlee or Rutland?", "Minutes. Both are inside the Bell Creek and Route 360 area we sit in."),
      faqItem("mec-4", "Are the sauces halal?", "Our sauces are made in house rather than bought from a distributor. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("mec-5", "Do you cater in Hanover County?", "Yes, from $15.99 per person. Call 804-789-8540. School functions, office lunches and family events."),
      faqItem("mec-6", "Do you have vegetarian options?", "Yes. Tofu Hibachi at $9.85, Tofu Bento at $12.85, and the Avocado and Avocado & Cucumber rolls at $7.85."),
    ],
  },

  // 12 - PHILADELPHIA, PA
  {
    slug: "is-hibachi-halal-philadelphia-pa",
    locationSlugs: ["philadelphia-pa"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Philadelphia Guide to Halal Japanese Food",
    excerpt:
      "Halal hibachi on E Olney Ave, a block from Olney Transportation Center. 100% halal menu, no pork on site. Order online or call 215-344-6444.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/beef-and-shrimp-bento.jpg",
    featuredImageAlt:
      "Halal chicken and beef bento at Flame Japanese Hibachi on Olney Avenue, Philadelphia",
    intro:
      "Yes, and Philadelphia is a city that will tell you quickly if you are wrong about it. Philly has one of the largest and oldest Muslim communities in the country, and halal here is not a niche, it is infrastructure. What Philly has less of is halal Japanese. Walk Olney Avenue and you can eat halal at a dozen counters, and almost none of them are firing a hibachi grill. We are at 101 E Olney Avenue, a block from the Transportation Center. Here is what makes hibachi halal, and how ours is built.",
    body: [
      h("The three questions that decide it"),
      p("The word hibachi refers to a style of cooking, so it carries no halal status of its own. Whether the plate in front of you is halal depends on three decisions the restaurant made long before you sat down."),
      p("**The meat supplier.**Halal chicken, beef and lamb come from suppliers who slaughter to halal standard. This is a purchasing decision and it costs more, which is why most hibachi restaurants skip it."),
      p("**What else is cooked on the grill.**Hibachi runs on a single large flat top. A restaurant with pork on the menu has cooked pork on the same steel as your dinner, and no amount of scraping changes that for a diner who takes halal seriously."),
      p("**What goes into the sauces.**Mirin and cooking sake are standard ingredients in teriyaki and eel sauce. A halal chicken breast finished with a mirin-based glaze is not a halal plate, and this is the step most people never think to check."),
      p("Flame answers all three the same way at every location. The entire menu is halal. Pork is not served, stored or cooked anywhere on the property. Our sauces are made in house, not sourced from a distributor."),
      p("Those are the three questions worth asking any hibachi restaurant in Philadelphia: the supplier, the grill and the sauce. Most cannot answer all three."),
      h("At our Olney location"),
      p("We are at 101 E Olney Avenue, Philadelphia, PA 19120, at the Broad and Olney end. Olney Transportation Center is a block away, which matters more here than parking does. The Broad Street Line puts us within a straight ride of Temple and Center City. La Salle University is a short walk or a quick bus. Fern Rock, Logan, Feltonville and Einstein Medical Center are all close."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Two groups drive this store. Commuters coming off the Broad Street Line who want something hot on the way home, and students from La Salle and Temple who have discovered that a bento box is cheaper than most things on Broad Street."),
      h("Getting here, and the neighborhoods we serve"),
      p("Broad and Olney is a transit corner more than a driving one, and that shapes everything about this store. Olney Transportation Center is a block away, which puts us within a single Broad Street Line ride of Temple, Center City and South Philly, and within reach of most of the bus routes feeding North Philadelphia."),
      p("On foot, La Salle University is a short walk. Logan, Fern Rock, Feltonville, Lawncrest and Einstein Medical Center are all close, and Cheltenham and the Montgomery County line are a short drive north."),
      p("Street parking on Olney Avenue is what you would expect, so if you are driving, allow for it. If you are on the subway, ordering online before your stop is the way to use this location. Everything is cooked when the ticket lands, so a pre-order means collecting on your way through rather than standing at the counter."),
      h("What to order in Olney"),
      p("Chicken and Beef Bento, $13.85. Hibachi, vegetables, rice or noodles, a 4-piece California Roll, 2 dumplings and 2 spring rolls, in a box that travels on the subway."),
      p("Loaded Steak Fries, $11.85. Hibachi steak over fries. The one people photograph."),
      p("Chicken Hibachi, $9.85. Under ten dollars, two sides. The student order."),
      p("Brown Sugar Milk Tea, $6.49. Ten boba toppings, including crystal boba and coffee jelly."),
      p(PLATES_BUILT),
      p("On the Broad Street Line the bento is the practical order because it closes and travels. For a group on campus, wings in 20 or 30 piece counts plus a couple of hibachi plates feeds more people per dollar than individual boxes."),
      links([
        { label: "Philadelphia hibachi menu", href: "/menu/philadelphia-pa" },
        { label: "Start an order", href: orderUrlFor("philadelphia-pa") },
      ]),
      h("Visit us"),
      p("Halal hibachi a block from Olney Transportation Center. Flame Japanese Hibachi Philadelphia, 101 E Olney Avenue, Philadelphia, PA 19120. 215-344-6444. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("philadelphia-pa") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore guide", href: "/blog/is-hibachi-halal-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("phl-1", "Is everything halal?", "Yes, the entire menu at every location. No pork is served, stored or cooked on the premises."),
      faqItem("phl-2", "Is there halal hibachi near Olney Transportation Center?", "Yes, we are a block away at 101 E Olney Avenue, which makes us one of the closest hot halal meals to the terminal."),
      faqItem("phl-3", "Where can La Salle or Temple students get halal food on Broad Street?", "Our Olney location is a short walk from La Salle and a straight Broad Street Line ride from Temple. The bento at $13.85 is the value order."),
      faqItem("phl-4", "Are the sauces halal?", "Our sauces are made in house rather than bought in. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("phl-5", "Do you deliver in North Philadelphia?", "Delivery runs through our online ordering. Pickup is faster if you are already on Olney or coming through the Transportation Center."),
      faqItem("phl-6", "Do you cater in Philadelphia?", "Yes, from $15.99 per person. Masjid events, campus groups, office lunches. Call 215-344-6444."),
    ],
  },

  // 13 - TAMARAC, FL
  {
    slug: "is-hibachi-halal-tamarac-fl",
    locationSlugs: ["tamarac-fl"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Tamarac, FL Guide for Broward County Diners",
    excerpt:
      "Halal hibachi on University Dr in Tamarac, FL, serving Coral Springs and Sunrise. 100% halal, no pork. Order online or call 954-953-8848 today.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/salmon-and-shrimp.jpg",
    featuredImageAlt:
      "Halal salmon and shrimp hibachi combo at Flame Japanese Hibachi in Tamarac, FL",
    intro:
      "Yes, and on University Drive it is the entire menu rather than a line on it. Broward County has a large and growing Muslim community spread across Tamarac, Coral Springs, Sunrise, North Lauderdale and Lauderhill, and halal options here have historically clustered around a few cuisines. Japanese was not one of them. We are at 5707 University Dr, and the question we get most at the counter is whether we mean the whole menu. We do. Here is what makes hibachi halal in the first place.",
    body: [
      h("The three things that decide whether hibachi is halal"),
      p("Hibachi is a cooking method, not an ingredient. The answer is never about the hibachi. It is about the kitchen behind it. Three things disqualify most hibachi restaurants."),
      p("**The meat.**Chicken, beef and lamb have to come from a halal supplier and be slaughtered to halal standard. Most hibachi restaurants buy commodity meat and have no answer when you ask where it came from."),
      p("**Pork on the premises.**A restaurant serving pork gyoza or bacon fried rice is cooking it on the same flat top as your chicken. Even a kitchen with halal chicken cannot hand you a clean plate when there is pork six inches away on the same steel."),
      p("**Alcohol in the sauce.**This is the one almost nobody checks. Traditional teriyaki, eel sauce and many yum yum recipes are built on mirin or cooking sake. The meat can be perfectly halal and the sauce poured over it is not."),
      p("Flame clears all three. Every location serves a 100% halal menu. There is no pork anywhere in the building, so there is nothing on the grill to avoid. Our sauces are made in house rather than bought in, which is what lets us control what goes into them."),
      p("Those are also the three questions to ask any hibachi restaurant in Broward: who supplies your meat, is there pork in the building, and what is in your teriyaki."),
      h("At our Tamarac location"),
      p("We are at 5707 University Dr, Tamarac, FL 33321, on the main University Drive run. Coral Springs is minutes north, Sunrise is south, and North Lauderdale, Lauderhill and the Woodlands are all a short drive. Sawgrass Mills is close enough for a post-shopping dinner, and Commercial Boulevard feeds straight in."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Two things shape this store. Family seating, because Broward orders in groups, and delivery, because from June through September nobody wants to be in a car longer than they have to be. The boba menu does a disproportionate amount of work here for the same reason. Weekend evenings are the busiest window, and Sunday afternoons the quietest if you want a table without a wait. School holidays visibly change the shape of the day, with lunch running later and longer."),
      h("Getting here, and the towns we serve"),
      p("University Drive is the north to south spine for this part of Broward, which makes the store easy to reach from a wide area. Tamarac and the Woodlands are minutes away. Coral Springs is a short run north, Sunrise is south, and North Lauderdale, Lauderhill and Margate are all inside about fifteen minutes."),
      p("Commercial Boulevard and Atlantic Boulevard both feed in, Sawgrass Mills is close for a post-shopping dinner, and the Sawgrass Expressway pulls in Parkland and Coconut Creek without much trouble."),
      p("From June through September, delivery and pickup carry this store, for reasons anyone who has parked in a Broward August will understand. Everything is cooked when the order comes in, so ordering online first means the food is hot and the car time is short. Family-size orders are the norm here, so build the platter to match the table."),
      h("What to order in Tamarac"),
      p("Salmon and Shrimp Combo, $12.85. Two seafood proteins, and the plate this store sells most of."),
      p("California Roll, $7.85. Halal sushi at a price that makes it a side rather than a decision."),
      p("Watermelon Slush, $6.49. In a Broward August, this is the actual reason some people walk in."),
      p("Chicken, Beef and Shrimp Combo, $14.85. The family plate, three proteins, two sides."),
      p(PLATES_BUILT),
      p("For a Broward family table, build across proteins rather than repeating one. Two combos, a bento and a couple of rolls covers four or five, and the boba order is usually as large as the food order in summer."),
      links([
        { label: "Tamarac hibachi menu", href: "/menu/tamarac-fl" },
        { label: "Start an order", href: orderUrlFor("tamarac-fl") },
      ]),
      h("Visit us"),
      p("Halal hibachi on University Drive, delivered or ready for pickup. Flame Japanese Hibachi Tamarac, 5707 University Dr, Tamarac, FL 33321. 954-953-8848. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("tamarac-fl") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Royal Palm Beach guide", href: "/blog/is-hibachi-halal-royal-palm-beach-fl" },
      ]),
    ],
    faq: [
      faqItem("tam-1", "Is the whole menu halal?", "Yes, every item at every location. No pork is served, stored or cooked anywhere on site."),
      faqItem("tam-2", "What halal restaurants deliver in Tamarac?", "We do, through our online ordering, across Tamarac and the surrounding Broward neighbourhoods."),
      faqItem("tam-3", "Is there halal hibachi near Coral Springs or Sunrise?", "Yes. We are on University Drive in Tamarac, minutes from both, and we serve North Lauderdale and Lauderhill as well."),
      faqItem("tam-4", "Are the sauces halal?", "Our sauces are made in house rather than bought from a distributor. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("tam-5", "Do you have family-size and group options?", "Yes. Build Your Own Platter, the three-protein combos, and wings up to 100 pieces. Catering starts at $15.99 per person."),
      faqItem("tam-6", "Which Flame is closest if I am in Palm Beach County?", "Royal Palm Beach at 9940 Belvedere Rd, Suite F, which is about forty-five minutes north depending on how I-95 and the Turnpike are running."),
    ],
  },

  // 14 - ROYAL PALM BEACH, FL
  {
    slug: "is-hibachi-halal-royal-palm-beach-fl",
    locationSlugs: ["royal-palm-beach-fl"],
    category: "Halal Guide",
    title: "Is Hibachi Halal? A Royal Palm Beach and Wellington Guide",
    excerpt:
      "Halal hibachi on Belvedere Rd in Royal Palm Beach, FL, serving Wellington and Loxahatchee. 100% halal menu. Order online or call 561-766-1038 today.",
    author: "Flame Japanese Hibachi Team",
    date: "July 22, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/flame-combo/chicken-and-salmon.jpg",
    featuredImageAlt:
      "Halal chicken, beef and shrimp hibachi combo at Flame Japanese Hibachi Royal Palm Beach, FL",
    intro:
      "Yes, and in western Palm Beach County that answer has been hard to come by. Royal Palm Beach, Wellington and Loxahatchee have grown into substantial communities, and halal dining out here has not kept pace. Most families have been driving east toward West Palm Beach or south toward Broward for it. We are at 9940 Belvedere Rd, Suite F, which puts halal hibachi inside the Village rather than half an hour outside it. Here is what makes hibachi halal, and what our kitchen does.",
    body: [
      h("What makes hibachi halal or not"),
      p("Hibachi describes how the food is cooked, not what it is made of. So the question is really about the restaurant, and the honest answer for most hibachi restaurants is no. Here is where they fail."),
      p("**Sourcing.**Halal starts with the supplier. Chicken, beef and lamb have to be slaughtered to halal standard, and a restaurant either has that paperwork or it does not."),
      p("**The shared grill.**Most hibachi kitchens run one flat top for everything on the menu. If pork is on that menu, it has been on that surface. Wiping it down between orders is not the same thing as never cooking pork at all."),
      p("**The sauces.**Teriyaki, eel sauce and a lot of house yum yum are made with mirin or sake. It is the most commonly missed detail in halal dining, because diners check the protein and stop there."),
      p("Flame was set up so none of that applies. The full menu is halal, top to bottom. No pork comes through the door, which means the grill has one job. Sauces are made in our own kitchen instead of bought from a distributor, so we know what is in them."),
      p("Ask those three questions anywhere else you eat hibachi: where does the meat come from, is pork cooked here, and is there mirin in the sauce. If a restaurant hesitates on any of them, you have your answer."),
      h("At our Royal Palm Beach location"),
      p("We are at 9940 Belvedere Rd, Suite F, Royal Palm Beach, FL 33411, on the Belvedere Road corridor. Royal Palm Beach Commons Park is close. Wellington is minutes south, Loxahatchee is west, and Southern Boulevard and Okeeheelee Park connect us east toward West Palm Beach and PBI, which is roughly twenty-five minutes out."),
      p("Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Holiday hours can shift around Eid and the major public holidays, so the Google Business Profile is worth a look before a long drive."),
      p("Season changes this store. From January through April the Wellington equestrian calendar brings a large international crowd into the area, a good share of whom are looking for halal and not finding much. Catering enquiries climb noticeably in that window. If you are organising for a group in season, book early. Outside season, from May through December, the pace is steadier and a weeknight walk-in is usually straightforward. Friday and Saturday from six onward stay busy year round and are worth ordering ahead for."),
      h("Getting here, and the towns we serve"),
      p("Belvedere Road runs east to west across the Village, so the store is a simple drive from most of western Palm Beach County. Royal Palm Beach and the Commons Park area are minutes away. Wellington is a short run south, Loxahatchee and The Acreage are west, and Southern Boulevard connects east toward West Palm Beach in about twenty minutes."),
      p("Okeeheelee Park, Greenacres and the Turnpike are all close, and Palm Beach International is roughly twenty-five minutes out."),
      p("Between January and April the equestrian season fills this area with visitors, many of them looking for halal and not finding much. Order volume and catering enquiries both climb noticeably in that window. Everything is cooked to order, so pre-ordering online is worth doing in season, and catering dates should be booked further ahead than you would expect."),
      h("What to order in Royal Palm Beach"),
      p("Chicken, Beef and Shrimp Combo, $14.85. Three proteins, two sides. The plate most families land on."),
      p("Green Dragon Roll, $9.85. Halal sushi that holds its own, which almost nothing else out here offers."),
      p("Salmon Hibachi, $11.85. Our best-selling item brand-wide."),
      p("Catering from $15.99 per person. Genuinely relevant here in season, from office lunches to private events."),
      p(PLATES_BUILT),
      p("For a family in the Village, two combos and a roll covers four. For anything in season with a headcount attached, catering from $15.99 per person is the sane option, and dates between January and April need booking early."),
      links([
        { label: "Royal Palm Beach hibachi menu", href: "/menu/royal-palm-beach-fl" },
        { label: "Start an order", href: orderUrlFor("royal-palm-beach-fl") },
      ]),
      h("Visit us"),
      p("Halal hibachi on Belvedere Road, cooked fresh to order. Flame Japanese Hibachi Royal Palm Beach, 9940 Belvedere Rd, Suite F, Royal Palm Beach, FL 33411. 561-766-1038. Mon to Sat 11AM to 10PM, Sun 11AM to 9PM."),
      links([
        { label: "Order now", href: orderUrlFor("royal-palm-beach-fl") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Tamarac guide", href: "/blog/is-hibachi-halal-tamarac-fl" },
      ]),
    ],
    faq: [
      faqItem("rpb-1", "Is everything on the menu halal?", "Yes, all of it, at every location. No pork is served, stored or cooked anywhere on the premises."),
      faqItem("rpb-2", "Is there halal food in Royal Palm Beach or Wellington?", "Yes, at 9940 Belvedere Rd, Suite F. Halal dining in western Palm Beach County is thin, which is the reason this location exists."),
      faqItem("rpb-3", "How far is halal hibachi from Loxahatchee?", "Roughly ten to fifteen minutes east on Belvedere Road, depending on where in Loxahatchee you are starting."),
      faqItem("rpb-4", "Are the sauces halal?", "Our sauces are made in house instead of bought in. Commercial teriyaki and eel sauce commonly contain mirin or cooking sake. A kitchen that buys its sauces in usually cannot tell you what is in them."),
      faqItem("rpb-5", "Do you cater events in Wellington?", "Yes, from $15.99 per person, and season books out. Call 561-766-1038 as far ahead as you can between January and April."),
      faqItem("rpb-6", "Which Flame is closest if I am in Broward?", "Tamarac at 5707 University Dr, about forty-five minutes south."),
    ],
  },

  // ---- Topic 02-04, Baltimore, MD ----
  {
    slug: "halal-wing-flavors-baltimore-md",
    locationSlugs: ["baltimore-md"],
    category: "Food Guides",
    title: "Old Bay on Halal Wings? A Baltimore Guide to All Fourteen Flavors",
    excerpt:
      "A Baltimore guide to all 14 halal wing flavors at Flame on Moravia Rd, including Old Bay. How to pick, how many to order, and what to drink with heat.",
    author: "Flame Japanese Hibachi Team",
    date: "July 24, 2026",
    readTime: "7 min read",
    featuredImage: "/menupage/wings/combo-10-pieces.png",
    featuredImageAlt: "Halal Old Bay wings at Flame Japanese Hibachi in Baltimore, MD",
    intro:
      `Baltimore does not have casual opinions about Old Bay. It has positions. So the first thing worth saying is yes, Old Bay is one of our fourteen wing flavors, it is halal like everything else in our kitchen, and it goes on bone-in or boneless. The second thing worth saying is that fourteen flavors is a lot to stand at a counter and decide between. This is the guide we wish people had before they ordered, sorted by what the flavors actually taste like rather than the order they appear on the menu.`,
    body: [
      h("The fourteen flavors, grouped by what they actually do"),
      p(`Menus list flavors alphabetically or randomly. Nobody chooses that way. Here they are in the four groups people actually pick from.`),
      p(`**Heat first.** Rim Fire, Mango Habanero, Hot. Rim Fire is the top of our range and it is not a novelty heat, it builds. Mango Habanero is the one that fools people, because the fruit hits before the pepper does. Hot is the straightforward version: cayenne-forward, no sweetness hiding it.`),
      p(`**Mild and family-safe.** Mild, Lemon Pepper, Garlic Parmesan, Old Bay. This is the group to order when the table includes kids or anyone who says they do not like spicy food. Garlic Parmesan is the most ordered wing in this group nationally and it is not close. Lemon Pepper is the driest of the fourteen, meaning less sauce and more crunch.`),
      p(`**Sweet and sticky.** Honey Garlic, Honey BBQ, Sweet and Tangy, Teriyaki. These are the ones that disappear fastest at a party and are also the messiest. Teriyaki is worth flagging because our teriyaki is made in house rather than bought in, which is the reason we can put it on a halal menu at all.`),
      p(`**Smoky and tangy.** Chipotle BBQ, Buffalo Gold, Thai Chilli. Buffalo Gold is our most interesting flavor and the hardest to describe: honey and mustard behind the buffalo, so it lands sweet then sharp. Thai Chilli sits between the sweet group and the heat group.`),
      h("Why Old Bay works on a hibachi wing"),
      p(`Old Bay is celery salt, paprika and black pepper doing most of the work, with mustard and bay behind it. It is a dry seasoning, which means it does what lemon pepper does: it seasons the skin without soaking it. On a wing that has been fried properly, that keeps the crunch intact for the drive home, which sauce does not.`),
      p(`It also happens to be the flavor that makes the most sense with hibachi rice. The salt and paprika sit next to fried rice the way seafood seasoning sits next to almost everything else in this city. If you are ordering for people from outside Baltimore, order Old Bay as one of two flavors, not the only one. It is an acquired taste everywhere except here.`),
      h("Bone-in or boneless"),
      p(`Both come in the same six counts and at the same prices, and both take all fourteen flavors. Bone-in holds sauce better and stays hot longer, which matters if you are driving more than ten minutes. Boneless is faster to eat, better for kids, and the one to pick if the wings are going on a table with other food rather than being the meal.`),
      p(`If you cannot decide, order two counts of ten in different styles rather than one twenty. Same price, twice the coverage.`),
      h("How many wings you actually need"),
      p(`This is the part people get wrong, usually by under-ordering.`),
      t(
        ["Group", "Order", "Price"],
        [
          ["One person, wings as a meal", "10 pieces", "$14.99"],
          ["One person, wings as a side", "5 pieces", "$7.99"],
          ["Two to three people sharing", "20 pieces", "$27.99"],
          ["Four to five people", "30 pieces", "$39.99"],
          ["Eight to ten people", "50 pieces", "$66.99"],
          ["A room", "100 pieces", "$129.99"],
        ],
      ),
      p(`The rule that has held up: four to six wings per person if there is other food on the table, eight to ten per person if there is not.`),
      p(`Two combos are also worth knowing. Five pieces of Garlic Parmesan with fries and a drink is $10.99, and ten pieces of Buffalo Gold with fries and a drink is $16.99. If you are eating alone, the combo beats ordering the pieces separately. Chicken tenders run alongside the wings at $7.99 for three, $9.99 for four and $11.99 for five, and they take the same fourteen flavors, which most people do not realize.`),
      h("What to drink with the hot ones"),
      p(`Water does very little against capsaicin. Dairy and sugar do more, which is why the boba menu is not a side note here. A Brown Sugar Milk Tea at $6.49 or a Taro Coconut Smoothie at $6.49 will reset your mouth between Rim Fire wings in a way a fountain drink will not. The Watermelon Slush at $6.49 is the other reliable option. If you are ordering Mango Habanero for a group, order at least two milk-based drinks with it. Somebody at the table will need one.`),
      h("Ordering from our Moravia Road location"),
      p(`We are at 5230 Moravia Rd, Suite B, in Northeast Baltimore, a few minutes from Belair-Edison, Frankford and Hamilton, and a short run from Morgan State, Overlea and Parkville. Everything is fried and sauced when the order comes in, which is why the wings arrive hot and also why a large count takes longer than a small one. For anything over twenty pieces, order online ahead rather than walking in, especially on a Friday or Saturday evening.`),
      links([
        { label: "Baltimore hibachi menu", href: "/menu/baltimore-md" },
        { label: "Start an order", href: orderUrlFor("baltimore-md") },
      ]),
      h("Visit us"),
      p(`Fourteen halal wing flavors, fried when you order them, on Moravia Road. Flame Japanese Hibachi Baltimore, 5230 Moravia Rd, Suite B, Baltimore, MD 21206. 410-858-4910.`),
      links([
        { label: "Order now", href: orderUrlFor("baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Baltimore?", href: "/blog/is-hibachi-halal-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("bwing-1", "Are the wings halal?", `Yes. Every item in the building is, and no pork is served, stored or cooked anywhere on the premises.`),
      faqItem("bwing-2", "Can I mix flavors in one order?", `Yes on the larger counts. For twenty pieces and up, splitting across two or three flavors is the normal way to order and costs nothing extra.`),
      faqItem("bwing-3", "Which flavor is the mildest?", `Lemon Pepper and Garlic Parmesan, followed by Old Bay. All three are dry or lightly sauced rather than hot.`),
      faqItem("bwing-4", "Do you have halal wings near Morgan State University?", `Yes. Moravia Road is a short drive from campus, and pickup on an online order is usually a two-minute stop.`),
      faqItem("bwing-5", "How far ahead should I order fifty or a hundred pieces?", `Give the kitchen at least an hour for fifty and longer for a hundred, and call the store rather than ordering online so we can confirm the timing.`),
      faqItem("bwing-6", "Is the teriyaki flavor made with alcohol?", `Our sauces are made in house rather than bought from a distributor, which is exactly why we can answer questions like this one. Commercial teriyaki is commonly built on mirin or cooking sake.`),
    ],
  },
  {
    slug: "cheap-halal-eats-baltimore-md",
    locationSlugs: ["baltimore-md"],
    category: "Local Guides",
    title: "Cheap Halal Eats in Northeast Baltimore: What $15 Actually Buys",
    excerpt:
      "What $10, $15 and $20 actually buy you in Northeast Baltimore. A halal budget guide from Flame on Moravia Rd, minutes from Morgan State University.",
    author: "Flame Japanese Hibachi Team",
    date: "July 24, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt: "Chicken hibachi plate under $10 at Flame Japanese Hibachi Baltimore, MD",
    intro:
      `Eating halal on a budget in Baltimore usually means one of two things: a plate of something fried, or a long drive. Neither is much of a plan on a Tuesday. This is a straight breakdown of what different amounts of money actually get you at our Moravia Road kitchen, written mostly for students at Morgan State and for anyone in Belair-Edison, Frankford or Hamilton who wants a hot meal that is not a compromise. No upselling. Just what the numbers do.`,
    body: [
      h("Under $10"),
      p(`**Chicken Hibachi, $9.85.** This is the whole point of the price list. A hot protein plate with your choice of any two sides, which means fried rice and vegetables, or lo mein noodles if you want something heavier. It is a full meal, not a snack, and it is the single most ordered item at this price point.`),
      p(`**Tofu Hibachi, $9.85.** Same structure, vegetarian.`),
      p(`**California Roll, $7.85.** Six or eight pieces depending on the cut. On its own it is a light lunch. Paired with a side it becomes a meal.`),
      p(`**Buffalo or Boneless Wings, 5 pieces, $7.99.** Fourteen flavors. Better as a side than a dinner. Chicken Tenders, 3 pieces, $7.99, also come in all fourteen flavors, which surprises people.`),
      p(`Under ten dollars, the hibachi plate is the best value on the menu by a wide margin. Nothing else gives you a protein, a starch and a vegetable for the same money.`),
      h("Between $10 and $15"),
      p(`This is where the menu gets interesting.`),
      p(`**Chicken and Beef Combo, $11.85.** Two proteins instead of one for two dollars more than a single. On a strict value-per-dollar basis this is the best order on the entire menu.`),
      p(`**Beef Hibachi, $10.85** or **Shrimp Hibachi, $10.85.** One dollar over the chicken for a different protein. **Salmon Hibachi, $11.85** is flagged as the best seller across the brand, and salmon at under twelve dollars is not common anywhere.`),
      p(`**Chicken Bento, $12.85.** Hibachi, vegetables, rice or noodles, a four-piece California Roll, two dumplings and two spring rolls. Five things in one box. At $12.85 it holds more separate items than anything else at that price, and because it is a closed box it travels and holds heat better than an open plate. If you are eating at a desk or in a dorm forty minutes later, order the bento.`),
      h("Between $15 and $20"),
      p(`**Chicken, Beef and Shrimp Combo, $14.85.** Three proteins. This is a plate one hungry person can finish or two people can split. **Chicken, Beef and Shrimp Bento, $15.85** is the largest single item on the menu, and **Buffalo Wings, 10 pieces, $14.99** are a meal for one or a shared side for two.`),
      p(`Above fifteen dollars the smarter move is usually two cheaper items rather than one expensive one. Two Chicken Hibachi plates at $9.85 feed two people for $19.70. One $15.85 bento feeds one.`),
      h("How to stretch a plate"),
      p(`**Add-ons are cheaper than upgrades.** Extra chicken is $2.95 and extra salmon, beef or shrimp is $3.95. Adding extra chicken to a $9.85 plate costs less than moving up to a combo and gives you more of the protein you actually wanted.`),
      p(`**Sides on their own are $2.95 to $4.95.** Fried rice, vegetables and lo mein are $4.95 each and white rice is $2.95. Two people can share one combo plus one extra side and eat properly for under seventeen dollars. And **Yum Yum sauce is $0.50.** It is fifty cents and it changes the plate. Order it.`),
      h("Timing, if you are on a budget and a schedule"),
      p(`Everything here is cooked when the order comes in rather than held warm. That is the reason the food is good and also the reason a walk-in at 6:30 on a Friday will wait. If you are between classes or on a break, order online before you leave and collect. It turns a fifteen-minute stop into a two-minute one, and it costs nothing.`),
      links([
        { label: "Baltimore hibachi menu", href: "/menu/baltimore-md" },
        { label: "Start an order", href: orderUrlFor("baltimore-md") },
      ]),
      h("Visit us"),
      p(`Hot halal plates from $9.85 on Moravia Road. Flame Japanese Hibachi Baltimore, 5230 Moravia Rd, Suite B, Baltimore, MD 21206. 410-858-4910.`),
      links([
        { label: "Order now", href: orderUrlFor("baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore wing flavor guide", href: "/blog/halal-wing-flavors-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("bcheap-1", "Is there cheap halal food near Morgan State University?", `Yes. We are a short drive from campus at 5230 Moravia Rd, Suite B, and the hibachi plate at $9.85 is the anchor of the value menu.`),
      faqItem("bcheap-2", "What is the cheapest full meal on the menu?", `Chicken Hibachi or Tofu Hibachi at $9.85, both of which come with two sides.`),
      faqItem("bcheap-3", "Is everything halal?", `Yes, the entire menu at every location. No pork is served, stored or cooked on the premises.`),
      faqItem("bcheap-4", "Do you have vegetarian options under $15?", `Tofu Hibachi at $9.85, Tofu Bento at $12.85, and the Avocado and Avocado and Cucumber rolls at $7.85 each.`),
      faqItem("bcheap-5", "Is it cheaper to order for pickup or delivery?", `Pickup, always. Delivery runs through third-party platforms which add their own fees on top.`),
      faqItem("bcheap-6", "Can two people eat here for under $25?", `Yes. Two hibachi plates at $9.85 each plus a shared side comes in around twenty-five dollars with two full meals on the table.`),
    ],
  },
  {
    slug: "game-day-takeout-baltimore-md",
    locationSlugs: ["baltimore-md"],
    category: "Local Guides",
    title: "Game Day Takeout in Northeast Baltimore: How to Feed a Room",
    excerpt:
      "How to feed a room on game day in Northeast Baltimore. Order sizes, timing, what travels and what does not, from Flame Japanese Hibachi on Moravia Rd.",
    author: "Flame Japanese Hibachi Team",
    date: "July 24, 2026",
    readTime: "7 min read",
    featuredImage: "/menupage/wings/30-pieces.png",
    featuredImageAlt: "Fifty piece halal wing order for a group in Baltimore, MD",
    intro:
      `The mistake is almost never the food. It is the math and the timing. Someone volunteers to handle the food, orders at four for a five o'clock kickoff, and arrives with wings that went soft in the car and forty percent less of everything than the room needed. This is a practical guide to getting it right in Northeast Baltimore, built from what we actually see leave this kitchen on a Sunday. The numbers here work whether you are in Belair-Edison, Hamilton, Overlea or Parkville.`,
    body: [
      h("Start with the headcount math, not the menu"),
      p(`The most common error is ordering for the number of people invited rather than the number of people eating, and the two are never the same. Assume everyone eats.`),
      p(`**Wings.** Eight to ten per person if wings are the meal. Four to six per person if there is other food on the table.`),
      p(`**Hibachi plates.** One per person if the plates are the meal. If you are combining plates with wings and fries, one plate per two people is enough, because a hibachi plate is a full portion.`),
      p(`**Fries and sides.** One shareable item per four people. Any less and it is decoration.`),
      p(`For a room of ten with wings as the centerpiece, that comes to fifty wings, two or three hibachi plates for the people who want a real meal, and two loaded fries. For a room of twenty, double it and add a third fries.`),
      h("The order sizes that actually exist"),
      p(`Wings and tenders both come in counts built for groups, and both take all fourteen flavors.`),
      t(
        ["Count", "Price", "Feeds"],
        [
          ["20 pieces", "$27.99", "Two to three as a meal"],
          ["30 pieces", "$39.99", "Four to five as a meal"],
          ["50 pieces", "$66.99", "Eight to ten as a meal"],
          ["100 pieces", "$129.99", "A room, comfortably"],
        ],
      ),
      p(`On the larger counts you can split across two or three flavors at no extra cost, and you should. A fifty-piece order in one flavor is a fifty-piece order that half the room does not eat. The reliable split is one heat option, one sweet option and one mild option: Hot or Mango Habanero, Honey Garlic or Buffalo Gold, and Garlic Parmesan or Old Bay. Build Your Own Platter is the other route for a group, and it is the better one when the room has mixed appetites rather than a wing crowd.`),
      h("What travels and what does not"),
      p(`**Travels well.** Bone-in wings hold heat and texture longer than boneless. Bento boxes are closed containers and stay hot. Sushi rolls are meant to be eaten at room temperature and are the one thing that genuinely does not suffer.`),
      p(`**Travels badly.** Loaded fries. They are excellent and they are best within about ten minutes of leaving the kitchen. If the drive is longer than that, order the fries for the people already at the house and let someone collect them separately, or accept that they will be soft.`),
      p(`**In between.** Open hibachi plates hold up for fifteen to twenty minutes and then start steaming themselves. If your drive is longer, order bento instead of plates. Same food, closed box.`),
      h("Timing, which is where most orders go wrong"),
      p(`Everything is cooked when the ticket comes in. Nothing sits under a lamp. That is why it is good and it is also why a fifty-piece wing order is not a walk-in.`),
      p(`**Under twenty pieces:** order online thirty minutes ahead. **Twenty to thirty pieces:** forty-five minutes to an hour ahead. **Fifty pieces or more:** call the store directly rather than ordering online, and give us at least an hour. **A hundred pieces:** call the day before if you can.`),
      p(`Sunday afternoons in autumn are the busiest stretch of the week at this store. An order placed at four for a five o'clock start on a Sunday in November is competing with every other order in Northeast Baltimore. Place it in the morning.`),
      h("Feeding a mixed room"),
      p(`**Kids.** Boneless wings in Mild, Garlic Parmesan or Lemon Pepper, plus chicken tenders in three, four and five piece counts, all in the same fourteen flavors.`),
      p(`**People who do not eat wings.** A Chicken Hibachi at $9.85 or a bento covers them without you ordering a whole second cuisine. Tofu Hibachi at $9.85 covers vegetarians, and Avocado and Avocado and Cucumber rolls at $7.85 cover anyone avoiding meat entirely. Because the whole menu is halal and there is no pork anywhere in the building, you are not managing two sets of rules across one table, which is the actual reason people host with us.`),
      h("Ordering from Moravia Road"),
      p(`We are at 5230 Moravia Rd, Suite B, in Northeast Baltimore, a few minutes from Belair-Edison and Frankford, and a short run from Hamilton, Overlea, Parkville and Rosedale. For any group order, calling 410-858-4910 is better than ordering online, because you can talk through timing, flavor splits and what will still be hot when you get home.`),
      links([
        { label: "Baltimore hibachi menu", href: "/menu/baltimore-md" },
        { label: "Start an order", href: orderUrlFor("baltimore-md") },
      ]),
      h("Visit us"),
      p(`Group orders, fourteen wing flavors, cooked when you order them. Flame Japanese Hibachi Baltimore, 5230 Moravia Rd, Suite B, Baltimore, MD 21206. 410-858-4910.`),
      links([
        { label: "Order now", href: orderUrlFor("baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read the Baltimore wing flavor guide", href: "/blog/halal-wing-flavors-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("bgame-1", "How many wings do I need for ten people?", `Fifty if wings are the meal, thirty if there is other food. The fifty-piece is $66.99 and splits across three flavors.`),
      faqItem("bgame-2", "Can I split a large wing order across flavors?", `Yes, at no extra cost, and you should. Two or three flavors on a twenty or more is the normal way to order.`),
      faqItem("bgame-3", "How far ahead do I need to order for a group?", `An hour for fifty pieces, longer for a hundred, and call rather than ordering online for anything that size.`),
      faqItem("bgame-4", "What holds up best for a twenty-minute drive?", `Bone-in wings, bento boxes and sushi. Loaded fries do not.`),
      faqItem("bgame-5", "Do you cater larger events in Baltimore?", `Yes, catering starts at $15.99 per person and is the better route once you are past about twenty-five people. Call the Baltimore store directly.`),
      faqItem("bgame-6", "Is everything halal?", `Yes, the full menu, and no pork is served, stored or cooked anywhere on the premises.`),
    ],
  },

  // ---- Topic 02-04, Northern Parkway, MD ----
  {
    slug: "preakness-race-day-food-northern-pkwy-baltimore-md",
    locationSlugs: ["northern-pkwy-baltimore-md"],
    category: "Local Guides",
    title: "Preakness Comes Home in 2027: A Park Heights Guide to Race Day Eating",
    excerpt:
      "Pimlico reopens in 2027 and the Preakness comes home. A Park Heights guide to eating on race day, from Flame Japanese Hibachi on W Northern Parkway.",
    author: "Flame Japanese Hibachi Team",
    date: "July 25, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/wings/combo-10-pieces.png",
    featuredImageAlt: "Halal wings packed for a race day group in Northwest Baltimore",
    intro:
      `For the first time in the history of the race, the Preakness was not run in Baltimore in 2026. It went to Laurel Park while Pimlico came down. The new track is scheduled to open in 2027, and when it does, the third Saturday in May goes back to being the busiest day of the year in Park Heights. This is a guide to eating around it, written from four blocks away on West Northern Parkway. If you are visiting for the first time, the single most useful thing to know is that the neighborhood does not have the restaurant density people expect, and almost nothing near the track takes a large order on the day.`,
    body: [
      h("Why race day is different from every other day here"),
      p(`Pimlico sits inside a residential neighborhood, not an entertainment district. There is no strip of restaurants at the gate. On a normal Saturday that is fine. On Preakness Saturday, Park Heights Avenue, Northern Parkway and Belvedere fill up, parking disappears for a mile in every direction, and the handful of nearby food options run out or run long. The people who do this well plan food the way they plan parking: before they leave the house.`),
      h("Three ways people actually handle it"),
      p(`**Eat before you go.** The most reliable option. Kickoff for the day is late morning and the racing runs into the evening, so a real meal beforehand carries you further than track food will. We are on West Northern Parkway, minutes from the track, and open from 11AM.`),
      p(`**Collect on the way in.** Order online, park once, collect, go. Everything is cooked when the order comes in, so ordering ahead is the difference between two minutes and twenty.`),
      p(`**Feed a group afterwards.** The stretch between six and nine on race day evening is when Northwest Baltimore fills up with people who have not eaten properly since breakfast. Large orders on that evening should be called in earlier the same day, not attempted at the counter.`),
      h("What travels to a tailgate and what does not"),
      p(`**Holds up well.** Bone-in wings hold heat and texture far longer than boneless. Bento boxes are sealed and stay hot. Sushi rolls are designed to be eaten at room temperature and genuinely do not suffer.`),
      p(`**Does not hold up.** Loaded fries are excellent for about ten minutes and then they are not. Order those to eat immediately or not at all.`),
      p(`**Somewhere in the middle.** An open hibachi plate is good for fifteen to twenty minutes. Past that it steams itself. If the gap between collecting and eating is longer, order bento instead of a plate. Identical food, closed container.`),
      h("Wing counts for a race day group"),
      p(`Wings come in six counts and take all fourteen flavors, and on any count of twenty or more you can split across two or three flavors at no extra cost.`),
      t(
        ["Count", "Price", "Feeds"],
        [
          ["20 pieces", "$27.99", "Two to three"],
          ["30 pieces", "$39.99", "Four to five"],
          ["50 pieces", "$66.99", "Eight to ten"],
          ["100 pieces", "$129.99", "A large group"],
        ],
      ),
      p(`The split that works for a mixed group is one hot, one sweet and one mild: Mango Habanero or Hot, Honey Garlic or Buffalo Gold, and Garlic Parmesan or Old Bay.`),
      h("If you are visiting Baltimore for the race"),
      p(`Old Bay is one of our fourteen wing flavors, and trying it here is more or less the local equivalent of ordering a crab cake. It is a dry seasoning rather than a sauce, so it also survives a car journey better than most.`),
      p(`And the entire menu here is halal, with no pork served, stored or cooked anywhere in the building. For visitors who normally have to research this before every meal in a new city, that is one fewer thing to plan around on a day that already has enough logistics.`),
      h("Finding us on race day"),
      p(`We are at 4460 W Northern Parkway, on the western run of Northern Parkway between Park Heights and Reisterstown Road. On a normal day we are minutes from the track. On race day, approach from the Reisterstown Road side rather than through Park Heights, because the closer you get to the gate the worse the traffic gets.`),
      links([
        { label: "Northern Parkway hibachi menu", href: "/menu/northern-pkwy-baltimore-md" },
        { label: "Start an order", href: orderUrlFor("northern-pkwy-baltimore-md") },
      ]),
      h("Visit us"),
      p(`Halal hibachi and wings, four minutes from the track. Flame Japanese Hibachi Northern Parkway, 4460 W Northern Parkway, Baltimore, MD 21215. 410-801-8279.`),
      links([
        { label: "Order now", href: orderUrlFor("northern-pkwy-baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Northwest Baltimore?", href: "/blog/is-hibachi-halal-northern-pkwy-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("npreak-1", "Are there restaurants near Pimlico Race Course?", `Fewer than visitors expect. Pimlico sits in a residential neighborhood rather than an entertainment district. We are one of the closest hot food options on West Northern Parkway.`),
      faqItem("npreak-2", "Can I order food for a group on race day?", `Yes, and you should call ahead rather than walking in. Anything over twenty wings needs at least an hour on a busy day.`),
      faqItem("npreak-3", "What food travels best to a tailgate?", `Bone-in wings, bento boxes and sushi. Loaded fries do not travel and should be eaten straight away.`),
      faqItem("npreak-4", "Is your food halal?", `Yes, the entire menu at every location, with no pork served, stored or cooked on the premises.`),
      faqItem("npreak-5", "When does the Preakness return to Pimlico?", `The rebuilt track is scheduled to open in 2027. The 2026 running was held at Laurel Park while construction was underway. Confirm dates before you travel, as the schedule can move.`),
      faqItem("npreak-6", "Are you open on race day?", `Yes. Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM, and the Google Business Profile carries any changes.`),
    ],
  },
  {
    slug: "food-near-sinai-hospital-northern-pkwy-baltimore-md",
    locationSlugs: ["northern-pkwy-baltimore-md"],
    category: "Local Guides",
    title: "Eating Near Sinai Hospital: A Shift Worker's Guide to Northwest Baltimore",
    excerpt:
      "A shift worker's guide to eating near Sinai Hospital in Northwest Baltimore. What is fast, what reheats, and what to order on a 30-minute break.",
    author: "Flame Japanese Hibachi Team",
    date: "July 25, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/chicken-and-beef-bento.jpg",
    featuredImageAlt: "Halal bento box for a hospital shift near Sinai Hospital, Baltimore",
    intro:
      `Hospital food is its own category of problem. The break is short, it starts at an hour when normal restaurants are between services, and the options within walking distance narrow down to a cafeteria and a vending machine fairly quickly. This is a practical guide for anyone working at Sinai, written from West Northern Parkway, and it is mostly about timing and reheating rather than about menus. Half of it applies wherever you end up eating.`,
    body: [
      h("The real constraint is not distance, it is the clock"),
      p(`A thirty-minute break spent driving is not a break. The math that matters is: how long from leaving the building to having food in your hand. Ordering ahead is what collapses that number. Everything at our kitchen is cooked when the ticket comes in rather than held under a lamp, which means a walk-in at a busy hour will wait and a pre-order will not. Place the order twenty minutes before your break starts and the stop is a genuine two minutes.`),
      p(`The second thing that helps is ordering at an odd hour deliberately. Between two and four in the afternoon is the quietest stretch of our day. If your break is flexible by even twenty minutes, moving it into that window changes the experience completely.`),
      h("What actually reheats, and what does not"),
      p(`**Reheats well.** Fried rice, lo mein noodles and hibachi proteins all come back close to their original state in a microwave, because they were cooked hot and fast to begin with. Beef and chicken hold better than shrimp.`),
      p(`**Reheats badly.** Anything fried and coated. Wings, tenders and loaded fries go soft and stay soft. Eat those fresh or do not order them for later.`),
      p(`**Do not reheat.** Sushi. It is meant to be eaten cold or at room temperature, and it is the best thing on the menu for a break several hours after you bought it.`),
      p(`That combination is the reason the bento box is the single most sensible order for a hospital shift. It contains a hot component that reheats, a cold component that does not need to, and it is a sealed box that fits in a bag and survives a locker.`),
      h("What to order by how much time you have"),
      p(`**Ten minutes or less.** Order ahead and collect. Chicken Hibachi at $9.85 or a Chicken Bento at $12.85. Both are complete meals in a container.`),
      p(`**Twenty to thirty minutes.** Enough to sit down. A hibachi plate with two sides eats better hot at a table than it does anywhere else.`),
      p(`**A night shift, eating at 2AM.** Buy before your shift and plan to reheat. Fried rice and a hibachi protein, or a bento. Avoid anything fried.`),
      p(`**Feeding a whole unit.** Wings in twenty, thirty or fifty piece counts, split across two or three flavors. Break rooms handle wings better than plates because people eat in shifts.`),
      h("The dietary question, since hospitals are mixed workplaces"),
      p(`The whole menu here is halal. There is no pork served, stored or cooked anywhere in the building, and our sauces are made in house rather than bought in, which is why we can answer ingredient questions properly rather than guessing. Practically, that means a single order can feed a mixed break room without anyone having to opt out or check labels. Vegetarian is covered by Tofu Hibachi at $9.85, Tofu Bento at $12.85 and the avocado rolls at $7.85. That is usually the reason group orders from the hospital come here rather than somewhere with a longer menu.`),
      h("Finding us from Sinai"),
      p(`We are at 4460 W Northern Parkway, a short drive from the hospital on the western run of Northern Parkway. Mount Washington, Cross Country, Fallstaff and Cheswolde are all close, and Pikesville is about ten minutes out Reisterstown Road.`),
      links([
        { label: "Northern Parkway hibachi menu", href: "/menu/northern-pkwy-baltimore-md" },
        { label: "Start an order", href: orderUrlFor("northern-pkwy-baltimore-md") },
      ]),
      h("Visit us"),
      p(`Hot food, ordered ahead, minutes from the hospital. Flame Japanese Hibachi Northern Parkway, 4460 W Northern Parkway, Baltimore, MD 21215. 410-801-8279.`),
      links([
        { label: "Order now", href: orderUrlFor("northern-pkwy-baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Northwest Baltimore?", href: "/blog/is-hibachi-halal-northern-pkwy-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("nsinai-1", "What restaurants are near Sinai Hospital?", `We are one of the closest hot food options, on West Northern Parkway. Ordering online ahead of a break is the fastest route.`),
      faqItem("nsinai-2", "How long does an order take?", `Everything is cooked to order. A pre-order placed twenty minutes ahead is ready when you arrive. A walk-in at a peak hour will wait.`),
      faqItem("nsinai-3", "What is best if I am eating it hours later?", `A bento box. The hot component reheats, the sushi component does not need to, and it is sealed.`),
      faqItem("nsinai-4", "Can I order for a whole unit or department?", `Yes. Wings in twenty, thirty and fifty piece counts work best for break rooms. Call 410-801-8279 for anything over thirty pieces.`),
      faqItem("nsinai-5", "Is the food halal?", `Yes, all of it, at every location, with no pork on the premises.`),
      faqItem("nsinai-6", "Are you open late?", `Hours are Monday through Saturday 11AM to 10PM and Sunday 11AM to 9PM. Check the Google Business Profile for anything that has changed.`),
    ],
  },
  {
    slug: "halal-and-kosher-difference-northern-pkwy-baltimore-md",
    locationSlugs: ["northern-pkwy-baltimore-md"],
    category: "Halal Guide",
    title: "Halal and Kosher: What the Difference Actually Is",
    excerpt:
      "A clear guide to how halal and kosher rules differ on slaughter, dairy, seafood and alcohol, and what that means for eating out in Northwest Baltimore.",
    author: "Flame Japanese Hibachi Team",
    date: "July 25, 2026",
    readTime: "7 min read",
    featuredImage: "/menupage/hibachi/beef-hibachi-plate.jpg",
    featuredImageAlt: "Halal kitchen at Flame Japanese Hibachi on W Northern Parkway, Baltimore",
    intro:
      `Northwest Baltimore is one of the few places in the country where this question comes up at a counter regularly rather than in a classroom. Between Park Heights, Cheswolde, Fallstaff and the surrounding neighborhoods, plenty of households keep kosher, plenty keep halal, and the two communities live close enough together that people genuinely want to know how the rules compare. This is an honest explanation of where they overlap and where they do not. To be clear at the outset: our kitchen is halal. It is not kosher and it does not hold kosher certification.`,
    body: [
      h("Where the two systems agree"),
      p(`More than most people assume. Both are religious dietary systems rather than health codes, both forbid pork outright, and both require that permitted animals be slaughtered in a specific way by a trained person rather than killed by any method. In both traditions the animal must be healthy at the time, the knife must be sharp, and the blood must be drained rather than left in the meat. Both also treat the process as something requiring intention, not just technique. Because of that overlap, the two systems produce similar-looking outcomes on the shelf, which is why people conflate them.`),
      h("Where they clearly differ"),
      p(`**Alcohol.** This is the largest practical difference and the one most often missed. Halal prohibits alcohol entirely, including as a cooking ingredient. Kosher does not, and kosher wine is its own category. In a Japanese kitchen this matters enormously, because mirin and cooking sake are standard in teriyaki and eel sauce. A sauce can be perfectly kosher and not halal.`),
      p(`**Meat and dairy.** Kosher law separates them, with waiting periods between eating one and the other and separate utensils for each. Halal has no such rule. A halal kitchen can serve a cheese-topped dish next to a meat dish without issue.`),
      p(`**Seafood.** Kosher permits only fish with fins and scales, which excludes shellfish and shrimp. Halal is broader, though opinions differ between schools of Islamic law, with some more restrictive on shellfish than others. This is one to check against your own practice rather than assume.`),
      p(`**Certification.** Kosher supervision in the United States is highly centralized, with recognized agencies and a symbol on the package. Halal certification is far less centralized, which is why halal diners tend to ask restaurants direct questions rather than look for a single symbol. That difference is structural, not a reflection of how seriously either is taken.`),
      h("The question people actually ask"),
      p(`Whether someone keeping halal can eat kosher meat, or the reverse, is a matter of religious opinion rather than fact, and the answer varies by tradition and by scholar. Some Muslims accept kosher meat where halal is unavailable, on the reasoning that the slaughter requirements are close. Others do not. Those keeping kosher generally do not treat halal meat as kosher, because kosher certification requires supervision that halal certification does not provide. The honest answer is that this is a question for your own religious authority, not for a restaurant blog. What a restaurant can usefully do is tell you exactly what is in the food and how it was handled, and let you decide.`),
      h("What our kitchen is, precisely"),
      p(`We are halal. The full menu is halal, there is no pork served, stored or cooked anywhere in the building, and our sauces are made in house rather than bought from a distributor, which is why we can answer ingredient questions rather than guess at them.`),
      p(`We are not kosher and we do not hold kosher certification. There is no rabbinical supervision on the premises and we do not separate meat and dairy. Anyone keeping kosher should not treat this kitchen as an option, and we would rather say that plainly than be vague about it. If you keep halal, this is a kitchen where you do not have to ask questions item by item. If you keep kosher, it is not, and it would be dishonest to blur that.`),
      h("Eating in Northwest Baltimore either way"),
      p(`We are at 4460 W Northern Parkway, close to Park Heights, Cheswolde, Fallstaff, Mount Washington and Cross Country, and about ten minutes from Pikesville out Reisterstown Road.`),
      links([
        { label: "Northern Parkway hibachi menu", href: "/menu/northern-pkwy-baltimore-md" },
        { label: "Start an order", href: orderUrlFor("northern-pkwy-baltimore-md") },
      ]),
      h("Visit us"),
      p(`A halal kitchen in Northwest Baltimore, with straight answers about what is in the food. Flame Japanese Hibachi Northern Parkway, 4460 W Northern Parkway, Baltimore, MD 21215. 410-801-8279.`),
      links([
        { label: "Order now", href: orderUrlFor("northern-pkwy-baltimore-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Northwest Baltimore?", href: "/blog/is-hibachi-halal-northern-pkwy-baltimore-md" },
      ]),
    ],
    faq: [
      faqItem("nhk-1", "Is halal the same as kosher?", `No. They share a prohibition on pork and both require specific slaughter, but they differ on alcohol, on mixing meat and dairy, on seafood, and on how certification works.`),
      faqItem("nhk-2", "Is your restaurant kosher?", `No. We are halal. We do not hold kosher certification and there is no rabbinical supervision on site.`),
      faqItem("nhk-3", "Can someone keeping kosher eat here?", `Not under kosher rules, no. We are not certified and we do not separate meat and dairy.`),
      faqItem("nhk-4", "Does halal food contain alcohol?", `It should not. Halal prohibits alcohol including as a cooking ingredient, which is why mirin and cooking sake in Japanese sauces are a common problem. We make our sauces in house for that reason.`),
      faqItem("nhk-5", "Do you serve shellfish?", `Shrimp appears across the hibachi, combo, bento and sushi menus. Views on shellfish differ between schools of Islamic law, so check against your own practice.`),
      faqItem("nhk-6", "Is the whole menu halal or only part of it?", `All of it. There is no separate halal section because there is nothing else on the menu.`),
    ],
  },

  // ---- Topic 02-04, Laurel, MD ----
  {
    slug: "lunch-near-fort-meade-laurel-md",
    locationSlugs: ["laurel-md"],
    category: "Local Guides",
    title: "Lunch Near Fort Meade: How to Eat Properly on a Thirty-Minute Break",
    excerpt:
      "A Route 1 guide to eating well near Fort Meade on a short lunch break. What is fast, what travels, and how to order ahead so you are not waiting.",
    author: "Flame Japanese Hibachi Team",
    date: "July 26, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/chicken-and-beef-bento.jpg",
    featuredImageAlt: "Halal bento box desk lunch near Fort Meade in Laurel, MD",
    intro:
      `The Fort Meade lunch problem is not a lack of restaurants. It is that the break is thirty minutes, the gate is a bottleneck, and everyone in the corridor takes lunch inside the same ninety-minute window. What starts as a plan to eat something decent ends as a bag of something from a drive-through eaten at a desk. This is a practical guide to the Route 1 corridor from our kitchen at 13600 Baltimore Ave, and most of it is about sequencing rather than food.`,
    body: [
      h("The clock, not the distance"),
      p(`The number that matters is not how far the restaurant is. It is how long from leaving your desk to having food in your hand. Everything here is cooked when the ticket comes in rather than held under a lamp. That is why it tastes like it does, and it is also why a walk-in at 12:15 will wait. A pre-order will not. Placing the order fifteen to twenty minutes before you leave collapses the whole trip into a two-minute stop.`),
      p(`The second lever is the window itself. Between 11:00 and 11:45, and again after 1:15, the corridor is genuinely quiet. If your lunch is flexible by half an hour, moving it out of the middle is the single biggest improvement available to you, and it costs nothing.`),
      h("What to order by how long you have"),
      p(`**Fifteen minutes.** Order ahead, collect, eat at your desk. Chicken Hibachi at $9.85 gets you a protein, a starch and a vegetable in one container.`),
      p(`**Thirty minutes.** Enough to sit down and eat hot. A hibachi plate or a combo eats far better at a table than out of a bag.`),
      p(`**Eating later, or on a shifted schedule.** The Chicken Bento at $12.85 is the right answer. It is a sealed box holding hibachi, vegetables, rice or noodles, a four-piece California Roll, two dumplings and two spring rolls. The hot part reheats, the sushi does not need to, and the box survives a bag.`),
      p(`**Ordering for two or three colleagues.** Two combos and a shared side beats three separate plates on both price and time.`),
      h("The reheat rules, because desk lunches get delayed"),
      p(`**Comes back well.** Fried rice, lo mein and hibachi proteins were all cooked hot and fast, so a microwave returns them close to where they started. Chicken and beef hold better than shrimp.`),
      p(`**Does not come back.** Anything fried and coated. Wings, tenders and loaded fries go soft and stay soft. Order those to eat immediately.`),
      p(`**Do not reheat at all.** Sushi. It is meant to be eaten cool, which makes it the most delay-proof thing on the menu.`),
      h("Where we sit on the corridor"),
      p(`We are at 13600 Baltimore Ave, Suite 310, on the Route 1 spine in Laurel, close to Towne Centre at Laurel and a short run from Route 198 and Route 216. North Laurel and Savage are minutes away, Beltsville and Burtonsville are ten to fifteen, and Columbia's southern end, Jessup and Greenbelt are all inside twenty. For anyone coming off I-95 or the Baltimore-Washington Parkway, both 198 and 216 feed straight in.`),
      h("The dietary side, since this corridor is mixed"),
      p(`The entire menu is halal, no pork is served, stored or cooked anywhere in the building, and our sauces are made in house rather than bought in. In practice that means a group order does not require anyone to opt out or read labels, which is usually why teams here order from us rather than somewhere with a longer menu. Vegetarian is covered by Tofu Hibachi at $9.85, Tofu Bento at $12.85 and the avocado rolls at $7.85.`),
      links([
        { label: "Laurel hibachi menu", href: "/menu/laurel-md" },
        { label: "Start an order", href: orderUrlFor("laurel-md") },
      ]),
      h("Visit us"),
      p(`Hot lunch on Route 1, ready when you get there. Flame Japanese Hibachi Laurel, 13600 Baltimore Ave, Suite 310, Laurel, MD 20707. 240-360-5080.`),
      links([
        { label: "Order now", href: orderUrlFor("laurel-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Laurel?", href: "/blog/is-hibachi-halal-laurel-md" },
      ]),
    ],
    faq: [
      faqItem("lfm-1", "What restaurants are near Fort Meade?", `The Route 1 corridor through Laurel is the closest concentration. We are at 13600 Baltimore Ave, Suite 310.`),
      faqItem("lfm-2", "How fast is a pickup order?", `Two minutes if you ordered ahead. Everything is cooked when the order comes in, so a walk-in at peak will wait.`),
      faqItem("lfm-3", "What is the best thing to eat at a desk?", `A bento box. Sealed, holds heat, and contains a component that is meant to be eaten cool.`),
      faqItem("lfm-4", "Can I order for a team?", `Yes. For anything over about ten people, catering from $15.99 per person is cheaper and simpler than individual boxes. Call 240-360-5080.`),
      faqItem("lfm-5", "Is everything halal?", `Yes, the full menu, at every location, with no pork on the premises.`),
      faqItem("lfm-6", "Do you have anything under $10?", `Chicken Hibachi and Tofu Hibachi at $9.85, both with two sides, and the California Roll at $7.85.`),
    ],
  },
  {
    slug: "office-lunch-for-twenty-laurel-md",
    locationSlugs: ["laurel-md"],
    category: "Local Guides",
    title: "Office Lunch for Twenty on the Route 1 Corridor: A Practical Guide",
    excerpt:
      "How to order office lunch for twenty in Laurel, MD without over-ordering or running late. Quantities, lead times, and what survives a conference room.",
    author: "Flame Japanese Hibachi Team",
    date: "July 26, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/beef-and-shrimp-bento.jpg",
    featuredImageAlt: "Halal bento boxes for an office lunch in Laurel, MD",
    intro:
      `Somebody at every company gets handed the food. It is rarely their job, there is rarely a budget conversation, and the two ways it goes wrong are always the same: not enough food, or food that arrived hot and was eaten cold ninety minutes later. This is how to get it right on the Route 1 corridor, written from a kitchen that runs these orders every week. The quantities and lead times below apply whether you order from us or not.`,
    body: [
      h("Work out the quantity first"),
      p(`The most common mistake is ordering for the number on the invite. Order for the number in the building.`),
      p(`**One full plate per person** if lunch is the meeting. A hibachi plate or bento is a complete portion and people will finish it. **Two thirds of a plate per person** if there is anything else on the table, or if the meeting runs over lunch rather than stopping for it. **Add fifteen percent** for any group over fifteen. There is always someone who was not on the list.`),
      p(`For twenty people, that is twenty bento boxes if lunch is the event, or a mix of fourteen to sixteen plates plus shared wings and sides if people are grazing between sessions.`),
      h("Individual boxes or shared platters"),
      p(`**Individual boxes** win when people eat at different times, when the group is spread across rooms, or when anyone has a dietary requirement you would rather handle by labelling a box than by explaining a buffet. The Chicken Bento at $12.85 and the Chicken and Beef Bento at $13.85 are built for this. Each is a sealed box with hibachi, vegetables, rice or noodles, a four-piece California Roll, two dumplings and two spring rolls.`),
      p(`**Shared platters and catering** win once you pass roughly twenty-five people, or when the group is eating together in one room at one time. Catering starts at $15.99 per person and scales better than counting boxes. For a group of exactly twenty, boxes are usually the better call. Past thirty, catering is.`),
      h("Lead times that actually work"),
      p(`Everything is cooked when the order comes in. Nothing is pre-made. That is the reason it is good and the reason lead time is not optional.`),
      t(
        ["Order size", "Notice needed", "How to order"],
        [
          ["Up to 6 people", "30 minutes", "Online"],
          ["7 to 15 people", "90 minutes", "Online, then call to confirm"],
          ["16 to 30 people", "Same morning, minimum", "Call the store"],
          ["30 people or more", "24 hours", "Call the store"],
        ],
      ),
      p(`For a recurring weekly or monthly order, tell the store and it becomes a standing arrangement rather than a fresh negotiation every time.`),
      h("What survives a conference room"),
      p(`**Holds up for an hour.** Bento boxes, because they are sealed. Sushi rolls, because they are meant to be eaten cool. Bone-in wings, which hold heat better than boneless. **Holds up for twenty minutes.** Open hibachi plates. Past that they steam themselves and the vegetables go limp. **Does not hold up at all.** Loaded fries. They are excellent and they have a ten-minute window. Do not put them on a two-hour agenda.`),
      p(`If your meeting might slip, order bento rather than plates. It is the same food in a container that forgives you.`),
      h("Covering everyone without a separate order"),
      p(`The whole menu is halal and no pork is served, stored or cooked anywhere in the building, so one order covers every colleague who eats halal without a side arrangement. Sauces are made in house rather than bought from a distributor, which means ingredient questions get a real answer rather than a shrug. Vegetarian is Tofu Hibachi at $9.85, Tofu Bento at $12.85, and the Avocado and Avocado and Cucumber rolls at $7.85. For twenty people, ordering two to three vegetarian boxes without being asked is the difference between a good lunch and an awkward one.`),
      h("Ordering from Laurel"),
      p(`We are at 13600 Baltimore Ave, Suite 310, on the Route 1 corridor near Towne Centre at Laurel, serving the corridor from Beltsville up through Savage, Jessup and southern Columbia.`),
      links([
        { label: "Laurel hibachi menu", href: "/menu/laurel-md" },
        { label: "Start an order", href: orderUrlFor("laurel-md") },
      ]),
      h("Visit us"),
      p(`Office lunch on the Route 1 corridor, cooked to order. Flame Japanese Hibachi Laurel, 13600 Baltimore Ave, Suite 310, Laurel, MD 20707. 240-360-5080.`),
      links([
        { label: "Order now", href: orderUrlFor("laurel-md") },
        { label: "Laurel catering", href: "/catering/laurel-md" },
        { label: "See our locations", href: "/locations" },
      ]),
    ],
    faq: [
      faqItem("loff-1", "How much food do I need for twenty people?", `Twenty boxes if lunch is the meeting. Fourteen to sixteen plates plus shared wings and sides if people are grazing.`),
      faqItem("loff-2", "How far ahead should I order for twenty?", `Same morning at minimum, and call the store rather than ordering online.`),
      faqItem("loff-3", "Is it cheaper to do boxes or catering?", `Boxes are usually better up to about twenty-five people. Catering from $15.99 per person scales better past that.`),
      faqItem("loff-4", "Can you label boxes for dietary requirements?", `Ask when you call. Because the whole menu is halal, the only labelling most groups need is vegetarian.`),
      faqItem("loff-5", "What if the meeting runs late?", `Order bento rather than open plates. Sealed boxes hold up for around an hour, open plates for about twenty minutes.`),
      faqItem("loff-6", "Do you do recurring office orders?", `Yes. Call 240-360-5080 and set it up as a standing order rather than rebooking each time.`),
    ],
  },
  {
    slug: "hibachi-teppanyaki-sushi-laurel-md",
    locationSlugs: ["laurel-md"],
    category: "Food Guides",
    title: "Hibachi, Teppanyaki or Sushi: What to Order and Why It Matters",
    excerpt:
      "What hibachi, teppanyaki and sushi actually are, how they differ, and which one to order depending on who you are with and how long you have.",
    author: "Flame Japanese Hibachi Team",
    date: "July 26, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt: "Halal hibachi cooking on a flat top griddle in Laurel, MD",
    intro:
      `Most people ordering Japanese food in the United States are choosing between words rather than dishes, and two of those words do not mean what the menus suggest. This is a short, honest explanation of the difference, followed by the part that is actually useful: which one to order depending on who you are with and how much time you have. If you only take one thing from it, take this. The words describe how the food is cooked, not how good it is.`,
    body: [
      h("What hibachi actually means"),
      p(`In Japan, a hibachi is a small open-topped charcoal brazier. It is a heating device, historically as much for warmth as for cooking, and food cooked over one is grilled over charcoal in small quantities. What American restaurants call hibachi is almost never that. It is food cooked fast on a large flat steel griddle, portioned with a protein, a starch and a vegetable. The name stuck and the technique did not follow it across the ocean. This is worth knowing for a practical reason: because the cooking surface is a flat top rather than a grill, what else the restaurant cooks on that surface matters enormously. One griddle serves the whole menu.`),
      h("What teppanyaki actually means"),
      p(`Teppanyaki is the accurate word for the flat-top cooking that Americans call hibachi. Teppan means iron plate, yaki means grilled. It is the style with the chef cooking in front of you at a communal table, and it emerged in Japan in the twentieth century, partly for a Western audience. So the honest answer to hibachi versus teppanyaki is that in almost every American restaurant, including ours, the food described as hibachi is technically teppanyaki. The distinction people are usually reaching for is not between two cooking methods. It is between a table where a chef performs and a counter where the same food is cooked in the kitchen.`),
      h("What sushi is, and what it is not"),
      p(`Sushi is not raw fish. Sushi refers to the seasoned rice. The topping or filling can be raw fish, cooked fish, vegetables, egg or nothing much at all. That matters because a large number of people who say they do not eat sushi mean they do not eat raw fish, and those are different statements. A California Roll, a Shrimp Tempura Roll and a Hibachi Chicken Roll contain no raw fish at all.`),
      h("Which one to order, practically"),
      p(`**You have twenty minutes and you are eating alone.** A hibachi plate. One container, protein, starch and vegetable, done. $9.85 for chicken or tofu, $10.85 for beef or shrimp, $11.85 for salmon.`),
      p(`**You want the show.** Teppanyaki in the sit-down sense, at a restaurant with a chef's table. Worth knowing that our kitchen cooks the same way but serves counter-style rather than tableside.`),
      p(`**You are eating in two hours, not now.** Sushi. It is the only thing on a Japanese menu genuinely designed to be eaten cool, which makes it the most delay-proof food in this whole category.`),
      p(`**The table cannot agree.** A bento box. At $12.85 to $15.85 it contains hibachi, vegetables, rice or noodles, a four-piece California Roll, two dumplings and two spring rolls, which covers most disagreements in one container.`),
      p(`**Someone at the table says they do not like Japanese food.** They usually mean raw fish. Order them a hibachi plate and a Hibachi Chicken Roll at $7.85 and see what happens.`),
      h("The question underneath all of this"),
      p(`Because hibachi and teppanyaki both run on one shared flat top, the more useful question than which word a restaurant uses is what else has been cooked on that surface. A restaurant with pork on the menu has cooked pork on the same steel as your dinner. Our kitchen serves a fully halal menu with no pork served, stored or cooked anywhere in the building, and our sauces are made in house rather than bought in, which is where mirin and cooking sake usually enter a Japanese kitchen unnoticed.`),
      h("Ordering in Laurel"),
      p(`We are at 13600 Baltimore Ave, Suite 310, on the Route 1 corridor near Towne Centre at Laurel.`),
      links([
        { label: "Laurel hibachi menu", href: "/menu/laurel-md" },
        { label: "Start an order", href: orderUrlFor("laurel-md") },
      ]),
      h("Visit us"),
      p(`Hibachi, sushi and bento in one halal kitchen on Route 1. Flame Japanese Hibachi Laurel, 13600 Baltimore Ave, Suite 310, Laurel, MD 20707. 240-360-5080.`),
      links([
        { label: "Order now", href: orderUrlFor("laurel-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Laurel?", href: "/blog/is-hibachi-halal-laurel-md" },
      ]),
    ],
    faq: [
      faqItem("lhts-1", "What is the difference between hibachi and teppanyaki?", `Teppanyaki is flat-top iron plate cooking. A hibachi is a charcoal brazier. Most American restaurants use the word hibachi for what is technically teppanyaki, including us.`),
      faqItem("lhts-2", "Is sushi always raw?", `No. Sushi refers to the seasoned rice. The California Roll, Shrimp Tempura Roll and Hibachi Chicken Roll contain no raw fish.`),
      faqItem("lhts-3", "Which is better value, a plate or a bento?", `A plate at $9.85 is the cheapest full meal. A bento at $12.85 holds more separate items and travels better.`),
      faqItem("lhts-4", "What should I order if I have never had Japanese food?", `Chicken Hibachi with fried rice and vegetables, plus a California Roll to try alongside it.`),
      faqItem("lhts-5", "Do you have a chef's table?", `We cook the same way but serve counter-style rather than tableside. The grill is visible.`),
      faqItem("lhts-6", "Is everything halal?", `Yes, the full menu, with no pork served, stored or cooked on the premises.`),
    ],
  },

  // ---- Topic 02-04, Pasadena, MD ----
  {
    slug: "dietary-restrictions-dining-pasadena-md",
    locationSlugs: ["pasadena-md"],
    category: "Halal Guide",
    title: "Eating Out in Anne Arundel County When Someone Has a Dietary Restriction",
    excerpt:
      "A practical guide to eating out in Anne Arundel County when someone at the table has a dietary restriction. What to ask, what to avoid, and where to go.",
    author: "Flame Japanese Hibachi Team",
    date: "July 27, 2026",
    readTime: "7 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt: "A mixed table of halal and vegetarian dishes in Anne Arundel County",
    intro:
      `Anne Arundel County is a good place to eat and a hard place to eat if you have rules. Crab houses, steakhouses and chain restaurants dominate the Ritchie Highway corridor, and most of them can accommodate one restriction awkwardly and two not at all. This is a practical guide for the person in the family who ends up doing the research every time: what to ask, which questions actually get useful answers, and how to stop planning every meal around one person's constraints.`,
    body: [
      h("The questions that get real answers"),
      p(`Most people ask restaurants the wrong question. "Do you have anything without pork" produces a yes and tells you almost nothing. These three produce something usable.`),
      p(`**"What else is cooked on that surface?"** This is the question for anyone avoiding pork or shellfish, and it is the one almost nobody asks. Grills, flat tops and fryers are shared. A kitchen with bacon on the menu has cooked bacon on the same steel as your dinner.`),
      p(`**"Is there alcohol in the sauce?"** Sauces are where alcohol hides. Wine in reductions, mirin and cooking sake in Japanese and pan-Asian sauces, beer in batter. This matters for religious restrictions and for anyone in recovery, and the honest answer from most kitchens is that they do not know because the sauce came in a bottle.`),
      p(`**"Is the fryer shared?"** For gluten and for vegetarians. Fries cooked in the same oil as breaded chicken are not vegetarian and are not gluten-free, regardless of what the fries themselves contain. A restaurant that can answer all three without checking is a restaurant that made deliberate decisions. Most cannot.`),
      h("The county's actual gaps"),
      p(`**Halal.** Thin. Anne Arundel County has had very little halal dining outside Glen Burnie and Annapolis, which is why families in Pasadena, Lake Shore and Severna Park have historically driven to Baltimore or Columbia for it.`),
      p(`**Vegetarian and vegan.** Better than it was, but still mostly side dishes rather than main courses in the crab and steak segment.`),
      p(`**Nut and shellfish allergies.** The hardest in this county specifically, because seafood is everywhere and cross-contact is the norm rather than the exception. Anyone with a serious shellfish allergy should be asking about shared fryers and shared water baths, not just menus.`),
      h("Where a single-standard kitchen helps"),
      p(`The structural reason mixed tables are hard is that most kitchens are managing two sets of rules at once. A kitchen with one standard removes that problem rather than working around it. Our menu is entirely halal. There is no separate section, because there is nothing else on the menu. No pork is served, stored or cooked anywhere in the building, which means the flat top has one job and there is nothing to avoid on it. Our sauces are made in house rather than bought from a distributor, which is the reason we can answer the alcohol question directly instead of reading a label back to you.`),
      p(`**Vegetarian.** Tofu Hibachi at $9.85, Tofu Bento at $12.85, Avocado Roll and Avocado and Cucumber Roll at $7.85 each, plus vegetables, fried rice, white rice and lo mein as standalone sides from $2.95 to $4.95. **Avoiding shellfish.** The chicken, beef, salmon and tofu lines run right through the hibachi, combo and bento menus without touching shrimp. **Feeding children.** Chicken tenders in three, four and five piece counts, and boneless wings in Mild, Lemon Pepper or Garlic Parmesan.`),
      h("What we cannot claim"),
      p(`Two honest limitations, because a guide that only lists strengths is not a guide. We are not a gluten-free kitchen. Soy sauce contains wheat, tempura is battered, and the fryer is shared. Anyone with coeliac disease should treat this kitchen as unsuitable rather than negotiable. We are not kosher, and we hold no kosher certification. If either of those is your constraint, this is not the right restaurant and it is better to know that now than at the counter.`),
      h("At our Pasadena location"),
      p(`We are at 8036 Ritchie Hwy, Suite 1-C, on the main Ritchie Highway run. Glen Burnie is about ten minutes south, Severna Park about ten minutes north, and Lake Shore, Riviera Beach and the Fort Smallwood side are a short drive east.`),
      links([
        { label: "Pasadena hibachi menu", href: "/menu/pasadena-md" },
        { label: "Start an order", href: orderUrlFor("pasadena-md") },
      ]),
      h("Visit us"),
      p(`One kitchen, one standard, on Ritchie Highway. Flame Japanese Hibachi Pasadena, 8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122. 443-628-6850.`),
      links([
        { label: "Order now", href: orderUrlFor("pasadena-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Pasadena?", href: "/blog/is-hibachi-halal-pasadena-md" },
      ]),
    ],
    faq: [
      faqItem("pdiet-1", "Are there halal restaurants in Pasadena, MD?", `Very few. We are at 8036 Ritchie Hwy, Suite 1-C, and the whole menu is halal.`),
      faqItem("pdiet-2", "Do you have vegetarian main courses, not just sides?", `Yes. Tofu Hibachi at $9.85 and Tofu Bento at $12.85 are full meals, plus vegetable-based sushi rolls at $7.85.`),
      faqItem("pdiet-3", "Is the kitchen gluten-free?", `No. Soy sauce contains wheat, tempura is battered and the fryer is shared. We would rather say so plainly.`),
      faqItem("pdiet-4", "Is there pork anywhere in the building?", `No. It is not served, stored or cooked on the premises.`),
      faqItem("pdiet-5", "Do your sauces contain alcohol?", `Our sauces are made in house rather than bought in, which is exactly why we can answer this. Commercial teriyaki and eel sauce are commonly built on mirin or cooking sake.`),
      faqItem("pdiet-6", "Can you handle a table with several different restrictions?", `That is more or less the point. One halal menu, clear vegetarian options, and no pork on the premises means most mixed tables order once.`),
    ],
  },
  {
    slug: "boat-day-takeout-pasadena-md",
    locationSlugs: ["pasadena-md"],
    category: "Local Guides",
    title: "Boat Day and Beach Day Takeout: What Actually Survives the Trip",
    excerpt:
      "What food actually survives a boat or a beach day on the Pasadena peninsula. A practical guide to what travels, what does not, and how much to order.",
    author: "Flame Japanese Hibachi Team",
    date: "July 27, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/sushi/california-roll.jpg",
    featuredImageAlt: "Halal sushi rolls for a beach day in Anne Arundel County, Maryland",
    intro:
      `On the Pasadena peninsula, half the summer happens away from a kitchen. Downs Park, Fort Smallwood, a cousin's boat, somebody's dock. The food question gets answered badly and repeatedly: a cooler of sandwiches that go soggy, or a bag of fried food bought forty minutes too early. This is a guide to what genuinely travels, written from Ritchie Highway, and the principles hold regardless of where you buy it.`,
    body: [
      h("The three enemies of takeout food"),
      p(`**Steam.** Hot food in a closed container makes its own weather. Anything crisp becomes soft within fifteen minutes. This is what ruins fries and fried chicken, not time itself.`),
      p(`**Temperature drift.** Hot food heading to room temperature passes through a range where it is neither pleasant nor, after a couple of hours in a Maryland July, safe. Food designed to be eaten cool skips that problem entirely.`),
      p(`**Movement.** Anything with sauce pooled on top rearranges itself in a car or a boat. Sauce under the food travels. Sauce over it does not.`),
      h("What travels well"),
      p(`**Sushi rolls.** The best travelling food on any Japanese menu, because they are designed to be eaten cool. California Roll, Shrimp Tempura Roll, Avocado Roll and Hibachi Chicken Roll are all $7.85, the Green Dragon Roll and Dancing Shrimp Roll are $9.85, and the Salmon and Avocado Roll is $10.85. Keep them in a cooler, not in the sun, and they are as good in three hours as they were in the shop.`),
      p(`**Bento boxes.** $12.85 to $15.85. Sealed compartments, so the sushi does not touch the hot food and nothing pools. The single most practical thing to hand somebody on a boat.`),
      p(`**Bone-in wings.** They hold heat longer and survive being jostled better than boneless. Dry-seasoned flavors travel best of all, which means Old Bay and Lemon Pepper. Sauced flavors go everywhere.`),
      h("What does not travel"),
      p(`**Loaded fries.** $10.85 and $11.85, excellent, and they have about a ten-minute window. Eat them in the parking lot or do not order them. **Open hibachi plates.** Fine for fifteen to twenty minutes, then they steam. Order the bento instead if there is any distance involved. **Tempura and anything battered.** Same problem as the fries. **Boba with ice.** It dilutes. If the drive is more than fifteen minutes, order it for the drive rather than for later.`),
      h("How much to bring"),
      p(`Under-ordering is the standard error, and it is worse on the water where nobody can top up.`),
      p(`**Half a day out, four people.** Four bento boxes, one twenty-piece wing order in a dry flavor, plus drinks. Around a hundred dollars and nobody is hungry. **Full day, six to eight people.** Six to eight bentos, a thirty-piece wing order, two or three extra sushi rolls, and extra rice. Rice is the cheapest way to add volume, at $2.95 for white and $4.95 for fried. **Add a third more than you think.** Sun, salt air and swimming make people hungrier than the same group would be indoors. This is consistently true and consistently forgotten.`),
      h("Packing it properly"),
      p(`Keep sushi and bento in a cooler with ice packs, not loose in a bag. Keep wings out of the cooler, because chilling them makes them worse rather than safer over a few hours. Do not stack hot containers. Stacking traps steam between them and softens everything in the middle of the pile. Order it for the time you leave, not for the time you plan to eat. Everything here is cooked when the ticket comes in, so a pre-order timed to your departure means it goes into the cooler at its best.`),
      h("Ordering from Ritchie Highway"),
      p(`We are at 8036 Ritchie Hwy, Suite 1-C, which puts us on the way out for most of the peninsula. Lake Shore, Riviera Beach, Green Haven and the Fort Smallwood side are all a short drive east, Downs Park is close, and Glen Burnie and Severna Park are about ten minutes either way.`),
      links([
        { label: "Pasadena hibachi menu", href: "/menu/pasadena-md" },
        { label: "Start an order", href: orderUrlFor("pasadena-md") },
      ]),
      h("Visit us"),
      p(`Food that survives the trip, on Ritchie Highway. Flame Japanese Hibachi Pasadena, 8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122. 443-628-6850.`),
      links([
        { label: "Order now", href: orderUrlFor("pasadena-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Dining with dietary restrictions", href: "/blog/dietary-restrictions-dining-pasadena-md" },
      ]),
    ],
    faq: [
      faqItem("pboat-1", "What food travels best for a boat day?", `Sushi rolls and bento boxes, then bone-in wings in a dry flavor like Old Bay or Lemon Pepper.`),
      faqItem("pboat-2", "What should I not order for a long trip?", `Loaded fries, tempura and open hibachi plates. All three suffer within twenty minutes.`),
      faqItem("pboat-3", "How much food for six people on a full day out?", `Six bentos, a thirty-piece wing order at $39.99, a couple of extra rolls and extra rice.`),
      faqItem("pboat-4", "Can I order ahead for a specific pickup time?", `Yes, and you should. Time it to when you leave rather than when you want to eat.`),
      faqItem("pboat-5", "Is the food halal?", `Yes, the entire menu at every location, with no pork served, stored or cooked on the premises.`),
      faqItem("pboat-6", "Do you do larger group orders for a party on the water?", `Yes. Wings run up to 100 pieces and catering starts at $15.99 per person. Call 443-628-6850.`),
    ],
  },
  {
    slug: "sushi-without-raw-fish-pasadena-md",
    locationSlugs: ["pasadena-md"],
    category: "Food Guides",
    title: "Sushi for People Who Do Not Like Raw Fish: A Starter Guide",
    excerpt:
      "Sushi is not raw fish, it is seasoned rice. A beginner's guide to cooked and vegetable rolls, what to order first, and how to eat it without the anxiety.",
    author: "Flame Japanese Hibachi Team",
    date: "July 27, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/sushi/shrimp-tempura.jpg",
    featuredImageAlt: "Cooked halal sushi rolls with no raw fish in Pasadena, MD",
    intro:
      `The single most common thing said at a sushi counter is a version of "I do not eat sushi," and most of the time it means "I do not eat raw fish." Those are different sentences, and the gap between them is the reason a lot of people have written off an entire category of food they would probably like. This is a plain guide to that gap, written for anyone in Pasadena who has been the person ordering chicken while everyone else orders rolls.`,
    body: [
      h("Sushi is rice, not fish"),
      p(`The word sushi refers to the rice: short-grain rice seasoned with vinegar, sugar and salt. That is the defining component. What sits on top of it or inside it is a separate question, and it can be raw fish, cooked fish, cooked shellfish, vegetables, egg, or a combination. The dish people are usually thinking of when they say sushi is sashimi, which is sliced raw fish served without rice, or nigiri, which is raw fish over a pressed block of rice. Rolls are a different format again, and a large share of the rolls on any American menu contain nothing raw at all.`),
      h("The rolls with nothing raw in them"),
      p(`**California Roll, $7.85.** Crab stick, avocado and cucumber. Nothing raw, mild, and the roll almost everybody starts with for good reason.`),
      p(`**Shrimp Tempura Roll, $7.85.** Battered and fried shrimp. Warm, crisp, and about as far from raw as a sushi roll gets. This is the one to order for someone who is genuinely nervous.`),
      p(`**Hibachi Chicken Roll, $7.85.** Hibachi chicken in a roll. It sounds like a compromise and it is not. For a first-timer who likes chicken, this removes every unfamiliar variable at once.`),
      p(`**Avocado Roll and Avocado and Cucumber Roll, $7.85 each.** Vegetables only. **Spicy Crab and Shrimp Roll, $7.85.** Cooked, with some heat. **Dancing Shrimp Roll, $9.85.** Shrimp, cooked. That is six rolls with no raw fish in them, all between $7.85 and $9.85.`),
      h("If you want to try something raw eventually"),
      p(`Two on our menu contain raw salmon: the Green Dragon Roll at $9.85 and the Salmon and Avocado Roll at $10.85. If you get there, the way to do it is inside a roll rather than as sashimi. A roll surrounds the fish with rice, avocado and seaweed, which softens both the texture and the flavor considerably. Sashimi is the deep end and there is no reason to start there.`),
      h("The things nobody explains"),
      p(`**Soy sauce.** Dip the fish side, not the rice side. Rice absorbs soy sauce like a sponge and the roll falls apart. A light touch is the whole technique. **Wasabi.** It is much stronger than it looks and a grain is plenty. **Ginger.** The pickled ginger is not a topping. It is there to reset your mouth between different rolls. **Hands or chopsticks.** Both are correct. Sushi was street food long before it was restaurant food. **Portion size.** A roll is six or eight pieces depending on the cut. One roll is a snack, two are a light meal, three are a meal.`),
      h("How to order for a table where one person is nervous"),
      p(`Order two familiar rolls and one unfamiliar one, and put a hibachi plate on the table as well so nobody is depending on the experiment. Chicken Hibachi at $9.85 or Salmon Hibachi at $11.85 will do it. That combination lets the nervous person try one piece of something without having committed their whole dinner to it, which is usually the actual blocker rather than the food itself.`),
      h("At our Pasadena location"),
      p(`We are at 8036 Ritchie Hwy, Suite 1-C, on the main Ritchie Highway run, minutes from Lake Shore, Riviera Beach and Glen Burnie, and about ten minutes from Severna Park. Everything, including the sushi, comes out of the same fully halal kitchen. No pork is served, stored or cooked on the premises.`),
      links([
        { label: "Pasadena hibachi menu", href: "/menu/pasadena-md" },
        { label: "Start an order", href: orderUrlFor("pasadena-md") },
      ]),
      h("Visit us"),
      p(`Six rolls with nothing raw in them, from $7.85. Flame Japanese Hibachi Pasadena, 8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122. 443-628-6850.`),
      links([
        { label: "Order now", href: orderUrlFor("pasadena-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Hibachi, teppanyaki or sushi", href: "/blog/hibachi-teppanyaki-sushi-laurel-md" },
      ]),
    ],
    faq: [
      faqItem("praw-1", "Is all sushi raw?", `No. Sushi refers to seasoned rice. Six of the rolls on our menu contain no raw fish.`),
      faqItem("praw-2", "What should I order first?", `A California Roll or a Shrimp Tempura Roll. Both are cooked or contain nothing raw, and both are $7.85.`),
      faqItem("praw-3", "Is imitation crab really crab?", `It is a processed fish product, usually pollock, shaped and flavored to resemble crab. It is fully cooked.`),
      faqItem("praw-4", "How many rolls is a meal?", `One is a snack, two are a light meal, three are a meal. Pair one with a hibachi plate if you are hungry.`),
      faqItem("praw-5", "Is the sushi halal?", `Yes. Same kitchen, same standard as everything else, with no pork on the premises.`),
      faqItem("praw-6", "Do you have sushi with no fish at all?", `Yes. The Avocado Roll and the Avocado and Cucumber Roll at $7.85 each, and the Hibachi Chicken Roll at $7.85.`),
    ],
  },

  // ---- Topic 02-04, Aberdeen, MD ----
  {
    slug: "halal-food-off-i95-aberdeen-md",
    locationSlugs: ["aberdeen-md"],
    category: "Local Guides",
    title: "Halal Food Off I-95 in Maryland: A Traveler's Guide to Exit 85",
    excerpt:
      "A traveler's guide to eating halal on the I-95 corridor in Maryland. What is at exit 85, how long a stop takes, and what travels for the drive.",
    author: "Flame Japanese Hibachi Team",
    date: "July 28, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/bento/shrimp-bento.jpg",
    featuredImageAlt: "Halal bento box for an I-95 road trip through Maryland",
    intro:
      `Anyone who drives the I-95 corridor regularly and eats halal knows the problem. Between the Baltimore beltway and the Delaware line there is a long stretch of service plazas, national chains and gas stations, and very little that is both halal and an actual meal. The usual solution is packing food from home or eating badly for a leg of the drive. Exit 85 at Aberdeen changes that, and this is a practical guide to using it, including the parts that have nothing to do with us.`,
    body: [
      h("Why this stretch is hard"),
      p(`The I-95 service plazas in Maryland run on national chains, and national chains almost never carry halal certification for their meat. Some travelers work around it with fish or vegetarian options, which is a workaround rather than a meal. The other issue is that halal restaurants cluster in population centers, and the stretch between the Baltimore beltway and the Susquehanna is not one. You are typically choosing between detouring back into Baltimore or waiting until Delaware. Exit 85 sits roughly in the middle of that gap.`),
      h("What the stop actually costs you in time"),
      p(`Exit 85 puts you on Route 22 and we are about two minutes from the interstate on Beards Hill Road. Off the highway, ordered, collected and back on is realistically ten to fifteen minutes if you ordered ahead, and twenty-five to thirty if you did not, because everything is cooked when the ticket comes in rather than held under a lamp. The way regular travelers use this store is to order online about twenty minutes out, which is roughly the Baltimore beltway if you are heading north, or the Susquehanna bridge if you are heading south. By the time you park, it is bagged.`),
      h("What to order depending on the rest of your drive"),
      p(`**Eating in the car in the next ten minutes.** Chicken Hibachi at $9.85 or a combo. Hot, complete, and it is at its best right now.`),
      p(`**Eating in an hour at a rest stop.** A bento box, $12.85 to $15.85. Sealed compartments, holds heat, and it contains sushi that is meant to be eaten cool anyway.`),
      p(`**Eating cold later, or arriving late.** Sushi rolls from $7.85. The most travel-proof food in this entire category, because they are designed to be eaten at room temperature.`),
      p(`**Kids in the back.** Chicken tenders in three, four or five piece counts, or boneless wings in Mild or Garlic Parmesan. Both come as combos with fries and a drink. **Do not order for later:** loaded fries. Ten-minute window, and a car is the worst possible environment for them.`),
      h("Practical notes for a long drive"),
      p(`Dry-seasoned wings travel better than sauced ones in a car, for reasons anyone who has cleaned a center console will appreciate. Old Bay and Lemon Pepper are the two dry options. Order drinks separately from the food and do not put ice-based boba in a cup holder for an hour, because it dilutes. If you are traveling during Ramadan, the drive-timing problem gets sharper rather than easier. Ordering ahead for collection close to Maghrib is the difference between eating on time and eating in a queue.`),
      h("Prayer, since this is a genuine travel question"),
      p(`We are a restaurant, not a masjid, and we do not have a dedicated prayer space. What we can say is that Harford County has masajid within a reasonable distance of the corridor, and travelers combining a meal stop with prayer usually plan the two together rather than assuming one location covers both.`),
      h("Finding us from the interstate"),
      p(`We are at 939 Beards Hill Rd, Aberdeen, MD 21001, about two minutes from I-95 exit 85 via Route 22. Havre de Grace is minutes away, Bel Air, Churchville and Edgewood are inside fifteen to twenty, and Perryville is a short run over the Susquehanna.`),
      links([
        { label: "Aberdeen hibachi menu", href: "/menu/aberdeen-md" },
        { label: "Start an order", href: orderUrlFor("aberdeen-md") },
      ]),
      h("Visit us"),
      p(`Halal food two minutes off exit 85, cooked when you order it. Flame Japanese Hibachi Aberdeen, 939 Beards Hill Rd, Aberdeen, MD 21001. 443-327-8349.`),
      links([
        { label: "Order now", href: orderUrlFor("aberdeen-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Aberdeen?", href: "/blog/is-hibachi-halal-aberdeen-md" },
      ]),
    ],
    faq: [
      faqItem("ai95-1", "Where can I get halal food off I-95 in Maryland?", `Exit 85 at Aberdeen. We are about two minutes off the interstate on Beards Hill Road.`),
      faqItem("ai95-2", "How long does a stop take?", `Ten to fifteen minutes if you order ahead, twenty-five to thirty if you walk in, because everything is cooked to order.`),
      faqItem("ai95-3", "Is the whole menu halal?", `Yes, every item, with no pork served, stored or cooked anywhere on the premises.`),
      faqItem("ai95-4", "What travels best for the rest of the drive?", `Sushi rolls, then bento boxes, then dry-seasoned wings. Avoid loaded fries and anything battered.`),
      faqItem("ai95-5", "Are there other halal options on this stretch of I-95?", `Few between the Baltimore beltway and the Delaware line, which is the reason this post exists.`),
      faqItem("ai95-6", "Do you have vegetarian options for a mixed car?", `Yes. Tofu Hibachi at $9.85, Tofu Bento at $12.85 and the avocado rolls at $7.85.`),
    ],
  },
  {
    slug: "team-food-orders-aberdeen-md",
    locationSlugs: ["aberdeen-md"],
    category: "Local Guides",
    title: "Feeding a Team After a Game in Aberdeen: Sizes, Timing and What Works",
    excerpt:
      "How to feed a team after a game in Harford County. Order sizes by squad size, how much notice the kitchen needs, and what still works an hour later.",
    author: "Flame Japanese Hibachi Team",
    date: "July 28, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/wings/30-pieces.png",
    featuredImageAlt: "Large halal wing order for a team in Aberdeen, MD",
    intro:
      `Team parents know this drill. The game runs long, everyone is starving, twenty people need feeding at once, and somebody has to make a decision in a parking lot with poor signal. It usually ends in pizza because pizza is the default, not because it is the best answer. This is a practical guide to doing it better in Harford County, with real numbers, written from Beards Hill Road a few minutes from Ripken Stadium.`,
    body: [
      h("Work out the number first"),
      p(`**Players eat more than you plan for.** A teenager after ninety minutes of anything eats an adult portion and then some. Do not scale down for age above about twelve. **Count the adults.** Coaches, parents who stayed, the one sibling. That is usually four to six people nobody counted. **Then add ten percent.** For a squad of fifteen plus staff, plan for twenty-two to twenty-four portions.`),
      h("The order shapes that work"),
      p(`**Wings for the middle of a table.** The simplest. All fourteen flavors, and on any count of twenty or more you can split across two or three flavors at no extra cost.`),
      t(
        ["Count", "Price", "Feeds"],
        [
          ["30 pieces", "$39.99", "Four to five as a meal"],
          ["50 pieces", "$66.99", "Eight to ten as a meal"],
          ["100 pieces", "$129.99", "A full squad"],
        ],
      ),
      p(`**Individual boxes.** Better when people are leaving in different cars or eating at different times. Chicken Bento at $12.85 or Chicken and Beef Bento at $13.85. Sealed, labelled, no serving required. **Tenders and fries for a younger squad.** Chicken tenders in three, four and five piece counts at $7.99, $9.99 and $11.99, or the combos with fries and a drink at $10.99, $12.99 and $14.99. Under-twelves generally do better with tenders than with wings. For a squad of fifteen plus staff, a hundred-piece wing order plus a few bentos for the people who want a proper meal covers it at around $170 to $200.`),
      h("Notice, which is the part that goes wrong"),
      p(`Everything is cooked when the order comes in. Nothing is sitting ready. A hundred-piece wing order placed from a parking lot is not going to be ready in ten minutes and no kitchen worth eating at would pretend otherwise.`),
      t(
        ["Order size", "Notice", "How"],
        [
          ["Up to 20 pieces", "30 minutes", "Online"],
          ["30 pieces", "45 minutes", "Online"],
          ["50 pieces", "1 hour", "Call the store"],
          ["100 pieces", "90 minutes, or the day before", "Call the store"],
        ],
      ),
      p(`The practical fix is to order at half time rather than at full time. You know roughly when the game ends, and a fifteen-minute buffer is easier to absorb than a forty-minute wait with a hungry squad.`),
      h("Managing a mixed squad without a second order"),
      p(`The entire menu here is halal, and no pork is served, stored or cooked anywhere in the building, so one order covers every player who eats halal without a side arrangement or a conversation. Vegetarian is covered by Tofu Hibachi at $9.85, Tofu Bento at $12.85 and the avocado rolls at $7.85. For a squad of fifteen, adding two vegetarian boxes without being asked is worth doing. For flavors, the split that works across a mixed age group is one mild, one sweet and one hot: Garlic Parmesan or Lemon Pepper, Honey Garlic or Honey BBQ, and Hot or Mango Habanero for whoever wants to prove something.`),
      h("What still works an hour later"),
      p(`If the food is going home rather than being eaten on the spot, bone-in wings hold heat and texture much better than boneless, bento boxes stay hot because they are sealed, and sushi is fine because it was never meant to be hot. Loaded fries do not survive the trip and should be eaten immediately or skipped.`),
      h("Ordering from Beards Hill Road"),
      p(`We are at 939 Beards Hill Rd, a few minutes from Ripken Stadium and about two minutes from I-95 exit 85. Havre de Grace, Churchville, Bel Air and Edgewood are all within about twenty minutes. For any order over thirty pieces, call 443-327-8349 rather than ordering online, so you can talk through timing.`),
      links([
        { label: "Aberdeen hibachi menu", href: "/menu/aberdeen-md" },
        { label: "Start an order", href: orderUrlFor("aberdeen-md") },
      ]),
      h("Visit us"),
      p(`Team-size orders, fourteen wing flavors, minutes from the stadium. Flame Japanese Hibachi Aberdeen, 939 Beards Hill Rd, Aberdeen, MD 21001. 443-327-8349.`),
      links([
        { label: "Order now", href: orderUrlFor("aberdeen-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Halal food off I-95", href: "/blog/halal-food-off-i95-aberdeen-md" },
      ]),
    ],
    faq: [
      faqItem("ateam-1", "How much food for a squad of fifteen plus coaches?", `Around twenty-two to twenty-four portions. A hundred-piece wing order plus a few bentos covers it.`),
      faqItem("ateam-2", "How much notice do you need for a hundred pieces?", `Ninety minutes, or the day before if you can.`),
      faqItem("ateam-3", "Can I split flavors on a large wing order?", `Yes, across two or three flavors at no extra cost on any count of twenty or more.`),
      faqItem("ateam-4", "What is best for under-twelves?", `Chicken tender combos with fries and a drink, from $10.99.`),
      faqItem("ateam-5", "Is everything halal?", `Yes, the entire menu, with no pork on the premises, so one order covers the whole squad.`),
      faqItem("ateam-6", "Do you cater larger events in Harford County?", `Yes, catering starts at $15.99 per person and makes more sense than counting boxes past about twenty-five people.`),
    ],
  },
  {
    slug: "what-is-in-hibachi-sauce-aberdeen-md",
    locationSlugs: ["aberdeen-md"],
    category: "Food Guides",
    title: "What Is Actually in Hibachi Sauce? Yum Yum, Teriyaki and Ginger Explained",
    excerpt:
      "Yum yum, teriyaki and ginger sauce explained: what is actually in them, where the alcohol usually hides, and what to ask before you order anywhere.",
    author: "Flame Japanese Hibachi Team",
    date: "July 28, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/salmon-hibachi-plate.jpg",
    featuredImageAlt: "Yum yum, teriyaki and ginger sauce at Flame Japanese Hibachi Aberdeen, MD",
    intro:
      `Sauce is the part of a Japanese meal that nobody asks about and that determines the most. People will check whether the chicken is halal, whether the fish is fresh, whether the fryer is shared, and then pour four ounces of something over the top without a second thought. This is a straight explanation of the three sauces you will meet at any hibachi counter, what is normally in them, and where the surprises are. It applies whether you eat with us or anywhere else.`,
    body: [
      h("Yum yum sauce, which is not Japanese"),
      p(`Start with the biggest surprise. Yum yum sauce is an American invention, born in Japanese steakhouses in the United States, and it is not something you will find in Japan. The base is mayonnaise. From there, most versions add tomato paste or ketchup, garlic, paprika, sugar, and often a little rice vinegar and melted butter, thinned with water to a pourable consistency. Some add cayenne, some add mirin. Two things follow from that. First, it is far richer than it looks, because it is fundamentally a mayonnaise sauce. Second, the variables worth asking about are the butter, if you avoid dairy, and the mirin, if you avoid alcohol. Neither is visible and neither is on any menu. Ours is $0.50 and it is made in house.`),
      h("Teriyaki, where the alcohol usually is"),
      p(`Traditional teriyaki is four ingredients: soy sauce, mirin, sake and sugar. Mirin is a sweet rice wine and sake is rice wine. Both are alcohol, and both are in the classic recipe by design rather than by accident. Most of the alcohol cooks off when the sauce is reduced, but not all of it, and for anyone avoiding alcohol on religious grounds the presence of the ingredient is the issue rather than the residual percentage. This is the single most commonly missed detail in halal Japanese dining, because people check the protein and stop. It is entirely possible to make teriyaki without either, using soy sauce, sugar or honey, ginger, garlic and a little vinegar or fruit juice for the acidity mirin would have provided. It does not happen by buying a bottle from a distributor, because commercial teriyaki is almost always the traditional formula.`),
      h("Ginger sauce, the one people forget"),
      p(`The thin brown or orange sauce served with salad and sometimes with hibachi is usually fresh ginger, onion, soy sauce, rice vinegar, a neutral oil and sometimes lemon. It is the lightest of the three and the least likely to hide anything. The variable here is the soy sauce itself, which is worth its own note.`),
      h("Soy sauce, briefly"),
      p(`Soy sauce contains wheat in almost all standard varieties, which matters for anyone avoiding gluten. Tamari is the wheat-free version and is not always available. Traditionally brewed soy sauce also produces a small amount of alcohol during fermentation, typically one to two percent, which is sometimes added to as a preservative. Opinions among Islamic scholars differ on whether naturally occurring fermentation alcohol at that level is an issue, and this is a question for your own religious authority rather than a restaurant.`),
      h("The questions worth asking anywhere"),
      p(`**Do you make your sauces or buy them?** A kitchen that buys sauces in cannot tell you what is in them beyond reading a label, and the label will not always list mirin separately. **Is there mirin or cooking sake in the teriyaki?** The specific question, rather than the general one. Is it halal gets a reflexive yes. This gets a real answer or an obvious hesitation. **Is there butter or dairy in the yum yum?** For dairy avoidance, and it catches people out constantly because nobody expects dairy in a savory sauce.`),
      h("What we do"),
      p(`Our sauces are made in house rather than bought from a distributor. That is the reason we can answer these questions at all, and it is the reason our teriyaki can sit on a fully halal menu. There is no pork served, stored or cooked anywhere in the building.`),
      h("At our Aberdeen location"),
      p(`We are at 939 Beards Hill Rd, about two minutes from I-95 exit 85, serving Aberdeen, Havre de Grace, Churchville, Bel Air and Edgewood.`),
      links([
        { label: "Aberdeen hibachi menu", href: "/menu/aberdeen-md" },
        { label: "Start an order", href: orderUrlFor("aberdeen-md") },
      ]),
      h("Visit us"),
      p(`Sauces made in our own kitchen, on Beards Hill Road. Flame Japanese Hibachi Aberdeen, 939 Beards Hill Rd, Aberdeen, MD 21001. 443-327-8349.`),
      links([
        { label: "Order now", href: orderUrlFor("aberdeen-md") },
        { label: "See our locations", href: "/locations" },
        { label: "Read: Is hibachi halal in Aberdeen?", href: "/blog/is-hibachi-halal-aberdeen-md" },
      ]),
    ],
    faq: [
      faqItem("asauce-1", "What is yum yum sauce made of?", `A mayonnaise base with tomato paste or ketchup, garlic, paprika and sugar, often with rice vinegar and butter. It is an American invention, not a Japanese one.`),
      faqItem("asauce-2", "Is teriyaki sauce halal?", `Traditional teriyaki contains mirin and sake, which are both alcohol, so commercial teriyaki usually is not. It can be made without either, which is what we do.`),
      faqItem("asauce-3", "Does soy sauce contain alcohol?", `Traditionally brewed soy sauce contains a small amount from fermentation. Views differ on whether that is an issue, and it is a question for your own religious authority.`),
      faqItem("asauce-4", "Is yum yum sauce dairy-free?", `Not usually. Mayonnaise is egg-based, but many recipes also include butter.`),
      faqItem("asauce-5", "Is soy sauce gluten-free?", `No. Standard soy sauce contains wheat. Tamari is the wheat-free alternative.`),
      faqItem("asauce-6", "Are your sauces made in house?", `Yes, rather than bought from a distributor, which is what lets us answer questions like these.`),
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

/**
 * A location hub's set: common posts (no locationSlugs) plus posts dedicated to
 * this location. This is what /blog/[location] shows.
 */
export function getBlogPostsForLocation(locationSlug: string): BlogPost[] {
  return blogPosts.filter((post) => postBelongsToLocation(post, locationSlug));
}

function postBelongsToLocation(
  post: { locationSlugs?: string[] },
  locationSlug: string,
): boolean {
  return (
    !post.locationSlugs ||
    post.locationSlugs.length === 0 ||
    post.locationSlugs.includes(locationSlug)
  );
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}

/**
 * Categories present in a given location's set (common + that location's
 * dedicated posts), or across all posts when no location is given. Lets the
 * category filter on the master page recompute as the location filter changes.
 */
export function getBlogCategoriesForLocation(locationSlug?: string): string[] {
  const posts = locationSlug ? getBlogPostsForLocation(locationSlug) : blogPosts;
  return Array.from(new Set(posts.map((post) => post.category)));
}

export function getBlogPostSummaries() {
  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    image: post.featuredImage,
    category: post.category,
    locationSlugs: post.locationSlugs,
  }));
}

/**
 * Post slugs must never collide with an active location slug: the single
 * /blog/[slug] route resolves a location hub first, so a post sharing that slug
 * would be shadowed. Returns the offending slugs; empty means it's safe. Call
 * this in the route's generateStaticParams so a bad slug fails the build.
 */
export function findBlogSlugCollisions(): string[] {
  const locationSlugs = new Set(getActiveLocations().map((l) => l.slug));
  return blogPosts.map((p) => p.slug).filter((slug) => locationSlugs.has(slug));
}

export type BlogSearchParams = {
  q?: string;
  category?: string;
  /** Scope results to a location hub: common posts + that location's dedicated. */
  location?: string;
  page?: number;
  limit?: number;
};

export type BlogSearchResult = {
  posts: ReturnType<typeof getBlogPostSummaries>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function searchBlogPosts(params: BlogSearchParams): BlogSearchResult {
  let filtered = getBlogPostSummaries();

  if (params.location) {
    filtered = filtered.filter((post) =>
      postBelongsToLocation(post, params.location!),
    );
  }

  if (params.category && params.category !== "All") {
    filtered = filtered.filter(
      (post) => post.category.toLowerCase() === params.category!.toLowerCase(),
    );
  }

  if (params.q) {
    const q = params.q.toLowerCase().trim();

    const scored = filtered
      .map((post) => {
        let score = 0;
        const title = post.title.toLowerCase();
        const category = post.category.toLowerCase();
        const excerpt = post.excerpt.toLowerCase();

        if (title === q) score = 100;
        else if (title.startsWith(q)) score = 80;
        else if (title.includes(q)) score = 60;
        else if (category.includes(q)) score = 40;
        else if (excerpt.includes(q)) score = 20;

        return { post, score };
      })
      .filter((item) => item.score > 0);

    scored.sort((a, b) => b.score - a.score);
    filtered = scored.map((item) => item.post);
  }

  const limit = params.limit || 6;
  const page = Math.max(1, params.page || 1);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return {
    posts: paginated,
    total,
    page,
    limit,
    totalPages,
  };
}
