"use client";

import Image from "next/image";
import { Phone, Clock } from "lucide-react";
import { useNearestLocation } from "@/components/providers/NearestLocationProvider";
import { getActiveLocations, getLocationLabel } from "@/lib/api/locations";
import { useOrderUrl } from "@/lib/geo/useOrderUrl";

const defaultLocation = getActiveLocations()[0];

const galleryThumbnails = [
  { src: "/menupage/sushi/california-roll.jpg", alt: "California roll from Flame Japanese Hibachi" },
  { src: "/menupage/sushi/dancing-shrimp.jpg", alt: "Dancing shrimp roll from Flame Japanese Hibachi" },
  { src: "/menupage/hibachi/salmon-hibachi-plate.jpg", alt: "Salmon hibachi plate from Flame Japanese Hibachi" },
];

const StoreGoodFoodEnergy = () => {
  const { nearest } = useNearestLocation();
  const location = nearest ?? defaultLocation;
  const orderUrl = useOrderUrl();
  const cityLabel = getLocationLabel(location).toUpperCase();
  const stateLabel = location.state.toUpperCase();
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Flame Japanese Hibachi ${location.address}`
  )}`;
  const telHref = `tel:${location.phone.replace(/\s+/g, "")}`;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `Flame Japanese Hibachi ${location.address}`
  )}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full bg-[#242323] px-[var(--space-lg)] py-[var(--space-2xl)] transition-colors duration-300">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-col gap-[var(--space-xl)]">
          {/* Good Food. Great Energy. */}
          <div className="flex flex-col gap-[var(--space-md)]">
            <h2 className="heading-h3 !text-left">
              <span className="text-primary">GOOD </span>
              <span className="text-white">FOOD. </span>
              <span className="text-primary">GREAT </span>
              <span className="text-white">ENERGY.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-[var(--space-xl)] items-stretch">
              <div className="w-full aspect-[4/2.6] relative overflow-hidden border border-white/10">
                <Image
                  src="/store/avocado-shrimp-sushi-roll.png"
                  alt="Avocado and shrimp tempura sushi roll from Flame Japanese Hibachi"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-[var(--space-sm)] h-full">
                <div className="flex flex-col gap-[var(--space-sm)]">
                  <p className="text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium">
                    Flame is built around fresh food, bold flavor, and the
                    energy of sharing a great meal. We proudly serve halal
                    Japanese cuisine in a relaxed, welcoming environment where
                    every guest can find something to enjoy.
                  </p>
                  <p className="text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium">
                    From the heat of the grill to the final plate, our{" "}
                    {getLocationLabel(location)} team is committed to friendly
                    service, consistent quality, and making every visit feel
                    worth coming back for.
                  </p>
                </div>
                <div className="flex gap-[var(--gap-sm)] flex-1 min-h-[110px]">
                  {galleryThumbnails.map((thumb) => (
                    <div
                      key={thumb.src}
                      className="group flex-1 relative overflow-hidden border border-white/10"
                    >
                      <Image
                        src={thumb.src}
                        alt={thumb.alt}
                        fill
                        sizes="150px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Open Now */}
          <div className="flex flex-col items-center text-center gap-[var(--space-sm)]">
            <span className="text-primary text-[14px] leading-[58px] tracking-[9px] font-bold uppercase font-sans text-center">
              OPEN NOW
            </span>
            <h2 className="heading-h3 text-center">
              <span className="text-primary">{cityLabel}, </span>
              <span className="text-white">{stateLabel}</span>
            </h2>
            <p className="text-gray-300 text-[18px] md:text-[24px] leading-relaxed font-medium max-w-[600px]">
              Your next meal is heating up. Visit Flame {getLocationLabel(location)}{" "}
              today or place your order online for convenient pickup or
              delivery.
            </p>
          </div>

          {/* Map */}
          <div className="w-full aspect-[16/9] relative overflow-hidden border border-white/10">
            <iframe
              title={`Map of Flame Japanese Hibachi ${getLocationLabel(location)}`}
              src={mapSrc}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </div>

          {/* Location details */}
          <div className="flex flex-col items-center text-center gap-[var(--space-sm)] mt-[var(--space-sm)]">
            <p className="text-white text-[18px] md:text-[24px] font-bold">
              {location.address}
            </p>

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
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-[40px] sm:h-[48px] px-2.5 sm:px-7 border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/5 font-serif font-bold text-[10px] sm:text-[13px] leading-[18px] tracking-[0.8px] sm:tracking-[1.2px] uppercase whitespace-nowrap"
              >
                GET DIRECTIONS
              </a>
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-[40px] sm:h-[48px] px-2.5 sm:px-7 bg-primary hover:brightness-110 text-white font-serif font-bold text-[10px] sm:text-[13px] leading-[18px] tracking-[0.8px] sm:tracking-[1.2px] uppercase whitespace-nowrap"
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
