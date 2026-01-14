"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import ConvoIcon from "../assets/images/HerosectionImages/ConvoSvg.svg";

// --- DATA: Mars Themed Typography ---

const wordsLine1 = [
  {
    text: "Kolkata's",
    className: "text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none drop-shadow-2xl"
  },
  {
    text: "Largest",
    // MARS GRADIENT: Orange -> Red -> Yellow (Magma)
    className: "text-2xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 animate-gradient-x"
  },
];

const wordsLine2 = [
  {
    text: "Departmental",
    // Changed Gray to Stone for a dusty Martian look
    className: "text-xl md:text-2xl font-bold text-stone-400 tracking-[0.2em] uppercase"
  },
  {
    text: "Techfest",
    className: "text-xl md:text-2xl font-bold text-stone-400 tracking-[0.2em] uppercase"
  },
];

const HomeAbout = () => {
  const [firstLineDone, setFirstLineDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstLineDone(true);
    }, 2950);

    return () => clearTimeout(timer);
  }, []);

  return (
    // 1. Spacing preserved (py-12). Background changed to Deep Mars Black (#0f0202)
    <div id="about" className="relative w-full min-h-screen bg-[#0f0202] flex flex-col items-center justify-center py-12 overflow-hidden">
      
      {/* ================= MARS BACKGROUND LAYERS ================= */}
      {/* Red/Black Gradient instead of Blue/Black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a0505] via-[#0f0202] to-[#000000] z-0" />
      
      {/* Top Left: Red Dust */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow" />
      
      {/* Bottom Right: Orange/Rust Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-900/20 rounded-full blur-[100px] mix-blend-screen opacity-60" />
      
      {/* Bottom Floor: Rusty Grid */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />

      {/* ================= CONTENT STACK ================= */}
      {/* 2. Spacing preserved (mt-4, space-y-9 replaced with space-y-6 from previous compact version request, or keeping 9 if you want exactly the last snippet provided. Based on "don't do anything with vertical spacing", I will use the classes from the code block you pasted: mt-4, space-y-9) */}
      <div className="mt-5 maxWidthForSections w-full px-4 flex flex-col items-center text-center z-10 space-y-9">

        {/* 1. JUEE PRESENTS */}
        <div className="pt-7 animate-fade-in-down">
          <div className="relative group cursor-default">
            {/* Orange/Red Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            {/* Badge: Orange border, black bg */}
            <span className="relative block py-3 px-8 rounded-full border border-orange-500/30 bg-black/60 backdrop-blur-md text-orange-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase shadow-lg shadow-orange-900/20">
              JUEE Presents
            </span>
          </div>
        </div>

        {/* 2. LOGO */}
        {/* 3. Spacing preserved (py-2) */}
        <div className="py-4 relative w-full flex justify-center items-center">
           {/* White Hot Core */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/5 rounded-full blur-[60px]" />
           {/* Outer Orange Flare */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-600/30 rounded-full blur-[40px] animate-pulse" />
           <Image
              src={ConvoIcon}
              alt="Convolution Logo"
              // Added orange drop shadow
              className="relative w-72 md:w-[450px] h-auto object-contain drop-shadow-[0_0_20px_rgba(234,88,12,0.3)]"
            />
        </div>

        {/* 3. SEQUENTIAL TYPEWRITER EFFECT */}
        {/* 4. Spacing preserved (gap-0) */}
        <div className="flex flex-col items-center justify-center gap-0">
          
          <TypewriterEffectSmooth 
            words={wordsLine1} 
            // Cursor Color: Orange
            cursorClassName={firstLineDone ? "hidden" : "bg-orange-500"} 
          />
          
          <div className="min-h-[40px] flex items-center">
            {firstLineDone && (
              <TypewriterEffectSmooth 
                words={wordsLine2} 
                // Cursor Color: Orange
                cursorClassName="bg-orange-500"
              />
            )}
          </div>

        </div>

        {/* Laser Divider (Orange) */}
        {/* 5. Spacing preserved (my-2) */}
        <div className="relative w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] my-2" />

        {/* 4. ABOUT US */}
        {/* 6. Spacing preserved (space-y-4) */}
        <div className="max-w-4xl space-y-4 bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-orange-500/10 shadow-[0_0_30px_rgba(69,10,10,0.2)]">
          {/* Subheader: Orange */}
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-orange-500/90 mb-1">
            // ABOUT_US
          </h3>
          {/* Text: Stone/Gray */}
          <p className="text-base md:text-xl text-stone-300 leading-relaxed font-light tracking-wide">
            <span className="font-bold text-white drop-shadow-[0_0_5px_rgba(255,100,0,0.5)]">Convolution XI</span> is the eleventh edition of the annual
            techno-management fest organized by the <span className="text-red-400 font-semibold">Students' Forum</span> of the
            Department of Electrical Engineering, Jadavpur University.
          </p>
        </div>

        {/* 5. EXPLORE BUTTON */}
        {/* 7. Spacing preserved (pt-4) */}
        <div className="pt-4">
          <button className="relative group px-12 py-5 bg-transparent overflow-hidden rounded-full border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300">
            {/* Hover Fill: Orange Tint */}
            <div className="absolute inset-0 w-0 bg-orange-600/10 transition-all duration-[250ms] ease-out group-hover:w-full opacity-100" />
            <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] group-hover:text-orange-100 transition-colors duration-300 flex items-center gap-2">
              LESS EXPLORE
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            {/* Bottom Glow: Orange */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#ea580c]" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomeAbout;