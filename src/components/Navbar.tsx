"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMenuOutline, IoChevronDownOutline } from "react-icons/io5";
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import MobileMenu from "./MobileMenu";
import FlipLink from "./FlipLink";
import { useSession } from "next-auth/react";
import ConvoLogo from "../assets/images/Convologo.png";

const desktopNavLinks = [
  { href: "/#home", label: "Home" },
  { label: "About", href: "/#about" },
  {
    label: "Events",
    href: "#",
    subItems: [
      { href: "/#all-events", label: "All Events" },
      { href: "/#timeline", label: "Timeline" },
    ],
  },
  {
    label: "More",
    href: "#",
    subItems: [
      { href: "/#team", label: "Team" },
      { href: "/#sponsors", label: "Sponsors" },
      { href: "/#gallery", label: "Gallery" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Let's Connect" },
    ],
  },
];

const mobileNavLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#all-events", label: "Events" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#team", label: "Team" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Let's Connect" },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("User logged in");
    }
  }, [session]);

  useEffect(() => {
    const closeDropdown = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", closeDropdown);
    }
    return () => document.removeEventListener("click", closeDropdown);
  }, [activeDropdown]);

  const toggleNavigation = (): void => {
    setIsNavOpen((prevState) => !prevState);
  };

  const startHideTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (window.innerWidth >= 768) {
        setIsVisible(false);
        setActiveDropdown(null);
      }
    }, 2400);
  };

  const handleScroll = (e: React.MouseEvent<HTMLElement, MouseEvent>, href: string) => {
    if (href === "#") {
      e.preventDefault();
      return;
    }
    setActiveDropdown(null);

    if (href.includes("#")) {
      const targetId = href.substring(href.indexOf("#"));
      const targetPath = href.substring(0, href.indexOf("#"));
      const isCurrentPage = targetPath === "" || targetPath === pathname || (targetPath === "/" && pathname === "/");

      if (isCurrentPage) {
        e.preventDefault();
        const elem = document.querySelector(targetId);

        if (elem) {
          if (isNavOpen) setIsNavOpen(false);
          const offset = 0;
          const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        setIsNavOpen(false);
      }
    } else {
      setIsNavOpen(false);
    }
  };

  const handleDropdownToggle = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      if (timerRef.current) clearTimeout(timerRef.current);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
        setActiveDropdown(null);
      } else {
        setIsVisible(true);
        startHideTimer();
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    startHideTimer();

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const navVisibilityClass = isVisible || isNavOpen 
    ? "translate-y-0" 
    : "md:-translate-y-full translate-y-0"; 

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-1000 
          transition-transform duration-500 ease-in-out
          ${navVisibilityClass}
          bg-black/20 backdrop-blur-xl border-b border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none
        `}
        onMouseEnter={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          startHideTimer();
        }}
      >
        <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-6 w-full maxWidthForSections mx-auto">
          
          {/*Logo*/}
          <div className="shrink-0 transition-transform hover:scale-105 duration-300 pointer-events-auto">
            <Link href="/" onClick={(e) => handleScroll(e, "/#home")}>
              <Image
                src={ConvoLogo}
                alt="convo logo"
                className="object-contain h-9 w-auto md:h-10 md:drop-shadow-xl"
              />
            </Link>
          </div>
          {/* center navbar */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <ul className="flex items-center gap-x-2 px-2 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-bold uppercase tracking-widest text-gray-200 ring-1 ring-white/10">
              {desktopNavLinks.map((item, index) => (
                <li key={index} className="relative group">
                  {item.subItems ? (
                    <div
                      className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1 ${activeDropdown === item.label ? "bg-white/10 text-white" : "hover:bg-white/10 hover:text-white"}`}
                      onClick={(e) => handleDropdownToggle(e, item.label)}
                    >
                      <span className="font-orbitron"><FlipLink>{item.label}</FlipLink></span>
                      <IoChevronDownOutline className={`size-3 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : "group-hover:rotate-180"}`} />
                      
                      {/* Submenu */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 ${activeDropdown === item.label ? "block" : "hidden group-hover:block"}`}>
                        <ul className="bg-black backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <div onClick={(e) => handleScroll(e, sub.href)} className="font-orbitron block px-4 py-3 hover:bg-white/5 rounded-xl transition-all text-center text-gray-300 hover:text-white tracking-wider text-[10px] cursor-pointer">
                                <FlipLink>{sub.label}</FlipLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div onClick={(e) => handleScroll(e, item.href)} className="font-orbitron block px-6 py-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:text-white cursor-pointer">
                      <FlipLink>{item.label}</FlipLink>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 pointer-events-auto">
            {/* profile */}
            {session ? (
              <Link href="/profile" className="rounded-full relative group block">
                <div className="rounded-full border-2 border-white/20 overflow-hidden hover:border-white transition-colors shadow-lg shadow-white/10">
                  <Image
                    src={profileIcon}
                    alt="profile icon"
                    height={40}
                    width={40}
                    className="object-cover md:h-[45px] md:w-[45px]"
                  />
                </div>
              </Link>
            ) : (
              // Login-register
              <div className="hidden lg:flex gap-3 items-center">
                <div onClick={() => router.push("/login")} className="font-orbitron group relative px-4 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#05080f] backdrop-blur-xl shadow-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer">
                  <FlipLink>Log in</FlipLink>
                </div>
                <div onClick={() => router.push("/register")} className="font-orbitron group relative px-4 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 text-[#05080f] backdrop-blur-xl shadow-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out cursor-pointer">
                  <FlipLink>Register</FlipLink>
                </div>
              </div>
            )}

            {/* Humberger */}
            <button
              onClick={toggleNavigation}
              className="lg:hidden text-white bg-transparent p-2.5 rounded-full backdrop-blur-md  active:scale-90 transition-all shadow-lg"
            >
              <IoMenuOutline className="size-9" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MOBILE SIDEBAR COMPONENT ---------------- */}
      <MobileMenu
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        links={mobileNavLinks}
        onLinkClick={handleScroll}
      />
    </>
  );
};

export default Navbar;