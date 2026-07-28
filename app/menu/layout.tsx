import type { ReactNode } from "react";
import MenuHero from "@/components/blocks/menu/MenuHero";
import InteractiveMenu from "@/components/blocks/menu/menupage/InteractiveMenu";
import ContactSection from "@/components/blocks/contact/ContactSection";

// Shared by /menu and /menu/[location]. Layouts persist across sibling route
// navigations in the App Router, so switching stores re-renders only the page
// (JSON-LD + banner) below - everything mounted here keeps its DOM, so the
// hero video, the menu cards and their images never unmount, decode, or
// refetch on a location switch. The hero reads the city from the route param
// itself, which is why it can live up here instead of in the page.
export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <MenuHero />
      {children}
      <InteractiveMenu />
      <ContactSection />
    </div>
  );
}
