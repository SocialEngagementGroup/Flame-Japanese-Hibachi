import type { Metadata } from "next";
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
import { buildPageMetadata } from "@/lib/seo/seo";

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

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
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

  return (
    <div className="flex flex-col w-full">
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
