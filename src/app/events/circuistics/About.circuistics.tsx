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
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#3122B1] to-[#150E4B] py-20 px-6 overflow-hidden"
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
          bg-[#150E4B]/80 backdrop-blur-md border border-[#3122B1] rounded-full shadow-lg
          hover:bg-[#3122B1] hover:border-white 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-white text-lg group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300">
          Return Home
        </span>
      </TransitionLink>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
        
        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/Circuistics/logo.png"
                alt="Circuistics Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
          Unleash your inner inventor and bring your most innovative electronics ideas to life. Circuistics
          is a circuit-solving and designing event where creativity meets technical knowledge. The event
          will consist of two rounds, the first round being circuit solving, and the second round being
          circuit designing. Also, the event is divided into two tiers based on the year of study for better
          evaluation. This event encourages innovation, hands-on learning, and excellence. Present your
          electronic masterpiece and compete for exciting prizes.

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
              className="
              hover:bg-[#3122B1] shadow-white hover:shadow-[#3122B1]   bg-white hover:opacity-90 text-[#3122B1] group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#3122B1] group-hover:text-white uppercase tracking-wide">
                Register Now
              </span>
            </TransitionLink>
          )}
        </div>

      </div>
    </section>
  );
}