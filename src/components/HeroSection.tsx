'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import ConvoSvg from "@/assets/images/ConvoSvg.svg";

// 1. Load Spline dynamically
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="h-screen w-full relative overflow-hidden mx-auto bg-black font-mono">
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 left-1/4 w-[2px] h-[200%] bg-cyan-400/40 rotate-[25deg] blur-sm" />
                <div className="absolute -top-1/2 left-2/3 w-[2px] h-[200%] bg-fuchsia-500/40 rotate-[25deg] blur-sm" />
            </div>


            {/* Ghost Tech Text */}
            <div className="absolute inset-0 z-[1] pointer-events-none select-none font-mono tracking-widest ">

                <span className="absolute top-[12%] left-[8%] text-3xl opacity-[0.04]
    animate-[floatSlow_8s_ease-in-out_infinite,ghostPulse_8s_ease-in-out_infinite] text-cyan-400">
                    CONVOLUTION
                </span>

                <span className="absolute top-[35%] right-[10%] text-4xl opacity-[0.035]
    animate-[floatSlow_10s_ease-in-out_-4s_infinite,ghostPulse_8s_ease-in-out_infinite] text-cyan-400">
                    NEURAL
                </span>

                <span className="absolute bottom-[20%] left-[18%] text-5xl opacity-[0.03] text-purple-400 animate-[floatSlow_8s_ease-in-out_infinite,ghostPulse_8s_ease-in-out_infinite]">
                    SIGNAL
                </span>

                <span className="absolute top-[10%] right-[30%] text-7xl opacity-[0.045] text-pink-400
    animate-[floatSlow_8s_ease-in-out_infinite,ghostPulse_8s_ease-in-out_infinite]">
                    AI
                </span>
                <span className="absolute top-[60%] right-[10%] text-7xl opacity-[0.045] text-cyan-400
    animate-[floatSlow_8s_ease-in-out_infinite,ghostPulse_8s_ease-in-out_infinite]">
                    INTELLIGENCE
                </span>
                <span className="absolute bottom-[40%] left-[10%] text-7xl opacity-[0.045] text-pink-400
    animate-[floatSlow_8s_ease-in-out_infinite,ghostPulse_8s_ease-in-out_infinite]">
                    LLM
                </span>

            </div>



            {/* --- BACKGROUND LAYERS (Direction C: Circuit Architecture) --- */}

            {/* 1. Base Deep Void (The Dark Wall) */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* 2. "Server Pillars" (Depth Layer) */}
            {/* These blurred columns create the illusion of massive structures in the distance */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Left Pillar */}
                <div className="absolute top-0 left-[5%] w-32 h-full bg-gradient-to-b from-transparent via-slate-900 to-transparent opacity-90 blur-2xl" />
                {/* Right Pillar */}
                <div className="absolute top-0 right-[10%] w-48 h-full bg-gradient-to-b from-transparent via-gray-900 to-transparent opacity-90 blur-3xl" />
                {/* Center-Left Glow (A distant light source) */}
                <div className="absolute top-1/2 left-[20%] w-2 h-[80%] -translate-y-1/2 bg-cyan-900/30 blur-xl" />
            </div>



            {/* 4. "Circuit Traces" (Vertical Bus Lines) */}
            {/* Thin faint lines running vertically like motherboard connections */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
                <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-20" />
                <div className="absolute top-0 left-[16%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30" />

                <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-10" />
                <div className="absolute top-0 right-[5%] w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-30" />
            </div>

            {/* 5. Center Glow (Behind Robot) */}
            {/* A subtle spotlight to separate the black robot from the black wall */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gray-900/90 to-slate-900/900 blur-[100px] rounded-full z-0 pointer-events-none" />


            {/* --- FOREGROUND CONTENT --- */}

            {/* Logo Overlay - CENTERED & GLOWING */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="relative transform translate-y-0">
                    <Image
                        src={ConvoSvg}
                        alt="Convolution Hero Logo"
                        className="w-48 md:w-50 h-auto object-contain"
                        style={{
                            filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))"
                        }}
                        priority
                    />
                </div>
            </div>

            {/* 3D Robot Container */}
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[285%] h-[150%] scale-[0.35] md:w-full md:h-full md:scale-100 md:translate-x-0 md:translate-y-0 md:top-0 md:left-0">
                {isMounted ? (
                    <Spline
                        scene="https://prod.spline.design/9LLRY3AS-8i5IaDx/scene.splinecode"
                        className="w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-mono tracking-widest uppercase">
                        Loading Interface...
                    </div>
                )}

                {/* Black Mask to hide Spline Logo */}
                <div className="absolute bottom-2 right-2 w-[100%] h-12 md:w-[20%] md:right-0 lg:w-[15%]  bg-black z-20 pointer-events-none" />
            </div>

        </div>
    );
}

export default HeroSection;