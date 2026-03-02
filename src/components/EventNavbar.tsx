"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoMenuOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import MobileMenu from "./EventNavbarMobile";
import FlipLink from "./FlipLink";
import { useSession } from "next-auth/react";
import ConvoLogo from "../assets/images/Convologo.png";
import TransitionLink from "./TransitionLink";
import Notifications from "./Notification";
import { userData } from "@/context/UserContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#rules", label: "Rules" },
  { href: "#timeline", label: "Timeline" },
  { href: "#judges", label: "Judges" },
  // { href: "#prizes", label: "Prizes" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];
interface EventNavProps {
  navTheme?: string;
}

const EventNav: React.FC<EventNavProps> = ({ navTheme }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  
  // Notification States
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(true);
  
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const contextData = useContext(userData);
  const dbNotifications = contextData?.notifications || [];
  const hasUnread = dbNotifications.some((n: any) => !n.read);
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

  const toggleNavigation = (): void => {
    setIsNavOpen((prevState) => !prevState);
  };

  // Open Notification Handler
  const handleOpenNotif = () => {
    setIsNotifOpen(true);
    if (!hasSeenWelcome) {
      sessionStorage.setItem("hasSeenWelcomeNotifs", "true");
      setHasSeenWelcome(true);
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLElement, MouseEvent>, href: string) => {
    if (href === "/") {
      e.preventDefault();
      router.push("/");
      setIsNavOpen(false);
      return;
    }
    if (href === "#") {
      e.preventDefault();
      return;
    }

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-1000 bg-black/10 backdrop-blur-md border-b border-white/10 text-white">
        <div className="flex items-center justify-between px-4 py-[10px] md:py-3 w-full maxWidthForSections mx-auto">
          
          <div className="shrink-0 transition-transform hover:scale-105 duration-300 cursor-pointer">
            <TransitionLink href="/" onClick={(e) => handleScroll(e, "/#home")}>
              <Image
                src={ConvoLogo}
                alt="convo logo"
                className="object-contain h-9 w-auto md:h-10 md:drop-shadow-xl"
              />
            </TransitionLink>
          </div>

          {/*for large screen*/}
          <ul className="hidden lg:flex items-center gap-x-5 xl:gap-x-7 text-sm font-bold uppercase tracking-wide text-white">
            {navLinks.map((item, index) => (
              <li key={index}>
                <div onClick={(e) => handleScroll(e, item.href)} className="cursor-pointer font-orbitron">
                  <FlipLink>{item.label}</FlipLink>
                </div>
              </li>
            ))}
            
            {session && (
              <>
                {/* Desktop Notification Button */}
                <li>
                  <button
                  onClick={handleOpenNotif}
                  className="hidden  cursor-pointer relative lg:flex items-center justify-center rounded-full  transition-all group "
                >
                  <FaBell className="text-xl md:text-2xl text-yellow-400 group-hover:text-yellow-500 group-hover:scale-105 transition-colors" />
                  {showRedDot && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 z-100 rounded-full animate-pulse"></span>
                  )}
                </button>

                </li>
                
                {/* Desktop Profile Icon */}
                <li>
                  <TransitionLink href="/profile" className="rounded-full relative group block">
                    <div className="rounded-full border border-white/20 overflow-hidden hover:border-white transition-colors">
                      <Image
                        src={profileIcon}
                        alt="profile icon"
                        height={40}
                        width={40}
                        className="object-cover md:h-10 md:w-10"
                      />
                    </div>
                  </TransitionLink>
                </li>
              </>
            )}
          </ul>

          {/* mobile */}
          <div className="flex lg:hidden items-center gap-4">
            {session && (
              <div className="flex gap-3 items-center">
                <button
                  onClick={handleOpenNotif}
                  className="lg:hidden cursor-pointer relative flex items-center justify-center rounded-full  transition-all group"
                >
                  <FaBell className="block lg:hidden text-3xl text-yellow-400  transition-colors" />
                  {showRedDot && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <TransitionLink href="/profile" className="rounded-full relative group block">
                  <div className="rounded-full border-2 border-white/20 overflow-hidden shadow-lg">
                    <Image
                      src={profileIcon}
                      alt="profile icon"
                      height={40}
                      width={40}
                      className="object-cover"
                    />
                  </div>
                </TransitionLink>
              </div>
            )}
            
            {/* Hamburger */}
            <button
              onClick={toggleNavigation}
              className="lg:hidden text-white bg-transparent rounded-full"
            >
              <IoMenuOutline className="size-9 md:size-12" />
            </button>
          </div>

        </div>
      </header>

      {/* ---------------- MOBILE SIDEBAR COMPONENT ---------------- */}
      <MobileMenu
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        links={navLinks}
        onLinkClick={handleScroll}
        navTheme={navTheme}
      />
      
      {/* ---------------- NOTIFICATIONS PANEL ---------------- */}
      <Notifications
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </>
  );
};

export default EventNav;