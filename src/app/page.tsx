'use client';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
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

// Dynamically import WhiteBot with SSR disabled
const WhiteBot = dynamic(() => import("@/components/WhiteBot"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black" />, // Optional placeholder while downloading
});

export default function Home() {
  const [shouldLoadBot, setShouldLoadBot] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setShouldLoadBot(true);
      } else {
        setShouldLoadBot(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* {shouldLoadBot && <WhiteBot />}   */}
      <Footer />
    </main>
    </Suspense>
   
  );
}
