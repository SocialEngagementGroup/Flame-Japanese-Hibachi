import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDetail from "@/components/blocks/careers/JobDetail";
import { jobPostings } from "@/lib/data/careers";
import { buildPageMetadata } from "@/lib/seo/seo";

type JobPageParams = { slug: string };

export async function generateStaticParams() {
  return jobPostings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<JobPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = jobPostings.find((j) => j.slug === slug);
  if (!job) return {};

  return buildPageMetadata({
    // Root layout's title template appends "| Flame Japanese Hibachi".
    title: `${job.title} - ${job.locationLabel}`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({
  params,
}: {
  params: Promise<JobPageParams>;
}) {
  const { slug } = await params;
  const job = jobPostings.find((j) => j.slug === slug);
  if (!job) notFound();

  return <JobDetail job={job} />;
}
