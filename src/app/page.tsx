import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black w-full h-[100vh]">
      <HeroSection/>
      <HomeAbout/>
      <EventShowcase/>
      <FaqSection/>
    </main>
   
  );
}
