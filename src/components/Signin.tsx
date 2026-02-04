"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { FaGithub, FaGoogle } from "react-icons/fa"
import { IoMailOutline, IoLockClosedOutline, IoFingerPrintOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"

const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
    <span className="w-0.5 h-5 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.1s_infinite]"></span>
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></span>
  </div>
);

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
   const session = useSession()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.replace('/');
    } else {
      alert("ACCESS DENIED: Invalid Credentials");
    }
  };

  const inputContainerClass = "relative flex items-center h-9 bg-[#0a0e14] transition-all duration-300 border border-cyan-500/50 md:border-cyan-800/30 md:group-hover/input:border-cyan-500/50 group-focus-within/input:border-cyan-400 group-focus-within/input:bg-[#080b10] group-focus-within/input:shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]";
  
  const iconClass = "pl-4 pr-3 transition-colors text-cyan-400 md:text-cyan-600 group-focus-within/input:text-cyan-400";

  return (
    <div className='relative min-h-dvh w-full flex items-center justify-center overflow-x-hidden overflow-y-auto font-mono text-cyan-50 bg-[#0a0e17] selection:bg-cyan-500/30 py-6 sm:py-0'>
      
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

      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#0a0e17]"></div>
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-125 bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-95 px-4 my-auto"
      >
        <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-b from-cyan-500/30 via-cyan-900/10 to-cyan-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)]"></div>

            <div className="relative bg-[#0d111a]/95 backdrop-blur-xl [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] shadow-2xl">
                <div className="flex items-center justify-between px-5 py-2.5 bg-[#111620] border-b border-cyan-800/20">
                    <div className="flex gap-1.5">
                         <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                         <div className="w-1.5 h-1.5 bg-cyan-400/30 rounded-full"></div>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-cyan-400/80 font-semibold uppercase">Sys_Ready</span>
                </div>

                <div className="p-6">
                    <div className="text-center mb-5">
                        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-1">SYSTEM LOGIN</h1>
                        <p className="text-xs text-cyan-500 uppercase tracking-[0.2em] font-medium">// Enter Access Codes</p>
                    </div>

                    <form onSubmit={signinHandler} className='flex flex-col gap-3'>

                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="text-xs text-cyan-100/80 font-semibold tracking-wider uppercase">Email</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className={iconClass}><IoMailOutline size={18} /></div>
                                <input type="email" placeholder='name@example.com' name='email' value={formData.email} onChange={handleChange} required className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-mono tracking-wider' />
                             </div>
                        </div>

                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1"><label className="text-xs text-cyan-100/80 font-semibold tracking-wider uppercase">Passcode</label></div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className={iconClass}><IoLockClosedOutline size={18} /></div>
                                <input type={showPassword ? "text" : "password"} placeholder='********' name='password' value={formData.password} onChange={handleChange} required className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-mono tracking-wider' />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-cyan-400 md:text-cyan-700 md:hover:text-cyan-400 transition-colors focus:outline-none">{showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}</button>
                             </div>
                        </div>

                        <div className="flex items-center justify-between mt-1 px-1">
                            <label className="flex items-center gap-2 cursor-pointer group/chk select-none">
                                <div className="relative w-3.5 h-3.5 border border-cyan-500 md:border-cyan-800 bg-[#080c14] group-hover/chk:border-cyan-400 transition-colors rounded-[2px]">
                                    <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                                    <div className="absolute inset-0.5 bg-cyan-400 scale-0 peer-checked:scale-100 transition-transform duration-150"></div>
                                </div>
                                {/* Highlighted on mobile */}
                                <span className="text-sm sm:text-xs font-medium text-cyan-300 md:text-gray-400 md:group-hover/chk:text-cyan-300 uppercase tracking-wide transition-colors">Remember</span>
                            </label>
                            {/* Highlighted on mobile */}
                            <a href="#" className='text-sm sm:text-xs font-medium text-cyan-300 md:text-gray-400 md:hover:text-cyan-300 uppercase tracking-wide transition-colors'>Recover Key?</a>
                        </div>

                        <button type="submit" disabled={loading} className="group relative w-full h-10 mt-2 bg-cyan-500 hover:bg-cyan-400 text-[#05080f] text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                          <span className="relative z-10 flex items-center justify-center gap-3">{loading ? <Loader /> : <><IoFingerPrintOutline className="text-lg" />Initiate Login</>}</span>
                        </button>

                        <div className="relative flex items-center justify-center py-1.5 opacity-70"><div className="h-px bg-cyan-900/30 w-full absolute"></div><span className="relative bg-[#0d111a] px-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">// ALTERNATE LINKS</span></div>

                        <div className="grid grid-cols-2 gap-3">
                          <button type="button" className="flex items-center justify-center gap-2 h-9 bg-[#0a0e17] border border-cyan-900/30 hover:border-cyan-500/60 hover:bg-[#111826] text-cyan-50 md:text-gray-400 md:hover:text-cyan-50 transition-all duration-300 group [clip-path:polygon(0_0,100%_0,100%_100%,10px_100%,0_calc(100%-10px))]" onClick={() => signIn('google', { callbackUrl: '/' })}><FaGoogle className='text-lg' /><span className='text-xs font-semibold tracking-wider'>GOOGLE</span></button>
                          <button type="button" className="flex items-center justify-center gap-2 h-9 bg-[#0a0e17] border border-cyan-900/30 hover:border-cyan-500/60 hover:bg-[#111826] text-cyan-50 md:text-gray-400 md:hover:text-cyan-50 transition-all duration-300 group [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]" onClick={() => signIn('github', { callbackUrl: '/' })}><FaGithub className='text-lg' /><span className='text-xs font-semibold tracking-wider'>GITHUB</span></button>
                        </div>
                        
                        <div className="text-center mt-2"><p className="text-sm sm:text-xs text-gray-500 font-bold uppercase tracking-wide">No Access ID? <Link href="/register" className='text-cyan-300 md:text-cyan-400 hover:text-cyan-200 ml-2 hover:underline underline-offset-4 decoration-cyan-500/50 transition-colors'>Register User</Link></p></div>

                    </form>
                </div>
            </div>
        </div>

        <div className="mt-6 flex justify-between text-[9px] text-cyan-900/70 uppercase font-bold tracking-[0.2em] select-none"><span>SECURE_NODE</span><span className="text-emerald-700 animate-pulse">ONLINE</span></div>
      </motion.div>
    </div>
  )
}