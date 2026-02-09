"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { IoClose, IoPersonOutline, IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links, onLinkClick }) => {
  const [mounted, setMounted] = useState(false);

  const authButtonStyle = `
    relative group flex items-center justify-start gap-3 w-full px-6 py-3.5 
    rounded-full  tracking-widest Capitalize
    border border-white/10 bg-white/5 hover:bg-white/20 hover:border-white/40
    text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
  `;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
    const router = useRouter()
    const { data: session, status } = useSession();

  // If not mounted yet return nothing
  if (!mounted) return null;

  // render via Portal directly to document.body
  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-99999 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-62.5
          bg-linear-to-b from-black/90 via-[#0a0a0a]/95 to-black/90 
          backdrop-blur-xl shadow-2xl z-99999 
          overflow-hidden
          transform transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/*Gradients */}
        <div className="absolute -top-[5%] -right-[10%] w-80 h-120 bg-cyan-600/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[4%] -right-[20%] w-80 h-120 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] -left-[20%] w-80 h-120 bg-fuchsia-600/30 rounded-full blur-[120px] pointer-events-none" />

        {/*Main content*/}
        <div className="relative h-full flex flex-col p-5 md:p-8">
          
          {/*closing icon*/}
          <div className="flex justify-end mb-2">
            <button 
                onClick={onClose}
                className="group p-2 focus:outline-none"
            >
                <IoClose 
                    className={`text-4xl text-gray-400 group-hover:text-white transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
                    ${isOpen 
                        ? 'rotate-180 scale-100 opacity-100 delay-400' 
                        : 'rotate-0 scale-50 opacity-0 delay-0'}
                    `} 
                />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-start pl-2 pt-10">
            <ul className="flex flex-col gap-6 ">
              {links.map((item, index) => (
                <li key={index} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={(e) => onLinkClick(e, item.href)}
                    className={`font-orbitron block text-xl md:text-3xl tracking-wide  text-white
                      transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                      ${isOpen ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"}
                    `}
                    style={{ transitionDelay: isOpen ? `${400 + (index * 100)}ms` : '0ms' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
           {/* Separator */}
            <div 
              className={`h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-4 w-full transform transition-all duration-700 ${isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${200 + links.length * 50}ms` : "0ms" }}
            />

           {/* Auth Part */}
            <div className="flex flex-col gap-4 mt-4 pb-10">
              {session ? (
                // PROFILE BUTTON
                <div className="overflow-hidden">
                    <Link
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
                      <IoPersonOutline className="text-lg mb-0.5" />
                      <span className="font-orbitron text-lg">My Profile</span>
                    </Link>
                </div>
              ) : (
                // LOGIN / REGISTER BUTTONS
                <>
                  <div className="overflow-hidden">
                    <Link
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
                        <IoLogInOutline className="text-lg mb-0.5" />
                        <span className="font-orbitron text-lg">Login</span>
                    </Link>
                  </div>

                  <div className="overflow-hidden">
                    <Link
                        href="/register"
                        onClick={(e) => onLinkClick(e, "/register")}
                        className={`${authButtonStyle} bg-gray-300! text-black! border-transparent ${
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
                        <IoPersonAddOutline className="text-lg mb-0.5" />
                        <span className="font-orbitron text-lg">Register</span>
                    </Link>
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

export default MobileMenu;