import Hero from "@/components/sections/Hero";
import HeroCTA from "@/components/sections/HeroCTA";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <HeroCTA />
    </main>
  );
}
