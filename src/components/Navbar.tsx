"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenuOutline, IoChevronDownOutline } from "react-icons/io5";
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import MobileMenu from "./MobileMenu"; 
import FlipLink from "./FlipLink";
import { useSession } from "next-auth/react";


const desktopNavLinks = [
  { href: "/#home", label: "Home" },
  { label: "About", href: "/#about" },
  {
    label: "Events",
    href: "/#",
    subItems: [
      { href: "/#all-events", label: "All Events" },
      { href: "/#timeline", label: "Timeline" },
    ],
  },
  {
    label: "More",
    href: "#",
    subItems: [
      { href: "/#faq", label: "FAQ" },
      { href: "/#team", label: "Team" },
      { href: "/#sponsors", label: "Sponsors" },
      { href: "/#contact", label: "Let's Connect" },
    ],
  },
];

const mobileNavLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#all-events", label: "Events" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contact", label: "Contact" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#team", label: "Team" },
  { href: "/#sponsors", label: "Sponsors" },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  //const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const { data: session, status } = useSession();

  useEffect(() => {
    // this runs on every render safely
    if (session) {
      console.log("User logged in");
    }
  }, [session]);

  // if (status === "loading") {
  //   return null; // or skeleton
  // }

  const toggleNavigation = (): void => {
    setIsNavOpen((prevState) => !prevState);
  };

  const startHideTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2400);
  };

  const handleScroll = (e: React.MouseEvent<HTMLElement, MouseEvent>, href: string) => {
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

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      if (timerRef.current) clearTimeout(timerRef.current);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
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

  const navVisibilityClass = isVisible || isNavOpen ? "translate-y-0" : "-translate-y-[150%]";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-999 p-4 pt-6 font-sans transition-transform duration-500 ease-in-out ${navVisibilityClass}`}
        onMouseEnter={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          startHideTimer();
        }}
      >
        <div className="w-full flex justify-end items-center mx-auto pointer-events-none">
          {/* DESKTOP NAV */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <ul className="flex items-center gap-x-2 px-3 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-bold uppercase tracking-widest text-gray-200 ring-1 ring-white/10">
              {desktopNavLinks.map((item, index) => (
                <li key={index} className="relative group">
                  {item.subItems ? (
                    <div className="px-6 py-2 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1 hover:text-white">
                      <span><FlipLink href="">{item.label}</FlipLink></span>
                      <IoChevronDownOutline className="size-3 group-hover:rotate-180 transition-transform duration-300" />
                      
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 hidden group-hover:block w-56">
                        <ul className="bg-black backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <div
                                onClick={(e) => handleScroll(e, sub.href)}
                                className="block px-4 py-3 hover:bg-white/20 rounded-xl transition-all text-center text-gray-300 hover:text-white tracking-wider text-[10px]"
                              >
                                <FlipLink href={sub.href}>{sub.label}</FlipLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={(e) => handleScroll(e, item.href)}
                      className="block px-6 py-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:text-white"
                    >
                      <FlipLink href={item.href}>{item.label}</FlipLink>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Profile and Toggle */}
          <div className="flex items-center gap-4 pointer-events-auto z-50">
            {session ? (
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
            ) : (
              <div className="flex gap-2 items-center">
                <div className="py-2.5 px-6 rounded-full glass-btn text-sm">
                  <FlipLink href="/login">Log in</FlipLink>
                </div>
                <div className="py-2.5 px-6 rounded-full glass-btn text-sm">
                  <FlipLink href="/register">Register&nbsp;now</FlipLink>
                </div>
              </div>
            )}

            <button
              onClick={toggleNavigation}
              className="md:hidden text-white bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 active:scale-90 transition-all shadow-lg hover:bg-white/20"
            >
              <IoMenuOutline className="size-6" />
            </button>
          </div>
        </div>

        {/* ---------------- MOBILE SIDEBAR COMPONENT ---------------- */}
        <MobileMenu 
          isOpen={isNavOpen} 
          onClose={() => setIsNavOpen(false)} 
          links={mobileNavLinks} 
          onLinkClick={handleScroll}
        />
        
      </div>
    </>
  );
};

export default Navbar;