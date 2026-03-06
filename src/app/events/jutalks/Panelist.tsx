import Image from "next/image";
import React from "react";
import person1 from "@/assets/images/JuTalks/5.png";
import person3 from "@/assets/images/JuTalks/sw.png";
import person4 from "@/assets/images/JuTalks/chandan.png";
import person5 from "@/assets/images/JuTalks/moumita.png";
import person6 from '@/assets/images/JuTalks/ishan.png'
import person7 from '@/assets/images/JuTalks/3.png'

const items: { name: string; description: string }[] = [
  {
    name: "Mr. Sabyasachi Chakraborty",
    description: "Renowned for portraying the iconic detectives, Feluda and Kakababu.",
  },
  { 
    name: "Ms. Swastika Mukherjee",
    description: "Celebrated Indian Actor, known for her work in Bengali and Hindi films and television.",
  },
  {
    name: "Mr. Chandan Sen",
    description: "Renowned Actor, Playwright and Director.",
  },
   {
    name: "Prof. Subhamoy Maitra",
    description: "Senior Professor at ISI Kolkata and Political Analyst.",
  },
  {
    name: "Dr. Moumita Maity",
    description: "Distinguished Clinical Oncologist with over 14 years of expertise.",
  },
  {
    name: "Mr. Ishan Mukherjee",
    description: "Director at PwC India.",
  },
];

const thisYr: { name: string; description: string }[] = [

];

const pics = [person1, person3, person4,person7, person5, person6];
const pics2 = [];
const Panelist = () => {
  return (
    <div id="panelist" className=" py-12 relative  flex items-center  ">
      <div
        className="absolute top-0 left-0 w-full h-full -z-20 bg-[#FF97E3]"
      >
      </div>
      <div className="h-full w-full  maxWidthForSections ">
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 mb-20 mt-4">
           <div
              className="flex flex-col items-center pointer-events-none select-none mb-5"
            >
              <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-sm whitespace-nowrap uppercase">
                Our Panelists
              </h1>
            </div>
            
            <span className="font-rajdhani text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_4px_10px_rgba(89,42,19,0.2)] text-center mt-2">
              To be declared soon ...
            </span>
          </div>

        {/* <div className="sm:flex flex-wrap gap-2 grid justify-center grid-cols-2 sm:gap-4">
          {thisYr.map((item, index) => {
            return (
              <div
                key={item.name}
                className="flex flex-col sm:gap-y-2 gap-y-1 items-center font-sans sm:px-4 sm:py-8 px-2 py-6 text-[#512511] bg-[#ffff]/20 shadow-sm shadow-black/20 backdrop:blur-sm sm:w-[280px] w-auto rounded-2xl"
              >
                <div className="overflow-hidden flex items-center rounded-full size-32 ">
                  <Image src={pics2[index]} alt="kaku" className=""></Image>
                </div>

                <h1 className="sm:text-lg text-sm text-center font-semibold">
                  {item.name}{" "}
                </h1>
                <p className="text-center sm:text-base text-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
         */}

        {/* ----------------------prev yrs-------------------------------- */}
       <div className="flex flex-col items-center pointer-events-none select-none mb-10 gap-2">
                    <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] uppercase">
                        Previous Panelists
                    </h1>
                </div>
        <div className="sm:flex flex-wrap gap-2 grid justify-center grid-cols-2 sm:gap-4">
          {items.map((item, index) => {
            return (
              <div
                key={item.name}
                className="flex flex-col sm:gap-y-2 gap-y-1 items-center font-sans sm:px-4 sm:py-8 px-2 py-6 text-[#512511] bg-[#ffff]/20 shadow-sm shadow-black/20 backdrop:blur-sm sm:w-[280px] w-auto  rounded-2xl"
              >
                <div className="overflow-hidden flex items-center rounded-full size-32 ">
                  <Image src={pics[index]} alt="kaku" className=""></Image>
                </div>

                <h1 className="sm:text-lg text-sm text-center font-orbitron font-semibold">
                  {item.name}{" "}
                </h1>
                <p className="text-center font-semibold font-rajdhani sm:text-base text-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Panelist;