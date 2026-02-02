'use client'
// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import HomeAbout from "@/components/HomeAbout";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/TimeLine";
import Team from "@/components/Team";
import Image from "next/image";
import Sponsors from '@/components/Sponsors';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Signal that the component has safely moved to the client side
    setHasMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="bg-black w-full min-h-screen">
      <HeroSection />
      <HomeAbout/>
      {/* <EventShowcase /> */}
      <Timeline/>
      <Team />
      <Sponsors />
      <Gallery/>
      <FaqSection/>
      <Footer />
    </main>
  );
}