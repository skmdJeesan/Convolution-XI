import Gallery from "@/components/Gallery"; 
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HomeAbout from "@/components/HomeAbout";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/TimeLine";
import Image from "next/image";
import Team from "@/components/Team";
//import { userData } from "@/context/UserContext";


export default function Home() {
  return (
    <main className="bg-black w-full h-screen">
      {/* <HeroSection/> */}
      {/* <HomeAbout/>
      <EventShowcase/> */}
      <FaqSection/>
      <Team />
      <Footer />
    </main>
  );
}
