"use client";
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import TransitionLink from './TransitionLink';

export interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
  color?: string; // Optional fallback
}

interface CardProps {
  data?: Event;
  index?: number;
}

const ConvolutionCard = (props: CardProps) => {
  const data = props.data;
  const index = props.index ?? 0;

  if (!data || !data.image) {
    return (
      <div className="w-full h-full min-h-[400px] bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] flex items-center justify-center">
        <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Initializing...</span>
      </div>
    );
  }

  // Fallback to purple if no color is provided
  const themeColor = data.color || '#8b5cf6'; 

  return (
    <div className="relative w-full h-full transform-gpu group">
      
      {/* 1. DYNAMIC OUTER GLOW */}
      <div 
        className="absolute -inset-[2px] rounded-[2rem] blur-md opacity-60 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" 
        style={{
          // 80 = 50% opacity, 33 = 20% opacity
          background: `linear-gradient(to right, ${themeColor}CC, ${themeColor}33, ${themeColor}CC)`
        }}
      />
      
      {/* Main Card Chassis */}
      <div className="relative w-full h-full bg-black border border-white/10 rounded-[1.5rem] overflow-hidden flex flex-col shadow-xl">
        
        {/* Top: Image Section */}
        <div className="relative w-full h-[45%] min-h-[220px] overflow-hidden z-20 shrink-0 bg-black">
          <Image 
            src={data.image} 
            alt={data.title || "Event Image"}
            fill
            sizes="(max-width: 768px) 70vw, 33vw"
            priority={index < 2} 
            className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" 
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none" />

          {/* Category Badge - Dynamically Colored */}
          <div className="absolute top-4 left-4 z-30">
            <div 
              className="px-3 py-1.5 bg-black/80 backdrop-blur-md border rounded-full flex items-center gap-2 shadow-lg"
              style={{ borderColor: `${themeColor}99` }} // 50 = ~30% opacity
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: themeColor }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColor }}></span>
                </span>
                <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-white drop-shadow-md">
                  {data.icon}
                </span>
            </div>
          </div>
        </div>

        {/* Bottom: Content Section */}
        <div className="relative w-full flex-1 flex flex-col justify-start z-10 bg-black p-6 pt-2">
          
          {/* 2. DYNAMIC AMBIENT LIGHTING INSIDE CARD */}
          <div 
            className="absolute -right-20 -bottom-20 w-64 h-64 pointer-events-none blur-2xl" 
            style={{ background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black to-transparent pointer-events-none z-0" />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full">
              
              <h2 className="text-3xl font-black uppercase text-white tracking-tighter leading-[0.9] drop-shadow-xl mb-3">
                {data.title}
              </h2>

              {/* 3. DYNAMIC TITLE UNDERLINE */}
              <div 
                className="w-12 h-1 rounded-full mb-4" 
                style={{ background: `linear-gradient(to right, ${themeColor}, transparent)` }}
              />

              <p className="text-stone-400 text-sm leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
                {data.desc}
              </p>

              {/* 4. DYNAMIC ACTION BUTTON */}
              <TransitionLink 
                href={`/events/${data.id}`} 
                className="group/btn relative w-full px-6 py-4 overflow-hidden rounded-xl border border-white/20 active:scale-95 transition-all duration-200 flex items-center justify-center text-white font-bold tracking-[0.25em] uppercase text-xs"
                style={{ '--hover-border': themeColor } as React.CSSProperties}
              >
                {/* Button Background Tint */}
                <div 
                  className="absolute inset-0 transition-colors duration-200" 
                  style={{ background: `linear-gradient(to right, ${themeColor}B3, transparent)` }}
                />
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Mission 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </TransitionLink>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ConvolutionCard;