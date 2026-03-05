'use client';

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6'; 

const Data = [
 {
      question: " What is the objective of JU Talks?",
      answer: 
        " JU Talks seeks to unite industry experts, veterans,  technology specialists in a bid to examine the challenges, pace, and advances that characterize our current environment. Such events facilitate the interaction of ideas, thus allowing the participants to get a different outlook.",
    },
    {
      question: "Who will be the speakers at the event?",
      answer: 
        "In the previous editions of JU Talks, various prominent figures have attended such an occasion, ranging from industrialists, veterans to technology specialists & well known faces from artistic fields. The panelists of this edition will be announced soon, so stay tuned !",
    },
    {
      question: "How can the audience participate during JU Talks?",
      answer: 
        "In this podcast method, listeners are expected to  interact with the leaders by asking them questions, expressing confusion, and having meaningful conversations with them. This guarantees a productive and pleasant experience to everyone indeed.",
    },
    {
      question: "Will there be any specified topic?",
      answer: 
        "Yes, a topic will be selected by our team related to modern societal issues & our panelists will be giving their valuable insights on that particular subject.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative w-full py-20 overflow-hidden transform-gpu">
            
            <div className="absolute inset-0 z-0 bg-linear-to-b from-[#FF97E3] to-[#B128A6]"></div>

            <div className="flex flex-col items-center justify-center gap-8 w-full relative z-10">
                <div className="maxWidthForSections w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
                    
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4 flex flex-col items-center">
                        <div className="relative inline-block">
                            <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-4xl mb-10 tracking-wide text-[#592A13] drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
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
                                            ? 'bg-black/40 border-fuchsia-300 shadow-lg' 
                                            : 'bg-white/[0.05] border-white/10 hover:border-white/30 hover:bg-white/[0.08]'}
                                    `}>
                                        
                                        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${isOpen ? 'border-fuchsia-300' : 'border-white/20'}`}></div>
                                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${isOpen ? 'border-fuchsia-300' : 'border-white/20'}`}></div>
                    
                                        {/* Question Header */}
                                        <div className="flex items-center justify-between p-5 relative z-10">
                                            <div className="flex items-center gap-4 md:gap-6 flex-1">
                                                {/* Number Box */}
                                                <div className={`
                                                    flex items-center justify-center w-7 h-7 shrink-0
                                                    border bg-black/40 skew-x-[-10deg]
                                                    transition-colors duration-300
                                                    ${isOpen ? 'border-fuchsia-400 text-fuchsia-200' : 'border-white/10 text-gray-300 group-hover:border-white/30'}
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
                                                ${isOpen ? 'border-fuchsia-400 bg-fuchsia-900/50 rotate-45' : 'border-white/20 group-hover:border-white/60 rotate-0'}
                                            `}>
                                                <div className={`text-sm transition-colors duration-300 ${isOpen ? 'text-fuchsia-200' : 'text-gray-400 group-hover:text-white'}`}>
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
                                                        bg-gradient-to-b from-fuchsia-400/50 to-transparent
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
            </div>

        </section>
    );
}