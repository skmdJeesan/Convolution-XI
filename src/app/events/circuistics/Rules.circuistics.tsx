import React from "react";
import Image from "next/image";

const rules = [
   "Teams can have 3-4 (max.) members, including the Team Lead.",
    "Teams may be formed across different institutes but not across different years; only students from the same year can form a team.",
    "Registration will be ONLINE through the official website of Convolution-X.",
    "There will be two Tiers for this event: Tier 1 for UG1 and UG2, and Tier 2 for UG3 and UG4.",
    "There will be two rounds: Prelims (Pen & Paper Mode) and Finals, conducted over a span of two days.",
    "For Tier 1, there will be two different sets of question papers. UG1 will have a reduced syllabus compared to UG2, providing some equity. The selection will be based on a weighted score or percentile method.",
    "Tier 2 will have the same question paper provided to both years.",
    "Questions will be mostly MCQ and NAT in the Prelims, with MSQ only for Tier 2. Use of calculators is allowed.",
    "The top 8 teams will move to the Finals from each tier.",
    "Finalists of both Tiers will have to build a fully functional electronic circuit according to the given problem statement.",
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