import { notFound } from "next/navigation";
import LocationFlowLab from "@/components/diagnostics/LocationFlowLab";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";

type TestCateringParams = { location: string };

export const metadata = {
  title: "Test Catering Location Flow",
  robots: {
    index: false,
    follow: false,
  },
};

export async function generateStaticParams() {
  return getActiveLocations().map((location) => ({ location: location.slug }));
}

export default async function TestCateringLocationPage({
  params,
}: {
  params: Promise<TestCateringParams>;
}) {
  const { location: slug } = await params;
  if (!getLocationBySlug(slug)) notFound();

  return <LocationFlowLab pageKind="catering" slug={slug} />;
}
