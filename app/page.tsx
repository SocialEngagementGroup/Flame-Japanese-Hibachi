import Hero from "@/components/sections/Hero";
import HeroCTA from "@/components/sections/HeroCTA";
import MenuGrid from "@/components/sections/MenuGrid";
import FranchiseSection from "@/components/sections/FranchiseSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <HeroCTA />
      <MenuGrid />
      <FranchiseSection />
    </main>
  );
}
