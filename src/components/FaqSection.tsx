'use client';

import React, { useState } from 'react';
import Image from "next/image";
import droneImage from "../assets/images/Faq_Drone.png";
import { FaPlus, FaMinus } from 'react-icons/fa6';
import Particles from './Particles';

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

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className="relative h-auto w-full bg-black/90 -mt-0.5 overflow-hidden py-10">
            {/* Background*/}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, black 96%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 96%, transparent 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-[#03050c]/90 z-0"></div>

                    {/* Nebulas */}
                    <div className="hidden sm:block absolute top-[10%] left-[-10%] w-[50vw] h-[70vw] rounded-full bg-violet-950/20 blur-[120px] z-0"></div>
                    <div className="hidden sm:block absolute bottom-[5%] right-[-10%] w-[60vw] h-[40vw] rounded-full bg-cyan-950/40 blur-[120px] z-0"></div>
                    {/* for mobile vissibility */}
                    <div className="block sm:hidden absolute top-[10%] left-[2%] w-[50vw] h-[50vw] rounded-full bg-violet-900/40 blur-[120px] z-0"></div>
                    <div className="block sm:hidden absolute bottom-[5%] right-[3%] w-[60vw] h-[50vw] rounded-full bg-cyan-900/40 blur-[120px] z-0"></div>

                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
                </div>

                {/* top gradient */}
                <div className="absolute top-0 left-0 w-full h-15 bg-linear-to-b from-[#03000d]/30 via-[#03000d]/20 to-transparent z-20 pointer-events-none"></div>

                {/* bottom gradient*/}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-[#03050cf3] via-[#03050c]/60 to-transparent z-20 pointer-events-none"></div>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 h-full w-full relative z-10">
                {/* main content*/}
                <div className="maxWidthForSections relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16 space-y-4 flex flex-col items-center">
                        <div className="relative inline-block">
                            <h1 className="text-center text-xl sm:text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">
                                Frequently Asked Questions
                            </h1>
                            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-500/80 to-transparent"></span>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center lg:sticky lg:top-46 order-1">
                            <div className="relative w-full flex flex-col items-center animate-float_drone">
                                <div className="relative w-90 h-90 md:w-90 md:h-90 flex items-center justify-center z-10 -mb-10 -mt-15">
                                    <Image
                                        src='/faq_robo.png'
                                        alt="Drone"
                                        fill
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* main section*/}
                        <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 w-full">
                            {Data.map((data, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={index}
                                        onClick={() => toggleFAQ(index)}
                                        className={`group relative w-full cursor-pointer transition-all duration-300 ${isOpen ? 'z-10' : 'z-0'}`}
                                    >
                                        {/* Cards */}
                                        <div
                                            className={`
                                        relative w-full overflow-hidden transition-colors duration-300 border
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

                                            <div className="flex items-center justify-between w-full p-3 sm:p-4 gap-4 relative z-10">

                                                <div className={`
                                            flex items-center justify-center w-8 h-8 rounded-[1px] border font-mono text-xs font-bold transition-colors duration-300
                                            ${isOpen ? 'bg-cyan-950/30 border-cyan-500 text-cyan-400' : 'bg-transparent border-transparent text-gray-400 group-hover:text-gray-300'}
                                        `}>
                                                    0{index + 1}
                                                </div>

                                                <h3 className={`
                                            flex-1 text-sm sm:text-[15px] font-bold capitalize tracking-wide transition-colors duration-300
                                            ${isOpen ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-200'}
                                        `}>
                                                    {data.question}
                                                </h3>


                                                <div className={`text-xs transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                    {isOpen ? <FaMinus /> : <FaPlus />}
                                                </div>
                                            </div>

                                            <div
                                                className={`
                                            grid transition-[grid-template-rows] duration-300 ease-out will-change-[grid-template-rows]
                                            ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                                        `}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="px-4 pb-4 pl-14 sm:pl-16 relative z-10">

                                                        <div className="absolute left-8 top-0 bottom-4 w-px bg-white/5">
                                                            <div className={`absolute top-0 w-full bg-cyan-500/30 transition-all duration-500 ${isOpen ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>
                                                        </div>

                                                        <p className={`
                                                    text-gray-400 text-xs sm:text-sm font-medium leading-relaxed
                                                    transition-opacity duration-300 delay-100
                                                    ${isOpen ? 'opacity-100' : 'opacity-0'}
                                                `}>
                                                            {data.answer}
                                                        </p>
                                                        {isOpen && (
                                                            <div className="mt-3 inline-flex items-center gap-2">
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

                {/* Marquee */}
                <div className="flex px-4 py-2 bg-linear-to-r from-purple-500/90 to-cyan-500/90 rounded-md w-[80vw] overflow-hidden z-20">
                    {/* Block 1 */}
                    <div className="animate-marquee-infinite group-hover:[animation-play-state:paused] shrink-0 min-w-full flex items-center pr-10 hover:paused">
                        <span className="text-white text-base font-sans tracking-wide whitespace-nowrap">
                            Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam' for future updates.
                        </span>
                    </div>
                    {/* Block 2 (Duplicate) */}
                    <div className="group animate-marquee-infinite group-hover:[animation-play-state:paused] shrink-0 min-w-full flex items-center pr-10 hover:paused">
                        <span className="text-white text-base font-sans tracking-wide whitespace-nowrap">
                            Kindly check your spam folder for the registration confirmation mail & mark it as 'Not Spam' for future updates.
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}