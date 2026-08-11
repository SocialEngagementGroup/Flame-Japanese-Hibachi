"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Phone, Clock } from "lucide-react";
import MapEmbed from "@/components/blocks/location/MapEmbed";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import {
  getActiveLocations,
  getLocationBySlug,
  getLocationLabel,
  locationDirectionsUrl,
  locationMapEmbedSrc,
} from "@/lib/api/locations";
import { useOrderUrl } from "@/lib/geo/useOrderUrl";
import {
  storeBodyText,
  storeCtaFilled,
  storeCtaOutline,
} from "@/components/blocks/store/storeStyles";

const defaultLocation = getActiveLocations()[0];

const StoreGoodFoodEnergy = () => {
  const { nearest } = useNearestLocation();
  // Same URL-wins-over-geolocation rule as StoreLocalFlame / useOrderUrl -
  // see the comment there.
  const params = useParams<{ location?: string }>();
  const slug = typeof params?.location === "string" ? params.location : null;
  const urlLocation = slug ? getLocationBySlug(slug) : undefined;
  const location = urlLocation ?? nearest ?? defaultLocation;
  const orderUrl = useOrderUrl();
  const cityLabel = getLocationLabel(location).toUpperCase();
  const stateLabel = location.state.toUpperCase();
  const directionsUrl = locationDirectionsUrl(location);
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`;
  const mapSrc = locationMapEmbedSrc(location);

  return (
    <section className="store-body-alt w-full bg-[#242323] px-[var(--space-lg)] py-[var(--space-2xl)] transition-colors duration-300">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-col gap-[var(--space-xl)]">
          {/* Good Food. Great Energy. */}
          <div className="flex flex-col gap-[var(--space-md)]">
            <h2 className="heading-h3 store-heading-alt text-center md:text-left md:whitespace-nowrap">
              <span className="text-primary">GOOD </span>
              <span className="text-white">FOOD. </span>
              <br className="md:hidden" />
              <span className="text-primary">GREAT </span>
              <span className="text-white">ENERGY.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-[var(--space-xl)] items-stretch">
              <div className="order-2 md:order-1 -mx-[var(--space-lg)] border-x-0 md:mx-0 md:w-full md:border-x aspect-[4/2.6] relative overflow-hidden border-y border-white/10">
                <Image
                  src="/store/avocado-shrimp-sushi-roll.png"
                  alt="Avocado and shrimp tempura sushi roll from Flame Japanese Hibachi"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              <div className="order-1 md:order-2 flex flex-col justify-center gap-[var(--space-sm)] h-full">
                <p className={`text-gray-300 ${storeBodyText}`}>
                  Flame is built around fresh food, bold flavor, and the energy
                  of sharing a great meal. We proudly serve halal Japanese
                  cuisine in a relaxed, welcoming environment where every guest
                  can find something to enjoy.
                </p>
                <p className={`text-gray-300 ${storeBodyText}`}>
                  From the heat of the grill to the final plate, our{" "}
                  {getLocationLabel(location)} team is committed to friendly
                  service, consistent quality, and making every visit feel worth
                  coming back for.
                </p>
              </div>
            </div>
          </div>

          {/* Open Now */}
          <div className="flex flex-col items-center text-center gap-[var(--space-sm)]">
            <span className="text-primary text-small leading-[58px] tracking-[9px] font-bold uppercase font-sans text-center">
              OPEN NOW
            </span>
            <h2 className="heading-h3 store-heading-alt text-center">
              <span className="text-primary">{cityLabel}, </span>
              <span className="text-white">{stateLabel}</span>
            </h2>
            <p className={`text-gray-300 max-w-[600px] ${storeBodyText}`}>
              Your next meal is heating up. Visit Flame{" "}
              {getLocationLabel(location)} today or place your order online for
              convenient pickup or delivery.
            </p>
          </div>

          {/* Map */}
          <MapEmbed
            title={`Map of Flame Japanese Hibachi ${getLocationLabel(location)}`}
            src={mapSrc}
            className="w-full aspect-[16/9] relative overflow-hidden border border-white/10"
          />

          {/* Location details */}
          <div className="store-heading-alt flex flex-col items-center text-center gap-[var(--space-sm)] mt-[var(--space-sm)]">
            <p className="text-white text-h2 font-bold">{location.address}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 text-primary hover:underline text-body font-medium"
              >
                <Phone size={16} />
                {location.phone}
              </a>
              <span className="inline-flex items-center gap-2 text-gray-300 text-body font-medium">
                <Clock size={16} />
                {location.hours}
              </span>
            </div>

            <div className="flex justify-center gap-[var(--gap-sm)] mt-[var(--space-md)]">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={storeCtaOutline}
              >
                GET DIRECTIONS
              </a>
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={storeCtaFilled}
              >
                ORDER NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreGoodFoodEnergy;
