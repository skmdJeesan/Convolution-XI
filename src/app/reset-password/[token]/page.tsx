"use client";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoLockClosedOutline, IoKeyOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { Microchip, ShieldCheck, Binary } from "lucide-react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]"></div>
        {/* Grid & Glows */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <Microchip className="absolute top-[15vh] left-[10vw] w-10 h-10 text-cyan-500/20" />
            <ShieldCheck className="absolute bottom-[20vh] right-[10vw] w-12 h-12 text-purple-500/20" />
            <Binary className="absolute bottom-[10vh] left-[5vw] w-8 h-8 text-cyan-400/15" />
        </div>
    </div>
  )
}

// --- LOADER ---
const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-1 h-1 bg-[#05080f] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-1 h-1 bg-[#05080f] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-1 h-1 bg-[#05080f] rounded-full animate-bounce"></span>
  </div>
);

interface ResetPasswordProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  // Backend logic
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { token } = use(params);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      router.push("/login");
      setIsSubmitting(false);
    } else {
      alert("Error resetting password");
      setIsSubmitting(false);
    }
  };

  const inputContainerClass = "relative flex items-center h-10 bg-[#0a0e14] border border-cyan-800/30 transition-all duration-300 group-hover/input:border-cyan-500/50 group-focus-within/input:border-cyan-400 group-focus-within/input:bg-[#080b10] group-focus-within/input:shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]";

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden text-cyan-50 bg-[#050505] selection:bg-purple-500/30'>
      
      <AnimatedBackground />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="relative group">
            {/* Border Gradient (Cyan to Purple) */}
            <div className="absolute -inset-px bg-linear-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]"></div>

            {/* Main Card */}
            <div className="relative bg-[#080a0f]/95 backdrop-blur-xl [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] shadow-2xl">
                
                {/* Header Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0f1219] border-b border-cyan-800/20">
                    <div className="flex gap-1.5">
                         <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                         <div className="w-1.5 h-1.5 bg-purple-500/50 rounded-full"></div>
                    </div>
                    <span className="text-[10px] tracking-widest text-cyan-400/80 font-bold uppercase">Secure Update</span>
                </div>

                <div className="p-8">
                    
                    <div className="text-center mb-6">
                         <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] mb-2">Reset Password</h1>
                         <p className="text-xs text-cyan-500/70 uppercase tracking-widest font-medium">Enter New Credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        <div className='group/input relative'>
                             <label htmlFor="password" className="block text-sm font-medium text-cyan-100/80 mb-1.5">
                                Enter your new password
                             </label>
                             
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoLockClosedOutline size={18} /></div>
                                <input 
                                    type="password" 
                                    placeholder="New Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    className='w-full bg-transparent px-2 text-sm text-white placeholder-gray-500 outline-none' 
                                />
                             </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="group relative w-full h-11 bg-cyan-500 hover:bg-cyan-400 text-[#05080f] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                              {isSubmitting ? <Loader /> : <>Update Password <IoKeyOutline className="text-lg" /></>}
                          </span>
                        </button>

                    </form>
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 flex justify-between text-[9px] text-cyan-900/70 uppercase font-bold tracking-[0.2em] select-none">
            <span>ENCRYPTION: AES-256</span>
            <span className="text-emerald-700 animate-pulse">SECURE</span>
        </div>

      </motion.div>
    </div>
  );
}