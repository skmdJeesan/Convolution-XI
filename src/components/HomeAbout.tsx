"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, Variants } from 'framer-motion';
import { CalendarClock, Users, Trophy, Mouse, ChevronDown, Cpu } from 'lucide-react';


const EVENT_DATE = "2026-03-20T09:00:00"; 
 
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
  hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
  visible: { 
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(20px)" },
  visible: { 
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut", delay: 0.5 }
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
      return "STARTED";
    };
    setStatus(calculateTime());
    const timer = setInterval(() => setStatus(calculateTime()), 60000); 
    return () => clearInterval(timer);
  }, []);

  if (!status) return <span className="text-sm">...</span>;

  if (status === "STARTED") {
     return <span className="text-lg font-bold tracking-widest text-white animate-pulse">STARTED</span>;
  }
  return <span className="text-2xl font-bold tabular-nums tracking-tight">{status}</span>;
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
  style={{ 
    y, 
    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
    backgroundSize: '40px 40px' 
  }}
>
</motion.div>

      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] bg-fuchsia-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vh] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen"></div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, colorClass, borderClass }: { icon: any, label: string, value: React.ReactNode, colorClass: string, borderClass: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className={`relative flex flex-col items-start p-4 lg:p-5 border-l-[3px] ${borderClass} overflow-hidden group transition-all bg-[#1a1a20]/60 backdrop-blur-md`}
  >
 
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${colorClass} transition-opacity duration-500`}></div>
    
    <div className="flex items-center gap-2 mb-2 lg:mb-3 z-10">
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white/80 group-hover:text-white transition-colors" />
        {(label === "Time Remaining") && (
            <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
            </span>
        )}
    </div>
    <span className={`text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorClass} tracking-wider font-mono z-10`}>
        {value}
    </span>
    <span className="text-[9px] lg:text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-1 group-hover:text-gray-200 transition-colors z-10">{label}</span>
  </motion.div>
);

const DecodingText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="text-[10px] lg:text-xs font-mono font-bold tracking-[0.2em] text-cyan-400">
      {text.split("").map((char, index) => (
        <motion.span key={index} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.1, delay: index * 0.03 }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default function AboutSection() {
  const handleScrollNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch from your own Next.js API route
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/user-count', { cache: 'no-store' });
        const data = await res.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div id='about' className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020203]">
      <Background />

      <div className="relative z-10 maxWidthForSections grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-5 pb-10">
        
        {/* Left*/}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 lg:space-y-10"
        >
          
          {/* Heading */}
          <motion.div variants={itemVariants} className="relative w-full">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter whitespace-nowrap capitalize">
              About <span className="text-transparent w-fit bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">us<span className='opacity-0'>.</span></span>
            </h2>
          </motion.div>

          {/* parragraph */}
          <motion.div 
            variants={itemVariants} 
            className="relative p-6 lg:p-8 border-l-4 border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 to-transparent backdrop-blur-sm rounded-r-2xl w-full"
          >
             <div className="absolute top-0 left-[-4px] w-[4px] h-12 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
             
             <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed font-light text-justify">
              <span className="text-white font-bold tracking-wide">Convolution XI</span> is the <span className="text-purple-300 font-semibold font-mono">11th Edition</span> of the annual techno-management fest organized by the Students' Forum of the Department of Electrical Engineering, <span className="text-cyan-400 font-medium">Jadavpur University</span>. 
              <br /><br />
              Convolution acts as an <span className="text-fuchsia-400 font-mono text-xs md:text-sm tracking-wider">UMBRELLA EVENT</span> comprising of several student interaction events, technical competitions, workshops, and has also hosted, in the past, lectures by some of the most illustrious names in <span className="text-white/90 border-b border-purple-500/50 pb-0.5">academia and industry</span> alike.
            </p>
          </motion.div>


          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 lg:gap-6">
             <StatCard 
                icon={Users} 
                label="Registrations" 
                value={
                    <span className="flex items-center">
                        <AnimatedCounter from={0} to={userCount} delay={1.2} />
                        <span className="ml-0.5 text-lg md:text-xl">+</span>
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

        {/*Riht*/}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="relative hidden lg:flex justify-center items-center pointer-events-none"
        >
        

          <motion.div 
            variants={imageRevealVariants}
            className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center"
          >
             <div className="relative w-full h-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]">
                 <img 
                   src= "../assets/images/AboutBlackhole.jpg"
                   alt="About Convolution X" 
                   className="w-full h-full object-cover opacity-100 mix-blend-lighten scale-110 contrast-125 saturate-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/10 mix-blend-overlay"></div>
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
             </div>
          </motion.div>
        </motion.div>

      </div>
      

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        onClick={handleScrollNext}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer group"
      >
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/30 bg-[#1a1a20]/80 backdrop-blur-md group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                {/* <Mouse className="w-4 h-4 text-cyan-400 animate-pulse" /> */}
                <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-100/80 group-hover:text-white transition-colors font-bold">
                    EXPLORE_MORE
                </span>
            </div>
            <div className="flex flex-col items-center -space-y-3 mt-1 opacity-80">
                <ChevronDown className="w-5 h-5 text-fuchsia-500 animate-bounce delay-0" />
                <ChevronDown className="w-5 h-5 text-cyan-500 animate-bounce delay-75" />
            </div>
          </div>
      </motion.div>
    </div>
  );
}