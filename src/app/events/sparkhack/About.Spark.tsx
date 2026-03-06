"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
import { IoArrowBack } from "react-icons/io5";
import logo from "@/assets/images/Sparkhack/Sparkhack logo.webp";
import FlipLink from "@/components/FlipLink";
import { userData } from "@/context/UserContext";


export default function About() {
  const { data: session } = useSession();
  const contextData = useContext(userData);
  const eventName = "sparkhack";
  const eventMode = "team";
  const isClosed = false; // Toggle this to true to shut down registrations

  const userEvents = contextData?.user?.eventsRegistered || [];
  const isRegistered = userEvents.some(
    (event: string) => event.toLowerCase() === eventName.toLowerCase()
  );

  const RegisterBtn = () => {
    if (!session) {
      return (
        <TransitionLink
          href="/login"
          className="
              group
              shadow-white/40 hover:bg-white  hover:text-shadow-light hover:opacity-90 bg-[#2c9bac]  group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
        >
          <span className="font-orbitron text-sm md:text-base font-bold text-[#ffffff] group-hover:text-[#77ccd8] uppercase tracking-wide">
            <FlipLink>Login&nbsp;to&nbsp;Register</FlipLink>
          </span>
        </TransitionLink>
      );
    }

    if (isClosed) {
      return (
        <div className="flex items-center gap-2 px-8 py-3 bg-[#2c9bac] backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
          <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-white">
            Registrations not started yet
          </span>
        </div>
      );
    }

    if (isRegistered) {
      return (
        <div className="flex items-center gap-2 px-8 py-3 bg-[#2c9bac] backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
          <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-white">
            You have Registered for this Event
          </span>
        </div>
      );
    }

    return (
      <Link
        href={`https://unstop.com/o/0u4ctEr?lb=qFLMX5O&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Debaradh9719`}
        target="_blank"
        className="
              group
              shadow-white/40 hover:bg-white  hover:text-shadow-light hover:opacity-90 bg-[#2c9bac]  group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
      >
        <span className="font-orbitron text-sm md:text-base font-bold text-[#ffffff] group-hover:text-[#77ccd8] uppercase tracking-wide">
          <FlipLink>Register&nbsp;Now</FlipLink>
        </span>
      </Link>
    );
  };

  return (
    <section
      id="about"
      className="relative w-full h-screen flex items-center justify-center bg-transparent pt-20 px-6 pb-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* <TransitionLink
        href="/"
        className="
          absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-3 
          bg-[#e5ecee] border border-white rounded-full shadow-lg
          hover:bg-[#2CB1DF] hover:border-white 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-[#2CB1DF] text-lg group-hover:text-white group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#2CB1DF] group-hover:text-white uppercase transition-colors duration-300">
          <FlipLink>Return&nbsp;Home</FlipLink>
        </span>
      </TransitionLink> */}

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">

        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
          <Image
            src={logo}
            alt="SparkHack Logo"
            fill
            className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
            priority
          />
        </div>

        <p className="font-rajdhani text-slate-800 sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-sm max-w-3xl">
          SparkHack is Eastern India’s flagship hackathon, focused on engineering technological
          solutions to real-world challenges. The event brings together teams to ideate, design, and build
          impactful prototypes with strong relevance in the real world. Participants present their ideas
          before a panel of renowned academicians and industry experts, gaining valuable feedback and
          exposure. If you have an idea that could drive meaningful change, SparkHack is the platform to
          turn that spark into innovation.

        </p>

        <div className="mt-4">
          {RegisterBtn()}
        </div>

      </div>
    </section>
  );
}