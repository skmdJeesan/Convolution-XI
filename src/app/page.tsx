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
import Timeline from '@/components/TimeLine';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenLoader')) {
      setShowCurtain(false); 
      return; 
    }

    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500));
    
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve("loaded");
      } else {
        const safetyNet = setTimeout(() => {
          resolve("timeout");
        }, 8000);
        
        window.addEventListener('load', () => {
          clearTimeout(safetyNet); 
          resolve("loaded");
        });
      }
    });

    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
      sessionStorage.setItem('hasSeenLoader', 'true');
      setIsAnimating(true);
      setTimeout(() => {
        setShowCurtain(false);
      }, 700);
    });

    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

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
        <style>{`
          html, body {
            overflow: hidden !important;
            overscroll-behavior: none !important;
            touch-action: none !important;
          }
        `}</style>
      )}

      {showCurtain && (
        <div 
          className={`fixed inset-0 z-[99999] bg-[#050508] flex items-center justify-center transition-opacity duration-700 ease-in-out touch-none overscroll-contain
            ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <Loading /> 
        </div>
      )}
      
      <main className="bg-black w-full min-h-screen relative">
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