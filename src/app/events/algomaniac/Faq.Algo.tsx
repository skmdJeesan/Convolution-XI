'use client';

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6'; 

const Data = [
  {
        question: "How will the finalists be chosen?",
        answer: 
          " The participants of the Prelims will be ordered by their total score, with ties broken by time taken to solve. Top 20 participants in the leaderboard will be selected for the Finals.",
    },
    {
        question: "When and where will the finals be held?",
        answer: 
          "The final round is set for February 22, 2024 (Saturday) at the Central Computer Laboratory, Department of Electrical Engineering, Jadavpur University. Please plan your travel accordingly, and on-site parking will be available for your convenience. Looking forward to a successful event!",
    },
    {
        question: "Will I have to carry a laptop for the final round?",
        answer: 
          "Finalists are requested to carry their own laptops. Additionally, participants are also encouraged to ensure that their laptops are equipped with the necessary software and configurations for the competition. Please be advised to bring any specific peripherals or adapters that may be required for your devices.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative w-full py-20 overflow-hidden transform-gpu">
            
            <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0D30BB] to-[#2C1071]"></div>

            <div 
                className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
                    backgroundSize: '40px 40px' 
                }}
            ></div>

            <div className="flex flex-col items-center justify-center gap-8 w-full relative z-10">
                <div className="maxWidthForSections w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
                    
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4 flex flex-col items-center">
                        <div className="relative inline-block">
                            <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-4xl mb-10  drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-500 to-white">
            Frequently Asked questions
          </h1>
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col items-center gap-4">
                        {Data.map((data, index) => {
                            const isOpen = openIndex === index;
    
                            return (
                                <div
                                    key={index}
                                    onClick={() => toggleFAQ(index)}
                                    className="group relative w-full cursor-pointer rounded-xl overflow-hidden transform-gpu"
                                >
                                    <div className={`
                                        relative w-full overflow-hidden 
                                        border-l-[3px] 
                                        transition-all duration-300 ease-in-out
                                        ${isOpen 
                                            ? 'bg-black/40 border-cyan-400 shadow-lg' 
                                            : 'bg-white/[0.05] border-white/10 hover:border-white/30 hover:bg-white/[0.08]'}
                                    `}>
                                        
                                        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${isOpen ? 'border-cyan-400' : 'border-white/20'}`}></div>
                                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${isOpen ? 'border-cyan-400' : 'border-white/20'}`}></div>
                    
                                        {/* Question Header */}
                                        <div className="flex items-center justify-between p-5 relative z-10">
                                            <div className="flex items-center gap-4 md:gap-6 flex-1">
                                                {/* Number Box */}
                                                <div className={`
                                                    flex items-center justify-center w-7 h-7 shrink-0
                                                    border bg-black/40 skew-x-[-10deg]
                                                    transition-colors duration-300
                                                    ${isOpen ? 'border-cyan-500 text-cyan-400' : 'border-white/10 text-gray-300 group-hover:border-white/30'}
                                                `}>
                                                    <span className="font-orbitron text-xs font-bold skew-x-[10deg]">
                                                        0{index + 1}
                                                    </span>
                                                </div>
                    
                                                {/* Question Text */}
                                                <h3 className={`
                                                    font-rajdhani sm:text-base md:text-lg text-base font-bold tracking-wide transition-colors duration-300
                                                    ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                                                `}>
                                                    {data.question}
                                                </h3>
                                            </div>
                    
                                            {/* Icon Rotation */}
                                            <div className={`
                                                relative w-8 h-8 flex items-center justify-center
                                                rounded-full border transition-all duration-300 ease-in-out
                                                ${isOpen ? 'border-cyan-400 bg-cyan-950/50 rotate-45' : 'border-white/20 group-hover:border-white/60 rotate-0'}
                                            `}>
                                                <div className={`text-sm transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
                                                    <FaPlus />
                                                </div>
                                            </div>
                                        </div>
                    
                                        <div className={`
                                            grid transition-[grid-template-rows] duration-300 ease-in-out
                                            ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-60'}
                                        `}>
                                            <div className="overflow-hidden">
                                                <div className="px-5 pb-6 pl-[4.5rem] md:pl-[5.5rem] relative">
                                                    
                                                    <div className={`
                                                        absolute left-[2.2rem] md:left-[2.7rem] top-0 bottom-0 w-[1px] 
                                                        bg-gradient-to-b from-cyan-500/50 to-transparent
                                                        transition-opacity duration-300
                                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                                    `}></div>
                                                    
                                                    <p className="font-rajdhani text-gray-200 sm:text-sm md:text-base text-sm leading-relaxed font-medium">
                                                        {data.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 px-4 py-3 bg-black/40 rounded-full border border-white/5 mx-4 max-w-3xl text-center">
                    <span className="text-white/80 text-sm sm:text-base font-semibold font-rajdhani tracking-wide">
                        ℹ️ Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam'.
                    </span>
                </div>
            </div>

        </section>
    );
}