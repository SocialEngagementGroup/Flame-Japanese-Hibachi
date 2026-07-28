import CareersHeader from "@/components/blocks/careers/CareersHeader";
import CareersJobBoard from "@/components/blocks/careers/CareersJobBoard";
import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Careers - Join the Flame Team",
  description:
    "Now hiring across Maryland, Virginia, Florida and Pennsylvania. Explore hibachi chef, front-of-house, catering, delivery and management jobs at Flame Japanese Hibachi and apply today.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full">
      <CareersHeader />
      <CareersJobBoard />
    </div>
  );
}
