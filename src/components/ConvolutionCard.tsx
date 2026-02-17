"use client";
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const ConvolutionCard = ({ data }: {data: Event}) => {
  return (
    // OUTER WRAPPER
    <div className="relative group w-full h-1/2 perspective-1000">
      
      {/* 1. DYNAMIC BACK GLOW (The Light Source) */}
      <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-cyan-600 to-purple-500 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-30 md:opacity-20 md:group-hover:opacity-50 transition duration-1000 md:group-hover:duration-500 animate-tilt" />
      
      {/* 2. THE MAIN CARD CHASSIS */}
      {/* NUCLEAR FIX: bg-[#080808] is solid opaque. No transparency here. 
          This acts as the light blocker. */}
      <div className="relative w-full h-1/2 bg-[#080808] border border-white/10 md:group-hover:border-purple-500/50 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 shadow-2xl">
        
        {/* --- IMAGE SECTION (Left - 45%) --- */}
        {/* Z-INDEX 20: Sits ON TOP of the text section to hide the seam overlap */}
        <div className="relative w-full h-60 md:h-auto md:w-[45%] overflow-hidden z-20">
          
          {/* Image */}
          <img 
            src={data.image} 
            alt={data.title}
            className="w-full h-full object-cover transform scale-100 md:group-hover:scale-110 transition-transform duration-[1.5s] ease-in-out opacity-90 md:group-hover:opacity-100" 
          />

          {/* Fade linears */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent via-[#080808]/60 to-[#080808] z-20" />
          
          {/* Noise Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10" />

          {/* CATEGORY BADGE */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center gap-2 md:gap-3 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-50 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                  {data.icon}
                </span>
            </div>
          </div>
        </div>

        {/* --- CONTENT SECTION (Right - 55%) --- */}
        {/* OVERLAP FIX: 
            1. md:-ml-2 (Negative Margin Left 2px): Pulls this div LEFT, under the image div.
            2. z-10: Puts it UNDER the image div.
            3. w-[calc(55%+2px)]: Adds width to compensate for the pull.
        */}
        <div className="relative w-full md:w-[calc(55%+8px)] md:-ml-2 flex flex-col justify-center overflow-hidden z-10 bg-[#080808]">
          
          {/* Background Ambient Effects */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-tl from-purple-950/30 via-[#080808] to-transparent pointer-events-none z-0" />

          {/* Content Wrapper */}
          {/* Increased padding-left slightly to account for the overlap */}
          <div className="relative z-10 p-6 md:p-12 md:pl-14 flex flex-col justify-center h-full">
              
              {/* Floating Sparkle */}
              <div className="absolute top-6 right-6 text-orange-500 hidden sm:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
              </div>

              {/* TITLE */}
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-[0.9] drop-shadow-xl mb-3 md:mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-purple-100 to-cyan-300 md:group-hover:from-purple-300 md:group-hover:via-cyan-300 md:group-hover:to-purple-400 transition-all duration-500">
                  {data.title}
                </span>
              </h2>

              {/* Decorative Line */}
              <div className="w-12 h-1 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full mb-4 md:mb-6 md:group-hover:w-24 transition-all duration-500" />

              {/* Description */}
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-medium line-clamp-3 md:line-clamp-4 max-w-lg mb-6 md:mb-8">
                {data.desc}
              </p>

              {/* ACTION BUTTON */}
              <div>
                <button className="group/btn relative w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent overflow-hidden rounded-xl border border-white/20 active:scale-95 md:hover:border-purple-500 transition-all duration-300">
                  <div className="absolute inset-0 w-0 bg-linear-to-r from-purple-600 to-cyan-600 transition-all duration-[400ms] ease-out group-hover/btn:w-full" />
                  
                  <span className="relative z-10 text-white font-bold tracking-[0.25em] uppercase text-xs md:text-xs flex items-center justify-center gap-3">
                    Explore Mission 
                    <ArrowRight className="w-4 h-4 md:group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </div>

          </div>
        </div>
        
      </div>

    </div>
  );
};

export default ConvolutionCard;