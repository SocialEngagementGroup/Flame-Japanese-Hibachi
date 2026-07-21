import Link from "next/link";
import StatusMessage, {
  actionClass,
  secondaryClass,
} from "@/components/blocks/status/StatusMessage";

// No buildPageMetadata here: a 404 shouldn't advertise a canonical URL, and
// Next already serves it with a 404 status so it won't be indexed.
export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StatusMessage
      eyebrow="Error 404"
      heading={
        <>
          WE COULDN&apos;T FIND <span className="text-primary">THAT PAGE.</span>
        </>
      }
      description="The page you're after doesn't exist, or it has moved. Our menu and locations are still right where you left them."
    >
      <Link href="/menu" className={actionClass}>
        View Menu
      </Link>
      <Link href="/locations" className={secondaryClass}>
        Find a Location
      </Link>
    </StatusMessage>
  );
}
