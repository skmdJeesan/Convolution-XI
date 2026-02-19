"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
import { IoArrowBack } from "react-icons/io5";

export default function About() {
  const { data: session } = useSession();

  return (
    <section
      id="about"
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#0D30BB] to-[#2a237e] py-20 px-6 overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      ></div>

      <TransitionLink 
        href="/" 
       className="
          absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-3 
          bg-[#0D30BB] border border-white/50 rounded-full shadow-lg
          hover:bg-white hover:border-[#0D30BB] 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-white text-lg group-hover:text-[#0D30BB] group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-white group-hover:text-[#0D30BB] uppercase transition-colors duration-300">
          Return Home
        </span>
      </TransitionLink>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
        
        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/Algomaniac/logo.png"
                alt="Algomaniac Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
          An event focusing on competitive programming, this targets participants who wish to challenge their minds by engaging in solving puzzling problems and mind-boggling tasks by what engineers strive for – coding!
        </p>

        <div className="mt-4">
          {session ? (
        //    user logged in
            <div className="flex items-center gap-2 px-8 py-3 bg-white backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#0D30BB]">
                Registrations not started yet
              </span>
            </div>
          ) : (
            // didnt log in
            <TransitionLink
              href="/login"
              className="shadow-white/70 hover:shadow-white/30  bg-[#0D30BB] hover:bg-white/90   group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold group-hover:text-[#041550] text-[#ffffff] uppercase tracking-wide">
                Register Now
              </span>
            </TransitionLink>
          )}
        </div>

      </div>
    </section>
  );
}