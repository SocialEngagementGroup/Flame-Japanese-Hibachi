import Hero from "@/components/sections/Hero";
import HeroCTA from "@/components/sections/HeroCTA";
import MenuGrid from "@/components/sections/MenuGrid";
import FlameDifference from "@/components/sections/FlameDifference";
import SignatureItems from "@/components/sections/SignatureItems";
import CateringSection from "@/components/sections/CateringSection";
import Promotions from "@/components/sections/Promotions";
import LocationsSection from "@/components/sections/LocationsSection";
import FranchiseSection from "@/components/sections/FranchiseSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <HeroCTA />
      <MenuGrid />
      <FlameDifference />
      <SignatureItems />
      <CateringSection />
      <Promotions />
      <LocationsSection />
      <FranchiseSection />
    </main>
  );
}
