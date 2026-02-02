import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import PortalTransition from "@/components/PortalTransition";
import EventCarousel from "@/components/EventCarousel";
//import { userData } from "@/context/UserContext";


export default function Home() {
  return (
    <main className="bg-black w-full h-screen">
      {/* <HeroSection/> */}
      <HomeAbout/>
      {/* <EventShowcase/> */}
      {/* <PortalTransition/> */}
      <EventCarousel/>
      <FaqSection/>
      <Footer />
    </main>
  );
}
