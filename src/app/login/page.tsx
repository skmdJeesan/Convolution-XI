"use client"
import React, { useEffect, useState } from 'react'
import Signin from '@/components/Signin';
import '../register/register.css'
import DecorativeIcons from '@/components/DecorativeIcons';

function Page() {
  const Particles = () => {
      const [mounted, setMounted] = useState(false);
      useEffect(() => {
          setMounted(true);
      }, []);
      if (!mounted) return null;
  
      const particles = Array.from({ length: 30 }); 
      
      return (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {particles.map((_, i) => (
                  <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-500 rounded-full animate-particle"
                      style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${10 + Math.random() * 10}s`,
                          opacity: Math.random() * 0.5 + 0.2,
                      }}
                  />
              ))}
          </div>
      );
  };
  
  const BackgroundGrid = () => (
      <>
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)] animate-pan-grid"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] animate-pan-grid-reverse"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-cyan-500/10 blur-[80px] md:blur-[150px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-fuchsia-600/10 blur-[60px] md:blur-[100px] rounded-full z-0 pointer-events-none mix-blend-screen animate-pulse-slower" />
          <div className="absolute inset-0 z-[60] pointer-events-none mix-blend-color-dodge opacity-20 bg-[url('/assets/images/noise.png')] animate-noise"></div>
      </>
  );

  return (
    <div className='bg-[#030305] font-sans selection:bg-cyan-500/30 h-screen w-full' id="container">
      {/* Grid Background */}
      <div className="tech-grid pointer-events-none" />
      {/* Decorative Icons */}
      <DecorativeIcons />
      <BackgroundGrid />
      <Particles />
      <Signin />
    </div>
  )
}

export default Page