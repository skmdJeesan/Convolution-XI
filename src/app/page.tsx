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
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  // 1. SCROLL LOCK EFFECT (The Fix)
  useEffect(() => {
    if (showCurtain) {
      // Lock the scrollbar while loader is active
      document.body.classList.add('overflow-hidden');
    } else {
      // Unlock when the curtain lifts
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function just in case the component unmounts early
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showCurtain]);

  // 2. TIMING & FADE EFFECT
  useEffect(() => {
    // check if they already saw the loader this session
    if (sessionStorage.getItem('hasSeenLoader')) {
      setShowCurtain(false); 
      return; 
    }

    // wait for the animation and page load
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500));
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve("loaded");
      } else {
        window.addEventListener('load', () => resolve("loaded"));
      }
    });

    // trigger the smooth fade-out
    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
      sessionStorage.setItem('hasSeenLoader', 'true');
      
      setIsAnimating(true);
      
      // wait for the fade to finish, then remove the curtain from the DOM
      setTimeout(() => {
        setShowCurtain(false);
      }, 700);
    });

    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  // 3. HASH SCROLL EFFECT
  useEffect(() => {
    if (!showCurtain && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 50); 
      }
    }
  }, [showCurtain]);

  return (
    <>
      {showCurtain && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-opacity duration-700 ease-in-out
            ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
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