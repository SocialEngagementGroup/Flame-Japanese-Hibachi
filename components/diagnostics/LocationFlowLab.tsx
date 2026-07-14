"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";

type TestPageKind = "menu" | "catering" | "location";

type LocationFlowLabProps = {
  pageKind: TestPageKind;
  slug?: string;
};

const SELECTED_LOCATION_KEY = "fjh-selected-location-v1";
const CACHE_KEY = "fjh-nearest-location-v1";
const PROMPT_KEY = "fjh-location-prompt-dismissed-v1";

const locations = getActiveLocations();

function routeBase(pageKind: TestPageKind) {
  if (pageKind === "menu") return "/test-menu";
  if (pageKind === "catering") return "/test-catering";
  return "/test-location";
}

function readStorageValue(key: string) {
  try {
    return localStorage.getItem(key) ?? "(empty)";
  } catch {
    return "(unavailable)";
  }
}

export default function LocationFlowLab({
  pageKind,
  slug,
}: LocationFlowLabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, nearest, selectLocation } = useNearestLocation();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [storageSnapshot, setStorageSnapshot] = React.useState({
    selected: "(not mounted)",
    cache: "(not mounted)",
    prompt: "(not mounted)",
    cookie: "(not mounted)",
  });
  const [navigationTiming, setNavigationTiming] =
    React.useState<Record<string, string>>();
  const [lastClickAt, setLastClickAt] = React.useState<number | null>(null);
  const [lastRouteChangeMs, setLastRouteChangeMs] = React.useState<
    number | null
  >(null);

  const urlLocation = slug ? getLocationBySlug(slug) : undefined;
  const activeLocation = urlLocation ?? nearest ?? null;
  const activeSlug = activeLocation?.slug;
  const orderUrl = resolveOrderUrl(activeLocation);
  const base = routeBase(pageKind);

  const menuHref = activeSlug ? `/test-menu/${activeSlug}` : "/test-menu";
  const cateringHref = activeSlug
    ? `/test-catering/${activeSlug}`
    : "/test-catering";

  const refreshSnapshot = React.useCallback(() => {
    setStorageSnapshot({
      selected: readStorageValue(SELECTED_LOCATION_KEY),
      cache: readStorageValue(CACHE_KEY),
      prompt: readStorageValue(PROMPT_KEY),
      cookie: document.cookie || "(empty)",
    });
  }, []);

  React.useEffect(() => {
    refreshSnapshot();
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (!nav) return;
    setNavigationTiming({
      type: nav.type,
      redirectCount: String(nav.redirectCount),
      responseStartMs: Math.round(nav.responseStart).toString(),
      domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd).toString(),
      loadEventMs: Math.round(nav.loadEventEnd).toString(),
      transferSize: String(nav.transferSize),
    });
  }, [refreshSnapshot]);

  React.useEffect(() => {
    if (lastClickAt === null) return;
    setLastRouteChangeMs(Math.round(performance.now() - lastClickAt));
    setLastClickAt(null);
    refreshSnapshot();
  }, [pathname, lastClickAt, refreshSnapshot]);

  const navigateWithMark = (href: string, marker: number) => {
    setLastClickAt(marker);
    router.push(href);
  };

  const selectStore = (storeId: number, marker: number) => {
    const store = locations.find((location) => location.id === storeId);
    if (!store) return;
    setSelectedId(store.id);
    setLastClickAt(marker);
    selectLocation(store.id);
    refreshSnapshot();
    if (pageKind === "menu" || pageKind === "catering") {
      router.push(`${base}/${store.slug}`);
    }
  };

  const clearLocationState = () => {
    try {
      localStorage.removeItem(SELECTED_LOCATION_KEY);
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(PROMPT_KEY);
      document.cookie = `${SELECTED_LOCATION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    } catch {}
    refreshSnapshot();
  };

  return (
    <main className="min-h-screen bg-[#111] px-5 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <section className="border border-white/15 bg-black p-5">
          <p className="text-small font-black uppercase tracking-[2px] text-primary">
            No Image Location Flow Lab
          </p>
          <h1 className="mt-2 font-serif text-3xl font-black uppercase md:text-5xl">
            {pageKind === "menu"
              ? "Test Menu"
              : pageKind === "catering"
                ? "Test Catering"
                : "Test Location Setup"}
          </h1>
          <p className="mt-3 max-w-3xl text-small leading-relaxed text-white/70">
            This page intentionally uses no images, videos, maps, menu cards, or
            iframe embeds. Use it on Vercel to compare pure routing, cookie,
            localStorage, context, and URL-slug behavior against the real pages.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="border border-white/15 bg-black p-4">
            <p className="text-small uppercase tracking-[2px] text-white/50">
              Current URL
            </p>
            <p className="mt-2 break-all font-mono text-sm">{pathname}</p>
          </div>
          <div className="border border-white/15 bg-black p-4">
            <p className="text-small uppercase tracking-[2px] text-white/50">
              Active Location
            </p>
            <p className="mt-2 font-serif text-xl font-black uppercase text-primary">
              {activeLocation?.name ?? "None"}
            </p>
            <p className="mt-1 font-mono text-sm text-white/60">
              slug: {activeLocation?.slug ?? "(empty)"}
            </p>
          </div>
          <div className="border border-white/15 bg-black p-4">
            <p className="text-small uppercase tracking-[2px] text-white/50">
              Provider Status
            </p>
            <p className="mt-2 font-mono text-sm">{status}</p>
            <p className="mt-1 font-mono text-sm text-white/60">
              nearest: {nearest?.name ?? "(empty)"}
            </p>
          </div>
        </section>

        <section className="border border-white/15 bg-black p-5">
          <h2 className="font-serif text-xl font-black uppercase">
            Navigation Test
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={(event) => navigateWithMark(menuHref, event.timeStamp)}
              className="bg-primary px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
            >
              Go Test Menu
            </button>
            <button
              type="button"
              onClick={(event) =>
                navigateWithMark(cateringHref, event.timeStamp)
              }
              className="bg-primary px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
            >
              Go Test Catering
            </button>
            <Link
              href="/test-location"
              className="border border-white/30 px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
            >
              Test Location Setup
            </Link>
            <Link
              href="/menu"
              className="border border-white/30 px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
            >
              Real Menu
            </Link>
            <Link
              href="/catering"
              className="border border-white/30 px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
            >
              Real Catering
            </Link>
          </div>
          <p className="mt-4 font-mono text-sm text-white/70">
            Last client route switch:{" "}
            {lastRouteChangeMs === null
              ? "(none yet)"
              : `${lastRouteChangeMs}ms`}
          </p>
        </section>

        <section className="border border-white/15 bg-black p-5">
          <h2 className="font-serif text-xl font-black uppercase">
            Select Location
          </h2>
          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {locations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={(event) => selectStore(location.id, event.timeStamp)}
                className={`border p-3 text-left transition-colors ${
                  selectedId === location.id ||
                  activeLocation?.id === location.id
                    ? "border-primary bg-primary text-white"
                    : "border-white/15 bg-[#181818] hover:border-primary"
                }`}
              >
                <span className="block font-serif text-base font-black uppercase">
                  {location.name}
                </span>
                <span className="mt-1 block font-mono text-xs opacity-75">
                  {location.slug}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="border border-white/15 bg-black p-5">
            <h2 className="font-serif text-xl font-black uppercase">
              Stored State
            </h2>
            <dl className="mt-4 space-y-3 font-mono text-xs">
              <div>
                <dt className="text-white/50">localStorage selected</dt>
                <dd className="break-all">{storageSnapshot.selected}</dd>
              </div>
              <div>
                <dt className="text-white/50">localStorage nearest cache</dt>
                <dd className="break-all">{storageSnapshot.cache}</dd>
              </div>
              <div>
                <dt className="text-white/50">prompt dismissed</dt>
                <dd className="break-all">{storageSnapshot.prompt}</dd>
              </div>
              <div>
                <dt className="text-white/50">document.cookie</dt>
                <dd className="break-all">{storageSnapshot.cookie}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={refreshSnapshot}
                className="border border-white/30 px-4 py-3 text-small font-black uppercase tracking-[1.5px]"
              >
                Refresh State
              </button>
              <button
                type="button"
                onClick={clearLocationState}
                className="border border-red-400 px-4 py-3 text-small font-black uppercase tracking-[1.5px] text-red-300"
              >
                Clear Test State
              </button>
            </div>
          </div>

          <div className="border border-white/15 bg-black p-5">
            <h2 className="font-serif text-xl font-black uppercase">
              Page Timing
            </h2>
            <dl className="mt-4 space-y-3 font-mono text-xs">
              {navigationTiming ? (
                Object.entries(navigationTiming).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4">
                    <dt className="text-white/50">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No timing data yet.</p>
              )}
            </dl>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-small uppercase tracking-[2px] text-white/50">
                Resolved Order URL
              </p>
              <p className="mt-2 break-all font-mono text-xs">{orderUrl}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
