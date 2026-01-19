'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import ConvoSvg from "@/assets/images/ConvoSvg.svg";


const SplineLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
        <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin filter blur-[2px]"></div>
        <div className="absolute text-cyan-500 font-mono text-[10px] md:text-sm tracking-[0.2em] animate-pulse mt-24 md:mt-32">LOADING SYSTEM</div>
    </div>
);

const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: SplineLoader
});

const Particles = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    const particles = Array.from({ length: 30 }); 
    
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-500 rounded-full animate-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 10}s`,
                        opacity: Math.random() * 0.5 + 0.2,
                    }}
                />
            ))}
        </div>
    );
};

const BackgroundGrid = () => (
    <>
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)] animate-pan-grid"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] animate-pan-grid-reverse"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-cyan-500/10 blur-[80px] md:blur-[150px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-fuchsia-600/10 blur-[60px] md:blur-[100px] rounded-full z-0 pointer-events-none mix-blend-screen animate-pulse-slower" />
        <div className="absolute inset-0 z-[60] pointer-events-none mix-blend-color-dodge opacity-20 bg-[url('/assets/images/noise.png')] animate-noise"></div>
    </>
);

const HeadsUpDisplay = () => (
    <>

        <div className="absolute top-[35%] xl:top-1/3 left-[4%] z-[1] hidden md:flex flex-col gap-4 pointer-events-none text-cyan-400 text-xs tracking-widest animate-slide-in-left">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                <span className="animate-typewriter">KERNEL: ACTIVE</span>
            </div>
            <div className="h-[2px] w-32 bg-gradient-to-r from-cyan-400 to-transparent animate-grow-width" />
            <p className="animate-typewriter" style={{ animationDelay: '0.5s' }}>UPLINK: SECURE_CHANNEL_01</p>
            <p className="animate-typewriter text-cyan-400/60" style={{ animationDelay: '0.8s' }}>PING: 4ms</p>
        </div>

        <div className="absolute bottom-[20%] xl:bottom-1/3 right-[5%] z-[1] hidden md:flex flex-col gap-4 pointer-events-none text-fuchsia-400 text-xs tracking-widest text-right items-end animate-slide-in-right">
            <div className="flex items-center gap-2">
                <span className="animate-typewriter" style={{ animationDelay: '1s' }}>COGNITION_MATRIX</span>
                <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse" />
            </div>
            <div className="h-[2px] w-32 bg-gradient-to-l from-fuchsia-400 to-transparent animate-grow-width" style={{ animationDelay: '0.5s' }} />
            <p className="animate-typewriter" style={{ animationDelay: '1.5s' }}>SYNAPSE_ID: 0x8F4A</p>
            <p className="animate-typewriter text-fuchsia-400/60" style={{ animationDelay: '1.8s' }}>VER. 2.5.0-X</p>
        </div>

        <div className="absolute top-0 left-0 w-full z-40 p-4 md:p-8 flex justify-end items-start pointer-events-none">
            <div className="text-right font-mono text-[8px] md:text-[10px] text-cyan-300/50 leading-tight animate-fade-in-down md:mr-6 md:mt-4">
            <div className='hidden md:block'>
                <p>{`> INIT_SEQUENCE_START`}</p>
                <p>{`> LOADING ASSETS... 100%`}</p>
                <p>{`> DECRYPTING_KEYS... OK`}</p>
                <p className="animate-blink text-cyan-300">{`> AWAITING_INPUT_`}</p>
            </div>
                
            </div>
        </div>

        {/* Scanning Corners */}
        <div className="absolute top-4 left-4 md:top-5 md:left-5 w-16 h-16 md:w-32 md:h-32 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl md:rounded-tl-3xl pointer-events-none animate-scan-corner-tl"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-32 md:h-32 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-2xl md:rounded-tr-3xl pointer-events-none animate-scan-corner-tr"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-32 md:h-32 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-2xl md:rounded-bl-3xl pointer-events-none animate-scan-corner-bl"></div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-32 md:h-32 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl md:rounded-br-3xl pointer-events-none animate-scan-corner-br"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-cyan-400 animate-pulse whitespace-nowrap">SCROLL TO EXPLORE</span>
            <div className="w-[2px] h-10 md:h-16 bg-gradient-to-b from-cyan-400 via-cyan-600 to-transparent animate-scroll-down" />
        </div>
    </>
);

// --- 2. MAIN COMPONENT ---

function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div id='home' className="h-[100dvh] w-full relative overflow-hidden mx-auto bg-[#030305] font-mono selection:bg-cyan-500/30">
            
            <BackgroundGrid />
            <Particles />

            {/* Logo */}
            <div className="absolute top-[27%]  xl:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none select-none flex justify-center w-full">
                <div className="relative group animate-float w-full flex justify-center">
                    <div className="absolute -inset-10 md:-inset-32 bg-cyan-500/30 blur-[60px] md:blur-[100px] rounded-full animate-pulse-slow" />
                    <Image
                        src={ConvoSvg}
                        alt="Convolution Logo Center"
                        className="w-[75vw] md:w-[72vw] xl:w-[45vw] max-w-[300px] md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(6,182,212,1)] opacity-95 "
                        priority
                    />
                </div>
            </div>

            {/* --- LAYER 3: 3D Scene (Spline) --- */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
                {isMounted && (
                    <div className="relative w-full h-full transition-transform duration-1000 ease-out 
                        scale-[0.55] translate-y-[12%] 
                        md:scale-[0.80] md:translate-y-[18%]
                        xl:scale-100 xl:translate-y-[17%]">
                        <SplineScene 
                            scene="https://prod.spline.design/9LLRY3AS-8i5IaDx/scene.splinecode"
                            className="w-full h-full animate-subtle-hover"
                        />
                    </div>
                )}
            </div>

            <HeadsUpDisplay />
            
            <div className="absolute bottom-0 left-0 w-full h-28 md:h-50 bg-gradient-to-t from-[#000000] via-[#030305]/80 to-transparent z-20 pointer-events-none" />
        </div>
    );
}

export default HeroSection;