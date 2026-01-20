"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgArmor from "../assets/images/HomeAboutRobo.png"; 

// Register ScrollTrigger to trigger animations when the section comes into view
gsap.registerPlugin(ScrollTrigger);

const HomeAbout = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Animation: Subtle scale down (breathing effect)
      gsap.to(bgRef.current, {
        scale: 1.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Text Lines Animation: Staggered reveal
      // Select all elements with class 'anim-text' inside the container
      const lines = gsap.utils.toArray(".anim-text");

      gsap.fromTo(
        lines,
        {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15, // Delay between each line
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Animation starts when top of section hits 60% of viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-screen bg-[#030305] overflow-hidden flex items-center justify-center z-20"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div ref={bgRef} className="relative w-full h-full">
            <Image
                src={bgArmor}
                alt="Background Armor"
                fill
                className="object-cover md:object-contain object-center opacity-20 mix-blend-screen"
                priority
            />
        </div>
      
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-[#030305]"></div>
      </div>

      <div ref={textRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        
        <div className="anim-text inline-flex items-center gap-2 mb-4 border border-cyan-500/30 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
            <span className="text-cyan-400 text-[10px] md:text-xs tracking-[0.3em] font-mono font-bold">
                SYSTEM_IDENTITY // V.X
            </span>
        </div>

        {/* 2. Main Title */}
        <h2 className="anim-text text-6xl md:text-8xl lg:text-9xl font-black font-mono tracking-tighter leading-none mb-6 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-1 w-full text-transparent stroke-text opacity-20 blur-[2px]">
                ABOUT
            </span>
            <span className="text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                ABOUT
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                CONVOLUTION
            </span>
        </h2>

        {/* 3. Description Paragraphs */}
        <div className="anim-text max-w-3xl mx-auto space-y-6 text-center">
            <p className="text-lg md:text-2xl text-cyan-100/90 font-light leading-relaxed">
                The <span className="text-cyan-400 font-bold">tenth iteration</span> of the premier techno-management framework, engineered by the 
                <span className="block md:inline mt-1 md:mt-0 text-white border-b border-cyan-500/30 mx-2">
                    Department of Electrical Engineering, Jadavpur University
                </span>.
            </p>
            
            <p className="text-sm md:text-base text-gray-400 font-mono tracking-wide">
                {`// EXECUTION_LOG: Central nexus for innovation, competitive protocols, and high-bandwidth knowledge transfer.`}
            </p>
        </div>

        <div className="anim-text w-full max-w-2xl mt-12 pt-8 border-t border-white/10 flex justify-around items-center">
            <div className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">
                    10.0
                </div>
                <div className="text-[10px] text-cyan-600 tracking-[0.3em] font-mono mt-2 uppercase">Version Build</div>
            </div>
            
            <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">
                    2024
                </div>
                <div className="text-[10px] text-cyan-600 tracking-[0.3em] font-mono mt-2 uppercase">Cycle Active</div>
            </div>
        </div>

      </div>

      <style jsx>{`
        .stroke-text {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
            color: transparent;
        }
      `}</style>
    </section>
  );
};

export default HomeAbout;