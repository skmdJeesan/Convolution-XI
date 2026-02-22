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
    // promise for minimum time for loading animation
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500));

    //wait for the actual browser to finish downloading all assets
    const pageLoadPromise = new Promise((resolve) => {
      // if the page somehow already finished before this ran, resolve instantly
      if (document.readyState === 'complete') {
        resolve("loaded");
      } else {
        // Otherwise, wait for the window 'load' event
        window.addEventListener('load', () => resolve("loaded"));
      }
    });

    // PROMISE.ALL: Wait for BOTH conditions to be true!
    // - Fast internet: Waits 2.5s for the animation, then loads.
    // - Slow internet: Timer finishes in 2.5s, but waits 8s for images, THEN loads.
    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
      setIsLoading(false);
    });

    // Cleanup listener to prevent memory leaks
    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="bg-black w-full min-h-screen">
      <Navbar/>
      <HeroSection />
      <HomeAbout />
      {/* <EventsList /> */}
      {/* <Timeline/> */}
      <Team />
      <Gallery/>
      <Sponsors/>
      <FaqSection />
      {/* <Playground /> */}
      <Footer />
    </main>
  );
}