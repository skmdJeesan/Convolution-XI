"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ConvoLogo from "@/assets/images/Convologo.png";
import TransitionLink from "@/components/TransitionLink";
import { FaBell } from "react-icons/fa6";
import FlipLink from "@/components/FlipLink";
import Notifications from "@/components/Notification"; 
import { userData } from "@/context/UserContext";

const ProfileNav = () => {
  const { data: session } = useSession();
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(true);
  
  const dbNotifications = useContext(userData)?.notifications || [];
  const hasUnread = dbNotifications.some((n) => !n.read);
  const showRedDot = hasUnread || !hasSeenWelcome;

  useEffect(() => {
    const seen = sessionStorage.getItem("hasSeenWelcomeNotifs");
    if (!seen) {
      setHasSeenWelcome(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      console.log("User logged in");
    }
  }, [session]);

  // Handle opening notifications and marking static welcome as seen
  const handleOpenNotif = () => {
    setIsNotifOpen(true);
    if (!hasSeenWelcome) {
      sessionStorage.setItem("hasSeenWelcomeNotifs", "true");
      setHasSeenWelcome(true);
    }
  };

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

          <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
            
            <TransitionLink 
              href="/#events" 
              className="text-white font-orbitron group relative px-6 py-2.5 rounded-full bg-fuchsia-700/80 hover:bg-fuchsia-600 border border-fuchsia-500/30 hover:border-fuchsia-400 backdrop-blur-xl shadow-[0_0_15px_rgba(192,38,211,0.4)] text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer"
            >
              <FlipLink>Events</FlipLink>
            </TransitionLink>
            
            <button
              onClick={handleOpenNotif}
              className="lg:hidden cursor-pointer relative flex items-center justify-center p-2.5  rounded-full bg-green-400/10 border border-white/20 hover:border-white hover:bg-green-400/20 transition-all group overflow-hidden">
                <FaBell className="block lg:hidden text-xl md:text-2xl text-cyan-300 group-hover:text-cyan-400 transition-colors" />  
                 {showRedDot && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
                  )}         
                </button>
            
            <button 
              onClick={handleOpenNotif}
              className="hidden lg:block text-white font-orbitron group relative px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-400/30 hover:border-cyan-300 backdrop-blur-xl shadow-[0_0_15px_rgba(8,145,178,0.4)] text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer"
            >
              <FlipLink>Notifications</FlipLink>
              {showRedDot && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.8)] border border-[#06091f]"></span>
              )}
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