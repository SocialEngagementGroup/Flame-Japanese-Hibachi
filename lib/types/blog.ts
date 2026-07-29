import type { AccordionItemType } from "@/components/Accordion/accordion.types";

export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[] }
  // A row of inline links (menu, location, order, sibling post). Internal hrefs
  // ("/menu/...") render as Next Links; external ones (order.online) open in a
  // new tab. Keeps the SEO brief's required internal links without Markdown.
  | { type: "links"; items: { label: string; href: string }[] }
  // A simple data table (wing counts, order sizes, lead times, etc.).
  | { type: "table"; headers: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  /**
   * Which locations this post belongs to.
   *   - absent / []           -> common post: shows on /blog AND every location hub
   *   - ["baltimore-md", ...] -> dedicated: shows on /blog AND only those location hubs
   * Every slug must match an active location (see findBlogSlugCollisions).
   */
  locationSlugs?: string[];
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  intro: string;
  body: BlogContentBlock[];
  faq: AccordionItemType[];
};
