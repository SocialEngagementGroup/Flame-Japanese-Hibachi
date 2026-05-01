import Hero from "@/components/sections/Hero";
import HeroCTA from "@/components/sections/HeroCTA";
import MenuGrid from "@/components/sections/MenuGrid";
import FlameDifference from "@/components/sections/FlameDifference";
import SignatureItems from "@/components/sections/SignatureItems";
import FranchiseSection from "@/components/sections/FranchiseSection";
import CateringSection from "@/components/sections/CateringSection";
import LocationsSection from "@/components/sections/LocationsSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HeroCTA />
      <MenuGrid />
      <FlameDifference />
      <SignatureItems />
      <CateringSection />
      <LocationsSection />
      <FranchiseSection />
    </div>
  );
}
