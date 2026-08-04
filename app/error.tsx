"use client";

import { useEffect } from "react";
import Link from "next/link";
import StatusMessage, {
  actionClass,
  secondaryClass,
} from "@/components/blocks/status/StatusMessage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the real stack trace in production -
    // without logging it here, a reported error can't be matched to anything.
    console.error("[route error]", error.digest ?? "", error);
  }, [error]);

  return (
    <StatusMessage
      eyebrow="Something went wrong"
      heading={
        <>
          THIS PAGE DIDN&apos;T{" "}
          <span className="text-primary">LOAD PROPERLY.</span>
        </>
      }
      description="That's on us, not you. Try again - and if it keeps happening, call your nearest location and we'll help directly."
    >
      <button type="button" onClick={reset} className={actionClass}>
        Try Again
      </button>
      <Link href="/" className={secondaryClass}>
        Go Home
      </Link>
    </StatusMessage>
  );
}
