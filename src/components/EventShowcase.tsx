"use client";
import React from "react";
import ConvolutionCard from "./ConvolutionCard"; 

const eventsData = [
  {
    id: "01",
    category: "ELECTRONICS",
    title: "CIRCUISTICS",
    description: "Design, debug, and dominate the hardware realm. The flagship circuitry challenge for electronics enthusiasts.",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2lyY3VpdCUyMGJvYXJkfGVufDB8fDB8fHww", 
  },
  {
    id: "02",
    category: "CODING",
    title: "ALGOMANIAC",
    description: "A competitive programming marathon. Solve complex algorithmic problems against the clock to prove your logic.",
    image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGVyfGVufDB8fDB8fHww", 
  },
  {
    id: "03",
    category: "INNOVATION",
    title: "SPARKHACK",
    description: "Pitch your startup idea to industry experts. The tank is open for sharks to find the next big unicorn.",
    image: "https://media.istockphoto.com/id/2247682583/photo/hooded-hacker-silhouette-stealing-data-with-smartphone.jpg?s=612x612&w=0&k=20&c=g8bWEGCoJsIpOrVsOHOHgp6nJ1aSAdDF5731-WkyaSg=", 
  },
  {
    id: "04",
    category: "RESEARCH",
    title: "EUREKA",
    description: "Scientific paper presentation and discussions. Where theory meets innovation and ideas take flight.",
    image: "https://media.istockphoto.com/id/1149178089/photo/artificial-intelligence-technology.jpg?s=612x612&w=0&k=20&c=Y4BeLaEJIF6w-7K3plHdxrhwAeA6VBrtowHzsuwSDtA=", 
  },
  {
    id: "05",
    category: "ROBOTICS",
    title: "ROBOWARS",
    description: "The ultimate battle of steel and strategy. Build your bot and destroy the opposition in the arena.",
    image: "https://media.istockphoto.com/id/1270295304/photo/cyberpunk-soldier-airlock.jpg?s=612x612&w=0&k=20&c=HYdi9AtpolbggLYDRAcAaEB0jxcmkKbmeoK0BrXf0Is=", 
  },
  {
    id: "06",
    category: "HACKATHON",
    title: "EETHON",
    description: "24 hours of coding, coffee, and creation. Build real-world solutions to pressing problems.",
    image: "https://media.istockphoto.com/id/2077057270/vector/abstract-technology-binary-code-background.jpg?s=612x612&w=0&k=20&c=2-7WgM2Hx07l3UjuH4EgVOAjhO7KGEB2w9dwjuJ_ekk=", 
  },
];

const EventShowcase = () => {
  return (
    <div className="w-full bg-[#030303] flex flex-col items-center overflow-x-hidden relative">
      
      {/* 1. FIXED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
      
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:25%_100%]" />
        
        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none" />
      </div>

      {/* --- CINEMATIC HEADER SECTION --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 pt-24 pb-12 flex flex-col items-center text-center">
        
        {/* Floating Tag */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm animate-fade-in-down">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">
            Mission Timeline
          </span>
        </div>

        {/* GIANT TITLE */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 drop-shadow-2xl mb-6 relative">
          The Events
          {/* Decorative Glitch/Glow behind text */}
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-orange-600/20 to-red-600/20 -z-10"></span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl text-stone-400 text-sm md:text-lg font-medium leading-relaxed tracking-wide">
          Prepare for deployment. Choose your domain and prove your skills in the 
          <span className="text-orange-400 font-bold"> ultimate techno-management battlefield</span>.
        </p>

        {/* Decorative Divider Line */}
        <div className="mt-12 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent relative">
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
        </div>

      </div>

      {/* --- EVENT CARDS SECTION --- */}
      <div className="w-full max-w-[1400px] px-4 md:px-12 relative z-10 flex flex-col gap-8 md:gap-0 pb-32">
        {eventsData.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`w-full min-h-auto md:min-h-[50vh] flex items-center py-6 md:py-20 justify-center 
                ${isEven ? 'md:justify-start' : 'md:justify-end'}
              `}
            >
              <div className="w-full max-w-[500px] md:max-w-[850px] transform transition-all duration-700 hover:z-20 md:hover:scale-[1.02]">
                <ConvolutionCard data={event} />
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default EventShowcase;