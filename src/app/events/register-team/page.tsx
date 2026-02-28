"use client";
import React, { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { 
  IoArrowBack, 
  IoFingerPrintOutline, 
  IoPeopleOutline, 
  IoMailOutline,
  IoAddOutline
} from "react-icons/io5";
import { motion } from "framer-motion";
import { userData } from "@/context/UserContext";
import TransitionLink from "@/components/TransitionLink";
import DecorativeIcons from "@/components/DecorativeIcons";
import FlipLink from "@/components/FlipLink";

// --- LOADER ---
const Loader = () => (
  <div className="flex items-center gap-1">
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
    <span className="w-0.5 h-5 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.1s_infinite]"></span>
    <span className="w-0.5 h-3 bg-cyan-950 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"></span>
  </div>
);

const eventConfigurations = [
  { eventName: "circuistics", min: 1, max: 3 }, 
  { eventName: "sparkhack", min: 1, max: 3 },
  { eventName: "eureka", min: 1, max: 3 },
  { eventName: "inquizzitive", min: 1, max: 3 },
  { eventName: "decisia", min: 1, max: 4 },
  { eventName: "aboltabol", min: 1, max: 3 },
];

const teamSchema = (min: number, max: number) =>
  z.object({
    teamName: z.string().min(3, "Team name must be at least 3 characters long"),
    members: z
      .array(z.string().email("Invalid email address"))
      .min(min, `At least ${min} member(s) required`)
      .max(max, `Cannot exceed ${max} member(s)`)
      .refine(
        (members) => members.filter(Boolean).length >= min,
        `At least ${min} team member${min > 1 ? "s are" : " is"} required`
      ),
  });

export default function EventRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventName = searchParams.get("eventName") || "unknown";

  const contextData = useContext(userData);
  const user = contextData?.user;

  const eventConfig = eventConfigurations.find(
    (event) => event.eventName === eventName
  ) || { min: 1, max: 3 };

  const schema = teamSchema(eventConfig.min, eventConfig.max);
  type TeamFormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<TeamFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      teamName: "",
      members: Array(eventConfig.min).fill(""),
    },
  });

  const members = watch("members");
  const [memberCount, setMemberCount] = useState(eventConfig.min);

  const onSubmit = async (data: TeamFormValues) => {
    if (!user?._id || !user?.email) {
      toast.error("Auth token missing. Re-initialize sequence (Log in).", {
        style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #ef4444" }
      });
      return;
    }

    try {
      await axios.post("/api/team", { 
        teamName: data.teamName,
        eventName: eventName, 
        leaderId: user._id, 
        members: data.members.filter(Boolean), 
        leaderEmail: user.email,
        leaderName: user.name,
      });

      // Silently update Context
      if (contextData?.setUser) {
         contextData.setUser({
            ...user,
            eventsRegistered: [...(user.eventsRegistered || []), eventName.toLowerCase()]
         });
      }

      toast.success("TEAM INITIALIZED SUCCESSFULLY", {
        style: { background: "#0a0e14", color: "#22d3ee", border: "1px solid #0891b2" },
        iconTheme: { primary: '#22d3ee', secondary: '#0a0e14' },
      });
      
      reset(); 
      router.push("/profile"); 

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to establish team link.", {
        style: { background: "#0a0e14", color: "#ef4444", border: "1px solid #7f1d1d" }
      });
    }
  };

  const addMember = () => {
    if (memberCount < eventConfig.max) {
      setMemberCount(memberCount + 1);
      setValue("members", [...members, ""]);
    }
  };

  const removeMember = (index: number) => {
    if (memberCount > eventConfig.min) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setValue("members", updatedMembers);
      setMemberCount(updatedMembers.length);
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

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050505]"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill-opacity='0' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>
          <div className="hidden md:block absolute top-0 left-0 w-[50vw] h-[50vh] bg-cyan-600/30 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="block md:hidden absolute top-5 left-10 w-[80vw] h-[50vh] bg-cyan-600/40 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="block md:hidden absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-600/40 blur-[120px] rounded-full mix-blend-screen"></div>
          <DecorativeIcons/>
      </div>
      
      <TransitionLink
        href={`/events/${eventName}`}
        className="hidden md:flex absolute top-6 left-6 z-50 items-center gap-2 px-4 py-2.5 bg-cyan-950/40 border-cyan-500/50 lg:bg-black/30 lg:border-white/10 lg:hover:border-cyan-500/50 lg:hover:bg-cyan-950/40 lg:hover:shadow-cyan-500/20 backdrop-blur-md border rounded-full transition-all duration-300 shadow-lg group cursor-pointer overflow-hidden"
      >
        <IoArrowBack className="text-cyan-400 text-lg group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-cyan-100 group-hover:text-white uppercase transition-colors">
          <FlipLink>Return</FlipLink>
        </span>
      </TransitionLink>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full md:max-w-[85vw] lg:max-w-162.5 px-4 my-auto" 
      >
        
        <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30 rounded-sm opacity-70 group-hover:opacity-100 transition duration-500 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]"></div>

            {/* Main Panel */}
            <div className="relative bg-[#080a0f]/90 backdrop-blur-md [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] shadow-2xl">
                
                <div className="flex items-center justify-between px-5 py-2 bg-[#0f1219] border-b border-cyan-800/20">
                    <div className="flex items-center gap-1.5">
                         <div className="hidden md:flex gap-1.5">
                             <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                             <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         </div>
                         <TransitionLink href={`/events/${eventName}`} className="md:hidden flex items-center group cursor-pointer -ml-1">
                            <IoArrowBack className="text-cyan-400 text-2xl group-hover:-translate-x-1 transition-transform duration-300" />
                         </TransitionLink>
                    </div>
                    <span className="font-rajdhani text-[10px] tracking-[0.2em] text-cyan-400/80 font-semibold uppercase">
                      TEAM_REG_V1 | {eventName.toUpperCase()}
                    </span>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="text-center mb-5">
                    <h1 className="font-orbitron text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-1">
                      INITIALIZE TEAM
                    </h1>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    
                    <div className="flex items-center justify-between bg-cyan-950/20 border border-cyan-900/40 p-2.5 [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]">
                      <span className="font-rajdhani text-sm text-cyan-500 font-bold uppercase tracking-widest pl-1">Team Leader:</span>
                      <span className="font-orbitron text-sm font-semibold text-fuchsia-300 pr-1 truncate uppercase">{user?.name || "Loading..."}</span>
                    </div>

                    {/* Team Name Input */}
                    <div className='group/input relative'>
                          <div className="flex justify-between items-end mb-0.5 px-1">
                            <label className="font-rajdhani text-sm text-slate-300 font-semibold tracking-wider uppercase">Team Name</label>
                          </div>
                          <div className={inputContainerClass}>
                            <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                            <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoPeopleOutline size={16} /></div>
                            <input 
                                type="text" 
                                {...register("teamName")}
                                placeholder='Enter Team Name' 
                                spellCheck={false}
                                autoComplete="off"
                                className='w-full bg-transparent px-2 text-[16px] font-medium text-cyan-100 placeholder-cyan-600/50 outline-none font-rajdhani tracking-wider' 
                            />
                          </div>
                          {errors.teamName && (
                            <p className="text-red-400 text-sm font-medium italic font-rajdhani mt-1 ml-1 tracking-wide">{errors.teamName.message}</p>
                          )}
                    </div>

                    {/* Team Members Section */}
                    <div>
                      <div className="flex justify-between items-end mb-2 px-1">
                         <label className="font-rajdhani text-sm text-slate-300 font-semibold tracking-wider uppercase">Member's Email</label>
                      </div>

                      <div className="flex flex-col gap-2">
                        {members.map((_, index) => (
                          <div key={index} className="flex gap-2 w-full group/input relative">
                            <div className={`flex-1 ${inputContainerClass}`}>
                                <div className="w-1 h-full absolute left-0 bg-cyan-900/40 group-focus-within/input:bg-cyan-400 transition-colors duration-300"></div>
                                <div className="pl-3 pr-2 text-cyan-600 group-focus-within/input:text-cyan-400 transition-colors"><IoMailOutline size={16} /></div>
                                <input 
                                    type="email" 
                                    {...register(`members.${index}` as const)}
                                    placeholder={`Operative ${index + 1} Email`}
                                    spellCheck={false}
                                    className='w-full bg-transparent px-2 text-[16px] text-cyan-100 placeholder-cyan-600/50 outline-none font-rajdhani tracking-wider' 
                                />
                            </div>
                            
                            {memberCount > eventConfig.min && (
                              <button
                                type="button"
                                onClick={() => removeMember(index)}
                                className="cursor-pointer h-9 w-10 shrink-0 flex items-center justify-center bg-red-950/20 border border-red-900/30 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-colors duration-300 [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]"
                              >
                                <BiTrash size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {errors.members && (
                        <p className="text-red-400 text-xs font-rajdhani mt-2 ml-1 tracking-wide">
                          {Array.isArray(errors.members)
                            ? errors.members[0]?.message
                            : errors.members.message}
                        </p>
                      )}

                      {/* Add Member Button */}
                      {memberCount < eventConfig.max && (
                        <button
                          type="button"
                          onClick={addMember}
                          className="cursor-pointer mt-3 w-full h-8 flex items-center justify-center gap-2 bg-[#0a0e14]/50 border border-cyan-800/30 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-cyan-600 hover:text-cyan-400 font-rajdhani text-sm font-semibold tracking-widest uppercase transition-all duration-300 [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]"
                        >
                          <IoAddOutline size={16} /> ADD MEMBER
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="cursor-pointer font-orbitron group relative w-full h-11 mt-4 bg-cyan-500 hover:bg-cyan-400 text-[#05080f] text-sm tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader /> : <><IoFingerPrintOutline className="text-xl" />AUTHORIZE TEAM</>}
                      </span>
                    </button>

                  </form>
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="mt-2 flex justify-between text-[9px] text-cyan-900/70 uppercase font-bold tracking-[0.2em] select-none w-full max-w-162.5 sm:flex">
          <span>EVENT_LINK_SECURE</span>
          <span className="text-emerald-700 animate-pulse">DB_SYNC_ACTIVE</span>
        </div>

      </motion.div>
    </div>
  );
}