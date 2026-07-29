import Script from "next/script";
import Hero from "@/components/blocks/hero/Hero";
import BlogGrid from "@/components/blocks/blog/BlogGrid";
import { getBlogPostsForLocation } from "@/lib/data/blog-data";
import { getLocationLabel } from "@/lib/api/locations";
import { getCanonicalUrl } from "@/lib/seo/seo";
import type { Location } from "@/lib/types";

type BlogLocationHubProps = {
  location: Location;
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
};

/**
 * A location's blog hub at /blog/[location-slug]. Same design as the master
 * /blog, but scoped to that store's set: common posts + its dedicated posts.
 */
export default function BlogLocationHub({ location, searchParams }: BlogLocationHubProps) {
  const label = getLocationLabel(location);
  const posts = getBlogPostsForLocation(location.slug);
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const hubJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Flame Japanese Hibachi Blog — ${location.name}`,
    description: `Recipes, tips and local stories from Flame Japanese Hibachi in ${location.name}.`,
    url: getCanonicalUrl(`/blog/${location.slug}`),
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
      image: getCanonicalUrl(post.featuredImage),
    })),
  };

  return (
    <div className="flex flex-col w-full">
      <Script
        id="blog-location-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />
      <Hero
        tagline="FJH BLOGS"
        title={
          <>
            {label}
            <br />
            <span className="text-primary">HIBACHI BLOG</span>
          </>
        }
        description={`Recipes, tips and local stories from our ${location.name} kitchen.`}
        ctaLabel={null}
        align="center"
        fullHeight={false}
        bgVideo={null}
        bgImageDesk="/blog/hero/blog-hero-desk.webp"
        bgImageMob="/blog/hero/blog-hero-mob.webp"
        blurBackground
      />

      <div className="w-full md:w-[80%] mx-auto">
        <BlogGrid
          categories={categories}
          searchParams={searchParams}
          location={location.slug}
        />
      </div>
    </div>
  );
}
