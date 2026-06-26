import React from "react";
import type { CateringPackage } from "@/lib/types";

interface CateringCardProps {
  item: CateringPackage;
  isActive: boolean;
  orderUrl: string;
  detailsMinHeight: number;
  onActivate: (id: string) => void;
  onReset: () => void;
  cardVariant?: "catering" | "shop";
}

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CateringCard: React.FC<CateringCardProps> = ({
  item,
  isActive,
  orderUrl,
  detailsMinHeight,
  onActivate,
  onReset,
  cardVariant = "catering",
}) => {

  // ── SHOP VARIANT (Wings section) — cloned from menu page wing card design ──
  if (cardVariant === "shop") {
    return (
      <a
        href={orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => onActivate(item.id)}
        onMouseLeave={onReset}
        onFocus={() => onActivate(item.id)}
        onBlur={onReset}
        className="w-full min-h-[300px] md:min-h-[355px] aspect-square sm:aspect-[6/5] mx-auto flex flex-col bg-zinc-950 overflow-hidden border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer block"
      >
        {/* Full image */}
        <img
          src={item.image}
          alt={`${item.people} ${item.category}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
          onError={(e) => { e.currentTarget.src = "/homepage/menu/HIBACHI.png"; }}
        />

        {/* Default gradient */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[165px] transition-opacity duration-500 z-10 ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 45%, #000 100%)" }}
        />

        {/* Orange overlay */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[165px] bg-[#FF7808] transition-opacity duration-500 z-20 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        />

        {/* Orange bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF7808] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-50" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end z-30 pointer-events-none h-[165px]">
          {/* Tag */}
          <span
            className={`block truncate mb-1 transition-colors duration-300 ${isActive ? "text-white" : "text-[#FF7808] group-hover:text-white"}`}
            style={{ fontFamily: '"Work Sans", sans-serif', fontSize: "10px", fontWeight: 900, lineHeight: "40px", letterSpacing: "2px", textTransform: "uppercase" }}
          >
            {item.label || item.category}
          </span>

          {/* Title */}
          <h3
            className="mb-1 text-white"
            style={{ fontFamily: '"Work Sans", sans-serif', fontSize: "36px", fontWeight: 900, lineHeight: "20px", textTransform: "uppercase" }}
          >
            {item.people}
          </h3>

          {/* Price + Add to Cart */}
          <div className="flex items-center justify-between mt-1 pointer-events-auto h-[59px]">
            <span
              className="text-white text-[24px] xl:text-[32px]"
              style={{ fontFamily: '"Work Sans", sans-serif', fontWeight: 700, lineHeight: "59px", textTransform: "uppercase" }}
            >
              {item.price}
            </span>
            <span className="inline-flex items-center gap-2 xl:gap-3">
              <span
                className="text-white text-[9px] xl:text-[11px] font-bold uppercase tracking-[1px] px-3 py-[6px] xl:px-4 xl:py-[8px] whitespace-nowrap transition-colors duration-300"
                style={{ backgroundColor: isActive ? "#ff8f32" : "#353232" }}
              >
                Add to Cart
              </span>
              <span className="text-white flex-shrink-0 xl:[&>svg]:w-[20px] xl:[&>svg]:h-[20px]"><CartIcon /></span>
            </span>
          </div>
        </div>
      </a>
    );
  }

  // ── CATERING VARIANT ─────────────────────────────────────────────────
  return (
    <div
      onMouseEnter={() => onActivate(item.id)}
      onMouseLeave={onReset}
      className="w-full"
    >
      {/* ── MOBILE list layout (<xl) ── */}
      <div className="xl:hidden w-full">
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => { if (!isActive) { e.preventDefault(); onActivate(item.id); } }}
          className={`block w-full border transition-all duration-300 overflow-hidden ${
            isActive
              ? "border-[#FF7808] shadow-[0_0_18px_rgba(255,120,8,0.35)]"
              : "border-white"
          }`}
        >
          {/* Top section */}
          <div
            className="flex items-stretch"
            style={{ backgroundColor: "#1c1b1b" }}
          >
            {/* Left: tag + title + price */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-[6px] pl-4 py-4 pr-2">
              <span className={`text-[11px] font-black uppercase tracking-[2px] leading-none transition-colors duration-300 ${isActive ? "text-[#FF7808]" : "text-zinc-400"}`}>
                {item.label || item.category}
              </span>
              <h3
                className="text-white uppercase leading-tight"
                style={{ fontFamily: '"Work Sans", sans-serif', fontSize: "22px", fontWeight: 900, lineHeight: "1.1" }}
              >
                {item.people}
              </h3>
              <span className="text-white font-bold text-[20px] leading-none">{item.price}</span>
            </div>

            {/* Middle: icons + button, all right-aligned */}
            <div className="flex flex-col items-end justify-center gap-3 px-3 py-3">
              <button onClick={(e) => e.preventDefault()} className="text-zinc-400" aria-label="Save">
                <HeartIcon />
              </button>
              <button onClick={(e) => e.preventDefault()} className="text-white" aria-label="Order">
                <CartIcon />
              </button>
              <span className="text-[10px] font-bold uppercase tracking-[1px] border border-zinc-500 text-white px-3 py-[6px] leading-none whitespace-nowrap">
                ADD TO CART
              </span>
            </div>

            {/* Right: image */}
            <div className="w-[100px] self-stretch overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={`${item.people} ${item.category}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-110" : "scale-100"}`}
                onError={(e) => { e.currentTarget.src = "/homepage/menu/HIBACHI.png"; }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-white px-4 py-3" style={{ backgroundColor: "transparent" }}>
            <p className="text-white text-[11px] font-bold uppercase leading-[26px] tracking-wide">
              {item.details.join(" · ")}
            </p>
          </div>
        </a>

        {/* Add to Cart — smooth slide-in */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-[50px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] items-center justify-center gap-3 bg-[#FF7808]"
          >
            <span className="font-['Work_Sans'] text-[13px] font-bold uppercase tracking-[6px] text-white">Add to Cart</span>
            <span className="text-white"><CartIcon /></span>
          </a>
        </div>
      </div>

      {/* ── DESKTOP square card (xl+) ── */}
      <a
        href={orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={() => onActivate(item.id)}
        onBlur={onReset}
        className={`group relative z-10 hidden xl:block h-fit w-full overflow-visible transition-all duration-300 hover:-translate-y-2 ${
          isActive
            ? "shadow-[0_0_18px_rgba(255,120,8,0.35)]"
            : "hover:shadow-[0_0_18px_rgba(255,120,8,0.35)]"
        }`}
      >
        <div className={`relative z-20 overflow-hidden border bg-zinc-950 transition-colors duration-300 dark:border-zinc-900/60 ${
          isActive ? "border-[#FF7808]" : "border-white hover:border-[#FF7808]"
        }`}>
          {/* Image */}
          <div className="relative h-[355px] overflow-hidden">
            <img
              src={item.image}
              alt={`${item.people} ${item.category}`}
              className={`absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 ${isActive ? "scale-110" : "scale-100 group-hover:scale-110"}`}
              onError={(e) => { e.currentTarget.src = "/homepage/menu/HIBACHI.png"; }}
            />

            {/* Default gradient */}
            <div
              className={`absolute bottom-0 left-0 z-10 h-[185px] w-full transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 6.92%, #000 100%)" }}
            />

            {/* Orange overlay */}
            <div className={`absolute bottom-0 left-0 z-20 h-[185px] w-full bg-[#FF7808] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />

            {/* Orange bottom border */}
            <div className={`absolute bottom-0 left-0 right-0 z-50 h-[4px] origin-left bg-[#FF7808] transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`} />

            {/* Text overlay */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-30 flex h-[185px] w-full flex-col justify-center items-start px-5" style={{ paddingBlock: 0 }}>
              <span className={`mb-1 block truncate text-[10px] font-black uppercase leading-none tracking-[2px] transition-colors duration-500 ${isActive ? "text-white" : "text-[#FF7808]"}`}>
                {item.label || item.category}
              </span>
              <h3 className="font-['Work_Sans'] text-[36px] font-extrabold uppercase leading-[59px] text-white">
                {item.people}
              </h3>
              <span className="font-['Work_Sans'] text-[36px] font-bold uppercase leading-[45px] text-white">
                {item.price}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-center bg-[#151515] px-7 py-7" style={{ minHeight: `${detailsMinHeight}px` }}>
            <ul className="w-full space-y-1 text-left">
              {item.details.map((detail) => (
                <li key={detail} className="text-left font-['Work_Sans'] text-[12px] font-bold uppercase leading-[32px] text-white">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add to Cart — slides from behind */}
        <div className={`absolute left-0 top-[99.5%] z-0 h-[59px] w-full border-x border-[#FF7808] bg-[#FF7808] transition-all duration-500 ease-out flex items-center justify-center gap-3 ${isActive ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
          <span className="font-['Work_Sans'] text-[14px] font-bold uppercase tracking-[9px] text-white">Add to Cart</span>
          <span className="text-white"><CartIcon /></span>
        </div>
      </a>
    </div>
  );
};

export default CateringCard;
