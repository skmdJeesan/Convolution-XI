"use client";
import React, { useState, useEffect, useRef } from "react";
import ConvoIcon from "../assets/images/HerosectionImages/ConvoSvg.svg";
import Image from "next/image";
import Link from "next/link";
import { IoClose, IoMenuOutline, IoChevronDownOutline } from "react-icons/io5";
import profileIcon from "@/assets/images/profileIcon.webp";

// ------------------- DATA -------------------

const desktopNavLinks = [
  { href: "/", label: "Home" },
  {
    label: "Events",
    href: "/#events",
    subItems: [
      { href: "/#all-events", label: "All Events" },
      { href: "/#timeline", label: "Timeline" },
    ],
  },
  { href: "/#contact", label: "Contact" },
  {
    label: "More",
    href: "#",
    subItems: [
      { href: "/#faq", label: "FAQ" },
      { href: "/#team", label: "Team" },
      { href: "/#sponsors", label: "Sponsors" },
    ],
  },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/#all-events", label: "Events" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contact", label: "Contact" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#team", label: "Team" },
  { href: "/#sponsors", label: "Previous Sponsors" },
];

// ------------------- COMPONENT -------------------

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef(0);

  const toggleNavigation = (): void => {
    setIsNavOpen((prevState) => !prevState);
  };

  // ------------------- SCROLL LOGIC -------------------
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // Scrolling DOWN -> Hide
      } else {
        setIsVisible(true);  // Scrolling UP -> Show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navVisibilityClass = isVisible || isNavOpen ? "translate-y-0" : "-translate-y-[150%]";

  return (
    <>
      {/* ---------------- 1. FIXED LOGO (ALWAYS VISIBLE) ---------------- */}
      {/* This is outside the moving container so it never hides */}
      <div className="fixed top-6 left-4 md:left-8 z-[1000] pointer-events-auto transition-transform hover:scale-105 duration-300">
        <Link href="/">
          <Image
            src={ConvoIcon}
            alt="convo logo"
            className="object-cover h-12 w-auto drop-shadow-xl"
          />
        </Link>
      </div>

      {/* ---------------- 2. SMART NAVBAR (HIDES ON SCROLL) ---------------- */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[999] p-4 pt-6 font-sans transition-transform duration-500 ease-in-out ${navVisibilityClass}`}
      >
        {/* Container: Changed justify-between to justify-end because Logo is gone from here */}
        <div className="maxWidthForSections w-full flex justify-end items-center mx-auto pointer-events-none">
          
          {/* ---------------- CENTER: GLASS PILL NAVBAR (Desktop) ---------------- */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <ul className="flex items-center gap-x-2 px-3 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-bold uppercase tracking-widest text-gray-200 ring-1 ring-white/10">
              {desktopNavLinks.map((item, index) => (
                <li key={index} className="relative group">
                  {item.subItems ? (
                    /* Dropdown Parent */
                    <div className="px-6 py-2 hover:bg-white/10  rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1 hover:text-white">
                      <span>{item.label}</span>
                      <IoChevronDownOutline className="size-3 group-hover:rotate-180 transition-transform duration-300" />
                      
                      {/* Glass Dropdown Menu */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 hidden group-hover:block w-56">
                        <ul className="bg-black backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={sub.href}
                                className="block px-4 py-3 hover:bg-white/20 rounded-xl transition-all text-center text-gray-300 hover:text-white tracking-wider text-[10px]"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    /* Standard Link */
                    <Link
                      href={item.href}
                      className="block px-6 py-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------- RIGHT: PROFILE & TOGGLE ---------------- */}
          <div className="flex items-center gap-4 pointer-events-auto z-50">
            <Link href="/profile" className="rounded-full relative group block">
              <div className="rounded-full border-2 border-white/20 overflow-hidden hover:border-white transition-colors shadow-lg shadow-white/10">
                <Image
                  src={profileIcon}
                  alt="profile icon"
                  height={45}
                  width={45}
                  className="object-cover"
                />
              </div>
            </Link>

            <button 
              onClick={toggleNavigation} 
              className="md:hidden text-white bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 active:scale-90 transition-all shadow-lg"
            >
              <IoMenuOutline className="size-6" />
            </button>
          </div>
        </div>

        {/* ---------------- MOBILE GLASS DRAWER ---------------- */}
        <div
          className={`${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) fixed top-0 right-0 w-full h-screen z-[1000] flex justify-end pointer-events-auto`}
          onClick={toggleNavigation} 
        >
          <div
            className="h-full w-full max-w-sm bg-[#0a0a0a]/80 backdrop-blur-3xl border-l border-white/10 flex flex-col py-8 px-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="relative flex justify-between items-center mb-12 border-b border-white/10 pb-6">
              <span className="text-white/50 text-sm font-bold tracking-widest uppercase">Menu</span>
              <IoClose
                className="size-12 text-white hover:text-orange-500/60 transition-all cursor-pointer bg-white/5 hover:bg-white/20 rounded-full p-2 border border-white/10"
                onClick={toggleNavigation}
              />
            </div>

            <ul className="flex flex-col gap-y-6">
              {mobileNavLinks.map((item, index) => (
                <li key={index} className="group">
                  <Link 
                    href={item.href} 
                    onClick={toggleNavigation}
                    className="flex items-center justify-between text-3xl font-black text-white/80 uppercase tracking-tight hover:text-orange-500/60 transition-all duration-300 group-hover:translate-x-4"
                  >
                    {item.label}
                    <span className="opacity-0 group-hover:opacity-100 text-lg transition-opacity duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
               <Link
                  href="/login"
                  onClick={toggleNavigation}
                  className="block w-full bg-white text-black py-4 rounded-full font-black uppercase tracking-widest text-center mt-4 hover:bg-gray-200 transition-all duration-300"
                >
                  Login
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;