"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// --- 1. UTILITIES ---
const SmoothText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

const SystemLogs = () => {
    const logs = [
        "KERNEL_PAC: MOUNTED", "LOADING: NEURAL_NET_V2", "FETCHING: ASSET_MANIFEST",
        "VERIFYING: USER_TOKEN_HASH", "OPTIMIZING: GRAPHICS_PIPELINE", 
        "SECURITY: ENCRYPTION_ENABLED", "CONNECTION: SECURE_SOCKET_LAYER"
    ];
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < logs.length) {
                setVisibleLogs(prev => [...prev.slice(-4), logs[index]]); 
                index++;
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-start gap-1 font-mono text-[10px] text-cyan-900/60 uppercase tracking-widest">
            {visibleLogs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    {`> ${log}`}
                </motion.div>
            ))}
        </div>
    );
};

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING");
  const [isGranted, setIsGranted] = useState(false);
  const router = useRouter();



  // --- LOGIC: PROGRESS SIMULATION ---
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 2.5; 
        return Math.min(prev + diff, 100);
      });
    }, 40);

    if (progress < 25) setStatus("LOADING ASSETS");
    else if (progress < 50) setStatus("VERIFYING DATA");
    else if (progress < 75) setStatus("SYSTEM OPTIMIZATION");
    else if (progress < 99) setStatus("FINALIZING BOOT");
    else setStatus("ACCESS GRANTED");

    if (progress >= 100) {
      clearInterval(timer);
      setIsGranted(true);
      setTimeout(() => setIsLoading(false), 1200);
    }
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[99999] flex flex-col font-mono overflow-hidden cursor-none select-none text-cyan-50 bg-[#09090b]">
          
          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0 bg-[#09090b] z-0"></div>
          
          {/* Vignette Overlay for Focus */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_200px,#09090b,transparent)]"></div>


          {/* --- TOP SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Smooth "Ease Out"
            className="absolute top-0 left-0 w-full h-1/2 bg-[#09090b] z-10 flex flex-col justify-end items-center overflow-hidden "
          >
             {/* Gradient for Depth */}
             <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-[#09090b]"></div>
             
             {/* Faint Grid Reflection */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          </motion.div>


          {/* --- BOTTOM SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Smooth "Ease Out"
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#09090b] z-10 flex flex-col justify-start items-center overflow-hidden "
          >
             {/* Gradient for Depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/10 to-[#09090b]"></div>

             {/* Faint Grid Reflection */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

             {/* Bottom Left Logs */}
             <div className="absolute bottom-10 left-10 hidden sm:block opacity-100 text-purple-500">
                <SystemLogs />
             </div>
          </motion.div>


          {/* --- CENTER CONTENT (Floating) --- */}
          <motion.div 
             exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-10"
          >
              {/* --- REACTOR --- */}
              <div className="relative w-72 h-72 flex items-center justify-center">
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-500 ${isGranted ? 'opacity-40 bg-emerald-500/20' : 'opacity-20 bg-cyan-500/10'}`}></div>

                  {/* Rings */}
                  <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 animate-[spin_12s_linear_infinite] ${isGranted ? 'border-emerald-500/40' : 'border-cyan-500/20'}`}></div>
                  <div className={`absolute inset-6 rounded-full border border-t-transparent border-l-transparent transition-all duration-700 animate-[spin_4s_linear_infinite_reverse] ${isGranted ? 'border-emerald-400/40' : 'border-purple-500/50'}`}></div>
                  
                  {/* Central Orb */}
                  <div className={`relative z-10 w-36 h-36 rounded-full backdrop-blur-3xl border flex items-center justify-center transition-all duration-500 ${isGranted ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.4)] scale-110' : 'bg-[#09090b]/50 border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.1)]'}`}>
                      <span className={`font-orbitron text-4xl font-bold tracking-tighter ${isGranted ? 'text-emerald-300' : 'text-cyan-100'}`}>
                        {Math.floor(progress)}%
                      </span>
                  </div>
              </div>

              {/* --- INFO AREA --- */}
              <div className="w-80 flex flex-col items-center gap-2">
                  <div className={`h-6 text-sm font-bold tracking-[0.2em] font-orbitron text-center transition-colors duration-300 ${isGranted ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-cyan-400'}`}>
                      <SmoothText text={status} className="inline-block" />
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-[2px] bg-gray-800 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                        className={`h-full relative ${isGranted ? 'bg-emerald-500' : 'bg-cyan-500'} shadow-[0_0_20px_currentColor]`}
                      >
                         <div className="absolute top-0 right-0 bottom-0 w-20 bg-linear-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg]"></div>
                      </motion.div>
                  </div>
                  
                  <div className="flex justify-between w-full text-[9px] text-cyan-900 uppercase tracking-widest font-semibold mt-1">
                      <span>Mem: 4096MB OK</span>
                      <span>SECURE_BOOT</span>
                  </div>
              </div>
          </motion.div>

          {/* Exit Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isGranted ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-50 bg-white pointer-events-none mix-blend-overlay"
          />

        </div>
      )}
    </AnimatePresence>
  );
}