'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import droneImage from "../assets/images/Faq_Drone.png"; 
import { FaChevronDown } from 'react-icons/fa';

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
  const particles = Array.from({ length: 70 });
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-particle"
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
    <div id="faq" className="relative w-full h-auto bg-[#050505] overflow-hidden py-16 md:py-24">
      
      {/*Background*/}
     <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Base */}
          <div className="absolute inset-0 bg-[#050505]"></div>
          <div className="hidden sm:block absolute top-[10%] left-[3%] w-[40vw] h-[40vw] rounded-full bg-violet-950/20 blur-[100px] z-0"></div>

          <div className="hidden sm:block absolute bottom-[-3%] right-[-25%] w-[70vw] h-[60vw] rounded-full bg-cyan-950/50 blur-[100px] z-0"></div>
          {/* Mobile Gradient */}
          <div className="block sm:hidden absolute top-[-5%] left-[2%] w-[70vw] h-[70vw] rounded-full bg-violet-950/60 blur-[80px] z-0"></div>

          <div className="block sm:hidden absolute bottom-[-5%] right-[2%] w-[70vw] h-[77vw] rounded-full bg-cyan-900/50 blur-[80px] z-0"></div>

          {/*Grid */}
          <div 
            className="absolute inset-0 opacity-[0.07]" 
            style={{ 
                backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`, 
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
            }}
          ></div>
          
          <Particles />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]"></div>
      </div>
      {/* main content*/}
      <div className="maxWidthForSections relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
        
        {/*Header*/}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Drone */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center lg:sticky lg:top-32 order-1">
                <div className="relative w-full flex flex-col items-center animate-float_drone">
                    {/* Glow behind Drone */}
                    {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-800/20 rounded-full blur-[80px]"></div> */}
                    
                    <div className="relative w-[360px] h-[360px] md:w-[600px] md:h-[600px] flex items-center justify-center z-10 -mb-10 -mt-15">
                        <Image 
                            src={droneImage} 
                            alt="Drone" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ*/}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-5 w-full">
                {Data.map((data, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            className={`
                                group relative overflow-hidden rounded-xl cursor-pointer
                                border transition-all duration-500 ease-out w-full
                                backdrop-blur-md
                                ${isOpen 
                                    ? 'bg-gradient-to-r from-cyan-950/30 to-transparent border-cyan-500/50 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]' 
                                    : 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04]'}
                            `}
                        >
                            
                            <div className={`
                                absolute left-0 top-0 bottom-0 w-[4px] 
                                transition-all duration-300 ease-out
                                ${isOpen ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}
                            `}></div>

                            {/* Header Section */}
                            <button className="flex items-center justify-between w-full p-5 md:p-6 text-left outline-none select-none gap-4">
                                <div className="flex items-center gap-5 md:gap-6 flex-1 min-w-0">
                                    <span className={`
                                        text-lg md:text-xl font-mono font-bold tracking-wider transition-colors duration-300
                                        ${isOpen ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-white/20 group-hover:text-cyan-500/50'}
                                    `}>
                                        0{index + 1}
                                    </span>
                                    
                                    <h3 className={`
                                        text-base md:text-lg font-semibold leading-snug transition-colors duration-300 w-full
                                        ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                                    `}>
                                        {data.question}
                                    </h3>
                                </div>

                                <div className={`
                                    relative flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full 
                                    transition-all duration-300 
                                    ${isOpen 
                                        ? 'rotate-180 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                                        : 'rotate-0  text-gray-500 group-hover:text-cyan-400'}
                                `}>
                                    <FaChevronDown className="w-3 h-3" />
                                </div>
                            </button>

                            {/* Answer Section */}
                            <div 
                                className={`
                                    grid transition-[grid-template-rows,opacity] duration-300 ease-out
                                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                                `}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-6 md:px-6 md:pb-8 pl-[4rem] md:pl-[5rem] pt-0">
                                        <div className="h-[1px] w-12 bg-cyan-500/30 mb-4"></div>
                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                                            {data.answer}
                                        </p>
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