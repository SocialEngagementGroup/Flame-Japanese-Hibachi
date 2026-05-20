"use client";

import React, { useEffect, useRef } from "react";

interface Category {
  id: string;
  name: string;
}

interface MenuSidebarProps {
  categories: Category[];
  activeCategory: string;
  scrollToSection: (id: string) => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  categories,
  activeCategory,
  scrollToSection,
}) => {
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Sync mobile horizontal scroll navigation with active category
  useEffect(() => {
    if (mobileNavRef.current) {
      const activeBtn = mobileNavRef.current.querySelector(
        `[data-category="${activeCategory}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  return (
    <>
      {/* LEFT SIDEBAR: Desktop version */}
      <div className="hidden lg:block w-[280px] 2xl:w-[320px] shrink-0 sticky top-[180px] z-40 h-[calc(100vh-220px)] overflow-y-auto scrollbar-hide border-r border-[#FF7808]/40 pr-6 mr-2">
        <nav className="flex flex-col space-y-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`relative w-full text-left font-[family-name:var(--font-serif-next)] font-black text-[16px] xl:text-[18px] 2xl:text-[20px] uppercase transition-all duration-300 pl-6 h-[59px] flex items-center select-none cursor-pointer ${isActive
                    ? "text-[#FF7808]"
                    : "text-zinc-500 hover:text-[#FF7808]/80 dark:text-zinc-400 dark:hover:text-[#FF7808]/80"
                  }`}
              >
                {/* Active Bullet Indicator Dot */}
                {isActive && (
                  <span className="absolute left-0 w-2.5 h-2.5 bg-[#FF7808] rounded-full shadow-[0_0_8px_#FF7808]" />
                )}
                <span className="leading-none whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* MOBILE/TABLET STICKY HEADER: Horizontal Scroll Categories */}
      <div className="lg:hidden w-full sticky top-[120px] max-[499px]:top-[117px] md:top-[114px] z-40 bg-background border-b border-[#FF7808]/20 overflow-hidden">
        <div
          ref={mobileNavRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap px-6"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                data-category={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`font-['Raleway'] font-black text-[16px] leading-[59px] uppercase transition-all duration-300 ${isActive
                    ? "text-[#FF7808]"
                    : "text-zinc-500 hover:text-[#FF7808]/80 dark:text-zinc-400 dark:hover:text-[#FF7808]/80"
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
