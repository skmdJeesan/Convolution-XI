'use client'; 

import { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import EventsList from "@/components/EventsList";
import Sponsors from '@/components/Sponsors';
import Team from '@/components/Team';
import FaqSection from '@/components/FaqSection';
import Navbar from '@/components/Navbar';
import Loading from "@/app/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenLoader')) {
      setIsLoading(false);
      return; 
    }

    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500));
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve("loaded");
      } else {
        window.addEventListener('load', () => resolve("loaded"));
      }
    });

    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
      sessionStorage.setItem('hasSeenLoader', 'true');
      setIsLoading(false);
    });

    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  // This ensures that when the "curtain" lifts, we snap to the correct section if there is a hash in the URL
  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // We use 'auto' instead of 'smooth' so it jumps instantly without a weird sliding animation
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 50); 
      }
    }
  }, [isLoading]);

  return (
    <>
    {isLoading && (
        <div className="fixed inset-0 z-9999 bg-black w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
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
    </>
  );
}