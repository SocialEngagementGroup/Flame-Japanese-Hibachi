import type { AccordionItemType } from "@/components/Accordion/accordion.types";

export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
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
