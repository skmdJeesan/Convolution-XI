"use client";

import { useEffect, useState } from "react";
import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Algo";
import Faq from "./Faq.Algo";
import About from "./About.Algo";
import Rules from "./Rules.Algo";
import Team from "./EventLeads.Algo";
import Mentors from "./Mentors.Algo";
import Prizes from "./Prize.Algo";
import Timeline from "./TimeLine.Algo";
import './global.css';

// --- NEW COMPONENT FOR REAL-TIME RANDOM COMETS ---
const SingleComet = ({ initialDelay }: { initialDelay: number }) => {
  const getNewRandomProps = (isInitial = false) => ({
    id: Math.random(), 
    top: Math.floor(Math.random() * 50),
    left: Math.floor(Math.random() * 91) + 10,
    duration: Math.random() * 10 + 12, 
    delay: isInitial ? initialDelay : Math.random() * 3, 
  });

  const [props, setProps] = useState(() => getNewRandomProps(true));

  return (
    <div
      key={props.id} 
      className="shooting-star"
      onAnimationEnd={() => setProps(getNewRandomProps(false))} 
      style={{
        top: `${props.top}%`,
        left: `${props.left}%`,
        animation: `shootingStar ${props.duration}s linear ${props.delay}s forwards`,
      }}
    ></div>
  );
};

const RandomComets = () => {
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    // 3 comets on mobile, 6 on desktop
    const isMobile = window.innerWidth < 768;
    const cometCount = isMobile ? 3 : 6;

    setDelays(Array.from({ length: cometCount }).map(() => Math.random() * 15));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {delays.map((delay, index) => (
        <SingleComet key={index} initialDelay={delay} />
      ))}
    </div>
  );
};

// --- NEW COMPONENT FOR EASY IMAGE POSITIONING ---
const FloatingAsset = ({
  src,
  w,
  h,
  top,
  left,
  right,
  bottom,
  opacity = 0.8,
  // Default animation now restricted to desktop using md:
  animationClass = "md:animate-[floating_6s_ease-in-out_infinite]" 
}: {
  src: string;
  w: string;
  h: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  animationClass?: string;
}) => {
  return (
    <div
      className={`absolute pointer-events-none z-0 ${animationClass}`}
      style={{
        top, left, right, bottom,
        width: w, height: h,
        opacity: opacity,
      }}
    >
      <img
        src={src}
        alt="floating asset"
        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
      />
    </div>
  );
};

export default function Page() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#3b0764] via-[#7e22ce] to-[#0f172a] overflow-hidden">

      {/* --- LAYER 1: GLOWING NEBULA CLOUDS (Mobile Optimized) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-400/20 rounded-full blur-[40px] md:blur-[120px]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-500/20 rounded-full blur-[40px] md:blur-[150px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vw] bg-purple-600/30 rounded-full blur-[40px] md:blur-[150px]"></div>
      </div>

      {/* --- LAYER 2: TWINKLING STARS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="stars-small absolute inset-0"></div>
        <div className="stars-medium absolute inset-0"></div>
        <div className="stars-large absolute inset-0"></div>
      </div>

      {/* --- LAYER 3: RANDOM SHOOTING COMETS --- */}
      <RandomComets />

      {/* --- LAYER 3.5: SCATTERED SPACE EMOJIS (Mobile Optimized) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-hidden">
        {/* 0% - 20% (Top of the page - About/Rules) */}
        <div className="absolute top-[2%] left-[10%] opacity-40 text-3xl md:animate-[pulse_4s_ease-in-out_infinite]">🌟</div>
        <div className="absolute top-[5%] right-[15%] text-white opacity-30 text-4xl">✨</div>
        <div className="absolute top-[12%] left-[8%] text-cyan-400 opacity-30 text-3xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">✦</div>
        <div className="absolute top-[18%] right-[10%] opacity-30 text-4xl">🛰️</div>
        <div className="absolute top-[12%] right-[70%] opacity-40 text-7xl md:hover:-translate-y-2 transition-transform duration-300">🛸</div>

        {/* 20% - 40% (Upper Middle - Timeline/Mentors) */}
        <div className="absolute top-[25%] left-[15%] opacity-50 text-4xl md:hover:scale-110 transition-transform cursor-default">💫</div>
        <div className="absolute top-[28%] right-[8%] text-blue-300 opacity-20 text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hidden md:block">💠</div>
        <div className="absolute top-[35%] left-[5%] text-white opacity-20 text-2xl">✨</div>
        <div className="absolute top-[38%] right-[12%] text-fuchsia-400 opacity-20 text-4xl drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] hidden md:block">✧</div>

        {/* 40% - 60% (Middle - Prizes/Team) */}
        <div className="absolute top-[45%] left-[18%] opacity-30 text-4xl">☄️</div>
        <div className="absolute top-[54%] right-[75%] opacity-40 text-4xl drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">⚡</div>
        <div className="absolute top-[58%] left-[10%] text-white opacity-40 text-lg">⋆</div>
        <div className="absolute top-[60%] right-[5%] opacity-40 text-9xl md:hover:-translate-y-2 transition-transform duration-300">🛸</div>

        {/* 60% - 80% (Lower Middle - Team/FAQ) */}
        <div className="absolute top-[65%] left-[20%] text-white opacity-30 text-2xl">✨</div>
        <div className="absolute top-[70%] right-[10%] text-cyan-400 opacity-30 text-3xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8) hidden md:block]">✦</div>
        <div className="absolute top-[75%] left-[8%] opacity-30 text-9xl md:hover:rotate-12 transition-transform duration-500">🪐</div>
        <div className="absolute top-[78%] right-[18%] text-blue-300 opacity-20 text-3xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hidden md:block">💠</div>

        {/* 80% - 100% (Bottom - FAQ/Footer) */}
        <div className="absolute top-[85%] left-[12%] text-white opacity-30 text-xl">✶</div>
        <div className="absolute top-[88%] right-[20%] text-fuchsia-400 opacity-20 text-4xl drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] hidden md:block">✧</div>
        <div className="absolute top-[95%] left-[15%] opacity-30 text-2xl md:animate-[pulse_4s_ease-in-out_infinite]">🌟</div>
        <div className="absolute top-[96%] right-[8%] text-white opacity-20 text-3xl">✨</div>
      </div>

      {/* --- LAYER 4: FLOATING SPACE ASSETS --- */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-hidden">

        {/* Asset 1: Top Left (e.g., Stone or Asteroid) */}
        <FloatingAsset
          src="/Algomaniac/stone1.png"
          w="400px"
          h="400px"
          top="4%"
          left="4%"
          opacity={0.9}
          animationClass="animate-[floating_3s_ease-in-out_infinite_reverse] stone1-image"
        />

        {/* Asset 2: Middle Right (e.g., A Robot or Planet) */}
        <FloatingAsset
          src="/Algomaniac/astronaut.png"
          w="350px"
          h="350px"
          top="20%"
          right="5%"
          opacity={0.7}
          animationClass="animate-[floating_3s_ease-in-out_infinite_reverse] astronaut-image"
        />

        {/* Asset 3: Lower Left (e.g., Spaceship or Tech Base) */}
        <FloatingAsset
          src="/Algomaniac/ufo.png"
          w="350px"
          h="350px"
          top="35%"
          left="10%"
          opacity={0.7}
          animationClass="animate-[tilted-float_7s_ease-in-out_infinite] ufo-image"
        />
      </div>

      {/* --- PAGE CONTENT --- */}
      <div className="relative z-10 w-full flex flex-col">
        <EventNav navTheme="bg-gradient-to-b from-[#7e22ce] to-[#3b0764]"/>
        <About />
        <Rules />
        <Timeline />
        <Mentors />
        <Prizes />
        <Team />
        <Faq />
        <Footer />
      </div>
    </div>
  )
}