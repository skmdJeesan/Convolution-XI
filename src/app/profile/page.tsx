"use client";
import FlipLink from '@/components/FlipLink'
import Loader from '@/components/Loader'
import { userData } from '@/context/UserContext'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import React, { useContext, useState } from 'react'
import { 
  IoArrowBack, IoLogOutOutline, IoHardwareChipOutline, IoTimeOutline, 
  IoSchoolOutline, IoCodeSlashOutline, IoWarningOutline, IoMailOutline, 
  IoCallOutline, IoQrCodeOutline, IoListOutline, IoPeopleOutline, IoMailUnreadOutline 
} from 'react-icons/io5'
import TransitionLink from '@/components/TransitionLink'
import ProfileNav from './ProfileNav'

// interfaces

interface EventData {
  id: number;
  name: string;
  date?: string;
  status: string;
}

interface TeamData {
  id: number;
  name: string;
  event: string;
  role: string;
  members: number;
}

interface RequestData {
  id: number;
  from: string;
  team: string;
  event: string;
}

const Background = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#050508]"></div>
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-purple-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-fuchsia-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="hidden lg:block absolute bottom-[-10%] right-[-10%] w-[60vw] h-[70vh] bg-cyan-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute bottom-[-10%] right-[-10%] w-[80vw] h-[70vh] bg-cyan-900/25 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute bottom-[2%] left-[-10%] w-[40vw] h-[50vh] bg-purple-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="hidden lg:block absolute bottom-[2%] left-[-10%] w-[60vw] h-[80vh] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen"></div>
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
      <span className="text-sm font-rajdhani font-bold tracking-wide md:tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors truncate">{label}</span>
      <span className="text-sm font-rajdhani font-medium text-gray-100 tracking-normal md:tracking-wide  truncate w-full" title={value}>{value}</span>
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
      await signOut({ redirect: true, callbackUrl: '/login' })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoading(false)
    }
  }

  const btnShape = "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg group cursor-pointer overflow-hidden";
  const logoutBtnClass = `${btnShape} border-red-500 bg-red-500/20 lg:bg-red-950/20 lg:border-red-500/30 lg:hover:border-red-500 lg:hover:bg-red-500/20 lg:hover:shadow-red-500/20`;

  // --- MOCK DATA (Expanded to show scrolling) --- 
  // const eventsList = [
  //   { id: 1, name: "Sparkhack",status: "Confirmed" },
  //   { id: 2, name: "Algorithma",status: "Pending Registration" },
  //   { id: 3, name: "Robo-Wars", status: "Confirmed" },
  //   { id: 4, name: "Code Sprint",status: "Confirmed" },
  //   { id: 5, name: "Web Weavers", status: "Pending Registration" }
  // ]; 
  const eventsList: EventData[] = []; 
  const hasEvents = eventsList.length > 0; 

  const myTeamsList:TeamData[] = [
    // { id: 1, name: "CyberPunks", event: "Sparkhack", role: "Leader", members: 4 },
    // { id: 2, name: "Null Pointers", event: "Algorithma", role: "Member", members: 2 },
    // { id: 3, name: "Bit Bandits", event: "Code Sprint", role: "Member", members: 3 },
    // { id: 4, name: "Neon Knights", event: "Robo-Wars", role: "Leader", members: 5 }
  ];

  const pendingRequestsList:RequestData[] = [
    // { id: 1, from: "Alex Mercer", team: "Neon Knights", event: "Robo-Wars" },
    // { id: 2, from: "Sarah Connor", team: "Tech Titans", event: "Algorithma" },
    // { id: 3, from: "John Doe", team: "Dev Dynamos", event: "Sparkhack" },
    // { id: 4, from: "Jane Smith", team: "UI Unicorns", event: "Web Weavers" }
  ];

  return (
    <div className="min-h-screen w-full relative text-white font-sans flex flex-col items-center overflow-x-hidden selection:bg-cyan-500/30 pb-10">
      
      <Background />
      <ProfileNav/>
      
      <main className="maxWidthForSections relative z-10 w-full px-4 lg:px-8 pt-25 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left column */}
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
                 <h2 className="font-orbitron text-2xl font-bold text-white tracking-wide capitalize">{data?.user?.name || "User"}</h2>
              </div>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                      <IoQrCodeOutline className="text-2xl text-cyan-400" />
                      <div className="flex flex-col items-start">
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest">USER_ID</span>
                          <span className="font-rajdhani text-xs text-white tracking-widest font-bold"># {data?.user?._id?.slice(0,8).toUpperCase() || 'LOADING...'}</span>
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
          
          {/* MISSION LOGS / REGISTERED EVENTS */}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoListOutline className="text-purple-400" /> ACTIVE_REGISTRY
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-[360px] flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg pointer-events-none"></div>

                <div className="mb-4 flex items-center gap-2 shrink-0">
                   <span className={`w-2 h-2 rounded-full animate-ping ${hasEvents ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                   <span className="font-mono text-xs text-gray-300 uppercase tracking-widest">
                       {hasEvents ? 'DATA STREAM ACTIVE' : 'NO DATA STREAM'}
                   </span>
                </div>

                {hasEvents ? (
                   <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {eventsList.map((event) => (
                          <div key={event.id} className="group relative flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                            <div className="p-3 bg-black/40 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all shrink-0 ring-1 ring-white/5">
                                <IoCodeSlashOutline className="text-xl" />
                            </div>
                            <div className="flex flex-col grow">
                                <h4 className="font-orbitron font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">{event.name}</h4>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className={`font-mono text-[10px] px-2 py-1 rounded uppercase tracking-widest ${event.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                          </div>
                        ))}
                     </div>
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

          {/* MY TEAMS SECTION */}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoPeopleOutline className="text-cyan-400" /> MY_TEAMS
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-[300px] flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/40 rounded-br-lg pointer-events-none"></div>

                {myTeamsList.length > 0 ? (
                   <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {myTeamsList.map((team) => (
                          <div key={team.id} className="relative group flex flex-col p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300">
                              <div className="flex justify-between items-start mb-4">
                                  <div>
                                      <h4 className="font-orbitron font-bold text-gray-200 group-hover:text-purple-300 transition-colors text-lg">{team.name}</h4>
                                      <span className="font-rajdhani text-xs text-cyan-400/80 uppercase tracking-widest">Event: {team.event}</span>
                                  </div>
                                  <div className="p-2 bg-black/40 rounded-lg text-purple-400 ring-1 ring-white/5 group-hover:bg-purple-500/20 transition-colors">
                                      <IoPeopleOutline className="text-xl" />
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                                  <span className="font-mono text-[10px] px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10 uppercase tracking-widest">
                                      Role: <span className={team.role === 'Leader' ? 'text-cyan-400 font-bold' : 'text-gray-100'}>{team.role}</span>
                                  </span>
                                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest ml-auto">
                                      {team.members} Members
                                  </span>
                              </div>
                          </div>
                        ))}
                     </div>
                   </div>
                ) : (
                   <div className="grow flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl bg-black/10 p-8">
                       <h5 className="font-orbitron text-gray-200 tracking-wide mb-1 text-lg">NO TEAMS FOUND</h5>
                       <p className="font-rajdhani text-sm text-gray-400 tracking-wide max-w-md mx-auto">
                           You are not part of any team yet. Form an team or join an existing one to compete.
                       </p>
                   </div>
                )}
             </div>
          </div>

          {/* PENDING REQUESTS SECTION */}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoMailUnreadOutline className="text-fuchsia-400" /> PENDING_REQUESTS
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-[280px] flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuchsia-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg pointer-events-none"></div>

                {pendingRequestsList.length > 0 ? (
                   <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
                     <div className="flex flex-col gap-3">
                        {pendingRequestsList.map((req) => (
                          <div key={req.id} className="relative group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/5 border border-fuchsia-500/20 rounded-xl hover:bg-white/10 hover:border-fuchsia-500/50 transition-all duration-300">
                              <div className="flex items-start gap-4">
                                  <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-400 shrink-0 ring-1 ring-fuchsia-500/20 group-hover:scale-110 transition-transform">
                                      <IoMailUnreadOutline className="text-xl" />
                                  </div>
                                  <div className="flex flex-col">
                                      <p className="font-rajdhani text-sm text-gray-300">
                                          <span className="text-fuchsia-300 font-bold">{req.from}</span> invited you to join <span className="text-white font-bold">{req.team}</span>
                                      </p>
                                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">Event: {req.event}</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                  <button className="px-4 py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-orbitron text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                      Accept
                                  </button>
                                  <button className="px-4 py-1.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white font-orbitron text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                      Decline
                                  </button>
                              </div>
                          </div>
                        ))}
                     </div>
                   </div>
                ) : (
                   <div className="grow flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl bg-black/10 p-8">
                       <h5 className="font-orbitron text-gray-200 tracking-wide mb-1 text-lg">INBOX CLEAR</h5>
                       <p className="font-rajdhani text-sm text-gray-400 tracking-wide max-w-md mx-auto">
                           You have no pending invitations at this moment.
                       </p>
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