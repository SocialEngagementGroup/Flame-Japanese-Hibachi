import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Store",
  description:
    "Shop Flame Japanese Hibachi merchandise, sauces, and gift cards.",
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
