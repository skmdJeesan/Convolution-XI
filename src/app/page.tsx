import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/TimeLine";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black w-full h-screen">
      {/* <HeroSection/> */}
      <Timeline/>
      <FaqSection/>
      <Footer />
    </main>
  );
}
