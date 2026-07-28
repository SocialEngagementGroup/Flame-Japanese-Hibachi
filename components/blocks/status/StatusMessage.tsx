import React from "react";

type StatusMessageProps = {
  /** Small uppercase line above the heading - "ERROR 404", "SOMETHING WENT WRONG". */
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  children: React.ReactNode;
};

/**
 * Shared shell for the 404 and error screens.
 *
 * Deliberately built from the same tokens as ContactSection rather than a new
 * look: these pages are rare, so anything invented for them drifts out of sync
 * with the rest of the site and nobody notices until a customer hits one.
 */
export default function StatusMessage({
  eyebrow,
  heading,
  description,
  children,
}: StatusMessageProps) {
  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black min-h-[380px] md:min-h-[460px] flex items-center justify-center py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[640px] mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-400 text-small font-bold uppercase tracking-[2px] mb-[var(--space-md)] transition-colors duration-300">
          {eyebrow}
        </p>

        <h1 className="heading-h3 text-[#1C1B1B] dark:text-white mb-[var(--space-md)] transition-colors duration-300">
          {heading}
        </h1>

        <p className="text-gray-700 dark:text-gray-400 text-body mb-[var(--space-xl)] transition-colors duration-300">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">{children}</div>
      </div>
    </section>
  );
}

const actionClass =
  "bg-primary hover:bg-primary/90 text-white px-8 py-4 text-small font-black tracking-[3px] uppercase transition-all";

const secondaryClass =
  "border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-small font-black tracking-[3px] uppercase transition-all";

export { actionClass, secondaryClass };
