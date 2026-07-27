import Hero from "@/components/blocks/hero/Hero";
import BlogGrid from "@/components/blocks/blog/BlogGrid";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { getBlogCategories } from "@/lib/data/blog-data";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Discover delicious recipes made for every craving. Explore helpful cooking tips and fresh food inspiration from Flame Japanese Hibachi.",
  path: "/blog",
});

export default async function BlogListingPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const categories = getBlogCategories();
  
  // Await searchParams as required by Next 15+
  const resolvedParams = await searchParams;
  
  const parsedParams = {
    q: typeof resolvedParams.q === "string" ? resolvedParams.q : undefined,
    category: typeof resolvedParams.category === "string" ? resolvedParams.category : undefined,
    page: typeof resolvedParams.page === "string" ? resolvedParams.page : undefined,
  };

  return (
    <div className="flex flex-col w-full">
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
      />

      <div className="w-full md:w-[80%] mx-auto">
        <BlogGrid categories={categories} searchParams={parsedParams} />
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
