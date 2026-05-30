import React from "react";
import type { CateringPackage } from "@/lib/types";

interface CateringCardProps {
  item: CateringPackage;
  isActive: boolean;
  orderUrl: string;
  detailsMinHeight: number;
  onActivate: (id: string) => void;
  onReset: () => void;
}

const CateringCard: React.FC<CateringCardProps> = ({
  item,
  isActive,
  orderUrl,
  detailsMinHeight,
  onActivate,
  onReset,
}) => {
  return (
    <a
      href={orderUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onActivate(item.id)}
      onMouseLeave={onReset}
      onFocus={() => onActivate(item.id)}
      onBlur={onReset}
      className="group relative z-10 block h-fit w-full overflow-visible transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)]"
    >
      <div className="relative z-20 overflow-hidden border border-white bg-zinc-950 dark:border-zinc-900/60">
        {/* Top card area */}
        <div className="relative h-[300px] overflow-hidden sm:h-[320px] md:h-[335px] xl:h-[355px]">
          <img
            src={item.image}
            alt={`${item.people} ${item.category}`}
            className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/homepage/menu/HIBACHI.png";
            }}
          />

          <div
            className={`absolute bottom-0 left-0 z-10 h-[120px] md:h-[185px] w-full transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
              }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 6.92%, #000 100%)",
            }}
          />

          <div
            className={`absolute bottom-0 left-0 z-20 h-[120px] md:h-[185px] w-full bg-[#FF7808] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
              }`}
          />

          <div
            className={`absolute bottom-0 left-0 right-0 z-50 h-[4px] origin-left bg-[#FF7808] transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"
              }`}
          />

          <div className="pointer-events-none absolute bottom-0 left-0 z-30 flex h-[120px] md:h-[185px] w-full flex-col justify-center items-start px-4 sm:px-5" style={{ paddingBlock: 0 }}>
            <div>
              <span
                className={`mb-1 block truncate font-[family-name:var(--font-serif-next)] text-[10px] font-black uppercase leading-none tracking-[2px] transition-colors duration-500 ${isActive ? "text-white" : "text-[#FF7808]"
                  }`}
              >
                {item.label || item.category}
              </span>

              <h3 className="font-['Work_Sans'] text-[32px] font-extrabold uppercase leading-[40px] text-white sm:text-[34px] md:text-[36px] md:leading-[59px]">
                {item.people}
              </h3>
            </div>

            <span className="font-['Work_Sans'] text-[32px] font-bold uppercase leading-[40px] text-white sm:text-[34px] md:text-[36px] md:leading-[45px]">
              {item.price}
            </span>
          </div>
        </div>

        {/* Bottom details list, equal height across cards */}
        <div
          className="flex items-center justify-center bg-[#151515] px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7"
          style={{ minHeight: `${detailsMinHeight}px` }}
        >
          <ul className="w-full space-y-1 text-left">
            {item.details.map((detail) => (
              <li
                key={detail}
                className="text-left font-['Work_Sans'] text-[12px] font-bold uppercase leading-[32px] text-white sm:text-[13px] lg:text-[12px]"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile/tablet button, normal visible because no hover */}
        {isActive && (
          <div className="h-[59px] bg-[#FF7808] lg:hidden">
            <span className="block text-center font-['Work_Sans'] text-[14px] font-bold uppercase leading-[59px] tracking-[9px] text-white">
              Call Now
            </span>
          </div>
        )}
      </div>

      {/* Desktop/laptop button, slides from behind card */}
      <div
        className={`absolute left-0 top-[99.5%] z-0 hidden h-[59px] w-full border-x border-white bg-[#FF7808] transition-all duration-500 ease-out dark:border-zinc-900/60 lg:block ${isActive
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
          }`}
      >
        <span className="block text-center font-['Work_Sans'] text-[14px] font-bold uppercase leading-[59px] tracking-[9px] text-white">
          Call Now
        </span>
      </div>
    </a>
  );
};

export default CateringCard;
