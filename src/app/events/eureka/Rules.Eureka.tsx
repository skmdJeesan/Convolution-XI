import React from "react";
import Image from "next/image";
import FlipLink from "@/components/FlipLink";
import Link from "next/link";

const rules = [
  "Each team must comprise 2-4 members (including the Team Lead) from the same or different colleges and/or streams.",
  "There will be three rounds: Round 1, Round 2, Round 3",
  "Round 1: This round will test teams on mathematical, analytical and aptitude skills. It will be an on-site pen-and-paper test.",
  "Teams will have 75 questions to answer in 60 minutes. The top 12 teams will be selected for the 2nd Round.",
  "Round 2: This round will primarily be hosted on the Eureka website. Teams will embark on an adventurous journey involving code-breaking, clue-finding, logical challenges and brainstorming activities.",
  "The 2nd Round will consist of 5 steps with 3 riddles per step. ",
  "Teams will be entitled to 3 hints in total, applicable to individual riddles, but limited to 1 hint per step.",
  "For the Round 2, contestants must bring at least one laptop per team (mandatory). The use of mobile phones and tablets are allowed. All internet sources and AI sources are also allowed.",
  "Participants are allowed to browse the internet or use any software program or AI tool to solve the puzzles in the Finals.",
  "Round 3: An Intense, Department-Wide Mystery Chase.",
  "One clue leads to another. Follow them on a wonderful journey and unravel mysteries",
  "For the Round 3, contestants must bring at least one laptop per team (mandatory). The use of mobile phones and tablets are allowed. All internet sources and AI sources are also allowed.",

];

const Rules = () => {
  return (
    <div
      id="rules"
      className="relative w-full py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#83a252] via-[#3e5e19] to-[#2c5111]"
    >
      
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      ></div>


      {/* --- Main Content --- */}
      <div className="relative z-10 maxWidthForSections flex flex-col items-center w-full px-4">
        <div
          className="rounded-2xl w-full max-w-4xl py-10 px-6 md:px-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-5xl mb-10  drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-green-200 to-white">
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
                <div className="mt-5">
                  <Link
                      href="https://drive.google.com/drive/folders/1Y-jSXdMsgVieakzYUWNLzwzRTQNS-yX3"
                      target="_blank"
                      className="shadow-white/70 hover:shadow-white/30  hover:bg-[#1C971C] bg-[#115211]   text-[#ffffff]  transition-all duration-300 group flex items-center gap-2 px-5 py-3 backdrop-blur-md rounded-full shadow-sm cursor-pointer overflow-hidden
                      "
                    >
                      <span className="font-orbitron text-sm md:text-base font-bold text-[#ffffff] capitalize tracking-wide">
                       <FlipLink>Know&nbsp;More</FlipLink> 
                      </span>
                    </Link>
                    </div>
      </div>
    </div>
  );
};

export default Rules;