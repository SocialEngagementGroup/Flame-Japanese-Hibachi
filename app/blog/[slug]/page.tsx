import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import AccordionSection from "@/components/Accordion/AccordionSection";
import BlogHeader from "@/components/blocks/blog/BlogHeader";
import BlogContent from "@/components/blocks/blog/BlogContent";
import BlogRelatedPosts from "@/components/blocks/blog/BlogRelatedPosts";
import BlogLocationHub from "@/components/blocks/blog/BlogLocationHub";
import ContactSection from "@/components/blocks/contact/ContactSection";
import {
  findBlogSlugCollisions,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostSummaries,
} from "@/lib/data/blog-data";
import {
  getActiveLocations,
  getLocationBySlug,
  getLocationLabel,
} from "@/lib/api/locations";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import type { AccordionContentBlock } from "@/components/Accordion/accordion.types";

type BlogSlugParams = { slug: string };
type BlogSearchParams = { [key: string]: string | string[] | undefined };

// Flattens an FAQ answer's rich blocks into the plain sentence that answer
// engines (Google's "People also ask", ChatGPT, Perplexity) index from the
// schema.org FAQPage node. Markdown emphasis markers are stripped.
function faqAnswerText(blocks: AccordionContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "table")
        return [block.headers.join(" "), ...block.rows.map((r) => r.join(" "))].join(" ");
      return block.content;
    })
    .join(" ")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// A single dynamic segment serves two things: a location's blog hub
// (/blog/baltimore-md) and an individual post (/blog/some-article). The slug is
// resolved as a location first, so post slugs must never collide with a
// location slug - findBlogSlugCollisions guards that at build time below.
export async function generateStaticParams() {
  const collisions = findBlogSlugCollisions();
  if (collisions.length > 0) {
    throw new Error(
      `Blog post slug(s) collide with a location slug: ${collisions.join(", ")}. ` +
        `Rename the post - /blog/[slug] resolves the location hub first, so the post would be unreachable.`,
    );
  }

  return [
    ...getActiveLocations().map((location) => ({ slug: location.slug })),
    ...getAllBlogPosts().map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogSlugParams>;
}): Promise<Metadata> {
  const { slug } = await params;

  const location = getLocationBySlug(slug);
  if (location) {
    return buildPageMetadata({
      title: `${getLocationLabel(location)} Hibachi Blog`,
      description: `Recipes, cooking tips and local stories from Flame Japanese Hibachi in ${location.name}.`,
      path: `/blog/${location.slug}`,
    });
  }

  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const pageMetadata = buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
  const imageUrl = getCanonicalUrl(post.featuredImage);
  const publishedTime = new Date(post.date).toISOString();

  return {
    ...pageMetadata,
    authors: [{ name: post.author }],
    category: post.category,
    openGraph: {
      ...pageMetadata.openGraph,
      type: "article",
      publishedTime,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: imageUrl,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      ...pageMetadata.twitter,
      images: [imageUrl],
    },
  };
}

export default async function BlogSlugPage({
  params,
  searchParams,
}: {
  params: Promise<BlogSlugParams>;
  searchParams: Promise<BlogSearchParams>;
}) {
  const { slug } = await params;

  // Location hub takes precedence over post lookup.
  const location = getLocationBySlug(slug);
  if (location) {
    const resolved = await searchParams;
    const hubUrl = getCanonicalUrl(`/blog/${location.slug}`);
    const { ["@context"]: _ctx, ...restaurantNode } = buildRestaurantSchema(
      location,
      { menuUrl: getCanonicalUrl(`/menu/${location.slug}`) },
    );
    const hubJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": hubUrl,
          url: hubUrl,
          name: `${getLocationLabel(location)} Hibachi Blog`,
          description: `Local halal hibachi guides and stories from Flame Japanese Hibachi in ${location.name}.`,
          inLanguage: "en-US",
          publisher: {
            "@type": "Organization",
            name: "Flame Japanese Hibachi",
            url: getCanonicalUrl("/"),
          },
          about: { "@id": restaurantNode["@id"] },
        },
        restaurantNode,
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: getCanonicalUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: getCanonicalUrl("/blog") },
            { "@type": "ListItem", position: 3, name: `${location.name} Blog`, item: hubUrl },
          ],
        },
      ],
    };
    return (
      <>
        <Script
          id="blog-hub-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
        />
        <BlogLocationHub
          location={location}
          searchParams={{
            q: typeof resolved.q === "string" ? resolved.q : undefined,
            category:
              typeof resolved.category === "string" ? resolved.category : undefined,
            page: typeof resolved.page === "string" ? resolved.page : undefined,
          }}
        />
      </>
    );
  }

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getBlogPostSummaries();
  // "Keep Reading" is scoped to this post's location, mirroring what the
  // location hub (/blog/<location>) shows: the location's own posts plus any
  // common (location-less) posts, minus the current article. A common post
  // itself falls back to every other post. This keeps the carousel looping
  // only through the store the reader is already on.
  const postLocationSlugs = post.locationSlugs ?? [];
  const relatedPosts = allPosts.filter((p) => {
    if (p.slug === post.slug) return false;
    if (postLocationSlugs.length === 0) return true;
    const isCommon = !p.locationSlugs || p.locationSlugs.length === 0;
    return (
      isCommon ||
      p.locationSlugs!.some((slug) => postLocationSlugs.includes(slug))
    );
  });
  const postUrl = getCanonicalUrl(`/blog/${post.slug}`);

  // The store this post is dedicated to (if any) powers the LocalBusiness node
  // that ties the article to a physical place for local + generative search.
  const postLocation = post.locationSlugs?.length
    ? getLocationBySlug(post.locationSlugs[0])
    : undefined;

  const blogPostingNode = {
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt,
    image: getCanonicalUrl(post.featuredImage),
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Flame Japanese Hibachi",
      url: getCanonicalUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: post.category,
    timeRequired: post.readTime,
    ...(postLocation
      ? {
          keywords: ["halal hibachi", "halal Japanese food", postLocation.name],
          about: { "@id": getCanonicalUrl(`/menu/${postLocation.slug}`) },
          contentLocation: {
            "@type": "Place",
            name: postLocation.schemaName,
            address: {
              "@type": "PostalAddress",
              streetAddress: postLocation.streetAddress,
              addressLocality: postLocation.city,
              addressRegion: postLocation.state,
              postalCode: postLocation.postalCode,
              addressCountry: "US",
            },
          },
        }
      : {}),
  };

  // FAQPage feeds answer engines directly (Google "People also ask", ChatGPT,
  // Perplexity, Gemini) — the single biggest AEO lever a post has.
  const faqNode = post.faq.length
    ? {
        "@type": "FAQPage",
        "@id": `${postUrl}#faq`,
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faqAnswerText(item.answer),
          },
        })),
      }
    : undefined;

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getCanonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: getCanonicalUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const restaurantNode = postLocation
    ? (() => {
        const { ["@context"]: _ctx, ...node } = buildRestaurantSchema(postLocation, {
          menuUrl: getCanonicalUrl(`/menu/${postLocation.slug}`),
        });
        return node;
      })()
    : undefined;

  const postJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      blogPostingNode,
      ...(faqNode ? [faqNode] : []),
      breadcrumbNode,
      ...(restaurantNode ? [restaurantNode] : []),
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <Script
        id="blog-post-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <div className="w-full max-w-[1430px] mx-auto px-4 sm:px-5 md:px-8 pt-[var(--space-xl)]">
        <BlogHeader post={post} />

        {/* Two-column layout - article on the left, a sticky contact form on
            the right, the same shape as the careers detail page. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--gap-lg)] items-start pb-[var(--space-2xl)]">
          <div className="lg:col-span-2 flex flex-col gap-[var(--space-lg)]">
            <BlogContent post={post} />
            <AccordionSection
              title="Frequently Asked Questions"
              items={post.faq}
              className="md:w-full"
            />
          </div>

          <aside className="lg:sticky lg:top-[130px]">
            <ContactSection
              variant="sidebar"
              heading={
                <>
                  Have a <span className="text-primary">question?</span>
                </>
              }
              subheading="Send us a message"
              submitLabel="SEND MESSAGE"
            />
          </aside>
        </div>
      </div>

      {/* Constrained to the same width as the article above, not full-bleed. */}
      <div className="w-full max-w-[1430px] mx-auto">
        <BlogRelatedPosts posts={relatedPosts} />
      </div>
    </div>
  );
}
