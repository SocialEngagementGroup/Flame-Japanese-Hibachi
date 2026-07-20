import LocationAutoRedirect from "@/components/blocks/location/LocationAutoRedirect";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Menu — Halal Hibachi, Sushi, Bento & Boba",
  description:
    "Browse the full Flame Japanese Hibachi menu: hibachi platters, sushi rolls, bento boxes, loaded fries, wings, smoothies and boba. 100% Halal, freshly prepared.",
  path: "/menu",
});


export default function MenuPage() {
  return (
    <>
      {/* Hero lives in app/menu/layout.tsx — shared with /menu/[location]. */}
      <LocationAutoRedirect basePath="/menu" />
    </>
  );
}

