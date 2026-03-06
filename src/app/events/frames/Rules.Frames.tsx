import React from "react";
import Image from "next/image";

const rules = [
  "The event has two themes in particular. Photos of pattern and a  theme will be accepted.",
  "Format: JPEG/JPG format",
  "Photo Dimensions: 2×3 / 4×6 / 8×12 (inch)",
  "Max 3 photos are to be submitted (for each participant).",
  "Post-Processing: ALLOWED: Color Correction, Removal of dust, Cropping, Reasonable adjustments to exposure and contrast.",
  "Post-Processing: NOT ALLOWED: Watermarks/Any logo, Borders, Manipulation, Staging or re-enacting events, painting in object details.",
  "Photo size limit: Within 10 MB",
  "Photo manipulation and plagiarism will lead to disqualification.",
  "A caption (in English) is required for the photo, within 25 words, holding 25% weightage during judgment.",
  "A screenshot of the Metadata of your photo is required. Failure to provide one will result in disqualification (considered as plagiarism)."
];

const Rules = () => {
  return (
    <div
      id="rules"
      className="relative w-full py-20 flex items-center justify-center overflow-hidden"
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
                      className="absolute top-[12%] left-[8%] md:left-[12%] w-16 md:w-20 h-auto opacity-90 " 
                    />
                    <Image 
                      src="/Frames/aeroplane.png" 
                      alt="aeroplane" 
                      width={100} 
                      height={60} 
                      className="absolute top-[55%] right-[5%] md:right-[10%] w-16 md:w-20 h-auto opacity-100  -scale-x-100" 
                    />
            
                    {/* Clouds - Scattered to match the sky aesthetic */}
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[8%] left-[30%] w-10 md:w-14 h-auto opacity-80 " />
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[18%] right-[25%] w-12 md:w-16 h-auto opacity-80" />
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[45%] left-[10%] w-10 md:w-14 h-auto opacity-80" />
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[25%] right-[20%] w-12 md:w-16 h-auto opacity-80" />
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[15%] left-[25%] w-14 md:w-20 h-auto opacity-80" />
                    <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute bottom-[8%] right-[40%] w-10 md:w-14 h-auto opacity-80 " />
                  </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* 12-Column Grid for exact proportional control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-5 items-center">
          
          {/* LEFT ON DESKTOP | BOTTOM ON MOBILE */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8 flex justify-center lg:justify-start w-full">
            <div
              className="rounded-[2rem] w-full py-10 px-6 md:px-12 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]"
            >
              <h1 className="uppercase font-orbitron font-bold text-left text-2xl md:text-3xl lg:text-4xl mb-8 drop-shadow-md tracking-wide text-transparent bg-clip-text bg-gradient-to-t from-gray-200 to-white">
                Rules & Regulations
              </h1>
              
              <ul className="space-y-4 font-rajdhani text-white/95 text-sm md:text-base lg:text-lg font-medium flex flex-col">
                {rules.map((text, index) => (
                  <li key={index} className="flex items-start gap-3 leading-relaxed drop-shadow-sm">
                    {/* Custom Glowing Marker */}
                   <span className="mt-[6px] md:mt-[8px] flex-shrink-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"></span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT ON DESKTOP | TOP ON MOBILE */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4 flex justify-center items-center w-full">
            <div className="relative sm:w-full h-auto lg:max-w-[40vw]  md:w-[60vw] w-[70vw] animate-float">
              {/* Note: Change the src path if your squarish camera robot is named differently */}
              <Image 
                src="/Frames/RuleBot.png" 
                alt="Rules Robot"
                width={500}
                height={500}
                className="w-full h-auto object-contain animate-float-slow drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rules;