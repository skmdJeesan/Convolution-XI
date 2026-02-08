"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoCallOutline,
  IoShieldCheckmarkOutline,
  IoWarningOutline,
  IoEyeOutline,
  IoEyeOffOutline
} from 'react-icons/io5';
import DecorativeIcons from '@/components/DecorativeIcons';
import Particles from '@/components/Particles';

// --- LOADER (Purple-Red Gradient) ---
const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-0.5 h-3 bg-gradient-to-t from-purple-500 to-rose-500 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
    <span className="w-0.5 h-5 bg-gradient-to-t from-purple-500 to-rose-500 animate-[pulse_0.6s_ease-in-out_0.1s_infinite]"></span>
    <span className="w-0.5 h-3 bg-gradient-to-t from-purple-500 to-rose-500 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></span>
  </div>
);

export default function LeadRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/register-lead', formData);
      if (response.status === 201) {
        router.push('/login?msg=lead_registered');
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Styles adapted from Signin but using Purple/Rose palette
  const inputContainerClass = "relative flex items-center h-10 bg-[#0a0e14] transition-all duration-300 border border-rose-900/30 group-hover/input:border-rose-500/50 group-focus-within/input:border-rose-400 group-focus-within/input:bg-[#0f1219] group-focus-within/input:shadow-[inset_0_0_10px_rgba(244,63,94,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]";
  const iconClass = "pl-4 pr-3 transition-colors text-rose-700 group-focus-within/input:text-rose-400";

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto font-mono text-gray-200 bg-[#050505] selection:bg-rose-500/30 py-6 sm:py-0'>
      
      {/* Autofill Styles for Rose Theme */}
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #0a0e14 inset !important;
            -webkit-text-fill-color: #ffe4e6 !important;
            caret-color: #ffe4e6 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Background - Purple/Rose Variation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050505]"></div>
          {/* SVG Grid with Red stroke */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%23f43f5e' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>

          <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-rose-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <DecorativeIcons/>
          <Particles/>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4 my-auto" 
      >
        <div className="relative group">
            {/* Border Gradient (Purple-Rose) */}
            <div className="absolute -inset-px bg-gradient-to-b from-purple-500/30 via-rose-500/20 to-purple-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]"></div>

            <div className="relative bg-[#080a0f]/95 backdrop-blur-xl [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 bg-[#0f1219] border-b border-rose-900/20">
                    <div className="flex items-center gap-2">
                        <IoShieldCheckmarkOutline className="text-rose-500 animate-pulse" />
                        <span className="text-[10px] tracking-[0.2em] text-rose-400/80 font-semibold uppercase">SYS_LEAD_V1</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-rose-500/50 rounded-full"></div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-rose-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-1">EVENT LEAD PROTOCOL</h1>
                        <p className="text-[10px] text-rose-500 uppercase tracking-[0.2em] font-medium">// Authorized Personnel Only</p>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-5 p-2 bg-red-950/30 border border-red-500/50 text-red-200 text-xs flex items-center justify-center gap-2"
                      >
                        <IoWarningOutline className="text-lg" />
                        {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                        {/* Name Input */}
                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="text-[10px] text-rose-200/70 font-bold tracking-wider uppercase">Full Name</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-rose-900/40 group-focus-within/input:bg-rose-500 transition-colors duration-300"></div>
                                <div className={iconClass}><IoPersonOutline size={16} /></div>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder='Enter your name' 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    className='w-full bg-transparent px-2 text-sm text-rose-50 placeholder-rose-900/40 outline-none font-mono tracking-wider' 
                                />
                             </div>
                        </div>

                        {/* Email Input */}
                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="text-[10px] text-rose-200/70 font-bold tracking-wider uppercase">Authorized Email</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-rose-900/40 group-focus-within/input:bg-rose-500 transition-colors duration-300"></div>
                                <div className={iconClass}><IoMailOutline size={16} /></div>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder='official@email.com' 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    className='w-full bg-transparent px-2 text-sm text-rose-50 placeholder-rose-900/40 outline-none font-mono tracking-wider' 
                                />
                             </div>
                        </div>

                        {/* Password Input */}
                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="text-[10px] text-rose-200/70 font-bold tracking-wider uppercase">Secure Key</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-rose-900/40 group-focus-within/input:bg-rose-500 transition-colors duration-300"></div>
                                <div className={iconClass}><IoLockClosedOutline size={16} /></div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    placeholder='********' 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    className='w-full bg-transparent px-2 text-sm text-rose-50 placeholder-rose-900/40 outline-none font-mono tracking-wider' 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-rose-700 hover:text-rose-400 transition-colors focus:outline-none">
                                    {showPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                                </button>
                             </div>
                        </div>

                        {/* Phone Input */}
                        <div className='group/input relative'>
                             <div className="flex justify-between items-end mb-1 px-1">
                                <label className="text-[10px] text-rose-200/70 font-bold tracking-wider uppercase">Contact</label>
                             </div>
                             <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-rose-900/40 group-focus-within/input:bg-rose-500 transition-colors duration-300"></div>
                                <div className={iconClass}><IoCallOutline size={16} /></div>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder='+91...' 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    className='w-full bg-transparent px-2 text-sm text-rose-50 placeholder-rose-900/40 outline-none font-mono tracking-wider' 
                                />
                             </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="group relative w-full h-10 mt-4 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? <Loader /> : "INITIATE CLEARANCE"}
                            </span>
                        </button>

                    </form>
                </div>

                {/* Footer Status */}
                <div className="bg-[#0f1219] px-6 py-2 border-t border-rose-900/30 flex justify-between text-[9px] text-rose-900/70 uppercase font-bold tracking-[0.2em] select-none">
                    <span>ADMIN_LAYER_01</span>
                    <span className="text-rose-700 animate-pulse">SECURE_NODE_ACTIVE</span>
                </div>

            </div>
        </div>
      </motion.div>
    </div>
  );
}