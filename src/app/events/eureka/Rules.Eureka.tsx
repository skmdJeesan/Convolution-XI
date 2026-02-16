import React from "react";
import Image from "next/image";

const rules = [
  "Each team must comprise 3-4 members (including the Team Lead) from the same or different colleges and/or streams.",
  "There will be two rounds: the Screening Round and the Final Round.",
  "Screening Round: This round will test teams on mathematical, analytical and aptitude skills. It will be an on-site pen-and-paper test.",
  "Teams will have 60 questions to answer in 50 minutes. The top 10 teams will be selected for the on-site Final Round.",
  "Final Round: This round will primarily be hosted on the Eureka website. Teams will embark on an adventurous journey involving code-breaking, clue-finding, logical challenges and brainstorming activities.",
  "The Final Round will consist of 5 steps with 3 riddles per step. There may also be a surprise hurdle to solve before declaring the final winner.",
  "Teams will be entitled to 3 hints in total, applicable to individual riddles, but limited to 1 hint per step.",
  "For the Final Round, contestants must bring at least one laptop per team (mandatory). The use of mobile phones and tablets are allowed.",
  "Participants are allowed to browse the internet or use any software program or AI tool to solve the puzzles in the Finals.",
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