import LocationFlowLab from "@/components/diagnostics/LocationFlowLab";

export const metadata = {
  title: "Test Menu Location Flow",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestMenuPage() {
  return <LocationFlowLab pageKind="menu" />;
}
