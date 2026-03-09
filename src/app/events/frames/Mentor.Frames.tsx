import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

type Mentor = {
    name: string;
    post: string;
    university: string;
    image: string;
    profile: string
};

const mentors: Mentor[] = [
    {
        name: "Sayantan Chakraborty",
        post: "Assistant Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/stc.png",
        profile: "https://jadavpuruniversity.in/faculty-profile/sovan-dalai/"
    },
];
const Mentors = () => {
  return (
    <div
      id="judges"
      className="relative w-full py-10 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#52BAFF] -z-20"></div>

      {/* clouds and aeroplanes */}
       <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
              
              {/* Two Aeroplanes - Sized and positioned exactly like the screenshots */}
              <Image 
                src="/Frames/aeroplane.png" 
                alt="aeroplane" 
                width={100} 
                height={60} 
                className="absolute top-[20%] left-[8%] md:left-[60%] w-16 md:w-20 h-auto opacity-100 -scale-x-100" 
              />
              <Image 
                src="/Frames/aeroplane.png" 
                alt="aeroplane" 
                width={100} 
                height={60} 
                className="absolute bottom-[5%] left-[30%] md:left-[25%] w-16 md:w-20 h-auto opacity-100 " 
              />
              <Image 
                src="/Frames/aeroplane.png" 
                alt="aeroplane" 
                width={100} 
                height={60} 
                className="absolute top-[55%] md:top-[60%] right-[5%] md:right-[5%] w-16 md:w-20 h-auto opacity-100  -scale-x-100" 
              />
      
              {/* Clouds - Scattered to match the sky aesthetic */}
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[8%] left-[30%] w-10 md:w-14 h-auto opacity-80 " />
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[18%] right-[25%] w-12 md:w-16 h-auto opacity-80" />
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[45%] left-[10%] w-10 md:w-14 h-auto opacity-80" />
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[25%] right-[20%] w-12 md:w-16 h-auto opacity-80" />
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="hidden md:absolute bottom-[15%] left-[25%] w-14 md:w-20 h-auto opacity-100" />
              <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[8%] right-[40%] w-10 md:w-14 h-auto opacity-80 " />
            </div>
      {/* --- MENTORS HEADING (At the very top) --- */}
      {/* Kept the same styling as your Timeline heading */}
      <div className="relative  lg:top-10 w-full z-40 flex flex-col justify-center px-6 mb-10 lg:mb-15">
        <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
                        Mentor
                    </h1>
                    <p className="opacity-90 text-center text-white mt-5 text-base md:text-lg font-rajdhani font-bold tracking-wide">
                        Meet the Mentor of 24Frames!
                    </p>
      </div>

      
                      <div className="flex justify-center md:flex-wrap lg:flex-nowrap flex-col md:flex-row gap-2 md:gap-x-6">
                    {mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-white/20 shadow-black/20 shadow-md backdrop-blur-sm flex py-4 px-3 items-center gap-x-4 sm:max-w-[500px]"
                        >
                            <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-300">
                                {mentor.image ? (
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full font-rajdhani bg-[#592A13] flex items-center justify-center text-3xl font-bold text-white">
                                        {mentor.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5 text-white">
                                  
                                    <h3 className="tfont-rajdhani text-sm sm:text-lg font-semibold text-white tracking-tight">
                                        {mentor.name}
                                    </h3>
                                    <Link target="_blank" href={mentor.profile}>
                <FaInfoCircle  />
              </Link>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-200 leading-snug font-rajdhani font-semibold">
                                    {mentor.post}, <br className="hidden sm:block" /> {mentor.university}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
    </div>
  );
};

export default Mentors;