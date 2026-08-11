import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Store",
  description:
    "Explore your selected Flame Japanese Hibachi location, including its address, hours, menu, ordering, catering, and directions.",
  path: "/store",
});

export default function StorePage() {
  return (
    <>
      {/* Hero lives in app/store/layout.tsx - shared with /store/[location]. */}
      <LocationAutoRedirect basePath="/store" />
    </>
  );
}
