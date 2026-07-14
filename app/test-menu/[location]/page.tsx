import { notFound } from "next/navigation";
import LocationFlowLab from "@/components/diagnostics/LocationFlowLab";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";

type TestMenuParams = { location: string };

export const metadata = {
  title: "Test Menu Location Flow",
  robots: {
    index: false,
    follow: false,
  },
};

export async function generateStaticParams() {
  return getActiveLocations().map((location) => ({ location: location.slug }));
}

export default async function TestMenuLocationPage({
  params,
}: {
  params: Promise<TestMenuParams>;
}) {
  const { location: slug } = await params;
  if (!getLocationBySlug(slug)) notFound();

  return <LocationFlowLab pageKind="menu" slug={slug} />;
}
