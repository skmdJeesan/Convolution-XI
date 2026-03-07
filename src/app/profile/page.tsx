"use client";
import FlipLink from '@/components/FlipLink'
import Loader from '@/components/Loader'
import { userData } from '@/context/UserContext'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import React, { useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoLogOutOutline, IoHardwareChipOutline, IoTimeOutline, 
  IoSchoolOutline, IoCodeSlashOutline, IoWarningOutline, IoMailOutline, 
  IoCallOutline, IoQrCodeOutline, IoListOutline, IoPeopleOutline, IoMailUnreadOutline 
} from 'react-icons/io5'
import { 
  FaCode, FaLaptopCode, FaMicrochip, FaQuestion, 
  FaCamera, FaLightbulb, FaChess, FaRandom, FaMicrophone 
} from 'react-icons/fa';
import TransitionLink from '@/components/TransitionLink'
import ProfileNav from './ProfileNav'
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

// interfaces
interface EventData {
  id: string;
  name: string;
  date?: string;
  status: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: string;
  isLeader: boolean;
}

interface TeamData {
  id: string;
  name: string;
  event: string;
  role: string;
  members: number;
  memberDetails: TeamMember[]; 
}

interface RequestData {
  _id: string;
  leader: { name: string; email: string };
  teamName: string;
  eventName: string;
}

// icons for events
const getEventIcon = (eventName: string) => {
  const name = eventName.toLowerCase();
  if (name.includes('algomaniac')) return <FaCode className="text-base" />;
  if (name.includes('sparkhack')) return <FaLaptopCode className="text-base" />;
  if (name.includes('circuistics')) return <FaMicrochip className="text-base" />;
  if (name.includes('inquizzitive') || name.includes('inquizitive')) return <FaQuestion className="text-base" />;
  if (name.includes('frames')) return <FaCamera className="text-base" />;
  if (name.includes('eureka')) return <FaLightbulb className="text-base" />;
  if (name.includes('decisia')) return <FaChess className="text-base" />;
  if (name.includes('aboltabol')) return <FaRandom className="text-base" />;
  if (name.includes('jutalks')) return <FaMicrophone className="text-base" />;
  return <IoCodeSlashOutline className="text-base" />; // Fallback icon
};

const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#050508]"></div>
    <div className="absolute top-[-5%] left-[10%] w-[80vw] h-[90vh] bg-purple-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="hidden lg:block absolute top-[20%] right-[-5%]  w-[80vw] h-[90vh] bg-fuchsia-900/20 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-fuchsia-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="hidden lg:block absolute bottom-[-5%] right-[-10%] w-[60vw] h-[110vh] bg-cyan-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute bottom-[4%] right-[-5%] w-[80vw] h-[110vh] bg-cyan-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="block lg:hidden absolute bottom-[2%] left-[-10%] w-[70vw] h-[80vh] bg-purple-900/40 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="hidden lg:block absolute bottom-[5%] left-[-5%] w-[75vw] h-[110vh] bg-purple-900/30 blur-[100px] rounded-full mix-blend-screen"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>
  </div>
);

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
  const router = useRouter()
  
  // states
  const [pendingRequestsList, setPendingRequestsList] = useState<RequestData[]>([]);
  const [myTeamsList, setMyTeamsList] = useState<TeamData[]>([]); 
  const [eventsList, setEventsList] = useState<EventData[]>([]); 
  const hasEvents = eventsList.length > 0;
  const [invitesLoading, setInvitesLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // for adding new members
  const [addMemberMode, setAddMemberMode] = useState<string | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [addMemberLoading, setAddMemberLoading] = useState(false);
  
  // for member status dropdown
  const [openTeamStatus, setOpenTeamStatus] = useState<string | null>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  // useEffect for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeCardRef.current && !activeCardRef.current.contains(event.target as Node)) {
        setOpenTeamStatus(null);
      }
    };

    if (openTeamStatus) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openTeamStatus]);

  useEffect(() => {
    if (data?.user?._id) {
        const userId = data?.user?._id;

        // fetch pending invites
        axios.get(`/api/team/invites?userId=${userId}`)
            .then((res) => {
                const formattedInvites = (res.data.invites || []).map((req: any) => ({
                    ...req,
                    eventName: req.eventName.toLowerCase().trim() === 'frames' ? '24Frames' : req.eventName
                }));
                setPendingRequestsList(formattedInvites);
                setInvitesLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching invites:", err);
                setInvitesLoading(false);
            });

        // fetch active team and users
        axios.get(`/api/team/my-teams?userId=${userId}`)
            .then((res) => {
                const fetchedTeams = res.data.teams || [];
                
                const solo_events = ["algomaniac", "jutalks", "frames", "24frames"];
                
                const groupTeams = fetchedTeams.filter((t: any) => !solo_events.includes(t.eventName.toLowerCase().trim()));
                
                // sort members
                const formattedTeams = groupTeams.map((t: any) => {
                    const leaderDetail = {
                        id: t.leader?._id || t.leader,
                        name: t.leader?.name || "Leader",
                        email: t.leader?.email || "Unknown Email",
                        status: "accepted",
                        isLeader: true
                    };

                    const memberDetailsList = t.members.map((m: any) => ({
                        id: m.user?._id || m.user,
                        name: m.user?.name || "Unknown User",
                        email: m.user?.email || m.email || "Unknown Email",
                        status: m.status,
                        isLeader: false
                    }));

                    // ensure leader isn't duplicated
                    const combinedMembers = [
                        leaderDetail, 
                        ...memberDetailsList.filter((m: any) => m.id !== leaderDetail.id)
                    ];
                    
                    // sorting the particular user first
                    combinedMembers.sort((a, b) => {
                        if (a.id === userId) return -1;
                        if (b.id === userId) return 1;
                        if (a.isLeader) return -1;
                        if (b.isLeader) return 1;
                        return 0;
                    });

                    return {
                        id: t._id,
                        name: t.teamName,
                        event: t.eventName.toLowerCase().trim() === 'frames' ? '24Frames' : t.eventName,
                        role: t.leader?._id === userId ? "Leader" : "Member",
                        members: t.members.filter((m: any) => m.status === 'accepted').length + 1,
                        memberDetails: combinedMembers
                    };
                });

                setMyTeamsList(formattedTeams);

            
                const userRegisteredEvents = data?.user?.eventsRegistered || [];
                
                const allEventNames = new Set(userRegisteredEvents.map((e: string) => e.toLowerCase().trim()));
                fetchedTeams.forEach((t: any) => allEventNames.add(t.eventName.toLowerCase().trim()));

                const formattedEvents = Array.from(allEventNames).map((eventName, idx) => {
                    const associatedTeam = fetchedTeams.find((t: any) => t.eventName.toLowerCase().trim() === eventName);
                    
                    let displayName = eventName;
                    if (eventName === 'frames' || eventName === '24frames') displayName = '24Frames';

                    return {
                        id: associatedTeam?._id || `event-${idx}`,
                        name: displayName,
                        
                        status: associatedTeam ? (associatedTeam.status === "confirmed" ? "Confirmed" : "Pending Registration") : "Confirmed"
                    };
                });
                
                setEventsList(formattedEvents);
            })
            .catch(err => {
                console.error("Error fetching my teams:", err);
                if (err.response?.status === 403) {
                     toast.error(err.response?.data?.message || "Access restricted.", {
                         style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
                         iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
                     });
                }
            });
    }
  }, [data?.user?._id, data?.user?.eventsRegistered]);

  const handleAction = async (teamId: string, action: "accept" | "decline") => {
      if(!data?.user?._id) return;

      if (action === "accept") {
          if (data?.user?.institution && data?.user?.department && data?.user?.year) {
              const inst = data.user.institution.toLowerCase().replace(/\s+/g, "");
              const isJU = inst === "ju" || inst.includes("jadavpur");

              const dept = data.user.department.toLowerCase().replace(/\s+/g, "");
              const isEE = dept === "ee" || dept === "ele" || dept.includes("electrical");

              const yr = data.user.year.toUpperCase().replace(/\s+/g, "");
              const isUG3 = yr === "UG3";

              if (isJU && isEE && isUG3) {
                  toast.error("3rd Year EE, JU is not allowed to participate.", {
                      style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
                      iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
                  });
                  return; 
              }
          }
      }

      setActionLoading(teamId);
      
      try {
          const response = await axios.post(`/api/team/${action}`, {
              teamId,
              userId: data?.user?._id 
          });

          toast.success(response.data.message, {
              style: { background: "#0a0e14", color: "#10b981", border: "1px solid #059669", fontFamily: "rajdhani" },
              iconTheme: { primary: '#10b981', secondary: '#0a0e14' }
          });
          
          setPendingRequestsList((prev) => prev.filter((invite) => invite._id !== teamId));
          
          if (action === "accept") {
              setTimeout(() => {
                  window.location.reload();
              }, 1000); 
          }
      } catch (error: any) {
          toast.error(error.response?.data?.message || `Failed to ${action} invite`, {
              style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
              iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
          });
      } finally {
          setActionLoading(null);
      }
  };
  
  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: true, callbackUrl: '/login' })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoading(false)
      toast.error("Failed to log out", {
          style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
          iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
      });
    }
  }
  
  const handleAddMember = async (teamId: string) => {
      if (!newMemberEmail || !data?.user?._id) {
          toast.error("Please enter a valid email address.", {
              style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
              iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
          });
          return;
      }


      if (data?.user?.institution && data?.user?.department && data?.user?.year) {
          const inst = data.user.institution.toLowerCase().replace(/\s+/g, "");
          const isJU = inst === "ju" || inst.includes("jadavpur");

          const dept = data.user.department.toLowerCase().replace(/\s+/g, "");
          const isEE = dept === "ee" || dept === "ele" || dept.includes("electrical");

          const yr = data.user.year.toUpperCase().replace(/\s+/g, "");
          const isUG3 = yr === "UG3";

          if (isJU && isEE && isUG3) {
              toast.error("You are restricted from performing this action.", {
                  style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
                  iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
              });
              return; 
          }
      }

      setAddMemberLoading(true);
      
      try {
          const res = await axios.post('/api/team/add-member', {
              teamId,
              leaderId: data?.user?._id,
              newMemberEmail
          });
          
          toast.success(res.data.message, {
              style: { background: "#0a0e14", color: "#10b981", border: "1px solid #059669", fontFamily: "rajdhani" },
              iconTheme: { primary: '#10b981', secondary: '#0a0e14' }
          });
          
          setAddMemberMode(null);
          setNewMemberEmail("");
          
          setTimeout(() => {
              window.location.reload(); 
          }, 1000);
      } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to add member", {
              style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d", fontFamily: "rajdhani" },
              iconTheme: { primary: '#ef4444', secondary: '#0a0e14' }
          });
      } finally {
          setAddMemberLoading(false);
      }
  };

  const btnShape = "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg group cursor-pointer overflow-hidden";
  const logoutBtnClass = `${btnShape} border-red-500 bg-red-500/20 lg:bg-red-950/20 lg:border-red-500/30 lg:hover:border-red-500 lg:hover:bg-red-500/20 lg:hover:shadow-red-500/20`;

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
              <div 
                onClick={() => router.push('/profile/edit')}
                className="edit absolute -right-2 -top-1 cursor-pointer flex flex-col items-center gap-1 hover:scale-105 hover:text-cyan-400 transition-transform duration-200">
                <Edit size={16}/>
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
          
          {/* registered events*/}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoListOutline className="text-purple-400" /> ACTIVE_REGISTRY
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-80 flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg pointer-events-none"></div>

                <div className="mb-4 flex items-center gap-2 shrink-0">
                   <span className={`w-2 h-2 rounded-full animate-ping ${hasEvents ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                   <span className="font-mono text-xs text-gray-300 uppercase tracking-widest">
                       {hasEvents ? 'DATA STREAM ACTIVE' : 'NO DATA STREAM'}
                   </span>
                </div>

                {hasEvents ? (
                   <div className="flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2 px-1 md:px-2">
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {eventsList.map((event) => (
                          <div key={event.id} className="group relative flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300">
                            <div className="p-3 bg-black/40 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all shrink-0 ring-1 ring-white/5">
                               {getEventIcon(event.name)}
                            </div>
                            <div className="flex flex-row items-center justify-between grow">
                                <h4 className="font-orbitron text-base font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors capitalize tracking-widest">{event.name}</h4>
                                <div className="flex items-center justify-between">
                                    <span className={`font-rajdhani text-[10px] md:text-[12px] font-semibold px-1 py-1 rounded  uppercase tracking-wider whitespace-nowrap shrink-0 ${event.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                          </div>
                        ))}
                     </div>
                   </div>
                ) : (
                   <div className="grow flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl bg-black/10 p-4">
                       <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 ring-1 ring-white/10 shrink-0">
                           <IoWarningOutline className="text-2xl text-red-500" />
                       </div>
                       <h5 className="font-orbitron text-gray-200 tracking-wide mb-1 text-base">ARCHIVES EMPTY</h5>
                       <p className="font-rajdhani text-xs text-gray-400 tracking-wide max-w-md mx-auto mb-4">
                           No participation records found. Participate in an event to populate.
                       </p>
                       <TransitionLink 
                           href='/#events'
                           className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron text-[10px] font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:-translate-y-1 cursor-pointer shrink-0"
                       >
                           <FlipLink>Show&nbsp;Events</FlipLink>
                       </TransitionLink>
                   </div>
                )}
             </div>
          </div>

          {/*teams */}
          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoPeopleOutline className="text-cyan-400" /> MY_TEAMS
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-90 flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/40 rounded-br-lg pointer-events-none"></div>

                {myTeamsList.length > 0 ? (
                   <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2 px-1 md:px-4">
                     <div className="grid grid-cols-1 gap-4">
                        {myTeamsList.map((team) => (
                          <div 
                              key={team.id} 
                              ref={openTeamStatus === team.id ? activeCardRef : null}
                              className={`relative group flex flex-col p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 ${openTeamStatus === team.id ? 'border-cyan-500/50 bg-black/20' : ''}`}
                          >
                              <div className="flex justify-between items-start mb-3">
                                  <div>
                                      <h4 className="font-orbitron font-bold text-fuchsia-300 group-hover:text-purple-300 transition-colors text-[17px] capitalize pb-1">{team.name}</h4>
                                      <span className="font-rajdhani text-sm font-semibold text-slate-300 capitalize tracking-wide">Event: <span className='text-cyan-400 uppercase'>{team.event}</span></span>
                                  </div>
                                  <div className="p-2 bg-black/40 rounded-lg text-purple-400 ring-1 ring-white/5 group-hover:bg-purple-500/20 transition-colors">
                                      <IoPeopleOutline className="text-xl" />
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                                  <span className="font-rajdhani text-[14px] md:text-sm px-2 py-1 bg-white/5 rounded text-slate-300 border border-white/10 capitalize tracking-widest font-semibold">
                                      Role: <span className='text-cyan-400 uppercase'>{team.role}</span>
                                  </span>
                                  
                                  {/*button*/}
                                  <div className="ml-auto relative">
                                      <button 
                                          onClick={() => setOpenTeamStatus(openTeamStatus === team.id ? null : team.id)}
                                          className="font-rajdhani text-[13px] md:text-sm text-slate-300 uppercase tracking-widest font-semibold flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors"
                                      >
                                          {team.members} Members <span className={`text-[10px] transition-transform duration-300 ${openTeamStatus === team.id ? 'rotate-180' : ''}`}>▼</span>
                                      </button>
                                  </div>
                              </div>

                              {/* dropdown */}
                              {openTeamStatus === team.id && (
                                  <div className="mt-3 pt-3 border-t border-white/10 w-full bg-black/20 rounded-lg p-2">
                                      <h5 className="font-orbitron text-[14px] md:text-base font-semibold text-cyan-400 mb-2 border-b border-white/10 pb-1 tracking-wider">Team Details</h5>
                                      <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                                          {team.memberDetails.map((member, idx) => (
                                              <li key={idx} className="flex justify-between items-center text-[14px] md:text-base font-medium font-rajdhani gap-2">
                                                  <div className="flex items-center gap-1.5 truncate max-w-[140px]">
                                                      <span className="text-slate-300 truncate " title={member.email}>
                                                          {member.name !== "Unknown User" ? member.name : member.email}
                                                      </span>
                                                      {member.id === data?.user?._id && (
                                                          <span className="text-[14px] md:text-base font-bold text-cyan-400">(You)</span>
                                                      )}
                                                      {member.isLeader && member.id !== data?.user?._id && (
                                                          <span className="text-[14px] md:text-base font-bold text-purple-400">(Leader)</span>
                                                      )}
                                                  </div>
                                                  <span className={`px-1.5 py-0.5 rounded text-[12px] uppercase tracking-wider shrink-0 
                                                      ${member.status === 'accepted' 
                                                          ? 'bg-emerald-500/20 text-emerald-400' 
                                                          : 'bg-orange-500/20 text-orange-400'
                                                      }`}
                                                  >
                                                      {member.status}
                                                  </span>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              )}

                              {/* add member */}
                           {team.role === "Leader" && (
    <div className="mt-3 pt-3 border-t border-white/5">
        {addMemberMode === team.id ? (
            <div className="flex items-end gap-2 mt-2">
                
                <div className="group/input relative flex-1">
                    <div className="flex justify-between items-end mb-0.5 px-1">
                        <label className="font-rajdhani text-sm text-cyan-100/80 font-semibold tracking-wider uppercase">Email</label>
                    </div>
                    <div className="relative flex items-center w-full bg-[#0a0a10]/60 border border-cyan-900/50 rounded overflow-hidden focus-within:border-cyan-500/80 transition-colors duration-300 h-8">
                        <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                        <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors">
                            <IoMailOutline size={14} />
                        </div>
                        <input
                            name='email'
                            required
                            spellCheck={false}
                            autoCorrect="off"
                            autoCapitalize="off"
                            type="email" 
                            placeholder="teammate@example.com" 
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            autoFocus
                            className='w-full bg-transparent pr-2 text-[15px] text-cyan-100 placeholder-cyan-600/50 outline-none font-rajdhani tracking-wider autofill:shadow-[inset_0_0_0px_1000px_#0a0a10] autofill:[-webkit-text-fill-color:#cffafe]'
                        />
                    </div>
                </div>

                <button 
                    onClick={() => handleAddMember(team.id)}
                    disabled={addMemberLoading}
                    className="cursor-pointer text-[11px] bg-cyan-600/80 hover:bg-cyan-500 px-3 h-8 rounded text-white font-bold font-orbitron tracking-widest disabled:opacity-50 transition-colors"
                >
                    <FlipLink>{addMemberLoading ? "..." : "ADD"}</FlipLink>
                </button>
                <button 
                    onClick={() => {setAddMemberMode(null); setNewMemberEmail("");}}
                    className="cursor-pointer text-[14px] bg-red-600/50 hover:bg-red-500/80 px-3 h-8 rounded text-white font-bold transition-colors"
                >
                    X
                </button>
            </div>
        ) : (
            <button 
                onClick={() => setAddMemberMode(team.id)}
                className="cursor-pointer w-full text-center text-[13px] font-semibold text-white   bg-cyan-600/80 hover:bg-cyan-500 h-8 rounded transition-all font-orbitron tracking-widest mt-1"
            >
                + Invite New Member
            </button>
        )}
    </div>
)}
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

          <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide flex items-center gap-2">
                   <IoMailUnreadOutline className="text-fuchsia-400" /> PENDING_REQUESTS
                </h3>
             </div>

             <div className="relative bg-[#0e0e14]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden h-[300px] flex flex-col">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuchsia-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg pointer-events-none"></div>

                {invitesLoading ? (
                    <div className="grow flex flex-col items-center justify-center text-fuchsia-400 animate-pulse">
                        <Loader />
                        <span className="font-mono text-[14px] mt-4 tracking-widest">SCANNING SECURE CHANNELS...</span>
                    </div>
                ) : pendingRequestsList.length > 0 ? (
                   <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
                     <div className="flex flex-col gap-3">
                        {pendingRequestsList.map((req) => (
                          <div key={req._id} className="relative group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/5 border border-fuchsia-500/20 rounded-xl hover:bg-white/10 hover:border-fuchsia-500/50 transition-all duration-300">
                              <div className="flex items-start gap-4">
                                  <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-400 shrink-0 ring-1 ring-fuchsia-500/20 group-hover:scale-110 transition-transform">
                                      <IoMailUnreadOutline className="text-xl" />
                                  </div>
                                  <div className="flex flex-col">
                                      <p className="font-rajdhani text-base text-gray-300">
                                          <span className="text-fuchsia-300 font-bold capitalize">{req.leader.name}</span> invited you to join <span className="text-cyan-400 font-bold">{req.teamName}</span>
                                      </p>
                                      <span className="font-rajdhani text-[14px] md:text-sm font-semibold text-slate-300 capitalize tracking-widest">Event: <span className='text-cyan-400 uppercase'>{req.eventName}</span></span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                  <button 
                                      onClick={() => handleAction(req._id, "accept")}
                                      disabled={actionLoading === req._id}
                                      className="cursor-pointer px-4 py-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-orbitron text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] disabled:opacity-50"
                                  >
                                     <FlipLink>{actionLoading === req._id ? "Processing..." : "Accept"}</FlipLink> 
                                  </button>
                                  <button 
                                      onClick={() => handleAction(req._id, "decline")}
                                      disabled={actionLoading === req._id}
                                      className="cursor-pointer px-4 py-2 rounded bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white font-orbitron text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] disabled:opacity-50"
                                  >
                                      <FlipLink>Decline</FlipLink>
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