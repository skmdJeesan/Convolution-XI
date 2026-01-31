'use client';

import { useState, useEffect } from 'react';
import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
// 1. Add this import back
import WhiteBot from "@/components/WhiteBot";
import HomeAbout from "@/components/HomeAbout";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
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
      
      {/* 2. Add the component back here */}
      {hasMounted && !isMobile && <WhiteBot />}
      
      <FaqSection />
      <Footer />
    </main>
  );
}