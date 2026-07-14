import LocationFlowLab from "@/components/diagnostics/LocationFlowLab";

export const metadata = {
  title: "Test Location Setup Flow",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestLocationPage() {
  return <LocationFlowLab pageKind="location" />;
}
