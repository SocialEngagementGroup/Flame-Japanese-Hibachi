import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";

import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Hibachi Catering for Events & Parties",
  description:
    "Hibachi catering for weddings, corporate events and parties. Custom packages, 100% Halal, fresh prep. Request a quote from Flame Japanese Hibachi today.",
  path: "/catering",
});

export default function CateringPage() {
  return (
    <>
      <LocationAutoRedirect basePath="/catering" />
      {/* Hero lives in app/catering/layout.tsx — shared with /catering/[location]. */}
    </>
  );
}
