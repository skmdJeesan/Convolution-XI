import React from "react";
import Image from "next/image";

const rules = [
  "Teams can have 2-4 (max.) members, including the Team Lead.",
    "Teams may be formed across different institutes and different years but all participants must be students.",
    "Use of any unfair means will lead to disqualification.",
    "Registration will be ONLINE through the official website of Convolution-X.",
    // "On-spot registrations may be allowed depending on vacancy.",
    "There will be 3 rounds. Elimination round 1 and 2. Followed by the Finals.",
    "Top 20  teams from elimination Round 1 move to elimination Round 2.",
    "The top 8 teams will move to the Finals .",
];

const Rules = () => {
  return (
    <div
      id="rules"
      className="relative w-full py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a237e] to-[#5926b1] -mt-0.5"
    >
      
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      ></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="hidden sm:absolute bottom-40 left-50 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="absolute top-1/4 right-1/3 text-white opacity-30 text-4xl">✨</div>
      <div className="absolute bottom-1/3 left-1/4 text-white opacity-20 text-2xl">✨</div>
      <div className="absolute bottom-1/2 right-1/4 text-white opacity-20 text-2xl">✨</div>


      {/* --- Main Content --- */}
      <div className="relative z-10 maxWidthForSections flex flex-col items-center w-full px-4">
        <div
          className="rounded-2xl w-full max-w-4xl py-10 px-6 md:px-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-4xl mb-10  drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-500 to-white">
            Rules & Regulations
          </h1>
          
          <ul className="space-y-4 font-rajdhani text-white text-base md:text-xl font-medium list-disc list-outside ml-4 md:ml-6 marker:text-cyan-400">
            {rules.map((text, index) => (
              <li key={index} className="pl-2 leading-relaxed drop-shadow-sm">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;