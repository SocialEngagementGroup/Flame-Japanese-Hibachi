import Hero from "@/components/sections/Hero";
import HeroCTA from "@/components/sections/HeroCTA";
import MenuGrid from "@/components/sections/MenuGrid";
import FranchiseSection from "@/components/sections/FranchiseSection";
import FlameDifference from "@/components/sections/FlameDifference";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <HeroCTA />
      <MenuGrid />
      <FlameDifference />
      <FranchiseSection />
    </main>
  );
}
