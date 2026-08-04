"use client";

import Image from "next/image";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { getActiveLocations, getLocationLabel } from "@/lib/api/locations";

const defaultLocation = getActiveLocations()[0];

const StoreLocalFlame = () => {
  const { nearest } = useNearestLocation();
  const location = nearest ?? defaultLocation;
  const cityLabel = getLocationLabel(location).toUpperCase();
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Flame Japanese Hibachi ${location.address}`
  )}`;

  return (
    <section className="w-full bg-background px-[var(--space-lg)] py-[var(--space-2xl)] transition-colors duration-300">
      <div className="flex flex-col gap-[var(--space-2xl)]">
        {/* Fresh From The Flame */}
        <div>
          <h2 className="heading-h3 !text-left mb-[var(--space-md)]">
            <span className="text-foreground">FRESH FROM THE </span>
            <span className="text-primary">FLAME</span>
          </h2>
          <div className="flex flex-col gap-[var(--space-sm)] text-gray-600 dark:text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium">
            <p>
              At Flame Japanese Hibachi {getLocationLabel(location)}, every
              meal is prepared fresh, served hot, and made just the way you
              like it. Explore sizzling hibachi plates, sushi favorites,
              crispy wings, flavorful sides, refreshing drinks, and more.
            </p>
            <p>
              Whether you are stopping in for lunch, picking up dinner for
              the family, or ordering from home, our {getLocationLabel(location)}{" "}
              team is ready to bring bold Japanese-inspired flavor to your
              table.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1531px] mx-auto aspect-[1100/358] relative overflow-hidden border border-black/5 dark:border-white/10">
          <Image
            src="/store/chicken-pork-hibachi-bowl.png"
            alt="Fresh hibachi bowl with grilled chicken, pork, noodles, and vegetables from Flame Japanese Hibachi"
            fill
            sizes="(max-width: 1531px) 100vw, 1531px"
            className="object-cover"
          />
        </div>

        {/* Your Local Flame */}
        <div className="flex flex-col gap-[var(--space-md)]">
          <h2 className="heading-h3 text-center pt-[var(--space-sm)] pb-[var(--space-lg)] md:pb-[var(--space-xl)]">
            <span className="text-foreground">YOUR LOCAL </span>
            <span className="text-primary">FLAME</span>
            <span className="text-foreground"> IN </span>
            <span className="text-primary">{cityLabel}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-[var(--space-xl)] items-stretch">
          <div className="flex flex-col justify-between h-full gap-[var(--space-md)]">
            <p className="text-gray-600 dark:text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium">
              Find us at {location.address}, conveniently located along{" "}
              {location.city}&apos;s main routes. Stop by for a freshly
              prepared meal, order ahead for pickup, or have your
              favorites delivered directly to you.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium">
              Need help with an order or have a question about the store?
            </p>

            <p className="text-foreground font-bold text-[18px] md:text-[24px]">
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
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-[40px] sm:h-[48px] px-2.5 sm:px-7 border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 font-serif font-bold text-[10px] sm:text-[13px] leading-[18px] tracking-[0.8px] sm:tracking-[1.2px] uppercase whitespace-nowrap"
              >
                GET DIRECTIONS
              </a>
              <a
                href={telHref}
                role="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-[40px] sm:h-[48px] px-2.5 sm:px-7 bg-primary hover:brightness-110 text-white font-serif font-bold text-[10px] sm:text-[13px] leading-[18px] tracking-[0.8px] sm:tracking-[1.2px] uppercase whitespace-nowrap"
              >
                CALL THIS LOCATION
              </a>
            </div>
          </div>

          <div className="w-full aspect-[4/2.6] relative overflow-hidden border border-black/5 dark:border-white/10">
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
