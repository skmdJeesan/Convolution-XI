"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { CalendarClock, Users, Trophy } from 'lucide-react';

const EVENT_DATE = "2026-03-18T09:00:00";

const stackContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stackItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};


const MobileRefCounter = ({ from, to }: { from: number; to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const duration = 1500; 
    let startTime: number;
    const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(from + (to - from) * (1 - Math.pow(1 - progress, 3)));
        if (ref.current) ref.current.textContent = current.toString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isInView, from, to]);

  return <span ref={ref} className="tabular-nums">{from}</span>;
};

const MobileDaysCounter = () => {
  const [days, setDays] = useState("...");
  useEffect(() => {
    const diff = +new Date(EVENT_DATE) - +new Date();
    setDays(diff > 0 ? `${Math.floor(diff / (1000 * 60 * 60 * 24))} Days` : "STARTED");
  }, []);
  return <span className="font-rajdhani text-base font-bold tabular-nums">{days}</span>;
};

const MobileStatCard = ({ icon: Icon, label, value, colorClass, borderClass }: any) => (
  <div className={`relative flex flex-col items-center p-3 border-l-2 ${borderClass} bg-[#1a1a20]/95 w-full rounded-r-lg`}>
    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${colorClass}`}></div>
    <div className="flex items-center gap-1.5 mb-2 z-10">
      <Icon className="w-4 h-4 text-white/80" />
    </div>
    <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorClass} font-rajdhani z-10`}>
      {value}
    </span>
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono mt-1 z-10">{label}</span>
  </div>
);

export default function MobileAboutContent({ userCount }: { userCount: number }) {
  return (
    <motion.div
      variants={stackContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="xl:hidden flex flex-col justify-center items-center text-center space-y-8 w-full  md:px-20 lg:px-32"
    >
      <motion.div variants={stackItemVariants} className="flex flex-col items-center pointer-events-none select-none mb-2">
        <h1 className="relative font-orbitron font-bold text-3xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 uppercase">
          About Us
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
      </motion.div>


      <motion.div variants={stackItemVariants} className="relative p-6 border-l-4 border-cyan-500/20 bg-linear-to-r from-cyan-900/10 to-transparent rounded-r-2xl w-full">
        <div className="absolute top-0 left-[-4px] w-[4px] h-12 bg-cyan-400"></div>
        <p className="font-rajdhani text-gray-300 text-sm leading-relaxed font-semibold">
          Convolution XI is the <span className='text-cyan-300'>11th Edition</span> of the annual techno-management fest organized by the Students' Forum of the Department of Electrical Engineering, Jadavpur University.
          <br />
          Convolution acts as an <span className='text-fuchsia-400'>UMBRELLA EVENT</span> comprising of student interaction events, technical competitions, and workshops.
        </p>
      </motion.div>

      <motion.div variants={stackItemVariants} className="font-rajdhani grid grid-cols-3 gap-2 w-full">
        <MobileStatCard
          icon={Users}
          label="Registrations"
          value={<span className="flex items-center justify-center"><MobileRefCounter from={0} to={userCount + 199} /><span className="ml-0.5">+</span></span>}
          colorClass="from-cyan-400 to-cyan-600"
          borderClass="border-cyan-500"
        />
        <MobileStatCard
          icon={CalendarClock}
          label="Remaining"
          value={<MobileDaysCounter />}
          colorClass="from-purple-400 to-purple-600"
          borderClass="border-purple-500"
        />
        <MobileStatCard
          icon={Trophy}
          label="Events"
          value="9"
          colorClass="from-fuchsia-400 to-fuchsia-600"
          borderClass="border-fuchsia-500"
        />
      </motion.div>
    </motion.div>
  );
}