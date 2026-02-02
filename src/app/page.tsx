import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
//import { userData } from "@/context/UserContext";


export default function Home() {
  return (
    <main className="bg-black w-full h-screen">
      {/* <HeroSection/> */}
      {/* <HomeAbout/>
      <EventShowcase/> */}
      <FaqSection/>
      <Footer />
    </main>
  );
}
