"use client";
import React, { useRef, useState, useEffect } from 'react';
import { CalendarClock, Users, Trophy, Sparkles } from 'lucide-react';

const EVENT_DATE = "2026-03-27T09:00:00";

const MobileRefCounter = ({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !ref.current) return;
    
    let animationFrameId: number;
    
    const timer = setTimeout(() => {
        const duration = 1500; 
        let startTime: number;
        
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(from + (to - from) * (1 - Math.pow(1 - progress, 3)));
            
            if (ref.current) ref.current.textContent = current.toString();
            
            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(step);
            }
        };
        
        animationFrameId = window.requestAnimationFrame(step);
        
    }, delay * 1000);
    
    return () => {
        clearTimeout(timer);
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId); 
        }
    };
    
  }, [isInView, from, to, delay]);

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

const CardBackground = ({ bgColorClass }: { bgColorClass: string }) => (
  <div 
    className={`absolute inset-0 opacity-10 bg-linear-to-r ${bgColorClass} pointer-events-none`} 
  />
);

const MobileStatCard = ({ icon: Icon, label, value, colorClass, bgColorClass, borderClass }: any) => (
  <div className={`relative flex flex-col items-center p-3 border-l-2 ${borderClass} bg-[#1a1a20]/70 w-full `}>
    <CardBackground bgColorClass={bgColorClass} />
    <div className="flex items-center gap-1.5 mb-2 z-10">
      <Icon className="w-4 h-4 text-white/80" />
    </div>
    <span className={`text-base font-bold bg-clip-text text-transparent bg-linear-to-r ${colorClass} font-rajdhani z-10`}>
      {value}
    </span>
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono mt-1 z-10">{label}</span>
  </div>
);

export default function MobileAboutContent({ userCount }: { userCount: number }) {
  return (
    <div
      className="xl:hidden  flex flex-col justify-center items-center text-center space-y-8 w-full md:px-20 lg:px-32"
    >
      <div className="flex flex-col items-center pointer-events-none select-none mb-2">
        <h1 className="relative font-orbitron font-bold text-3xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 uppercase">
          About Us
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
      </div>

      <div className="relative p-6 border-l-4 border-cyan-500/20 bg-linear-to-r from-cyan-900/10 to-transparent rounded-r-2xl w-full">
        <div className="absolute top-0 -left-1 w-1 h-12 bg-cyan-400"></div>
        <p className="font-rajdhani text-gray-300 text-sm leading-relaxed font-semibold">
          Convolution XI is the <span className='text-cyan-300'>11th Edition</span> of the annual techno-management fest organized by the Students' Forum of the Department of Electrical Engineering, Jadavpur University.
          <br />
          Convolution acts as an <span className='text-fuchsia-400'>UMBRELLA EVENT</span> comprising of student interaction events, technical competitions, and workshops.
        </p>
      </div>

      <div className="font-rajdhani grid grid-cols-3 gap-2 w-full">
        <MobileStatCard
          icon={Users}
          label="Registrations"
          value={<span className="flex items-center justify-center"><MobileRefCounter from={0} to={userCount + 199} delay={1} /><span className="ml-0.5">+</span></span>}
          colorClass="from-cyan-400 to-cyan-600"
          borderClass="border-cyan-500"
          bgColorClass="from-cyan-400 to-cyan-800/50"
        />
        <MobileStatCard
          icon={CalendarClock}
          label="Remaining"
          value={<MobileDaysCounter />}
          colorClass="from-purple-400 to-purple-600"
          borderClass="border-purple-500"
          bgColorClass="from-purple-600 to-purple-800"
        />
        <MobileStatCard
          icon={Trophy}
          label="Events"
          value="9"  
          colorClass="from-fuchsia-400 to-fuchsia-600"
          borderClass="border-fuchsia-500"
          bgColorClass="from-fuchsia-500 to-fucshia-800"
        />
      <div className="col-span-3 relative flex items-center justify-between p-4 mt-2 border border-amber-500/20 rounded-lg bg-[#111115]/90 w-full overflow-hidden shadow-[0_4px_25px_rgba(245,158,11,0.07)]">
          <div className="absolute -inset-1 bg-linear-to-r from-amber-600/10 via-orange-500/5 to-amber-600/10 blur-xl"></div>
          
          <div className="relative flex flex-col z-10 text-left">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="text-lg font-bold text-amber-400 uppercase tracking-wide font-rajdhani">
                The Grand Bounty
              </span>
            </div>
            <span className="text-sm font-rajdhani text-gray-300 font-medium ml-5">
              Claim your share of glory
            </span>
          </div>
          <div className="relative z-10 font-orbitron font-black text-2xl sm:text-3xl tracking-wide bg-clip-text text-transparent bg-linear-to-b from-amber-100 via-amber-400 to-orange-600 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            ₹2 LAKH+
          </div>
        </div>

      </div>
    </div>
  );
}