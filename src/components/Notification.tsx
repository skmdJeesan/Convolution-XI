"use client";

import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FlipLink from "./FlipLink";
import { userData } from "@/context/UserContext";
import axios from "axios";

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Notifications({ isOpen, onClose }: NotificationProps) {
  // get notifications from context
  const contextData = useContext(userData);
  const userName = contextData?.user?.name; 
  const dbNotifications = contextData?.notifications || []; 

  // const notifications
  const static_notifications = [
    {
      id: "static-1",
      title: "System Update",
      message: <>Hey <span className="font-bold text-fuchsia-400">{userName}</span> 👋, Welcome to <span className="font-bold text-cyan-400">Convolution26</span>  !</> ,
    },
    {
      id: "static-2",
      title: "important",
      message: <>Kindly check your spam folder for the{" "}
                        <span className="font-bold">confirmation email</span>{" "}
                        and mark it as{" "}
                        <span className="font-bold">&apos;Not Spam&apos;</span>{" "}
                        for future updates.</>,
    },
  ];

  // get the user notifications
  const dynamic_notifications = dbNotifications.map((notif: any) => ({
    id: notif._id,
    title: notif.type,
    message: notif.message,
  }));

  // adding dyanamics below static
  const notification_data = [...static_notifications, ...dynamic_notifications];

  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => {
        requestAnimationFrame(() => setIsVisible(true));
      }, 10);
      
      //mark as read logic
      const hasUnread = dbNotifications.some((n: any) => n.read === false);
      
      if (hasUnread && contextData?.setNotifications) {
        axios.patch('/api/notifications').catch(err => console.error(err));
        
        const updatedNotifs = dbNotifications.map((n: any) => ({ ...n, read: true }));
        contextData.setNotifications(updatedNotifs);
      }

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dbNotifications, contextData]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!mounted || !isRendered) return null;

  return createPortal(
    <>
      {/* background blur */}
      <div 
        className={`fixed inset-0 bg-[#03050a]/80 backdrop-blur-lg md:backdrop-blur-xl z-99998 transition-opacity duration-500 ease-out ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
        onTouchMove={(e) => e.preventDefault()}
      />

      {/*main */}
      <div 
        className={`fixed inset-0 z-99999 flex items-center justify-center pointer-events-none`}
      >
        <div 
          className={`relative flex flex-col w-[90vw] md:w-[60vw] max-w-2xl h-[65vh] bg-[#06091f]/20 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transform transition-all duration-500 shadow-[0_0_60px_-15px_rgba(0,243,255,0.2)] will-change-transform
            ${isVisible ? "scale-100 opacity-100 translate-y-0 pointer-events-auto" : "scale-95 opacity-0 translate-y-8 pointer-events-none"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"></div>

          {/*Header*/}
          <div className="pt-8 pb-5 px-8 shrink-0 text-center border-b border-white/5">
            <h2 className="font-orbitron text-2xl md:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] uppercase drop-shadow-md">
              Notifications
            </h2>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent transform-gpu"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {notification_data.length === 0 ? (
              <div className="flex h-full items-center justify-center text-gray-400 font-rajdhani text-lg tracking-wide">
                No new notifications.
              </div>
            ) : (
              notification_data.map((notif, index) => (
                <div
                  key={`${notif.id}-${index}`}
                  className="group relative px-5 py-2.5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:bg-white/[0.04]"
                >
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400 shadow-[0_0_12px_rgba(0,243,255,0.6)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/*notifications*/}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-rajdhani font-semibold text-lg tracking-wide text-purple-400 uppercase">
                          {notif.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm md:text-base font-rajdhani font-medium leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-300">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* close*/}
          <div className="mt-auto shrink-0 p-4 border-t border-white/5">
            <button 
              onClick={onClose}
              className="cursor-pointer w-full py-4 rounded-2xl bg-white/[0.08] md:bg-white/[0.03] hover:bg-white/[0.08] text-white md:text-gray-200 hover:text-white font-orbitron font-semibold tracking-[0.2em] uppercase text-sm md:text-sm transition-colors duration-300"
            >
              <FlipLink>Close&nbsp;Panel</FlipLink>
            </button>
          </div>

        </div>
      </div>
    </>,
    document.body 
  );
}