'use client';
import React from 'react';

export default function Timeline() {
    return (
        <section
            id="timeline"
            className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden bg-transparent"
        >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Added 'translate-x-8 md:translate-x-16' to shift it slightly right on mobile, and further right on desktop */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl translate-x-0 md:translate-x-60">
                
                {/* Section Heading */}
                <h1 className="uppercase font-orbitron font-bold text-center text-3xl md:text-5xl mb-12 drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-400 to-white">
                    Event Timeline
                </h1>

                {/* Coming Soon Glassmorphic Card */}
                <div className="relative px-12 py-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10">
                    
                    {/* Animated border line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>

                    <p className="font-orbitron text-cyan-400 text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        Coming Soon
                    </p>
                    <p className="mt-4 font-rajdhani text-gray-300 text-base md:text-lg tracking-wide">
                        Stay tuned! The schedule is being finalized.
                    </p>
                </div>
            </div>
        </section>
    );
}