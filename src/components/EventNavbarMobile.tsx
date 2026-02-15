"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { IoClose, IoPersonOutline, IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import TransitionLink from "./TransitionLink";

interface MobileMenuProps {
  navTheme?: string; 
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const EventMobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links, onLinkClick, navTheme }) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession(); 

  const authButtonStyle = `
    relative group flex items-center justify-start gap-3 w-full px-6 py-3.5 
    rounded-full  tracking-widest Capitalize
    border border-white/10 bg-white/5 hover:bg-white/20 hover:border-white/40
    text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
  `;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      
      document.body.style.touchAction = "none";

      return () => {
        // Cleanup: Restore styles
        document.documentElement.style.overflow = "";
        document.body.style.overflow = ""; // or originalOverflow
        document.body.style.touchAction = "";
      };
    }
  }, [isOpen]);

  // If not mounted yet return nothing
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true" 
        // Prevent scroll propagation on the backdrop itself
        onTouchMove={(e) => e.preventDefault()} 
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-dvh w-64 md:w-80
          bg-linear-to-b from-black/95 via-[#0a0a0a]/95 to-black/95 
          backdrop-blur-2xl shadow-2xl z-99999 
          overflow-y-auto overflow-x-hidden
          transform transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradients / Theme Handling */}
        {navTheme ? (
           // If navTheme is provided, it overwrites the defaults
           <div className={`absolute inset-0 pointer-events-none ${navTheme}`}></div>
        ) : (
           // Default Gradients
           <>
             <div className="absolute -top-[5%] -right-[10%] w-80 h-120 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />
             <div className="absolute bottom-[4%] -right-[20%] w-80 h-120 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />
             <div className="absolute top-[40%] -left-[20%] w-80 h-120 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />
           </>
        )}

        {/* Main content */}
        <div className="relative h-full flex flex-col p-6 md:p-8">
          
          {/* Closing Icon */}
          <div className="flex justify-end mb-6">
            <button 
                onClick={onClose}
                className="group p-2 focus:outline-none rounded-full hover:bg-white/10 transition-colors"
            >
                <IoClose 
                    className={`text-3xl md:text-4xl text-gray-400 group-hover:text-white transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
                    ${isOpen 
                        ? 'rotate-180 scale-100 opacity-100 delay-300' 
                        : 'rotate-0 scale-50 opacity-0 delay-0'}
                    `} 
                />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-start pt-4 md:pt-8 overflow-y-auto no-scrollbar">
            <ul className="flex flex-col gap-6 md:gap-8">
              {links.map((item, index) => (
                <li key={index} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={(e) => onLinkClick(e, item.href)}
                    className={`font-orbitron font-bold block text-xl md:text-2xl tracking-wider text-white/90 hover:text-cyan-400 transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                      ${isOpen ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"}
                    `}
                    style={{ transitionDelay: isOpen ? `${300 + (index * 100)}ms` : '0ms' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Separator */}
            <div 
              className={`h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-8 w-full transform transition-all duration-700 ${isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${200 + links.length * 50}ms` : "0ms" }}
            />

            
            <div className="flex flex-col gap-4 pb-8">
              {session ? (
                // PROFILE BUTTON
                <div className="overflow-hidden">
                  
                    <TransitionLink
                      href="/profile"
                      onClick={(e) => onLinkClick(e, "/profile")}
                      className={`${authButtonStyle} ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpen
                          ? `${200 + (links.length + 1) * 50}ms`
                          : "0ms",
                      }}
                    >
                      <IoPersonOutline className="text-xl mb-0.5" />
                      <span className="font-orbitron text-sm font-bold uppercase">My Profile</span>
                    </TransitionLink>
                </div>
              ) : (
                // LOGIN / REGISTER BUTTONS
                <>
                  <div className="overflow-hidden">
                    <TransitionLink
                        href="/login"
                        onClick={(e) => onLinkClick(e, "/login")}
                        className={`${authButtonStyle} ${
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                        style={{
                        transitionDelay: isOpen
                            ? `${200 + (links.length + 1) * 50}ms`
                            : "0ms",
                        }}
                    >
                        <IoLogInOutline className="text-xl mb-0.5" />
                        <span className="font-orbitron text-sm font-bold uppercase">Login</span>
                    </TransitionLink>
                  </div>

                  <div className="overflow-hidden">
                    <TransitionLink
                        href="/register"
                        onClick={(e) => onLinkClick(e, "/register")}
                        className={`${authButtonStyle} bg-gray-100! hover:bg-white!  text-black! border-transparent ${
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                        style={{
                        transitionDelay: isOpen
                            ? `${200 + (links.length + 2) * 50}ms`
                            : "0ms",
                        }}
                    >
                        <IoPersonAddOutline className="text-xl mb-0.5" />
                        <span className="font-orbitron text-sm font-bold uppercase">Register</span>
                    </TransitionLink>
                  </div>
                </>
              )}
            </div>
          </nav>

        </div>
      </div>
    </>,
    document.body 
  );
};

export default EventMobileMenu;