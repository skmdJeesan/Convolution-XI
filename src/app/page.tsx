'use client'
import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import Sponsors from "@/components/Sponsors";
import { useEffect, useRef } from "react";
//import { userData } from "@/context/UserContext";
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'


export default function Home() {
  const lenisRef = useRef<any>(null)
  useEffect(() => {
    function animate(time: number): void {
      lenisRef.current?.lenis?.raf(time)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [])
  return (
    <ReactLenis
      root
      options={{ smoothWheel: true, lerp: 0.1, duration: 2 }}
      ref={lenisRef}
    > 
      <main className="bg-black w-full h-screen">
        <HeroSection/>
        {/* <HomeAbout/>
        <EventShowcase/> */}
        <Sponsors />
        <FaqSection/>
        <Footer />
      </main>
    </ReactLenis>
    
  );
}
