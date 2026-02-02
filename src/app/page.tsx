// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Gallery from "@/components/Gallery"; 
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HomeAbout from "@/components/HomeAbout";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/TimeLine";
import Image from "next/image";

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
      {/* <EventShowcase /> */}
      <FaqSection />
      <Footer />
    </main>
  );
}