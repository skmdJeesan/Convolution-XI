"use client";
import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoCallOutline, 
  IoSchoolOutline, 
  IoBusinessOutline, 
  IoCalendarOutline,
  IoFingerPrintOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowBack
} from 'react-icons/io5';
import DecorativeIcons from './DecorativeIcons';
import TransitionLink from './TransitionLink';
import FlipLink from './FlipLink';

// --- LOADER ---
const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
    <span className="w-0.5 h-5 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.1s_infinite]"></span>
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></span>
  </div>
);

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    institution: '',
    department: '',
    year: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (value: string) => {
    setFormData(prev => ({ ...prev, year: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log(response.data);
      
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });
      
      if (signInResult?.ok) {
        setFormData({ name: '', email: '', password: '', phone: '', institution: '', department: '', year: '' });
        setLoading(false);
        router.replace('/verify-email');
      } else {
        console.error('Sign in failed');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const inputContainerClass = "relative flex items-center h-9 bg-[#0a0e14] border border-cyan-800/30 transition-all duration-300 group-hover/input:border-cyan-500/50 group-focus-within/input:border-cyan-400 group-focus-within/input:bg-[#080b10] group-focus-within/input:shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]";

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto font-mono text-cyan-50 bg-[#050505] selection:bg-purple-500/30 py-6 sm:py-0'>
      
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

      {/* Background*/}
     <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050505]"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>

          <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <DecorativeIcons/>
      </div>
      
        <TransitionLink 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-cyan-950/40  border-cyan-500/50  lg:bg-black/30 lg:border-white/10 lg:hover:border-cyan-500/50 lg:hover:bg-cyan-950/40 lg:hover:shadow-cyan-500/20 backdrop-blur-md border  rounded-full transition-all duration-300 shadow-lg  group cursor-pointer overflow-hidden"
      >
        <IoArrowBack className="text-cyan-400 text-lg group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-cyan-100 group-hover:text-white uppercase transition-colors"><FlipLink>Return&nbsp;Home</FlipLink></span>
      </TransitionLink>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-162.5 px-4 my-auto" 
      >
        
        <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]"></div>

            {/* Main Panel */}
            <div className="relative bg-[#080a0f]/95 backdrop-blur-xl [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] shadow-2xl">
                
                <div className="flex items-center justify-between px-5 py-2 bg-[#0f1219] border-b border-cyan-800/20">
                    <div className="flex gap-1.5">
                         <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                         <div className="w-1.5 h-1.5 bg-purple-500/50 rounded-full"></div>
                    </div>
                    <span className="font-rajdhani text-[10px] tracking-[0.2em] text-cyan-400/80 font-semibold uppercase">Sys_Reg_v4</span>
                </div>

                <div className="p-4">
                  <div className="text-center mb-3">
                    <h1 className="font-orbitron text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-1">CREATE ID</h1>
                  </div>

                  <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className='group/input relative'>
                          <div className="flex justify-between items-end mb-0.5 px-1">
                            <label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">User Name</label>
                          </div>
                          <div className={inputContainerClass}>
                            <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                            <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoPersonOutline size={14} /></div>
                            <input 
                                type="text" 
                                placeholder='Enter full name' 
                                name='name' 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                            />
                          </div>
                    </div>

                    {/* Email & Password Grid*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Email</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoMailOutline size={14} /></div>
                                <input 
                                    type="email" 
                                    placeholder='name@example.com' 
                                    name='email' 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                    className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                                />
                              </div>
                        </div>
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Passcode</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoLockClosedOutline size={14} /></div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='*******' 
                                    name='password' 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                    className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-3 text-cyan-700 hover:text-cyan-400 transition-colors focus:outline-none">{showPassword ? <IoEyeOffOutline size={14} /> : <IoEyeOutline size={14} />}</button>
                              </div>
                        </div>
                    </div>

                    {/* Phone & Institution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Phone Number</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoCallOutline size={14} /></div>
                                <input 
                                    type="text" 
                                    placeholder='+91-xxxx-xxxx-xx' 
                                    name='phone' 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                    className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                                />
                              </div>
                        </div>
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Institution</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoSchoolOutline size={14} /></div>
                                <input 
                                    type="text" 
                                    placeholder='ex:Jadavpur University' 
                                    name='institution' 
                                    value={formData.institution} 
                                    onChange={handleChange} 
                                    required 
                                    spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                    className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                                />
                              </div>
                        </div>
                    </div>

                    {/* Department & Year Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Department</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoBusinessOutline size={14} /></div>
                                <input 
                                    type="text" 
                                    placeholder='ex:Electrical Engineering' 
                                    name='department' 
                                    value={formData.department} 
                                    onChange={handleChange} 
                                    required 
                                    spellCheck={false}
                              autoCorrect="off"  
                              autoCapitalize="off" 
                                    className='w-full bg-transparent px-2 text-sm text-cyan-100 placeholder-cyan-800/60 outline-none font-rajdhani tracking-wider' 
                                />
                              </div>
                        </div>
                        <div className='group/input relative'>
                              <div className="flex justify-between items-end mb-0.5 px-1"><label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Year</label></div>
                              <div className={inputContainerClass}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoCalendarOutline size={14} /></div>
                                <Select value={formData.year} onValueChange={handleYearChange}>
                                    <SelectTrigger className="w-full bg-transparent border-none text-cyan-100 text-sm outline-none font-rajdhani tracking-wider h-full py-0 pl-2 focus:ring-0">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-[#0a0e14] border border-cyan-800/50 text-cyan-50 font-rajdhani tracking-wide max-h-50'>
                                        <SelectGroup>
                                            {/* <SelectItem value="School" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">School</SelectItem> */}
                                            <SelectItem value="UG1" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">UG1</SelectItem>
                                            <SelectItem value="UG2" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">UG2</SelectItem>
                                            <SelectItem value="UG3" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">UG3</SelectItem>
                                            <SelectItem value="UG4" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">UG4</SelectItem>
                                            <SelectItem value="PG1" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">PG1</SelectItem>
                                            <SelectItem value="PG2" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">PG2</SelectItem>
                                            <SelectItem value="Other" className="focus:bg-cyan-900/30 focus:text-cyan-400 cursor-pointer">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                              </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={loading} className="font-orbitron group relative w-full h-10 mt-1 bg-cyan-500 hover:bg-cyan-400 text-[#05080f] text-xs tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-pointer">
                      <span className="relative z-10 flex items-center justify-center gap-3">{loading ? <Loader /> : <><IoFingerPrintOutline className="text-lg" />AUTHORIZE REGISTRATION</>}</span>
                    </button>

                    {/* Divider */}
                    {/* <div className="relative flex items-center justify-center py-1 opacity-70"><div className="h-px bg-cyan-900/30 w-full absolute"></div><span className="relative bg-[#0d111a] px-2 font-rajdhani text-sm text-gray-500 uppercase tracking-widest font-semibold">// OR CONNECT WITH</span></div> */}

                    {/* Github and google */}
                    {/* <div className="grid grid-cols-2 gap-3">
                      <button type="button" className="flex items-center justify-center gap-2 h-9 bg-[#0a0e17] border border-cyan-900/30 hover:border-cyan-500/60 hover:bg-[#111826] text-gray-400 hover:text-cyan-50 transition-all duration-300 group [clip-path:polygon(0_0,100%_0,100%_100%,10px_100%,0_calc(100%-10px))] cursor-pointer" onClick={() => signIn('google', { callbackUrl: '/' })}><FaGoogle className='text-sm' /><span className='text-xs font-orbitron font-semibold tracking-wider'>GOOGLE</span></button>
                      <button type="button" className="flex items-center justify-center gap-2 h-9 bg-[#0a0e17] border border-cyan-900/30 hover:border-cyan-500/60 hover:bg-[#111826] text-gray-400 hover:text-cyan-50 transition-all duration-300 group [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] cursor-pointer" onClick={() => signIn('github', { callbackUrl: '/' })}><FaGithub className='text-sm' /><span className='font-orbitron text-xs font-semibold tracking-wider'>GITHUB</span></button>
                    </div> */}
                    
                    <div className="text-center mt-2">
                            <p className="font-rajdhani text-sm sm:text-xs text-gray-500 font-bold uppercase tracking-wide">
                                Existing Entity? 
                                <TransitionLink href="/login" className='font-orbitron text-purple-400 hover:text-purple-300 ml-2 hover:underline underline-offset-4 decoration-purple-500/50 transition-colors'>Access System</TransitionLink>
                            </p>
                        </div>

                  </form>
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="mt-2 flex justify-between text-[9px] text-cyan-900/70 uppercase font-bold tracking-[0.2em] select-none w-full max-w-162.5 sm:flex"><span>NEW_NODE_ENTRY</span><span className="text-emerald-700 animate-pulse">SYNC_ACTIVE</span></div>

      </motion.div>
    </div>
  );
}