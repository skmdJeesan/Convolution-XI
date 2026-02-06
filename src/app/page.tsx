'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import Sponsors from '@/components/Sponsors';
import Timeline from '@/components/TimeLine';
import Team from '@/components/Team';
import FaqSection from '@/components/FaqSection';

// Dynamically import WhiteBot with SSR disabled
const WhiteBot = dynamic(() => import("@/components/WhiteBot"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black" />, // Optional placeholder while downloading
});

export default function Home() {
  const [shouldLoadBot, setShouldLoadBot] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
    <main className="bg-black w-full min-h-screen">
      <HeroSection />
      <HomeAbout />
      <Timeline/>
      <Team />
      <Gallery/>
      <Sponsors/>
      <FaqSection />
      {shouldLoadBot && <WhiteBot />}
      <Footer />
    </main>
  );
}
