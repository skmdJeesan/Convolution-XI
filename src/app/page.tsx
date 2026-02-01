import Gallery from "@/components/Gallery"; 
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HomeAbout from "@/components/HomeAbout";
import HeroSection from "@/components/HeroSection";
import Teams from "@/components/Teams";

export default function Home() {
  return (
    <main className="bg-black w-full min-h-screen">
      
      {/* <HeroSection /> */}
      <HomeAbout />

      <Gallery />

      {/* <Teams /> */}

      <div className="relative z-10 bg-black">
        <FaqSection />
        <Footer />
      </div>
    </main>
  );
}
