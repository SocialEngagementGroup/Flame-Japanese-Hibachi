import LocationFlowLab from "@/components/diagnostics/LocationFlowLab";

export const metadata = {
  title: "Test Catering Location Flow",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestCateringPage() {
  return <LocationFlowLab pageKind="catering" />;
}
