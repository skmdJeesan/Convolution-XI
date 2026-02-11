"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, Variants } from 'framer-motion';
import { CalendarClock, Users, Trophy } from 'lucide-react';
import AboutRobot from "../assets/images/About_Robot.png" 

const EVENT_DATE = "2026-03-20T09:00:00"; 
const BASE_REGISTRATIONS = 200;           
const DB_REGISTRATIONS = 0;             
const TOTAL_REGISTRATIONS = BASE_REGISTRATIONS + DB_REGISTRATIONS; 

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.25, 
      delayChildren: 0.2,
      when: "beforeChildren"
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, y: 80, filter: "blur(10px)" }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: "easeOut", delay: 0.2 }
  },
};

const AnimatedCounter = ({ from, to, delay = 0 }: { from: number; to: number, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, to, motionValue, delay]);

  return <motion.span ref={ref} className="tabular-nums">{displayValue}</motion.span>;
};

const DaysCounter = () => {
  const [status, setStatus] = useState("");

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
    const timer = setInterval(() => setStatus(calculateTime()), 60000); 
    return () => clearInterval(timer);
  }, []);

  if (!status) return <span className="font-rajdhani text-sm">...</span>;
  if (status === "STARTED") {
     return <span className="font-rajdhani text-lg font-bold tracking-widest text-white animate-pulse">STARTED</span>;
  }
  return <span className="font-rajdhani text-base sm:text-xl lg:text-2xl font-bold tabular-nums tracking-tight">{status}</span>;
};

const Background = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); 

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#020203]"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black to-transparent z-10"></div>
      <motion.div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ y, backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      ></motion.div>
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] bg-fuchsia-900/30 blur-[120px] rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-cyan-900/30 blur-[120px] rounded-full mix-blend-screen"></div>
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vh] bg-purple-500/15 blur-[100px] rounded-full mix-blend-screen"></div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, colorClass, borderClass }: { icon: any, label: string, value: React.ReactNode, colorClass: string, borderClass: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className={`relative flex flex-col items-center sm:items-start p-2 sm:p-4 lg:p-5 border-l-[2px] sm:border-l-[3px] ${borderClass} overflow-hidden group transition-all bg-[#1a1a20]/60 backdrop-blur-md w-full`}
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-linear-to-br ${colorClass} transition-opacity duration-500`}></div>
    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 lg:mb-3 z-10">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white transition-colors" />
        {(label === "Time Remaining") && (
            <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
            </span>
        )}
    </div>
    <span className={`text-base sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r ${colorClass} tracking-wider font-rajdhani z-10`}>
        {value}
    </span>
    <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-0.5 sm:mt-1 group-hover:text-gray-200 transition-colors z-10 text-center sm:text-left">{label}</span>
  </motion.div>
);

export default function AboutSection() {
  return (
    
    <div id='about' className="relative w-full min-h-fit xl:min-h-screen flex items-center justify-center overflow-hidden bg-[#020203] py-20 xl:py-0">
      <Background />
      <div className="absolute bottom-0 left-0 w-full h-10 md:h-10 z-11 pointer-events-none bg-gradient-to-b from-transparent via-black/40 to-black" />
      <div className="relative z-10 maxWidthForSections w-full grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center pt-5 pb-10 min-h-[inherit]">
        
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 xl:space-y-10 flex flex-col justify-center items-center xl:items-start text-center xl:text-left h-auto"
        >
          
          {/* Heading */}
          <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center xl:items-start pointer-events-none select-none mb-5">
                 <h1 className="font-orbitron font-bold text-3xl sm:text-5xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase ">
                   About Us
                   <span className="absolute -bottom-2 left-0 xl:left-0 right-0 xl:right-auto mx-auto xl:mx-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
                 </h1>
          </motion.div>

          {/* Paragraph Box */}
          <motion.div 
            variants={itemVariants} 
            className="relative p-6 lg:p-8 border-l-4 border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 to-transparent backdrop-blur-sm rounded-r-2xl w-full max-w-2xl mx-auto xl:mx-0"
          >
              <div className="absolute top-0 left-[-4px] w-[4px] h-12 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
              
              <p className= "font-rajdhani text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed font-semibold text-center xl:text-justify">
              Convolution XI is the <span className='text-cyan-300'>11th Edition</span> of the annual techno-management fest organized by the Students' Forum of the Department of Electrical Engineering, Jadavpur University. 
              <br />
              Convolution acts as an <span className='text-fuchsia-400'>UMBRELLA EVENT</span> comprising of several student interaction events, technical competitions, workshops, and has also hosted, in the past, lectures by some of the most illustrious names in academia and industry alike.
            </p>
          </motion.div>

          {/* Stats Grid - 3 Columns always */}
          <motion.div 
            variants={itemVariants} 
            className="font-rajdhani grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full max-w-2xl mx-auto xl:mx-0"
          >
             <StatCard 
                icon={Users} 
                label="Registrations" 
                value={
                    <span className="font-rajdhani flex items-center justify-center xl:justify-start">
                        <AnimatedCounter from={0} to={TOTAL_REGISTRATIONS} delay={1.2} />
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

        {/* Right */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="relative hidden xl:flex justify-center items-end h-full pointer-events-none min-h-[600px]"
        >
          <div className="absolute bottom-0 w-full max-w-xl h-[90%] flex items-end justify-center">
             
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/4 bg-linear-to-t from-black/80 via-black/40 to-transparent blur-xl z-0"></div>

             <div 
                className="relative w-full h-full flex items-end justify-center z-10"
                style={{
                    maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 25%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 25%, black 100%)'
                }}
             >
                 <motion.div 
                    variants={imageRevealVariants}
                    className="w-full h-full flex items-end justify-center"
                 >
                     <img 
                       src={AboutRobot.src}
                       alt="About Convolution X" 
                       className="h-full w-auto object-contain object-bottom mix-blend-lighten contrast-125 saturate-110"
                     />
                 </motion.div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}