"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ConvoLogo from "@/assets/images/Convologo.png";
import TransitionLink from "@/components/TransitionLink";
import { FaBell } from "react-icons/fa6";
import FlipLink from "@/components/FlipLink";
import Notifications from "@/components/Notification"; 

const ProfileNav = () => {
  const { data: session } = useSession();
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      console.log("User logged in");
    }
  }, [session]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1000] bg-black/5 border-b border-white/5 backdrop-blur-xl ">
        <div className="maxWidthForSections flex items-center justify-between px-4 py-[10px] md:py-4 w-full mx-auto">
          
          {/*Logo */}
          <div className="shrink-0 transition-transform hover:scale-105 duration-300 pointer-events-auto">
            <TransitionLink href="/">
              <Image
                src={ConvoLogo}
                alt="convo logo"
                className="object-contain h-9 w-auto md:h-10 drop-shadow-xl"
              />
            </TransitionLink>
          </div>

          {/* Right Side: Events & Notifications */}
          <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
            
            {/* Events Link - Pill Shape */}
            <TransitionLink 
              href="/#events" 
              className="text-white font-orbitron group relative px-6 py-2.5 rounded-full bg-fuchsia-700/80 hover:bg-fuchsia-600 border border-fuchsia-500/30 hover:border-fuchsia-400 backdrop-blur-xl shadow-[0_0_15px_rgba(192,38,211,0.4)] text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer"
            >
              <FlipLink>Events</FlipLink>
            </TransitionLink>
            
            {/* Mobile Notification Bell (Hidden on lg screens) */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="lg:hidden cursor-pointer relative flex items-center justify-center p-2.5  rounded-full bg-green-400/10 border border-white/20 hover:border-white hover:bg-green-400/20 transition-all group overflow-hidden">
                <FaBell className="block lg:hidden text-xl md:text-2xl text-cyan-300 group-hover:text-cyan-400 transition-colors" />           
                </button>
            
            {/* Desktop Notification Text Button - Pill Shape */}
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="hidden lg:block text-white font-orbitron group relative px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-400/30 hover:border-cyan-300 backdrop-blur-xl shadow-[0_0_15px_rgba(8,145,178,0.4)] text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer"
            >
              <FlipLink>Notifications</FlipLink>
            </button>

          </div>
        </div>
      </header>

      <Notifications
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </>
  );
};

export default ProfileNav;