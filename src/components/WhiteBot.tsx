'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of Spline
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-px bg-cyan-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400 w-full animate-[shimmer_1s_infinite] -translate-x-full" />
                </div>
                <div className="text-cyan-500 font-mono text-[10px] tracking-[0.3em]">INITIALIZING</div>
            </div>
        </div>
    ),
});

export default function WhiteBot() {
    const containerRef = useRef<HTMLDivElement>(null);
    const splineRef = useRef<any>(null);
    
    // Track if the animation has been triggered at least once
    const hasPlayedRef = useRef(false);

    // 1. Generate stars (Reduced count for cleaner look)
    const stars = useMemo(() => {
        return Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() > 0.8 ? 2 : 1, // Mostly small stars
            opacity: Math.random() * 0.8 + 0.1,
        }));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (splineRef.current) {
                    if (entry.isIntersecting) {
                        // If in view, ensure it plays.
                        // We set hasPlayedRef to true so we know the user has seen it.
                        if (!hasPlayedRef.current) {
                            splineRef.current.play();
                            hasPlayedRef.current = true;
                        }
                        // If it has already played, we do nothing (it's already running)
                    } else {
                        // Only stop if it hasn't played yet.
                        // This prevents the sound from playing on initial load (hidden).
                        // Once hasPlayedRef is true, we NEVER stop it, so it maintains its timeline.
                        if (!hasPlayedRef.current) {
                            splineRef.current.stop();
                        }
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    function onLoad(splineApp: any) {
        splineRef.current = splineApp;
        // Safety check: If loaded while off-screen, ensure it's stopped immediately
        if (!hasPlayedRef.current) {
             splineApp.stop();
        }
    }

    return (
        <div ref={containerRef} className="w-full h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center selection:bg-cyan-500/30">

            {/* 2. Star Background Layer (z-0) - Subtle & Deep */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                        }}
                    />
                ))}
            </div>

            {/* 3. AESTHETIC HUD LAYER (z-5) */}
            <div className="absolute inset-0 z-5 flex flex-col items-center justify-center pointer-events-none select-none">

                {/* A. Background Grid (The "Floor/Ceiling") */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-50" />

                {/* B. Center Typography - Massive & Structural */}
                <div className="relative z-10 flex flex-col items-center justify-center scale-90 md:scale-100">
                    {/* Top Label */}
                    <div className="flex items-center gap-3 mb-4 opacity-30 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-mono text-xs tracking-[0.4em] text-green-400">SYSTEM_ONLINE</span>
                    </div>

                    {/* Main Title - Huge, behind the bot */}
                    <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-pink-200/20 to-white/0 tracking-tighter mix-blend-overlay">
                        PLAYGROUND
                    </h1>

                    {/* Subtitle - Sharp & Clean */}
                    <div className="absolute -bottom-8 md:-bottom-12 flex items-center justify-between w-full max-w-2xl px-12">
                        <div className="h-px w-12 md:w-24 bg-linear-to-r from-transparent to-cyan-500/80" />
                        <h2 className="text-3xl md:text-5xl font-light text-white tracking-[0.5em] font-sans drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                            {/* <span className="text-cyan-400 font-bold text-6xl">X</span>
                            <span className="text-purple-400 font-bold text-6xl">I</span> */}
                        </h2>
                        <div className="h-px w-12 md:w-24 bg-gradilinear from-transparent to-pink-500/80" />
                    </div>
                </div>

                {/* C. Decorative HUD Elements (Corners) */}
                {/* Top Left */}
                <div className="absolute top-15 left-10 hidden md:block opacity-100 ">
                    <div className="w-px h-12 bg-cyan-300 mb-2 opacity-40" />
                    <div className='flex items-center gap-3'>
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <div className="font-mono text-[10px] text-cyan-300 tracking-widest leading-loose animate-pulse">
                            COORD: 45.212<br />
                            PING: 4ms
                        </div>
                    </div>
                </div>

                {/* Bottom Right */}
                <div className="absolute bottom-70 right-10 hidden md:block opacity-100 text-right">
                    <div className='flex items-center gap-3'>
                        <div className="font-mono text-[10px] text-pink-300 tracking-widest leading-loose">
                            VER: 11.0.2<br />
                            JU // EE
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                    </div>
                    <div className="w-px h-12 bg-pink-300 mt-2 ml-auto opacity-40" />
                </div>

                {/* Corner "Plus" Markers */}
                <div className="absolute top-10 right-5 text-pink-300/90">+</div>
                <div className="absolute bottom-70 left-5 text-cyan-300/90">+</div>

            </div>

            {/* 4. Spline Bot Layer (z-10) */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <Spline
                    onLoad={onLoad}
                    scene="https://prod.spline.design/NDbRFWmhe5l1U1eN/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            {/* 5. Gradient Overlay (z-20) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black to-transparent z-20 pointer-events-none" />

        </div>
    );
}