/**
 * Shared class strings for the store page blocks (StoreLocalFlame,
 * StoreGoodFoodEnergy).
 *
 * Both blocks render the same CTA pair and the same body copy, so the class
 * lists lived duplicated in four places and drifted apart easily. Sizes come
 * from the project's typography scale in globals.css (--text-h2 / --text-small,
 * exposed as the `text-h2` / `text-small` utilities) rather than arbitrary
 * `text-[18px] md:text-[24px]` values, so the store page scales with the rest
 * of the site instead of against it.
 */

/** Layout + type shared by both CTA buttons; the colour variants add the rest. */
const storeCtaBase =
  "flex-1 sm:flex-initial inline-flex items-center justify-center h-[40px] sm:h-[48px] px-2.5 sm:px-7 font-serif font-bold text-[10px] sm:text-[13px] leading-[18px] tracking-[0.8px] sm:tracking-[1.2px] uppercase whitespace-nowrap";

/** Outlined CTA - "GET DIRECTIONS". */
export const storeCtaOutline = `${storeCtaBase} border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5`;

/** Filled CTA - "ORDER NOW" / "CALL THIS LOCATION". */
export const storeCtaFilled = `${storeCtaBase} bg-primary hover:brightness-110 text-white`;

/**
 * Body copy size/weight. Colour is left to the caller: the two blocks sit on
 * different backgrounds (page background vs the #242323 panel) and need
 * different text colours.
 */
export const storeBodyText = "text-h2 leading-relaxed font-medium";
