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
    href: "#", // Parent item does not redirect
    subItems: [
      { href: "/#all-events", label: "All Events" },
      { href: "/#timeline", label: "Timeline" },
    ],
  },
  {
    label: "More",
    href: "#", // Parent item does not redirect
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

  const router = useRouter()
  
  // --- STATE FOR CLICK HANDLING ---
  // Tracks which dropdown is currently "locked" open by a click
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  // If user clicks anywhere else on the page, close the dropdown
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
      setIsVisible(false);
      setActiveDropdown(null); // Close dropdowns when nav hides
    }, 2400);
  };

  // scroll back to the top of the section when clicked
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

  // --- TOGGLE HANDLER ---
  const handleDropdownToggle = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the "click outside" listener from firing immediately
    
    // If clicking the same one that is open, close it. Otherwise, open it.
    setActiveDropdown(activeDropdown === label ? null : label);
  };

//  on refresh bring to the home page
useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // on scroll down make the navbar to be closed
  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      if (timerRef.current) clearTimeout(timerRef.current);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
        setActiveDropdown(null); // Close dropdown on scroll down
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
    <div className="fixed top-6 left-4 md:left-8 z-1000 pointer-events-auto transition-transform hover:scale-105 duration-300">
        <Link href="/"
        onClick={(e) => handleScroll(e, "/#home")}
        >
          <Image
            src={ConvoLogo}
            alt="convo logo"
            className="object-cover h-10 w-auto drop-shadow-xl"
          />
        </Link>
      </div>
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
                    // parent items with submenu
                    <div 
                      className={`
                        px-6 py-2 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1
                        ${activeDropdown === item.label ? "bg-white/10 text-white" : "hover:bg-white/10 hover:text-white"}
                      `}
                      // Toggle on click
                      onClick={(e) => handleDropdownToggle(e, item.label)}
                    >
                      <span><FlipLink >{item.label}</FlipLink></span>
                      <IoChevronDownOutline 
                        className={`
                          size-3 transition-transform duration-300 
                          /* Rotate if Active OR Group-Hovered */
                          ${activeDropdown === item.label ? "rotate-180" : "group-hover:rotate-180"}
                        `} 
                      />
                      
                      {/*submenu*/}
                      <div className={`
                        absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56
                        ${activeDropdown === item.label ? "block" : "hidden group-hover:block"}
                      `}>
                        <ul className="bg-black backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <div
                                onClick={(e) => handleScroll(e, sub.href)}
                                className="block px-4 py-3 hover:bg-white/5 rounded-xl transition-all text-center text-gray-300 hover:text-white tracking-wider text-[10px] cursor-pointer"
                              >
                                <FlipLink >{sub.label}</FlipLink>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    // Normal links
                    <div
                      onClick={(e) => handleScroll(e, item.href)}
                      className="block px-6 py-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:text-white cursor-pointer"
                    >
                      <FlipLink >{item.label}</FlipLink>
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
              <div className="hidden lg:flex gap-2 items-center">
                <div 
                  onClick={() => { router.push('/login')}}
                  className="py-3 px-5 rounded-full glass-btnn text-xs uppercase font-bold">
                  <FlipLink>Log&nbsp;in/Register</FlipLink>
                </div>
                {/* <div 
                onClick={() => { router.push('/register')}}
                className="py-2.5 px-6 rounded-full glass-btn text-sm font-semibold">
                  <FlipLink>Register&nbsp;now</FlipLink>
                </div> */}
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