"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links, onLinkClick }) => {
  
  // Lock body scroll when menu is open
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

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) fixed top-0 right-0 w-full h-screen z-[1000] flex justify-end pointer-events-auto`}
      onClick={onClose}
    >
      <div
        className="min-h-[50%] w-full max-w-sm bg-[#050505]/95 backdrop-blur-sm  flex flex-col py-8 px-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative flex justify-between items-center mb-10 border-b border-white/10 pb-6 z-10">
          <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">Menu</span>
          <button className="group relative" onClick={onClose}>
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <IoClose className="size-10 text-white hover:text-white transition-transform duration-500 group-hover:rotate-90 relative z-10" />
          </button>
        </div>

        
        <ul className="flex flex-col items-end gap-y-[0.5] z-10 overflow-y-auto pr-[130px]">
          {links.map((item, index) => (
            <li
              key={index}
              className="group transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
              }}
            >
              <Link
                href={item.href}
                onClick={(e) => onLinkClick(e, item.href)}
                className="flex items-center justify-between py-3 text-3xl text-gray-300 "
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mt-10 ml-[50px] z-10 transition-all duration-500 ease-out"
          style={{
            transitionDelay: isOpen ? `${links.length * 50}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(5px)",
          }}
        >
          <Link
            href="/login"
            onClick={onClose}
            className="group relative block w-[60%] text-center overflow-hidden rounded-full p-[1px]"
          >
            <span className="absolute inset-0 bg-cyan-700  opacity-70 group-hover:opacity-100 animate-gradient-xy transition-opacity" />
            <div className="relative bg-black rounded-full py-4 transition-colors group-hover:bg-black/80">
              <span className="font-bold uppercase tracking-[0.2em] text-sm text-white group-hover:scale-105 inline-block transition-transform duration-300">
                Login
              </span>
            </div>
          </Link>
        </div>

        <div
          className="mt-5 ml-[50px] z-10 transition-all duration-500 ease-out"
          style={{
            transitionDelay: isOpen ? `${links.length * 50}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(5px)",
          }}
        >
          <Link
            href="/register"
            onClick={onClose}
            className="group relative block w-[60%] text-center overflow-hidden rounded-full p-[1px]"
          >
            <span className="absolute inset-0 bg-cyan-700  opacity-70 group-hover:opacity-100 animate-gradient-xy transition-opacity" />
            <div className="relative bg-black rounded-full py-4 transition-colors group-hover:bg-black/80">
              <span className="font-bold uppercase tracking-[0.2em] text-sm text-white group-hover:scale-105 inline-block transition-transform duration-300">
                Register
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;