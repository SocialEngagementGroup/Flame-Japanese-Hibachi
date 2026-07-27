import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import AccordionSection from "@/components/Accordion/AccordionSection";
import BlogHeader from "@/components/blocks/blog/BlogHeader";
import BlogContent from "@/components/blocks/blog/BlogContent";
import BlogRelatedPosts from "@/components/blocks/blog/BlogRelatedPosts";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostSummaries,
} from "@/lib/data/blog-data";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

type BlogPostPageParams = { slug: string };

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getBlogPostSummaries();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));
  const postUrl = getCanonicalUrl(`/blog/${post.slug}`);
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: getCanonicalUrl(post.featuredImage),
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
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
  };

  return (
    <div className="flex flex-col w-full">
      <Script
        id="blog-post-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <div className="w-full md:w-[80%] mx-auto flex flex-col">
        <BlogHeader post={post} categories={categories} />
        <BlogContent post={post} />

        <div className="w-full bg-background px-4 sm:px-5 md:px-8 pb-[var(--space-2xl)] transition-colors duration-300">
          <AccordionSection
            title="Frequently Asked Questions"
            items={post.faq}
            className="md:w-full"
          />
        </div>

        <BlogRelatedPosts posts={otherPosts} />
      </div>

      <LocationsSection />
      <ContactSection
        heading={
          <>
            REACH OUT TO US FOR <span className="text-primary">ANY QUERIES</span>
          </>
        }
        subheading="SEND US A MESSAGE"
        submitLabel="SUBMIT APPLICATION"
      />
    </div>
  );
}
