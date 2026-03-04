"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TransitionLink from "@/components/TransitionLink";
import { IoArrowBack } from "react-icons/io5";
import FlipLink from "@/components/FlipLink";
import { userData } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function About() {
  const { data: session } = useSession();
  const contextData = useContext(userData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const eventName = "algomaniac";
  const isClosed = false; // Toggle this to true to shut down registrations

  const userEvents = contextData?.user?.eventsRegistered || [];
  const isRegistered = userEvents.some(
    (event: string) => event.toLowerCase() === eventName.toLowerCase()
  );

  const handleSolo = async () => {
    if (!contextData?.user?._id) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/solo", {
        eventName: eventName,
        leaderId: contextData.user._id,
        leaderEmail: contextData.user.email,
        leaderName: contextData.user.name,
      });

      toast.success(res.data.message || "Registration Confirmed!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const RegisterBtn = () => {
    if (!session) {
      return (
        <TransitionLink
          href="/login"
          className="shadow-white/70 hover:shadow-white/30  bg-[#0D30BB] hover:bg-green-400/70   group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
        >
          <span className="font-orbitron text-sm md:text-base font-bold group-hover:text-[#ffffff] text-[#ffffff] uppercase tracking-wide">
            <FlipLink>Login&nbsp;to&nbsp;Register</FlipLink>
          </span>
        </TransitionLink>
      );
    }

    if (isClosed) {
      return (
        <div className="flex items-center gap-2 px-8 py-3 bg-white backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
          <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#0D30BB]">
            Registrations not started yet
          </span>
        </div>
      );
    }

    if (isRegistered) {
      return (
        <div className="flex items-center gap-2 px-8 py-3 bg-white backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
          <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#0D30BB]">
            You have Registered for this Event
          </span>
        </div>
      );
    }

    return (
      <button
        onClick={handleSolo}
        disabled={loading}
        className="shadow-white/70 hover:shadow-white/30  bg-[#0D30BB] hover:bg-white/90   group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
      >
        <span className="font-orbitron text-sm md:text-base font-bold group-hover:text-[#041550] text-[#ffffff] uppercase tracking-wide">
          <FlipLink>{loading ? "Registering..." : "Register\u00A0Now"}</FlipLink>
        </span>
      </button>
    );
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center mt-50 md:mt-0 bg-transparent py-20 px-6 overflow-hidden"
    >
      {/* Subtle background dots
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div> */}

      {/* Glow effect */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Content Wrapper - Pushed to the right on desktop */}
      <div className="w-full max-w-7xl mx-auto flex justify-center md:justify-end z-10">

        {/* Inner Content - Takes up 55% width on desktop, 100% on mobile */}
        <div className="w-full md:w-[55%] flex flex-col items-center text-center gap-8 md:gap-10">

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

          {/* Description */}
          <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-2xl">
            An event focusing on competitive programming, this targets participants who wish to challenge their minds by engaging in solving puzzling problems and mind-boggling tasks by what engineers strive for – coding!
          </p>

          {/* Button */}
          <div className="mt-4">
            {RegisterBtn()}
          </div>

        </div>
      </div>
    </section>
  );
}