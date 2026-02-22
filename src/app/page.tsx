import { Suspense } from 'react';
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import EventsList from "@/components/EventsList";
//import { userData } from "@/context/UserContext";
import Sponsors from '@/components/Sponsors';
import Timeline from '@/components/TimeLine';
import Team from '@/components/Team';
import FaqSection from '@/components/FaqSection';
import Navbar from '@/components/Navbar';
import Loading from "@/app/loading";
import Playground from '@/components/Playground';
  
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
       <main className="bg-black w-full min-h-screen">
        <Navbar/>
        <HeroSection />
        <HomeAbout />
        <EventsList />
        {/* <Timeline/> */}
        <Team />
        <Gallery/>
        <Sponsors/>
        <FaqSection />
        {/* <Playground /> */}
        <Footer />
      </main>
    </Suspense>
  );
}
