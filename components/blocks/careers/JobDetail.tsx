import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Briefcase, Lock, Mail } from "lucide-react";
import type { JobPosting } from "@/lib/types";
import { getLocationBySlug } from "@/lib/api/locations";

/** Every careers application email is sent here. */
const CAREERS_EMAIL = "mohammedrhaque@gmail.com";

function applyHref(job: JobPosting): string {
  const subject = `Application - ${job.title} (${job.locationLabel})`;
  const body = `Hi Flame Japanese Hibachi team,\n\nI'd like to apply for the ${job.title} role at ${job.locationLabel}. My CV is attached.\n\nName:\nPhone:\nAvailability:\nA bit about me:\n`;
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

const Meta = ({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) => (
  <span className="inline-flex items-center gap-2 text-small text-gray-600 dark:text-gray-300">
    <Icon className="w-[18px] h-[18px] text-primary shrink-0" />
    {children}
  </span>
);

const List = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h2 className="heading-h4 text-[#1C1B1B] dark:text-white mb-[var(--space-sm)]">
      {title}
    </h2>
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-body text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          <span
            aria-hidden
            className="mt-[10px] h-[6px] w-[6px] shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const JobDetail = ({ job }: { job: JobPosting }) => {
  const closed = job.listingStatus === "closed";
  // Address only, pulled from the store's record where we have one.
  const store = job.locationSlug ? getLocationBySlug(job.locationSlug) : undefined;
  const address = store?.address ?? job.addressLine;

  return (
    <section className="w-full bg-[#F7F5F5] dark:bg-[#070907] py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1430px] mx-auto">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-small font-black uppercase tracking-[2px] text-primary hover:opacity-80 transition-opacity mb-[var(--space-lg)]"
        >
          <ArrowLeft className="w-4 h-4" />
          All Open Roles
        </Link>

        {/* Header spans the full width above the two columns */}
        {closed && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[12px] font-black uppercase tracking-[2px] px-3 py-1">
              <Lock className="w-3.5 h-3.5" />
              Closed
            </span>
          </div>
        )}

        <h1 className="heading-h3 text-[#1C1B1B] dark:text-white mb-[var(--space-md)]">
          {job.title}
        </h1>

        {/* The single location block, address only. */}
        {address && (
          <p className="flex items-start gap-2 text-body font-semibold text-[#1C1B1B] dark:text-white mb-[var(--space-md)]">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span>{address}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-[var(--space-xl)]">
          <Meta icon={Briefcase}>{job.employmentType}</Meta>
          {job.status && <Meta icon={Clock}>{job.status}</Meta>}
        </div>

        {/* Full-width closed notice - unmissable before the JD body */}
        {closed && (
          <div className="flex items-start gap-3 border border-border bg-gray-100 dark:bg-white/5 px-[var(--space-lg)] py-[var(--space-md)] mb-[var(--space-lg)]">
            <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
            <p className="text-body text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-black uppercase tracking-[1px]">
                This role is closed and no longer accepting applications.
              </span>{" "}
              It&apos;s kept here for reference. Browse our{" "}
              <Link href="/careers" className="text-primary font-bold underline">
                open roles
              </Link>{" "}
              to find one that&apos;s hiring now.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--gap-lg)] items-start">
          {/* Main column */}
          <article className="lg:col-span-2 bg-white dark:bg-[#111111] border border-border p-[var(--space-xl)]">
            <div className="space-y-[var(--space-xl)]">
              <div>
                <h2 className="heading-h4 text-[#1C1B1B] dark:text-white mb-[var(--space-sm)]">
                  About Us
                </h2>
                <p className="text-body text-gray-700 dark:text-gray-300 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <List title="Responsibilities" items={job.responsibilities} />
              <List title="Qualifications" items={job.requirements} />
              <List title="Benefits" items={job.perks} />
            </div>
          </article>

          {/* Sticky rail - apply when open, closed notice when filled */}
          <aside className="lg:sticky lg:top-[130px] bg-white dark:bg-[#111111] border border-border p-[var(--space-lg)]">
            {closed ? (
              <>
                <div className="flex items-center gap-2 mb-[var(--space-md)]">
                  <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h2 className="heading-h4 text-[#1C1B1B] dark:text-white">
                    Role Closed
                  </h2>
                </div>

                <p className="text-small text-gray-600 dark:text-gray-400 leading-relaxed mb-[var(--space-lg)]">
                  This position is closed, so applications aren&apos;t being
                  accepted. Take a look at what&apos;s open now.
                </p>

                {/* Disabled, non-interactive apply control - clearly unavailable */}
                <span
                  aria-disabled="true"
                  className="block bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 text-center py-4 text-small font-black tracking-[3px] uppercase cursor-not-allowed select-none mb-3"
                >
                  Applications Closed
                </span>
                <Link
                  href="/careers"
                  className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-4 text-small font-black tracking-[3px] uppercase transition-all"
                >
                  Browse Open Roles
                </Link>
              </>
            ) : (
              <>
                <h2 className="heading-h4 text-[#1C1B1B] dark:text-white mb-[var(--space-md)]">
                  Ready to apply?
                </h2>

                <div className="space-y-3 mb-[var(--space-lg)]">
                  <Meta icon={Briefcase}>{job.employmentType}</Meta>
                  {job.status && (
                    <div>
                      <Meta icon={Clock}>{job.status}</Meta>
                    </div>
                  )}
                </div>

                <p className="text-small text-gray-600 dark:text-gray-400 leading-relaxed mb-[var(--space-md)]">
                  To apply, email your CV to the address below with the role and
                  location in the subject line.
                </p>

                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="flex items-center gap-2 mb-[var(--space-md)] text-small font-bold text-primary hover:opacity-80 break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CAREERS_EMAIL}
                </a>

                <a
                  href={applyHref(job)}
                  className="block bg-primary hover:bg-primary/90 text-white text-center py-4 text-small font-black tracking-[3px] uppercase transition-all mb-3"
                >
                  Email Your CV
                </a>
                <Link
                  href="/careers"
                  className="flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white py-4 text-small font-black tracking-[3px] uppercase transition-all"
                >
                  Back to Jobs
                </Link>

                <p className="mt-[var(--space-md)] text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Applying opens your email to {CAREERS_EMAIL} with the subject
                  filled in. Flame Japanese Hibachi is an equal-opportunity
                  employer.
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
