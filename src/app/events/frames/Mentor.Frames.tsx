import Image from "next/image";
import React from "react";

const Mentors = () => {
  return (
    <div
      id="judges"
      className="relative w-full pt-20 md:pt-25 pb-30 flex flex-col items-center justify-center overflow-hidden"
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
        <h1 className="font-orbitron font-bold text-center text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
                        Mentor
                    </h1>
                    <p className="opacity-90 text-center text-white mt-5 text-base md:text-lg font-rajdhani font-bold tracking-wide">
                        Meet the Mentor of 24Frames!
                    </p>
      </div>

      
      <div className="relative w-[280px] md:w-[450px] h-[180px] md:h-[250px] flex flex-col items-center justify-center z-20 mt-10">

        {/* --- CORNER BRACKETS --- */}
        <div className="absolute top-0 left-0 w-6 md:w-10 h-6 md:h-10 border-t-2 border-l-2 border-[#1e293b]"></div>
        <div className="absolute top-0 right-0 w-6 md:w-10 h-6 md:h-10 border-t-2 border-r-2 border-[#1e293b]"></div>
        <div className="absolute bottom-0 left-0 w-6 md:w-10 h-6 md:h-10 border-b-2 border-l-2 border-[#1e293b]"></div>
        <div className="absolute bottom-0 right-0 w-6 md:w-10 h-6 md:h-10 border-b-2 border-r-2 border-[#1e293b]"></div>

        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
          <span className="text-[#1e293b] font-bold text-[10px] md:text-xs tracking-widest uppercase">
            REC
          </span>
        </div>

        <div className="relative w-8 md:w-12 h-8 md:h-12 flex items-center justify-center mb-2 md:mb-4">
          <div className="absolute top-0 left-0 w-2 md:w-3 h-2 md:h-3 border-t border-l border-[#1e293b]"></div>
          <div className="absolute top-0 right-0 w-2 md:w-3 h-2 md:h-3 border-t border-r border-[#1e293b]"></div>
          <div className="absolute bottom-0 left-0 w-2 md:w-3 h-2 md:h-3 border-b border-l border-[#1e293b]"></div>
          <div className="absolute bottom-0 right-0 w-2 md:w-3 h-2 md:h-3 border-b border-r border-[#1e293b]"></div>
          <span className="text-[#1e293b] text-lg md:text-xl font-light">+</span>
        </div>


        <h2 className="uppercase font-rajdhani font-bold text-2xl md:text-3xl tracking-wider text-[#0A5C7A] drop-shadow-sm">
          Coming Soon
        </h2>

      </div>
    </div>
  );
};

export default Mentors;