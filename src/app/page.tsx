// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";

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
      <HomeAbout />
      <EventShowcase />
      <FaqSection />
      <Footer />
    </main>
  );
}