

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; //
import EventShowcase from "@/components/EventShowcase";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import Sponsors from '@/components/Sponsors';
import Timeline from '@/components/TimeLine';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import FaqSection from '@/components/FaqSection';

// 1. Dynamic Import for WhiteBot
// This ensures the code for WhiteBot is NOT bundled with the main page.
// It will only be fetched when we render <WhiteBot /> below.
// ssr: false prevents the server from trying to render the 3D scene (which causes freezing).
const WhiteBot = dynamic(() => import("@/components/WhiteBot"), {
  ssr: false, 
  loading: () => <div className="h-screen w-full bg-black" />, // Optional placeholder while downloading
});

export default function Home() {
  // 2. State to track if we should load the bot
  // Default to false so mobile users never start the download
  const [shouldLoadBot, setShouldLoadBot] = useState(false);

  useEffect(() => {
    // 3. Check screen size on mount
    const handleResize = () => {
      // Only set to true if width is >= 768px (Tablet or Desktop)
      if (window.innerWidth >= 768) {
        setShouldLoadBot(true);
      } else {
        setShouldLoadBot(false);
      }
    };

    // Run once on mount
    handleResize();

    // Optional: Update on resize if you want it to appear/disappear dynamically
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="bg-black w-full min-h-screen">
      <HeroSection/>
       <HomeAbout/>
      {/* <EventShowcase/> */}
      <Timeline/>
      <Team/>
      <Sponsors/>
      <Gallery/>
      <FaqSection/>
      {shouldLoadBot && <WhiteBot />}
      <Footer />
      
      {/* 4. Conditional Rendering 
        The browser will ONLY download the 'WhiteBot' javascript chunk 
        and the 3D model assets if 'shouldLoadBot' is true.
      */}
      
    </main>
  );
}