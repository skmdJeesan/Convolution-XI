"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useMotionValue, Variants } from 'framer-motion';
import { CalendarClock, Users, Trophy } from 'lucide-react';
import { IoPlay } from "react-icons/io5";
import AboutRobot from "../assets/images/About_Robot.png"
import MobileAboutContent from './MobileAbout';

const EVENT_DATE = "2026-03-27T09:00:00";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: "easeOut", delay: 0.2 }
  },
};

const AnimatedCounter = ({ from, to, delay = 0 }: { from: number; to: number, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, to, motionValue, delay]);

  return <span ref={ref} className="tabular-nums">{displayValue}</span>;
};

const DaysCounter = () => {
  const [status, setStatus] = useState("...");

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(EVENT_DATE) - +new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return `${days} Days`;
      }
      else return "STARTED";
    };
    setStatus(calculateTime());
  }, []);

  if (status === "STARTED") {
    return <span className="font-rajdhani text-lg font-bold tracking-widest text-white animate-pulse">STARTED</span>;
  }
  return <span className="font-rajdhani text-base sm:text-xl lg:text-2xl font-bold tabular-nums tracking-tight">{status}</span>;
};

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu translate-z-0">
      <div className="absolute inset-0 bg-[#020203]"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-black to-transparent z-10"></div>
      
      <div
        className="absolute inset-0 opacity-[0.13] md:opacity-[0.15]"
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      ></div>

      {/* <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] bg-fuchsia-900/30 blur-[100px] rounded-full mix-blend-screen transform-gpu translate-z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-cyan-900/30 blur-[100px] rounded-full mix-blend-screen transform-gpu translate-z-0"></div>
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vh] bg-purple-500/15 blur-[80px] rounded-full mix-blend-screen transform-gpu translate-z-0"></div> */}

      {/* purple */}
      <div 
        className="absolute top-[-7%] left-[-15%] w-[71vw] h-[60vh] lg:h-[103vh] mix-blend-screen transform-gpu translate-z-0"
        style={{
          background: 'radial-gradient(closest-side, rgba(112, 26, 117, 35%), transparent)'
        }}
      ></div>

    {/* cyan */}
      <div 
        className="absolute bottom-[-10%] right-[-15%] w-[65vw] h-[79vh] mix-blend-screen transform-gpu translate-z-0"
        style={{
          background: 'radial-gradient(closest-side, rgba(22, 78, 99, 30%), transparent)'
        }}
      ></div>

      {/* fucshia */}
      <div 
        className="absolute top-[6%] left-[24%] w-[64vw] h-[50vh] lg:h-[89vh] mix-blend-screen transform-gpu translate-z-0"
        style={{
          background: 'radial-gradient(closest-side, rgba(168, 85, 247, 0.20), transparent)'
        }}
      ></div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-b from-transparent to-[#030712b7]" />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, colorClass, borderClass }: { icon: any, label: string, value: React.ReactNode, colorClass: string, borderClass: string }) => (
  <motion.div
    variants={itemVariants}
    className={`relative flex flex-col items-center sm:items-start p-2 sm:p-4 lg:p-5 border-l-[2px] sm:border-l-[3px] ${borderClass} overflow-hidden group transition-colors bg-[#1a1a20]/60 backdrop-blur-md w-full`}
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${colorClass} transition-opacity duration-300`}></div>
    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 lg:mb-3 z-10">
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white transition-colors" />
      {(label === "Time Remaining") && (
        <span className="flex h-1.5 w-1.5 relative">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
        </span>
      )}
    </div>
    <span className={`text-base sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorClass} tracking-wider font-rajdhani z-10`}>
      {value}
    </span>
    <span className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest font-rajdhani mt-0.5 sm:mt-1 group-hover:text-gray-200 transition-colors z-10 text-center sm:text-left">{label}</span>
  </motion.div>
);

export default function AboutSection() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/user-count', { cache: 'no-store' });
        const data = await res.json();
        setUserCount(data.count);
      } catch (error) {
        // Silent fail
      }
    };
    fetchCount();
  }, []);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const playVideo = () => { setIsVideoOpen(true); };

  return (
    <div id='about' className="relative w-full min-h-fit xl:min-h-screen flex items-center justify-center overflow-hidden bg-[#020203] py-20 xl:py-0">
      <Background />
      <div className="relative z-10 maxWidthForSections w-full grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center pt-5 pb-10 min-h-[inherit]">

        {/* --- MOBILE COMPONENT (Only visible on small screens) --- */}
        <MobileAboutContent userCount={userCount} />

        {/* --- DESKTOP ORIGINAL CONTENT (Only visible on xl screens) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden xl:flex space-y-8 xl:space-y-10 flex-col justify-center items-center xl:items-start text-center xl:text-left h-auto"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="flex flex-col items-center pointer-events-none select-none mb-5">
            <h1 className="relative font-orbitron font-bold text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 whitespace-nowrap uppercase">
              About Us
              <span className="absolute -bottom-2 left-0 xl:left-0 right-0 xl:right-auto mx-auto xl:mx-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
            </h1>
          </motion.div>

          {/* about Box */}
          <motion.div
            variants={itemVariants}
            className="relative p-6 lg:p-8 border-l-4 border-cyan-500/20 bg-linear-to-r from-cyan-900/10 to-transparent backdrop-blur-sm rounded-r-2xl w-full max-w-2xl mx-auto xl:mx-0"
          >
            <div className="absolute top-0 left-[-4px] w-[4px] h-12 bg-cyan-400"></div>
            <p className="font-rajdhani text-gray-300 text-sm lg:text-base leading-relaxed font-semibold text-center xl:text-justify">
              Convolution XI is the <span className='text-cyan-300'>11th Edition</span> of the annual techno-management fest organized by the Students' Forum of the Department of Electrical Engineering, Jadavpur University.
              <br />
              Convolution acts as an <span className='text-fuchsia-400'>UMBRELLA EVENT</span> comprising of several student interaction events, technical competitions, workshops, and has also hosted, in the past, lectures by some of the most illustrious names in academia and industry alike.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="font-rajdhani grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full max-w-2xl mx-auto xl:mx-0"
          >
            <StatCard
              icon={Users}
              label="Registrations"
              value={
                <span className="text-base sm:text-xl lg:text-2xl font-rajdhani flex items-center justify-center xl:justify-start">
                  <AnimatedCounter from={0} to={userCount + 199} delay={0.8} />
                  <span className="ml-0.5 text-base sm:text-xl">+</span>
                </span>
              }
              colorClass="from-cyan-400 to-cyan-600"
              borderClass="border-cyan-500"
            />
            <StatCard
              icon={CalendarClock}
              label="Remaining"
              value={<DaysCounter />}
              colorClass="from-purple-400 to-purple-600"
              borderClass="border-purple-500"
            />
            <StatCard
              icon={Trophy}
              label="Events"
              value="9"
              colorClass="from-fuchsia-400 to-fuchsia-600"
              borderClass="border-fuchsia-500"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative hidden xl:flex justify-center items-end h-full pointer-events-none min-h-[600px]"
        >
          <div className="absolute bottom-0 w-full max-w-xl h-[90%] flex items-end justify-center">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent blur-xl z-0 transform-gpu"></div>
            <div 
              className="relative w-full h-full flex items-end justify-center z-10"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 25%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 25%, black 100%)'
              }}
            >
              <motion.div
                variants={imageRevealVariants}
                className="w-full h-full flex items-end justify-center will-change-transform"
              >
                <img
                  src={AboutRobot.src}
                  alt="About Convolution XI"
                  loading="eager"
                  className="h-full w-auto object-contain object-bottom contrast-125 saturate-110 select-none" 
                />
                
                <div className="video-div flex flex-col items-center gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div onClick={playVideo}
                    className="h-14 w-14 rounded-full flex items-center justify-center bg-cyan-300 hover:scale-105 hover:bg-cyan-500 active:scale-95 cursor-pointer pointer-events-auto transition-transform">
                    <IoPlay className="h-10 w-10 text-black" />
                  </div>
                  <h3 className='click text-fuchsia-600 font-rajdhani font-semibold text-sm uppercase'>Click Me</h3>
                </div>
              </motion.div>
            </div>

            {/* {isVideoOpen && (

              <div

                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"

                onClick={closeVideo} // Clicking anywhere on the black background closes it

              >

                <button className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors">

                  <IoClose size={40} />

                </button>



                <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] border border-white/10">

                  <iframe

                    className="w-full h-full"

                    src="https://www.youtube.com/embed/QmcoPYUfbJ8?autoplay=1&start=9&rel=0"

                    title="Convolution Teaser"

                    frameBorder="0"

                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                    allowFullScreen

                  ></iframe>

                </div>

              </div>

            )} */}
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}