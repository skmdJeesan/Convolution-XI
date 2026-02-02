'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import droneImage from "../assets/images/Faq_Drone.png"; 
import { FaPlus, FaMinus } from 'react-icons/fa6';

const Data = [
  {
    question: "What is Convolution?",
    answer: "Convolution is the annual tech fest organised by JUEE, where technology, creativity, and innovation come together. It features exciting events, workshops, competitions, and opportunities to showcase talent.",
  },
  {
    question: "When and where is Convolution happening?",
    answer: "Convolution will take place from 20th to 22nd February, 2025 at the Department of Electrical Engineering, Jadavpur University. Further updates about the time, date and venue of specific events will be available on our website soon.",
  },
  {
    question: "Who can participate in Convolution?",
    answer: "Any student enrolled in any undergraduate programme interested in exploring, engaging in enthralling activities and undertaking mind boggling challenges are welcome to participate in Convolution.",
  },
  {
    question: "How do I register on the website?",
    answer: "To register for any event, click on the “Register” button and create an account. You will receive a verification email. After verifying your email, log in using your credentials. Voilà! You are all set.",
  },
  {
    question: "Is there any registration fee?",
    answer: "No, the registrations for the events are completely free of cost.",
  },
];

//PARTICLES COMPONENT
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
  }, []);
  if(!mounted) return null;
  const particles = Array.from({ length: 60 });
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
              <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-cyan-400/60 rounded-full animate-particle"
                  style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${10 + Math.random() * 20}s`,
                      opacity: Math.random() * 0.5 + 0.2,
                  }}
              />
          ))}
      </div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="relative w-full h-auto bg-black overflow-hidden py-5">
      
      {/* --- BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
          <div className="absolute inset-0 bg-black/90 z-0"></div>

          {/* Nebulas */}
          <div className="hidden sm:block absolute top-[10%] left-[-10%] w-[50vw] h-[70vw] rounded-full bg-violet-950/30 blur-[120px] z-0"></div>
          <div className="hidden sm:block absolute bottom-[5%] right-[-10%] w-[60vw] h-[50vw] rounded-full bg-cyan-950/30 blur-[120px] z-0"></div>
          {/* for mobile vissibility */}
          <div className="block sm:hidden absolute top-[10%] left-[2%] w-[50vw] h-[50vw] rounded-full bg-violet-900/40 blur-[100px] z-0"></div>
          <div className="block sm:hidden absolute bottom-[5%] right-[3%] w-[60vw] h-[50vw] rounded-full bg-cyan-900/30 blur-[100px] z-0"></div>

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
          
          <Particles />
      </div>
       <div className="absolute top-0 left-0 w-full h-15 bg-linear-to-b from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-15 bg-linear-to-t from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* main content*/}
      <div className="maxWidthForSections relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
        
        {/*Header*/}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h1 className="text-center text-xl sm:text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">
            FREQUENTLY ASKED QUESTIONS
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-500/80 to-transparent "></span>
          </h1>
          
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Drone */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center lg:sticky lg:top-32 order-1">
                <div className="relative w-full flex flex-col items-center animate-float_drone">
                    <div className="relative w-90 h-90 md:w-150 md:h-150 flex items-center justify-center z-10 -mb-10 -mt-15">
                        <Image 
                            src={droneImage} 
                            alt="Drone" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ List */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 w-full">
                {Data.map((data, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            className={`group relative w-full cursor-pointer transition-all duration-300 ${isOpen ? 'z-10' : 'z-0'}`}
                        >
                            {/* 1. OUTER GLOW */}
                            <div className={`absolute -inset-px bg-kinear-to-b from-cyan-800 to-transparent rounded-sm opacity-0 transition-all duration-500 ${isOpen ? 'opacity-100 blur-[1px]' : 'group-hover:opacity-30'}`}></div>

                           {/* Cards */}
                            <div 
                                className={`
                                    relative w-full overflow-hidden transition-all duration-300 border
                                    [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]
                                    ${isOpen 
                                        ? 'border-cyan-500/40 bg-[#080a0c]' 
                                        : 'border-white/5 bg-white/5 hover:border-cyan-300/10 hover:bg-white/10'}
                                `}
                            >
                                {isOpen && (
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                                         style={{ backgroundImage: 'repeating-linear-gradient(45deg, #22d3ee 0, #22d3ee 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }}>
                                    </div>
                                )}

                                {/*questions*/}
                                <div className="flex items-center justify-between w-full p-3 sm:p-4 gap-4 relative z-10">
                                    
                                    {/* Number */}
                                    <div className={`
                                        flex items-center justify-center w-8 h-8 rounded-[1px] border font-mono text-xs font-bold transition-all duration-300
                                        ${isOpen ? 'bg-cyan-950/30 border-cyan-500 text-cyan-400' : 'bg-transparent border-transparent text-gray-400 group-hover:text-gray-300'}
                                    `}>
                                        0{index + 1}
                                    </div>

                                    {/* Question Text */}
                                    <h3 className={`
                                        flex-1 text-sm sm:text-[15px] font-bold capitalize tracking-wide transition-colors duration-300
                                        ${isOpen ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-200'}
                                    `}>
                                        {data.question}
                                    </h3>

                                    {/* Icon */}
                                    <div className={`text-xs transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-gray-500'}`}>
                                        {isOpen ? <FaMinus /> : <FaPlus />}
                                    </div>
                                </div>

                                {/*answer*/}
                                <div 
                                    className={`
                                        grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                                        ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                                    `}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-4 pl-14 sm:pl-16 relative z-10">
                                            
                                            <div className="absolute left-8 top-0 bottom-4 w-px bg-white/5">
                                                <div className={`absolute top-0 w-full h-1/2 bg-cyan-500/30 transition-all duration-700 ${isOpen ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>
                                            </div>
                                            {/* Ans */}
                                            <p className={`
                                                text-gray-400 text-xs sm:text-sm font-medium leading-relaxed
                                                transition-all duration-500 delay-100
                                                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                                            `}>
                                                {data.answer}
                                            </p>

                                            {isOpen && (
                                                <div className="mt-3 inline-flex items-center gap-2 animate-fadeIn">
                                                    <span className="h-1 w-1 bg-cyan-500 rounded-full animate-pulse"></span>
                                                    <span className="text-[10px] font-mono text-cyan-700">READ_ONLY_ACCESS</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
}