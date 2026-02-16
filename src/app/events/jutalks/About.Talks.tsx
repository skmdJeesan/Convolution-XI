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
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#DDA6BC] via-[#E691B2] 
        via-[#ED7EAA] to-[#CB6990] py-20 px-6 overflow-hidden"
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
          bg-[#512511] border border-[#FCF0C4] rounded-full shadow-xl
          hover:bg-[#FCF0C4] hover:border-[#512511] 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-[#FCF0C4] text-lg group-hover:text-[#512511] group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#FCF0C4] group-hover:text-[#512511] uppercase transition-colors duration-300">
          Return Home
        </span>
      </TransitionLink>


      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
        
        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/JU Talks/logo.png"
                alt="JU Talks Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
          JU Talks is a panel discussion that brings together distinguished voices from across disciplines
— educationalists, industrial leaders, innovators, artists, and celebrated personalities. In a
candid and thought-provoking conversation, the panel delves into ideas that challenge
conventions and influence the future. Blending insight with lived experience, the event creates a
space where perspectives collide, dialogue thrives, and the audience walks away inspired,
informed, and empowered.

        </p>

        <div className="mt-4">
          {session ? (
        //    user logged in
            <div className="flex items-center gap-2 px-8 py-3 bg-[#FCF0C4]  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#512511]">
                Registrations not started yet
              </span>
            </div>
          ) : (
            // didnt log in
            <TransitionLink
              href="/login"
              className="
hover:bg-[#FCF0C4] shadow-[#FCF0C4] hover:shadow-[#512511]  bg-[#512511] hover:opacity-90 text-[#FCF0C4] hover:text-[#512511] group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold uppercase tracking-wide">
                Register Now
              </span>
            </TransitionLink>
          )}
        </div>

      </div>
    </section>
  );
}