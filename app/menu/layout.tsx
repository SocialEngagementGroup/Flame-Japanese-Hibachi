import type { ReactNode } from "react";
import InteractiveMenu from "@/components/blocks/menu/menupage/InteractiveMenu";
import ContactSection from "@/components/blocks/contact/ContactSection";

// Shared by /menu and /menu/[location]. Layouts persist across sibling route
// navigations in the App Router, so switching stores swaps only the page
// (Hero + banner) below — this heavy client tree (menu cards, scroll-sync)
// and its images never unmount, decode, or refetch on a location switch.
export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      {children}
      <InteractiveMenu />
      <ContactSection />
    </div>
  );
}
