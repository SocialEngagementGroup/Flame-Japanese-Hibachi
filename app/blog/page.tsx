import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/blocks/hero/Hero";
import BlogGrid from "@/components/blocks/blog/BlogGrid";
import BlogPostDirectory from "@/components/blocks/blog/BlogPostDirectory";
import { getBlogPostSummaries, searchBlogPosts } from "@/lib/data/blog-data";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

type BlogListingSearchParams = {
  [key: string]: string | string[] | undefined;
};

const BLOG_PAGE_SIZE = 15;
const BLOG_DESCRIPTION =
  "Discover delicious recipes made for every craving. Explore helpful cooking tips and fresh food inspiration from Flame Japanese Hibachi.";

function requestedPage(value: string | string[] | undefined): number {
  if (typeof value !== "string") return 1;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BlogListingSearchParams>;
}): Promise<Metadata> {
  const resolved = await searchParams;
  const { page } = searchBlogPosts({
    page: requestedPage(resolved.page),
    limit: BLOG_PAGE_SIZE,
  });

  return buildPageMetadata({
    title: page > 1 ? `Blog - Page ${page}` : "Blog",
    description: BLOG_DESCRIPTION,
    // Google recommends a self-canonical for every page in a paginated set.
    path: page > 1 ? `/blog?page=${page}` : "/blog",
  });
}

export default async function BlogListingPage({ searchParams }: { searchParams: Promise<BlogListingSearchParams> }) {
  const posts = getBlogPostSummaries();
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Flame Japanese Hibachi Blog",
    description:
      "Cooking tips, recipes, and food inspiration from Flame Japanese Hibachi.",
    url: getCanonicalUrl("/blog"),
    publisher: {
      "@type": "Organization",
      name: "Flame Japanese Hibachi",
      url: getCanonicalUrl("/"),
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: new Date(post.date).toISOString(),
      url: getCanonicalUrl(`/blog/${post.slug}`),
      image: getCanonicalUrl(post.image),
    })),
  };
  
  // Await searchParams as required by Next 15+
  const resolvedParams = await searchParams;
  
  const parsedParams = {
    q: typeof resolvedParams.q === "string" ? resolvedParams.q : undefined,
    category: typeof resolvedParams.category === "string" ? resolvedParams.category : undefined,
    page: typeof resolvedParams.page === "string" ? resolvedParams.page : undefined,
    location: typeof resolvedParams.location === "string" ? resolvedParams.location : undefined,
  };

  return (
    <div className="flex flex-col w-full">
      <Script
        id="blog-list-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Hero
        title="FJH BLOGS"
        description={
          <>
            Discover delicious recipes made for every craving.
            <br />
            Explore helpful cooking tips and fresh food inspiration.
            <br />
            Turn everyday meals into moments worth sharing.
          </>
        }
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgVideo={null}
        bgImageDesk="/blog/hero/blog-hero-desk.webp"
        bgImageMob="/blog/hero/blog-hero-mob.webp"
        blurBackground
      />

      <div className="w-full md:w-[80%] mx-auto">
        <BlogGrid searchParams={parsedParams} showLocationFilter />
      </div>

      <BlogPostDirectory />
    </div>
  );
}
