"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MapPin, X } from "lucide-react";
import { useCateringQuote } from "@/components/providers/CateringQuoteProvider";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { cateringAddOns, cateringMenuSections } from "@/lib/data/catering";
import {
  calculateEstimate,
  coveredGuests,
  findPackage,
  formatMoney,
  maxQtyFor,
} from "@/lib/catering/quote";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";

const activeLocations = getActiveLocations();

type Fulfilment = "delivery" | "pickup" | "onsite_chef";
type FieldErrors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";

/** Draft only covers the typed fields — selections already live in the provider. */
const DRAFT_KEY = "fjh-catering-draft-v1";
const SHORT_NOTICE_HOURS = 48;

const FULFILMENT_OPTIONS: { value: Fulfilment; label: string; hint: string }[] =
  [
    { value: "delivery", label: "Delivery", hint: "We bring it to your venue" },
    { value: "pickup", label: "Pickup", hint: "Collect from the store" },
    {
      value: "onsite_chef",
      label: "On-site chef",
      hint: "We cook at your event",
    },
  ];

const OCCASIONS = [
  "Corporate",
  "Wedding",
  "Birthday",
  "Graduation",
  "Community / religious",
  "Other",
];

const SETUP_OPTIONS = [
  "Chafing dishes",
  "Serving utensils",
  "Plates & cutlery",
  "Napkins",
];

const inputClass =
  "w-full bg-transparent border px-4 py-3 text-[#1C1B1B] dark:text-white placeholder:text-primary/60 text-body outline-none focus:ring-2 transition-all";

const labelClass =
  "block text-[#1C1B1B] dark:text-gray-400 text-small font-black uppercase tracking-widest mb-2";

const borderFor = (error?: string) =>
  error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
    : "border-primary focus:border-primary focus:ring-primary/30";

const Stepper = ({
  value,
  max,
  onChange,
  label,
}: {
  value: number;
  max: number;
  onChange: (next: number) => void;
  label: string;
}) => (
  <div className="flex items-center bg-[#D9D9D9] dark:bg-[#373737] h-[34px] shrink-0">
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= 0}
      aria-label={`Remove one ${label}`}
      className="w-9 h-full text-black dark:text-white disabled:opacity-40 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      −
    </button>
    <span
      aria-live="polite"
      className="w-9 text-center font-bold text-[14px] text-black dark:text-white"
    >
      {value}
    </span>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      disabled={value >= max}
      aria-label={`Add one ${label}`}
      className="w-9 h-full text-black dark:text-white disabled:opacity-40 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      +
    </button>
  </div>
);

export default function CateringQuoteModal() {
  const {
    packages,
    addons,
    open,
    closeQuote,
    setPackageQty,
    setAddOnQty,
    packageQty,
    addOnQty,
    clear,
  } = useCateringQuote();

  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const location = slug ? getLocationBySlug(slug) : undefined;

  const router = useRouter();
  const pathname = usePathname();
  const { selectLocation } = useNearestLocation();

  /**
   * Switching store navigates to that store's catering page. The catering
   * layout — which owns the quote provider and this modal — persists across
   * sibling route changes, so the modal stays open and the selection survives;
   * only the location label re-renders.
   */
  const changeLocation = (storeId: number) => {
    const store = activeLocations.find((l) => l.id === storeId);
    if (!store) return;
    selectLocation(storeId);
    const base = pathname.startsWith("/catering") ? "catering" : "menu";
    router.push(`/${base}/${store.slug}`);
  };

  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showAllPackages, setShowAllPackages] = useState(false);

  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [headcount, setHeadcount] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [setup, setSetup] = useState<string[]>([]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const guests = Number.parseInt(headcount, 10) || 0;
  const estimate = useMemo(
    () => calculateEstimate(packages, addons, guests),
    [packages, addons, guests],
  );
  const covered = useMemo(() => coveredGuests(packages), [packages]);

  // Packages sold by the piece (wings) report no capacity, so a quote made up
  // entirely of those must not trigger a "you're under-ordering" warning.
  const showCoverageNudge = guests > 0 && covered > 0 && covered < guests;

  // Computed when the date changes rather than during render — reading the
  // clock while rendering is impure and risks a server/client mismatch.
  const [isShortNotice, setIsShortNotice] = useState(false);
  const changeEventDate = (value: string) => {
    setEventDate(value);
    const when = new Date(`${value}T00:00:00`).getTime();
    setIsShortNotice(
      Boolean(value) &&
        !Number.isNaN(when) &&
        when - Date.now() < SHORT_NOTICE_HOURS * 60 * 60 * 1000,
    );
  };

  // Remember what opened the modal so focus can go back there on close —
  // without it, keyboard users are dumped at the top of the document.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    } else {
      triggerRef.current?.focus?.();
    }
  }, [open]);

  /**
   * Every close path goes through here, so the modal always reopens clean.
   * Without the status reset, closing after a successful submit and reopening
   * would show the "thanks" screen again instead of a fresh form.
   */
  const handleClose = useCallback(() => {
    setStep(1);
    setStatus("idle");
    setFieldErrors({});
    setErrorMessage("");
    closeQuote();
  }, [closeQuote]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Focus trap: a modal that lets Tab escape into the page behind it is
      // worse than no modal for anyone not using a mouse.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      // "" not "unset" — preserves the CSS overflow-x: clip the navbar relies on
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  // Restore a half-typed form. Catering forms are long enough that losing one
  // to a stray tap is a real source of abandonment.
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      /* eslint-disable react-hooks/set-state-in-effect -- hydrating form state
         from localStorage is exactly the external-system sync effects are for;
         it runs once per open, so there is no cascading-render risk. */
      if (draft.fulfilment) setFulfilment(draft.fulfilment);
      if (draft.headcount) setHeadcount(draft.headcount);
      if (draft.eventDate) setEventDate(draft.eventDate);
      if (Array.isArray(draft.setup)) setSetup(draft.setup);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      // A corrupt draft should never stop the form opening.
    }
  }, [open]);

  const toggleSetup = (option: string) =>
    setSetup((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("submitting");
    setFieldErrors({});
    setErrorMessage("");

    try {
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fulfilment,
          setup,
          packages,
          addons,
          locationSlug: location?.slug ?? "",
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setErrorMessage(
          result.error ?? "Please check the highlighted fields and try again.",
        );
        setStatus("error");
        return;
      }

      localStorage.removeItem(DRAFT_KEY);
      clear();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again, or call us directly.",
      );
      setStatus("error");
    }
  };

  const persistDraft = () => {
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ fulfilment, headcount, eventDate, setup }),
      );
    } catch {
      // Private browsing can refuse writes — not worth surfacing.
    }
  };

  if (!open) return null;

  const selectedPackages = packages
    .map((line) => ({ line, pkg: findPackage(line.id) }))
    .filter((entry): entry is { line: typeof entry.line; pkg: NonNullable<typeof entry.pkg> } =>
      Boolean(entry.pkg),
    );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-stretch sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catering-quote-title"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Full-height sheet on phones, centred dialog from sm up. A floating
          dialog on a 375px screen wastes ~20% of the viewport on backdrop while
          the form itself has to scroll. */}
      <div
        ref={dialogRef}
        className="relative w-full h-full sm:h-auto sm:max-w-[900px] sm:max-h-[92vh] bg-[#F0EDED] dark:bg-black sm:border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 px-4 sm:px-[var(--space-lg)] pt-4 sm:pt-[var(--space-lg)] pb-3 sm:pb-[var(--space-md)] border-b border-black/5 dark:border-white/5">
          <div className="min-w-0">
            {/* The sm: font size needs an explicit length hint. Without one
                Tailwind reads the arbitrary value as a colour, so the override
                silently does nothing and the mobile size applies everywhere.
                Avoid writing class-like tokens in comments here — the scanner
                reads comments too and will emit CSS for whatever it finds. */}
            <h3
              id="catering-quote-title"
              className="heading-h3 !text-[19px] sm:!text-[length:var(--text-h3)] leading-tight"
            >
              <span className="text-black dark:text-white">REQUEST A </span>
              <span className="text-primary">CATERING QUOTE</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-small font-medium mt-1 sm:mt-2">
              {status === "success"
                ? "We've got your request."
                : `Step ${step} of 2 — ${step === 1 ? "your order" : "event details"}`}
            </p>

            {status !== "success" && (
              <label className="mt-2 flex items-center gap-1.5 text-small text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="sr-only">Serving location</span>
                <select
                  value={location?.id ?? ""}
                  onChange={(e) => changeLocation(Number(e.target.value))}
                  className="bg-transparent border-b border-primary/50 text-primary font-bold py-0.5 pr-5 max-w-[190px] sm:max-w-none truncate outline-none focus:border-primary cursor-pointer"
                >
                  {!location && <option value="">Choose a location…</option>}
                  {activeLocations.map((l) => (
                    <option key={l.id} value={l.id} className="text-black">
                      {l.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="text-black dark:text-white hover:text-primary transition-colors p-2 -mr-2 shrink-0"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-[var(--space-lg)] py-[var(--space-2xl)] text-center">
            <p className="text-primary text-body font-black uppercase tracking-widest mb-3">
              Thanks — your quote request is in.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-small max-w-md mx-auto">
              Our team will confirm availability and pricing within one business
              day.
              {location ? ` For anything urgent, call ${location.phone}.` : ""}
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-primary hover:bg-primary/90 text-white px-8 py-4 text-small font-black tracking-[3px] uppercase transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col overflow-hidden"
          >
            <div className="px-4 sm:px-[var(--space-lg)] py-4 sm:py-[var(--space-md)] overflow-y-auto flex-1">
              {step === 1 ? (
                <>
                  <h4 className={labelClass}>Your packages</h4>
                  {selectedPackages.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400 text-small mb-4">
                      Nothing selected yet — pick a package below.
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    {selectedPackages.map(({ line, pkg }) => (
                      <div
                        key={pkg.id}
                        className="flex items-center gap-3 border border-primary/40 p-3"
                      >
                        <div className="relative w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] shrink-0 overflow-hidden">
                          <Image
                            src={pkg.image}
                            alt={pkg.category}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#1C1B1B] dark:text-white font-black uppercase text-small truncate">
                            {pkg.menuTitle}
                          </p>
                          <p className="text-primary text-small font-bold">
                            {pkg.people} · {pkg.price}
                          </p>
                        </div>
                        <Stepper
                          value={line.qty}
                          max={99}
                          label={pkg.menuTitle}
                          onChange={(next) => setPackageQty(pkg.id, next)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAllPackages((v) => !v)}
                    className="text-primary text-small font-black uppercase tracking-widest mb-4 hover:underline"
                  >
                    {showAllPackages ? "− Hide packages" : "+ Add more packages"}
                  </button>

                  {showAllPackages && (
                    <div className="space-y-5 mb-6">
                      {cateringMenuSections.map((section) => (
                        <div key={section.id}>
                          <p className="text-[#1C1B1B] dark:text-gray-400 text-small font-black uppercase tracking-widest mb-2">
                            {section.title}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {section.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-2 border border-black/10 dark:border-white/10 px-2 py-2"
                              >
                                <div className="relative w-[36px] h-[36px] shrink-0 overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt=""
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                </div>
                                <span className="flex-1 min-w-0 text-[#1C1B1B] dark:text-white text-small truncate">
                                  {item.people} · {item.price}
                                </span>
                                <Stepper
                                  value={packageQty(item.id)}
                                  max={99}
                                  label={`${section.title} ${item.people}`}
                                  onChange={(next) =>
                                    setPackageQty(item.id, next)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <h4 className={labelClass}>Add-ons</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {cateringAddOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex items-center gap-2 border border-black/10 dark:border-white/10 px-2 py-2"
                      >
                        <div className="relative w-[36px] h-[36px] shrink-0 overflow-hidden">
                          <Image
                            src={addOn.image}
                            alt=""
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <span className="flex-1 min-w-0 text-[#1C1B1B] dark:text-white text-small truncate">
                          {addOn.name} — {addOn.price}
                        </span>
                        <Stepper
                          value={addOnQty(addOn.id)}
                          max={maxQtyFor(addOn)}
                          label={addOn.name}
                          onChange={(next) => setAddOnQty(addOn.id, next)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/10 dark:border-white/10 pt-4">
                    {estimate.lines.map((line) => (
                      <div
                        key={`${line.kind}-${line.id}`}
                        className="flex justify-between text-small text-gray-700 dark:text-gray-300 mb-1"
                      >
                        <span className="truncate pr-3">
                          {line.qty}× {line.label}{" "}
                          <span className="opacity-60">{line.detail}</span>
                        </span>
                        <span className="shrink-0">
                          {formatMoney(line.total)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-black/10 dark:border-white/10">
                      <span className="text-[#1C1B1B] dark:text-white font-black uppercase text-small tracking-widest">
                        Estimated total
                      </span>
                      <span className="text-primary text-[24px] font-black">
                        {formatMoney(estimate.subtotal)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-[12px] mt-2">
                      Estimate only — delivery, tax and any on-site chef fee are
                      confirmed by our team. Per-person add-ons use your guest
                      count from the next step.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h4 className={labelClass}>How should we serve it?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                    {FULFILMENT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFulfilment(option.value)}
                        aria-pressed={fulfilment === option.value}
                        className={`border px-3 py-3 text-left transition-all ${
                          fulfilment === option.value
                            ? "border-primary bg-primary/10"
                            : "border-black/10 dark:border-white/10 hover:border-primary/50"
                        }`}
                      >
                        <span className="block text-[#1C1B1B] dark:text-white font-black uppercase text-small">
                          {option.label}
                        </span>
                        <span className="block text-gray-600 dark:text-gray-400 text-[12px] mt-1">
                          {option.hint}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="eventDate" className={labelClass}>
                        Event date
                      </label>
                      <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => changeEventDate(e.target.value)}
                        onBlur={persistDraft}
                        aria-invalid={Boolean(fieldErrors.eventDate)}
                        className={`${inputClass} ${borderFor(fieldErrors.eventDate)}`}
                      />
                      {fieldErrors.eventDate && (
                        <p className="text-red-500 text-small mt-1">
                          {fieldErrors.eventDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="eventTime" className={labelClass}>
                        Serving time
                      </label>
                      <input
                        id="eventTime"
                        name="eventTime"
                        type="time"
                        className={`${inputClass} ${borderFor()}`}
                      />
                    </div>
                  </div>

                  {isShortNotice && (
                    <p className="border border-primary bg-primary/10 px-4 py-3 text-small text-[#1C1B1B] dark:text-white mb-4">
                      ⚡ <strong>Short notice</strong> — for events this soon,
                      call us
                      {location ? ` at ${location.phone}` : ""} so we can confirm
                      capacity right away. You can still submit below.
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="headcount" className={labelClass}>
                        Number of guests
                      </label>
                      <input
                        id="headcount"
                        name="headcount"
                        type="number"
                        min={1}
                        required
                        value={headcount}
                        onChange={(e) => setHeadcount(e.target.value)}
                        onBlur={persistDraft}
                        placeholder="120"
                        aria-invalid={Boolean(fieldErrors.headcount)}
                        className={`${inputClass} ${borderFor(fieldErrors.headcount)}`}
                      />
                      {fieldErrors.headcount && (
                        <p className="text-red-500 text-small mt-1">
                          {fieldErrors.headcount}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="occasion" className={labelClass}>
                        Occasion
                      </label>
                      <select
                        id="occasion"
                        name="occasion"
                        className={`${inputClass} ${borderFor()}`}
                      >
                        <option value="">Select…</option>
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {showCoverageNudge && (
                    <p className="border border-primary/50 px-4 py-3 text-small text-[#1C1B1B] dark:text-white mb-4">
                      Your packages serve about <strong>{covered}</strong>{" "}
                      guests, but you&apos;ve entered <strong>{guests}</strong>.
                      Add another package to cover everyone?
                    </p>
                  )}

                  {fulfilment === "delivery" && (
                    <div className="mb-4">
                      <label htmlFor="deliveryAddress" className={labelClass}>
                        Delivery address
                      </label>
                      <input
                        id="deliveryAddress"
                        name="deliveryAddress"
                        required
                        placeholder="Street, city, state, ZIP"
                        aria-invalid={Boolean(fieldErrors.deliveryAddress)}
                        className={`${inputClass} ${borderFor(fieldErrors.deliveryAddress)}`}
                      />
                      {fieldErrors.deliveryAddress && (
                        <p className="text-red-500 text-small mt-1">
                          {fieldErrors.deliveryAddress}
                        </p>
                      )}
                    </div>
                  )}

                  {fulfilment === "pickup" && location && (
                    <p className="border border-black/10 dark:border-white/10 px-4 py-3 text-small text-gray-700 dark:text-gray-300 mb-4">
                      Collect from <strong>{location.name}</strong> —{" "}
                      {location.address}. {location.hours}
                    </p>
                  )}

                  {fulfilment === "onsite_chef" && (
                    <div className="space-y-4 mb-4">
                      <div>
                        <label htmlFor="venueAddress" className={labelClass}>
                          Venue address
                        </label>
                        <input
                          id="venueAddress"
                          name="venueAddress"
                          required
                          placeholder="Where should the chef set up?"
                          aria-invalid={Boolean(fieldErrors.venueAddress)}
                          className={`${inputClass} ${borderFor(fieldErrors.venueAddress)}`}
                        />
                        {fieldErrors.venueAddress && (
                          <p className="text-red-500 text-small mt-1">
                            {fieldErrors.venueAddress}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="venueSetting" className={labelClass}>
                            Indoor or outdoor
                          </label>
                          <select
                            id="venueSetting"
                            name="venueSetting"
                            className={`${inputClass} ${borderFor()}`}
                          >
                            <option value="">Select…</option>
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Both">Both</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="venuePower" className={labelClass}>
                            Power at the venue
                          </label>
                          <select
                            id="venuePower"
                            name="venuePower"
                            className={`${inputClass} ${borderFor()}`}
                          >
                            <option value="">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Not sure">Not sure</option>
                          </select>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-[12px]">
                        Chef and travel fees for on-site service are quoted by
                        our team and aren&apos;t included in the estimate.
                      </p>
                    </div>
                  )}

                  <h4 className={labelClass}>Setup needed</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {SETUP_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleSetup(option)}
                        aria-pressed={setup.includes(option)}
                        className={`border px-3 py-2 text-small transition-all ${
                          setup.includes(option)
                            ? "border-primary bg-primary/10 text-[#1C1B1B] dark:text-white"
                            : "border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {(
                      [
                        ["firstName", "First name", "text", true],
                        ["lastName", "Last name", "text", true],
                        ["email", "Email", "email", true],
                        ["phone", "Phone", "tel", true],
                      ] as const
                    ).map(([name, label, type, required]) => (
                      <div key={name}>
                        <label htmlFor={name} className={labelClass}>
                          {label}
                        </label>
                        <input
                          id={name}
                          name={name}
                          type={type}
                          required={required}
                          aria-invalid={Boolean(fieldErrors[name])}
                          className={`${inputClass} ${borderFor(fieldErrors[name])}`}
                        />
                        {fieldErrors[name] && (
                          <p className="text-red-500 text-small mt-1">
                            {fieldErrors[name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="company" className={labelClass}>
                      Company / organisation (optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      className={`${inputClass} ${borderFor()}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="notes" className={labelClass}>
                      Notes, dietary needs or allergies
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="All our food is 100% Halal. Tell us about any allergies."
                      className={`${inputClass} ${borderFor()}`}
                    />
                  </div>

                  {/* Honeypot — hidden from sight and screen readers; bots fill it. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="company_website">Company Website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
            </div>

            {/* pb-[env(safe-area-inset-bottom)] keeps the primary action clear
                of the home indicator on notched phones. */}
            <div className="border-t border-black/5 dark:border-white/5 px-4 sm:px-[var(--space-lg)] py-3 sm:py-[var(--space-md)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div aria-live="polite">
                {status === "error" && errorMessage && (
                  <p className="text-red-500 text-small font-bold uppercase tracking-widest text-center mb-3">
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-small shrink-0">
                  <span className="text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">
                    Est.{" "}
                  </span>
                  <span className="text-primary font-black text-[18px]">
                    {formatMoney(estimate.subtotal)}
                  </span>
                </div>

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={selectedPackages.length === 0}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-8 py-4 text-small font-black tracking-[1px] sm:tracking-[3px] uppercase transition-all"
                  >
                    <span className="sm:hidden">Next</span>
                    <span className="hidden sm:inline">
                      Next — event details
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-1 sm:flex-none gap-2 sm:gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-primary text-primary px-4 sm:px-6 py-4 text-small font-black tracking-[1px] sm:tracking-[2px] uppercase hover:bg-primary/10 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 sm:px-8 py-4 text-small font-black tracking-[1px] sm:tracking-[3px] uppercase transition-all whitespace-nowrap"
                    >
                      {status === "submitting" ? "Sending…" : "Request quote"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
