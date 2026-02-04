'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of Spline
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-[1px] bg-cyan-900/50 relative overflow-hidden">
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
    <div ref={containerRef} className="w-full h-screen bg-black relative">
      <Spline
        onLoad={onLoad}
        // Ensure this URL is correct and public
        scene="https://prod.spline.design/NDbRFWmhe5l1U1eN/scene.splinecode" 
        className="w-full h-full"
      />
      {/* Overlay to blend the bottom of the bot into the page */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}