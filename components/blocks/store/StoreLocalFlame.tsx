"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import {
  getActiveLocations,
  getLocationBySlug,
  getLocationLabel,
  locationDirectionsUrl,
} from "@/lib/api/locations";
import {
  storeBodyText,
  storeCtaFilled,
  storeCtaOutline,
} from "@/components/blocks/store/storeStyles";

const defaultLocation = getActiveLocations()[0];

const StoreLocalFlame = () => {
  const { nearest } = useNearestLocation();
  // The [location] slug in the URL wins over the geolocation context - on
  // /store/laurel-md this must always show Laurel even if the visitor's
  // browser-detected nearest store is elsewhere, otherwise a shared link
  // shows one store's page with another store's address and hours. Same fix
  // useOrderUrl() already applies. Falls back to nearest on pages with no
  // location in the URL (the generic /store, mid-redirect).
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const urlLocation = slug ? getLocationBySlug(slug) : undefined;
  const location = urlLocation ?? nearest ?? defaultLocation;
  const cityLabel = getLocationLabel(location).toUpperCase();
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`;
  const directionsUrl = locationDirectionsUrl(location);

  // The closing image runs full-bleed on mobile, so the section drops its
  // bottom padding there - otherwise that padding drew a band of this
  // section's background between the image and the #242323 block below it.
  // Flush, the image reads as the start of that block. Desktop keeps its
  // padding; nothing is full-bleed there.
  return (
    <section className="store-body-alt w-full bg-background px-[var(--space-lg)] py-[var(--space-2xl)] max-md:pb-0 transition-colors duration-300">
      <div className="flex flex-col gap-[var(--space-2xl)]">
        {/* Fresh From The Flame */}
        <div>
          <h2 className="heading-h3 store-heading-alt !text-left mb-[var(--space-md)]">
            <span className="text-foreground">FRESH FROM THE </span>
            <span className="text-primary">FLAME</span>
          </h2>
          <div
            className={`flex flex-col gap-[var(--space-sm)] text-gray-600 dark:text-gray-300 ${storeBodyText}`}
          >
            <p>
              At Flame Japanese Hibachi {getLocationLabel(location)}, every meal
              is prepared fresh, served hot, and made just the way you like it.
              Explore sizzling hibachi plates, sushi favorites, crispy wings,
              flavorful sides, refreshing drinks, and more.
            </p>
            <p>
              Whether you are stopping in for lunch, picking up dinner for the
              family, or ordering from home, our {getLocationLabel(location)}{" "}
              team is ready to bring bold Japanese-inspired flavor to your
              table.
            </p>
          </div>
        </div>

        {/* 1100/358 is a banner ratio - at phone widths it collapsed to ~110px
            tall and the food was unreadable. Mobile borrows the 4/2.6 the other
            two store images use so all three read at the same scale. */}
        <div className="w-full max-w-[1531px] mx-auto aspect-[4/2.6] md:aspect-[1100/358] relative overflow-hidden border border-black/5 dark:border-white/10">
          <Image
            src="/store/fresh-hibachi-bowl.png"
            alt="Fresh hibachi bowl with grilled proteins, noodles, and vegetables from Flame Japanese Hibachi"
            fill
            sizes="(max-width: 1531px) 100vw, 1531px"
            className="object-cover"
          />
        </div>

        {/* Your Local Flame */}
        <div className="flex flex-col gap-[var(--space-md)]">
          <h2 className="heading-h3 store-heading-alt text-center pt-[var(--space-sm)] pb-[var(--space-lg)] md:pb-[var(--space-xl)]">
            <span className="text-foreground">YOUR LOCAL </span>
            <span className="text-primary">FLAME</span>
            <span className="text-foreground"> IN </span>
            <span className="text-primary">{cityLabel}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-[var(--space-xl)] items-stretch">
            <div className="flex flex-col justify-between h-full gap-[var(--space-md)]">
              <p
                className={`text-gray-600 dark:text-gray-300 ${storeBodyText}`}
              >
                Find us at {location.address}, conveniently located along{" "}
                {location.city}&apos;s main routes. Stop by for a freshly
                prepared meal, order ahead for pickup, or have your favorites
                delivered directly to you.
              </p>

              <p
                className={`text-gray-600 dark:text-gray-300 ${storeBodyText}`}
              >
                Need help with an order or have a question about the store?
              </p>

              <p className="text-foreground font-bold text-h2">
                Call the {getLocationLabel(location)} team at{" "}
                <a href={telHref} className="text-primary">
                  {location.phone}
                </a>
              </p>

              <div className="flex gap-[var(--gap-sm)] mt-[var(--space-sm)]">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className={storeCtaOutline}
                >
                  GET DIRECTIONS
                </a>
                <a href={telHref} role="button" className={storeCtaFilled}>
                  CALL THIS LOCATION
                </a>
              </div>
            </div>

            <div className="-mx-[var(--space-lg)] border-x-0 md:mx-0 md:w-full md:border-x aspect-[4/2.6] relative overflow-hidden border-y border-black/5 dark:border-white/10">
              <Image
                src="/store/maryland-monument-landmark.png"
                alt={`Near Flame Japanese Hibachi ${location.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocalFlame;
