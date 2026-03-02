"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
import { IoArrowBack } from "react-icons/io5";
import FlipLink from "@/components/FlipLink";
import { userData } from "@/context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function About() {
   const { data: session } = useSession();
   const contextData = useContext(userData);
   const router = useRouter();
   const [loading, setLoading] = useState(false);
 
   const eventName = "frames";
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
           className="hover:bg-[#ffff]  shadow-[#ffff] hover:shadow-[#fff]/90 bg-white hover:opacity-80 group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#1BA0E8] uppercase tracking-wide">
             <FlipLink>Login&nbsp;to&nbsp;Register</FlipLink>
           </span>
         </TransitionLink>
       );
     }
 
     if (isClosed) {
       return (
         <div className="flex items-center gap-2 px-8 py-3 bg-white  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#1BA0E8]">
             Registrations not started yet
           </span>
         </div>
       );
     }
 
     if (isRegistered) {
       return (
         <div className="flex items-center gap-2 px-8 py-3 bg-white  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#1BA0E8]">
             You have Registered for this Event
           </span>
         </div>
       );
     }
 
     return (
       <button
         onClick={handleSolo}
         disabled={loading}
         className="hover:bg-[#ffff]  shadow-[#ffff] hover:shadow-[#fff]/90 bg-white hover:opacity-80 group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#1BA0E8] uppercase tracking-wide">
           <FlipLink>{loading ? "Registering..." : "Register\u00A0Now"}</FlipLink>
         </span>
       </button>
     );
   };

  return (
    <section
      id="about"
      className="relative w-full h-screen flex items-center justify-center bg-[#1BA0E8] py-20 px-6 overflow-hidden"
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
          bg-white  backdrop-blur-md border border-white rounded-full shadow-lg
          hover:bg-[#1BA0E8] hover:border-white 
          group cursor-pointer overflow-hidden transition-all duration-300
        "
      >
        <IoArrowBack className="text-[#1BA0E8] text-lg group-hover:text-white group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#1BA0E8] group-hover:text-white uppercase transition-colors duration-300">
          <FlipLink>Return&nbsp;Home</FlipLink>
        </span>
      </TransitionLink>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
        
        {/* Logo */}
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/Frames/logo.png"
                alt="24 Frames Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
         Unleash your creativity in 24 Frames, an open-theme as well as a particular theme, also
present this time. A photography contest that invites participants to tell compelling stories
through their lenses. Submit your photographs along with captions and compete for both the
Judges’ Choice and People’s Choice awards. The top 24 entries will be shortlisted and
showcased for public voting. Participants are required to adhere strictly to the event
guidelines—original work only, with no plagiarism or watermarks. Let your lens do the talking.
        </p>

        <div className="mt-4">
          {RegisterBtn()}
        </div>

      </div>
    </section>
  );
}