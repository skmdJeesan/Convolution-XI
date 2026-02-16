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
      className="relative w-full h-screen flex items-center justify-center bg-[#1A0F52] py-20 px-6 overflow-hidden"
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
          bg-[#34246B] border border-white rounded-full shadow-lg
          hover:bg-white hover:border-[#34246B] 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-white text-lg group-hover:text-[#34246B] group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-white group-hover:text-[#34246B] uppercase transition-colors duration-300">
          Return Home
        </span>
      </TransitionLink>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
        
        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/Inquizzitive/logo.png"
                alt="Inquizzitive Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
          “Does Your Gray Matter?”
Convolution XI proudly presents its classic quiz event, Inquizzitive - where curiosity meets
awareness. Designed to challenge and inspire, the quiz spans a diverse range of topics,
including pop culture, music, entertainment, literature, arts, sports, tech, and even the most
unexpectedly niche subjects. Emphasizing teamwork and collective thinking, Inquizzitive
promises every participant an engaging and intellectually stimulating experience.
Kindly note that this event is strictly a U-25 quiz.
        </p>

        <div className="mt-4">
          {session ? (
        //    user logged in
            <div className="flex items-center gap-2 px-8 py-3 bg-[#ffff]  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#34246B]">
                Registrations not started yet
              </span>
            </div>
          ) : (
            // didnt log in
            <TransitionLink
              href="/login"
              className="
shadow-white/70 hover:shadow-white/30  hover:bg-[#34246B] bg-[#ffff]  hover:text-white text-[#34246B] group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#ffffff] uppercase tracking-wide">
                Register Now
              </span>
            </TransitionLink>
          )}
        </div>

      </div>
    </section>
  );
}