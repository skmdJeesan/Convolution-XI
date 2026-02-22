'use client'
import FlipLink from '@/components/FlipLink'
import Loader from '@/components/Loader'
import { userData } from '@/context/UserContext'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import React, { useContext, useState } from 'react'
import { IoArrowBack, IoLogOutOutline, IoHardwareChipOutline, IoTimeOutline, IoSchoolOutline, IoCodeSlashOutline, IoWarningOutline, IoMailOutline, IoCallOutline, IoQrCodeOutline, IoListOutline } from 'react-icons/io5'
import TransitionLink from '@/components/TransitionLink'


const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#050508]"></div>
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-fuchsia-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[70vh] bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>
  </div>
);

// Data Row
const DataRow = ({ label, value, icon: Icon, fullWidth = false }: { label: string, value: string, icon: any, fullWidth?: boolean }) => (
  <div className={`group relative flex items-center gap-3 p-3 bg-[#0a0a10]/40 border border-white/10 rounded-xl overflow-hidden hover:bg-white/5 hover:border-cyan-500/40 transition-all duration-200 ${fullWidth ? 'col-span-2' : ''}`}>
    <div className="p-2.5 bg-black/40 rounded-lg text-purple-300 group-hover:text-cyan-300 transition-colors shrink-0">
      <Icon className="text-lg" />
    </div>
    <div className="flex flex-col z-10 overflow-hidden w-full">
      <span className="text-sm font-rajdhani font-bold tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors truncate">{label}</span>
      <span className="text-sm font-rajdhani  text-gray-100 tracking-wide  truncate w-full" title={value}>{value}</span>
    </div>
    <div className="absolute right-0 top-0 h-full w-1 bg-cyan-500/0 group-hover:bg-cyan-500 transition-all duration-200"></div>
  </div>
);

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const data = useContext(userData)
  
  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: true, callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoading(false)
    }
  }


  const btnShape = "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg group cursor-pointer overflow-hidden";
  
  
  const navBtnClass = `${btnShape} bg-cyan-950/40  border-cyan-500/50  lg:bg-black/30 lg:border-white/10 lg:hover:border-cyan-500/50 lg:hover:bg-cyan-950/40 lg:hover:shadow-cyan-500/20`;
  const logoutBtnClass = `${btnShape} border-red-500 bg-red-500/20 lg:bg-red-950/20 lg:border-red-500/30 lg:hover:border-red-500 lg:hover:bg-red-500/20 lg:hover:shadow-red-500/20`;

  const hasEvents = false; 
  // Here the events will be added
  const eventsList = []; 

  return (
    <div className="min-h-screen w-full relative text-white font-sans flex flex-col items-center overflow-x-hidden selection:bg-cyan-500/30 pb-10">
      
      <Background />
      
      <nav className="relative z-20 w-full max-w-7xl px-6 py-8 flex justify-between items-center">
        <TransitionLink href="/" className={navBtnClass}>
          <IoArrowBack className="text-cyan-400 text-lg group-hover:-translate-x-1 transition-transform" />
          <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-cyan-100 group-hover:text-white uppercase"><FlipLink>Return&nbsp;Home</FlipLink></span>
        </TransitionLink>
      </nav>

      <main className="relative z-10 w-full max-w-7xl px-4 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left coloumn */}
        <div className="w-full lg:w-[35%] flex flex-col gap-8">
          
          {/* Profile */}
          <div className="relative w-full bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>

            <div className="relative w-full flex justify-center mb-6 pt-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-lg group-hover:border-cyan-400/50 transition-colors duration-300">
                <Image src={profileIcon} alt="Profile" fill className="object-cover" />
                <div className="absolute inset-0 w-full h-0.5 bg-cyan-400 blur-[2px] animate-[scan_3s_linear_infinite] opacity-50"></div>
              </div>
              <div className="absolute bottom-1 bg-black/90 px-3 py-1 rounded-full border border-emerald-500/50 flex items-center gap-1.5 shadow-lg z-20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase font-bold">Online</span>
              </div>
            </div>

            <div className="text-center space-y-4 relative z-10">
              <div>
                 <h2 className="font-orbitron text-2xl font-bold text-white tracking-wide">{data?.user?.name}</h2>
              </div>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                      <IoQrCodeOutline className="text-2xl text-cyan-400" />
                      <div className="flex flex-col items-start">
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest">USER_ID</span>
                          <span className="font-mono text-xs text-white tracking-widest font-bold">#{data?.user?._id?.slice(0,6).toUpperCase() || 'UNK'}</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          {/*User Details*/}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoHardwareChipOutline className="text-cyan-400" /> USER_DETAILS
                </h3>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <DataRow label="Institution" value={data?.user?.institution || "N/A"} icon={IoSchoolOutline} />
                <DataRow label="Department" value={data?.user?.department || "N/A"} icon={IoCodeSlashOutline} />
                <DataRow label="Year" value={data?.user?.year || "N/A"} icon={IoTimeOutline} />
                <DataRow label="Contact Number" value={data?.user?.phone || "Offline"} icon={IoCallOutline} />
                <div className="col-span-2 lg:col-span-1">
                   <DataRow label="Email Id" value={data?.user?.email || "No Signal"} icon={IoMailOutline} />
                </div>
             </div>
          </div>

        </div>

{/* Right coloumn */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          
          {/* MISSION LOGS */}
          <div className="flex flex-col gap-4 grow">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoListOutline className="text-purple-400" /> ACTIVE_REGISTRY
                </h3>
             </div>

             <div className="relative grow bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden min-h-125 flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-500/40 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg"></div>

                <div className="mb-6 flex items-center gap-2">
                   <span className={`w-2 h-2 rounded-full animate-ping ${hasEvents ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                   <span className="font-mono text-xs text-gray-300 uppercase tracking-widest">
                       {hasEvents ? 'DATA STREAM ACTIVE' : 'NO DATA STREAM'}
                   </span>
                </div>

                {hasEvents ? (
                   <div className="grid gap-4">
                      {/* Event Items */}
                   </div>
                ) : (
                   <div className="grow flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl bg-black/10 p-8">
                       <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10">
                           <IoWarningOutline className="text-3xl  text-red-500" />
                       </div>
                       <h5 className="font-orbitron text-gray-200 tracking-wide mb-1 text-lg">ARCHIVES EMPTY</h5>
                       <p className="font-rajdhani text-sm text-gray-400 tracking-wide max-w-md mx-auto mb-6">
                           No participation records found. Perticipate in a event to populate.
                       </p>
                       <TransitionLink 
                           href='/#events'
                           className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:-translate-y-1 cursor-pointer"
                       >
                           <FlipLink>Show&nbsp;Events</FlipLink>
                       </TransitionLink>
                   </div>
                )}
             </div>
          </div>
          
          {/* Logout Button */}
          <div className="w-full flex justify-end mt-4">
            <button onClick={handleSignOut} disabled={loading} className={logoutBtnClass}>
              {loading ? <Loader /> : (
                <>
                  <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-red-200 group-hover:text-white uppercase"><FlipLink>LOGOUT</FlipLink></span>
                  <IoLogOutOutline className="text-red-400 text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}