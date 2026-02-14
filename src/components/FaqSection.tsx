'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { FaPlus } from 'react-icons/fa6'; 
import { motion, AnimatePresence } from 'framer-motion';

const Data = [
    {
        question: "What is Convolution?",
        answer: "Convolution is the annual tech fest organised by JUEE, where technology, creativity, and innovation come together. It features exciting events, workshops, competitions, and opportunities to showcase talent.",
    },
    {
        question: "When and where is Convolution happening?",
        answer: "Convolution will take place from 18th to 20nd March, 2026 at the Department of Electrical Engineering, Jadavpur University. Further updates about the time, date and venue of specific events will be available on our website soon.",
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

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className="relative h-auto w-full bg-black/90 -mt-0.5 overflow-hidden py-10">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none transform-gpu translate-z-0">
                <div className="absolute inset-0 bg-[#020203]"></div>
                
                <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vh] bg-fuchsia-900/20 blur-[120px] rounded-full mix-blend-screen transform-gpu translate-z-0 will-change-transform"></div>
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen transform-gpu translate-z-0 will-change-transform"></div>
                
                <div className="absolute z-10 bottom-0 left-0 w-full h-10 pointer-events-none bg-linear-to-b from-transparent to-[#030712] " />
                <div className="absolute z-10 top-0 left-0 w-full h-15 pointer-events-none bg-linear-to-b from-transparent to-[#030712] " />

                <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[70vh] bg-cyan-900/30 blur-[120px] rounded-full mix-blend-screen transform-gpu translate-z-0 will-change-transform"></div>

                {/* Dotted Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.20]" 
                    style={{ 
                        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
                        backgroundSize: '40px 40px' 
                    }}
                ></div>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 h-full w-full relative z-10">
                <div className="maxWidthForSections relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16 space-y-4 flex flex-col items-center">
                        <div className="relative inline-block">
                            <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] sm:whitespace-nowrap uppercase ">
                                Frequently Asked questions
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
                            </h1>
                        </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center lg:sticky lg:top-46 order-1">
                            <div className="relative w-full flex flex-col items-center animate-float_drone will-change-transform">
                                <div className="relative w-110 h-110 flex items-center justify-center z-10 -mb-10 -mt-15">
                                    <Image
                                        src='/faq_robo.png'
                                        alt="faq_Robot"
                                        fill
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Main Section */}
                        <motion.div layout className="col-span-12 lg:col-span-7 flex flex-col gap-4 w-full will-change-transform transform-gpu">
                            {Data.map((data, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <motion.div
                                        key={index}
                                        layout
                                        onClick={() => toggleFAQ(index)}
                                        className={`group relative w-full cursor-pointer rounded-xl overflow-hidden`} 
                                        transition={{ layout: { duration: 0.3, type: "spring", stiffness: 120, damping: 20 } }}
                                        style={{ willChange: "height, transform" }} 
                                    >
                                        <div className={`
                                            relative w-full overflow-hidden backdrop-blur-sm
                                            border-l-[3px] transition-colors duration-200
                                            ${isOpen 
                                                ? 'bg-linear-to-r from-cyan-950/30 to-transparent border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                                                : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'}
                                        `}>
                                            
                                            <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-200 ${isOpen ? 'border-cyan-400' : 'border-white/20'}`}></div>
                                            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-200 ${isOpen ? 'border-cyan-400' : 'border-white/20'}`}></div>

                                            {/* Scanline Effect */}
                                            {isOpen && (
                                                <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-scan-fast opacity-50"></div>
                                            )}

                                            {/* Question Header */}
                                            <motion.div layout="position" className="flex items-center justify-between p-5 relative z-10">
                                                <div className="flex items-center gap-4 md:gap-6 flex-1">
                                            {/*Index*/}
                                                    <div className={`
                                                        flex items-center justify-center w-7 h-7 shrink-0
                                                        border bg-black/40 skew-x-[-10deg]
                                                        transition-all duration-200
                                                        ${isOpen ? 'border-cyan-500 text-cyan-400' : 'border-white/10 text-gray-500 group-hover:border-white/30'}
                                                    `}>
                                                        <span className="font-orbitron text-xs font-bold skew-x-[10deg]">
                                                            0{index + 1}
                                                        </span>
                                                    </div>

                                                    <h3 className={`
                                                        font-rajdhani text-base sm:text-lg font-bold tracking-wide transition-colors duration-200
                                                        ${isOpen ? 'text-white text-glow-cyan' : 'text-gray-300 group-hover:text-white'}
                                                    `}>
                                                        {data.question}
                                                    </h3>
                                                </div>

                                                <div className={`
                                                    relative w-8 h-8 flex items-center justify-center
                                                    rounded-full border transition-all duration-300 ease-in-out
                                                    ${isOpen ? 'border-cyan-400 bg-cyan-950/50 rotate-45' : 'border-white/20 group-hover:border-white/60 rotate-0'}
                                                `}>
                                                    <div className={`text-sm transition-colors duration-200 ${isOpen ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
                                                        <FaPlus />
                                                    </div>
                                                </div>
                                            </motion.div>


                                            <AnimatePresence initial={false} mode="sync">
                                                {isOpen && (
                                                    <motion.div
                                                        key="content"
                                                        initial="collapsed"
                                                        animate="open"
                                                        exit="collapsed"
                                                        variants={{
                                                            open: { height: "auto", opacity: 1 },
                                                            collapsed: { height: 0, opacity: 0 }
                                                        }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                        style={{ willChange: "height, opacity" }} 
                                                    >
                                                        <div className="px-5 pb-6 pl-[4.5rem] md:pl-[5.5rem] relative">
                                                            <div className="absolute left-[2.2rem] md:left-[2.7rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

                                                            <motion.p 
                                                                variants={{
                                                                    open: { y: 0, opacity: 1, filter: "blur(0px)" },
                                                                    collapsed: { y: 10, opacity: 0, filter: "blur(5px)" }
                                                                }}
                                                                initial="collapsed"
                                                                animate="open"
                                                                exit="collapsed"
                                                                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                                                                className="font-rajdhani text-gray-300 text-sm md:text-base leading-relaxed font-medium"
                                                            >
                                                                {data.answer}
                                                            </motion.p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Marquee */}
                <div className="flex px-4 py-2 backdrop-blur-2xl rounded-full w-[90vw] lg:w-[85vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] transform-gpu will-change-transform">
                    <div className="animate-marquee-infinite group-hover:[animation-play-state:paused] shrink-0 min-w-full flex items-center">
                        <span className="text-white text-sm sm:text-base font-semibold font-rajdhani tracking-wide whitespace-nowrap">
                            Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam' for future updates.
                        </span>
                    </div>
                    <div className="group animate-marquee-infinite group-hover:[animation-play-state:paused] shrink-0 min-w-full flex items-center">
                        <span className="text-white text-sm sm:text-base font-semibold font-rajdhani tracking-wide whitespace-nowrap">
                            Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam' for future updates.
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}