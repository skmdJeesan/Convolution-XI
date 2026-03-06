"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";
import { IoArrowBack } from "react-icons/io5";
import FlipLink from "@/components/FlipLink";
import { userData } from "@/context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function About() {
   const { data: session } = useSession();
   const contextData = useContext(userData);
   const router = useRouter();
   const [loading, setLoading] = useState(false);
 
   const eventName = "frames";
   const isClosed = false; // Toggle this to true to shut down registrations
 
   const userEvents = contextData?.user?.eventsRegistered || [];
   const isRegistered = userEvents.some(
     (event: string) => event.toLowerCase() === eventName.toLowerCase()
   );
 
   const handleSolo = async () => {
     if (!contextData?.user?._id) return;
     setLoading(true);
     
     try {
       const res = await axios.post("/api/solo", {
         eventName: eventName,
         leaderId: contextData.user._id,
         leaderEmail: contextData.user.email,
         leaderName: contextData.user.name,
       });
       
       toast.success(res.data.message || "Registration Confirmed!");
       router.push("/profile");
     } catch (error: any) {
       toast.error(error.response?.data?.message || "Registration failed");
     } finally {
       setLoading(false);
     }
   };
 
   const RegisterBtn = () => {
     if (!session) {
       return (
         <TransitionLink
           href="/login"
           className="hover:bg-[#ffff]  shadow-[#ffff] hover:shadow-[#fff]/90 bg-white hover:opacity-80 group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#1BA0E8] uppercase tracking-wide">
             <FlipLink>Login&nbsp;to&nbsp;Register</FlipLink>
           </span>
         </TransitionLink>
       );
     }
 
     if (isClosed) {
       return (
         <div className="flex items-center gap-2 px-8 py-3 bg-white  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#1BA0E8]">
             Registrations not started yet
           </span>
         </div>
       );
     }
 
     if (isRegistered) {
       return (
         <div className="flex items-center gap-2 px-8 py-3 bg-white  backdrop-blur-md border border-white/10 rounded-full cursor-not-allowed opacity-70">
              <span className="font-orbitron text-sm md:text-base font-bold  tracking-wide text-[#1BA0E8]">
             You have Registered for this Event
           </span>
         </div>
       );
     }
 
     return (
       <button
         onClick={handleSolo}
         disabled={loading}
         className="hover:bg-[#ffff]  shadow-[#ffff] hover:shadow-[#fff]/90 bg-white hover:opacity-80 group flex items-center gap-2 px-5 py-3 
                 backdrop-blur-md rounded-full 
                transition-all duration-300 shadow-sm cursor-pointer overflow-hidden
              "
            >
              <span className="font-orbitron text-sm md:text-base font-bold text-[#1BA0E8] uppercase tracking-wide">
           <FlipLink>{loading ? "Registering..." : "Register\u00A0Now"}</FlipLink>
         </span>
       </button>
     );
   };

  return (
    <section
      id="about"
      className="md:max-h-screen pt-10 md:pt-20 pb-10 flex justify-center items-center  relative"
    >
      {/* Background color */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#52BAFF] -z-20"></div>
      
      {/* --- DECORATIVE CLOUDS AND AEROPLANES --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {/* Top Left Area */}
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[8%] left-[5%] w-12 md:w-20 h-auto opacity-90" />
        <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute top-[12%] left-[18%] md:left-[22%] w-16 md:w-24 h-auto opacity-90" />
        
        {/* Top Right Area */}
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[15%] right-[40%] md:right-[45%] w-10 md:w-16 h-auto opacity-90" />
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[20%] right-[10%] w-12 md:w-20 h-auto opacity-90" />
        
        {/* Mid Area */}
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[48%] right-[25%] md:right-[28%] w-14 md:w-16 h-auto opacity-90" />
        <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute top-[55%] right-[8%] md:right-[12%] w-16 md:w-24 h-auto opacity-90 -scale-x-100" />
        
        {/* Bottom Area */}
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[20%] left-[8%] md:left-[10%] w-14 md:w-20 h-auto opacity-90" />
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[10%] left-[45%] md:left-[50%] w-10 md:w-16 h-auto opacity-90" />
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[15%] right-[15%] md:right-[20%] w-14 md:w-20 h-auto opacity-90" />
      </div>

      <div className="w-full h-full maxWidthForSections relative z-10">
        <div className=" grid grid-cols-1 gap-y-2 lg:grid-cols-2 ">
          
          {/* BOT AND BIG CLOUD CONTAINER */}
          <div className="flex justify-center flex-col items-center relative">
            <div className="relative w-[70vw] md:w-[60vw] lg:max-w-[35vw] flex justify-center items-center">
                {/* The Bot */}
                <Image width={400} height={400}
                className="w-full h-auto animate-float relative z-10"
                src="/Frames/HeroBot.png"
                alt="Frames Bot"
                /> 
                {/* The Big Cloud - Now locked safely behind and below the bot! */}
                <Image 
                    src="/Frames/HerobigCloud.png" 
                    alt="cloud" 
                    width={280} 
                    height={100} 
                    className="absolute -bottom-[5%] md:-bottom-[10%] w-[70%] md:w-[75%] h-auto opacity-100 z-20 drop-shadow-lg" 
                />
            </div>
          </div>
          
        {/* Logo */}
        <div className="flex flex-col justify-center items-center gap-y-4">
        <div className="relative w-[80vw] max-w-[450px] h-auto aspect-[3/1.2]">
            <Image
                src="/Frames/logo.png"
                alt="24 Frames Logo"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                priority
            />
        </div>

        <p className="font-rajdhani text-white sm:text-xl text-base text-center font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
         Unleash your creativity in 24 Frames, an open-theme as well as a particular theme, also
present this time. A photography contest that invites participants to tell compelling stories
through their lenses. Submit your photographs along with captions and compete for both the
Judges’ Choice and People’s Choice awards. The top 24 entries will be shortlisted and
showcased for public voting. Participants are required to adhere strictly to the event
guidelines—original work only, with no plagiarism or watermarks. Let your lens do the talking.
        </p>

        <div className="mt-4 md:mb-5">
          {RegisterBtn()}
        </div>
</div>
      </div>
      </div>
    </section>
  );
}