"use client";
import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoMailOutline, IoArrowForwardCircleOutline, IoWarningOutline, IoCheckmarkCircleOutline, IoArrowBack } from "react-icons/io5";
import DecorativeIcons from "@/components/DecorativeIcons";
import TransitionLink from "@/components/TransitionLink";

// --- LOADER COMPONENT
const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
    <span className="w-0.5 h-5 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.1s_infinite]"></span>
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></span>
  </div>
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setStatusType(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        setMessage("If an account exists, a recovery link has been sent");
        setStatusType("success");
      } else {
        setMessage("Transmission failed. Please retry connection.");
        setStatusType("error");
      }
    } catch (error) {
      setMessage("Network error. Secure line interrupted.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputContainerClass = "relative flex items-center h-9 bg-[#0a0e14] transition-all duration-300 border border-cyan-500/50 md:border-cyan-800/30 md:group-hover/input:border-cyan-500/50 group-focus-within/input:border-cyan-400 group-focus-within/input:bg-[#080b10] group-focus-within/input:shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_15px)]";
  const iconClass = "pl-4 pr-3 transition-colors text-cyan-400 md:text-cyan-600 group-focus-within/input:text-cyan-400";

  return (
    <div className='relative min-h-dvh w-full flex items-center justify-center overflow-x-hidden overflow-y-auto font-mono text-cyan-50 bg-[#050505] selection:bg-fuchsia-500/30 py-6 sm:py-0'>
      
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #0a0e14 inset !important;
            -webkit-text-fill-color: #cffafe !important;
            caret-color: #cffafe !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050505]"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <DecorativeIcons/>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-95 px-4 my-auto"
      >
        <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)]"></div>

            <div className="relative bg-[#080a0f]/95 backdrop-blur-xl [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] shadow-2xl">
                
                <div className="flex items-center justify-between px-5 py-2.5 bg-[#0f1219] border-b border-cyan-800/20">
                    <div className="flex gap-1.5">
                         <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                         <div className="w-1.5 h-1.5 bg-purple-500/50 rounded-full"></div>
                    </div>
                    <span className="font-rajdhani text-[10px] tracking-[0.2em] text-cyan-400/80 font-semibold uppercase">Sys_Recovery</span>
                </div>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <h1 className="font-orbitron text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-1">RESET ACCESS</h1>
                        <p className="font-rajdhani text-xs text-cyan-500/50 uppercase tracking-[0.2em] font-medium">// Authentication Lost? Recover Key.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Registered Email</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className={iconClass}><IoMailOutline size={18} /></div>
                                <input 
                                  id="email"
                                  type="email"
                                  placeholder="name@example.com"
                                  className="w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  spellCheck={false}
                                  autoCorrect="off"  
                                  autoCapitalize="off" 
                                  required
                                />
                             </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="font-orbitron group relative w-full h-10 mt-2 bg-cyan-500 hover:bg-cyan-400 text-[#05080f] text-sm tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-pointer"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? <Loader /> : <>Send Recovery Link <IoArrowForwardCircleOutline className="text-lg" /></>}
                          </span>
                        </button>

                    </form>

                    {/* Status Message */}
                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-3 border-l-2 text-[10px] font-rajdhani tracking-wide ${
                                statusType === 'success' 
                                ? 'border-emerald-500 bg-emerald-900/10 text-emerald-400' 
                                : 'border-red-500 bg-red-900/10 text-red-400'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {statusType === 'success' ? <IoCheckmarkCircleOutline size={14} /> : <IoWarningOutline size={14} />}
                                <span className="uppercase font-bold">{statusType === 'success' ? 'TRANSMISSION COMPLETE' : 'SYSTEM ERROR'}</span>
                            </div>
                            <p className="mt-1 opacity-80">{message}</p>
                        </motion.div>
                    )}

                    
                    <div className="mt-6 text-center">
                        <TransitionLink href="/login" className="font-rajdhani text-sm font-medium text-cyan-300 md:text-gray-400 md:hover:text-cyan-300 uppercase tracking-wide transition-colors group inline-flex items-center gap-1">
                            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" /> Return to Login
                        </TransitionLink>
                    </div>

                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between text-[9px] text-cyan-900/70 uppercase font-bold tracking-[0.2em] select-none"><span>SECURE_NODE</span><span className="text-emerald-700 animate-pulse">ONLINE</span></div>
      </motion.div>
    </div>
  );
}