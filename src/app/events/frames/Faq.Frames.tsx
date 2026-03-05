'use client';

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6'; 
import Image from 'next/image';

const Data = [
  {
      question: "Is there a registration fee to participate in the contest?",
      answer: 
        "No, there is no registration fee. The contest is completely free and open to all students.",
  },
  {
      question: "Can I submit photos taken with a smartphone for the event?",
      answer: 
        "Yes, absolutely! Our photography competition is open to entries captured with any type of camera, including smartphones. We believe that creativity knows no bounds, and stunning images can be produced with a variety of devices.",
  },
  {
      question: "Is there a specific theme for the photography competition?",
      answer: 
        "We encourage diversity and creativity in submissions. There is no specific theme for this competition, allowing photographers to showcase their skills and perspectives across a broad range of subjects. Whether it's portraits, landscapes, abstracts, or street photography, we welcome your unique vision.",
  },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative w-full py-20 overflow-hidden transform-gpu">
            
            <div className="absolute inset-0 z-0 bg-linear-to-b from-[#52BAFF] to-[#E7EDF9]"></div>

            {/*Aeroplanes and clouds*/}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Aeroplanes */}
                <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute top-[15%] left-[8%] md:left-[15%] w-16 md:w-20 h-auto opacity-100" />
                <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute bottom-[20%] right-[8%] md:right-[15%] w-16 md:w-20 h-auto opacity-100 -scale-x-100" />

                {/* Clouds */}
                <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[10%] right-[20%] w-12 md:w-16 h-auto opacity-80 " />
                <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[45%] left-[5%] w-14 md:w-20 h-auto opacity-80 " />
                <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[35%] left-[15%] w-12 md:w-16 h-auto opacity-80 " />
                <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[10%] right-[30%] w-14 md:w-20 h-auto opacity-80" />
            </div>

            <div className="flex flex-col items-center justify-center gap-8 w-full relative z-10">
                <div className="maxWidthForSections w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
                    
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4 flex flex-col items-center">
                        <div className="relative inline-block">
                            <h1 className="uppercase font-orbitron font-bold text-center text-3xl md:text-5xl mb-10 tracking-wide text-[#0A5C7A] drop-shadow-md">
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
                                            ? 'bg-white/80 border-[#0A5C7A] shadow-lg' 
                                            : 'bg-white/40 border-white/50 hover:border-[#0A5C7A]/50 hover:bg-white/60'}
                                    `}>
                                        
                                        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${isOpen ? 'border-[#0A5C7A]' : 'border-[#0A5C7A]/30'}`}></div>
                                        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${isOpen ? 'border-[#0A5C7A]' : 'border-[#0A5C7A]/30'}`}></div>
                    
                                        {/* Question Header */}
                                        <div className="flex items-center justify-between p-3 relative z-10">
                                            <div className="flex items-center gap-4 md:gap-6 flex-1">
                                                {/* Number Box */}
                                                <div className={`
                                                    flex items-center justify-center w-7 h-7 shrink-0
                                                    border skew-x-[-10deg]
                                                    transition-colors duration-300
                                                    ${isOpen ? 'bg-[#0A5C7A] border-[#0A5C7A] text-white' : 'bg-white/50 border-[#0A5C7A]/30 text-[#0A5C7A] group-hover:border-[#0A5C7A]/60'}
                                                `}>
                                                    <span className="font-orbitron text-xs font-bold skew-x-[10deg]">
                                                        0{index + 1}
                                                    </span>
                                                </div>
                    
                                                {/* Question Text */}
                                                <h3 className={`
                                                    font-rajdhani sm:text-base md:text-lg text-base font-bold tracking-wide transition-colors duration-300
                                                    ${isOpen ? 'text-[#0A5C7A]' : 'text-[#0A5C7A]/80 group-hover:text-[#0A5C7A]'}
                                                `}>
                                                    {data.question}
                                                </h3>
                                            </div>
                    
                                            {/* Icon Rotation */}
                                            <div className={`
                                                relative w-8 h-8 flex items-center justify-center
                                                rounded-full border transition-all duration-300 ease-in-out
                                                ${isOpen ? 'border-[#0A5C7A] bg-[#0A5C7A] rotate-45' : 'border-[#0A5C7A]/30 group-hover:border-[#0A5C7A]/60 rotate-0'}
                                            `}>
                                                <div className={`text-sm transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#0A5C7A]/70 group-hover:text-[#0A5C7A]'}`}>
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
                                                        bg-gradient-to-b from-[#0A5C7A]/50 to-transparent
                                                        transition-opacity duration-300
                                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                                    `}></div>
                                                    
                                                    <p className="font-rajdhani text-gray-800 sm:text-sm md:text-base text-sm leading-relaxed font-semibold">
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
                <div className="mt-4 px-3 py-3 bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 mx-4 max-w-3xl text-center shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    <span className="text-[#0A5C7A] text-sm sm:text-base font-bold font-rajdhani tracking-wide">
                        ℹ️ Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam'.
                    </span>
                </div>
            </div>

        </section>
    );
}