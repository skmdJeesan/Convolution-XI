import React from "react";
import Image from "next/image";

const rules = [
  "Teams can have a maximum of 4 members (including the team lead).",
    "Teams may be formed across different institutes and different years but all participants must be students.",
    "The event will be strictly monitored. Any attempt to use electronics/ browse the internet/ communicating with other teams and other malpractices will be penalised with immediate disqualification.",
    "The Team Leader will have to register the Team on the official Convolution website with their team name, email, phone no. and college name of each member in the group.",
    "Due to certain constraints, the event will be open to the first 100 team registrations. Online registrations are encouraged to prevent on-day problems with other event clashes. On-spot registrations are subject to availability.",
    "There will be 3 rounds. Prelims 1 , Prelims 2 and Finals.",
    "Prelims 1 is a written round where all teams answer the same set of questions on pen and paper. The top 30 teams qualify for Prelims 2.",
    "Prelims 2 is also a written round. Teams are ranked based on the number of correct responses. The top 8 teams advance to the Finals.",
    "Finals will feature multi-format rounds, as decided by the Quiz Master.",
    "Top 30 teams from Prelims 1 will move to Prelims 2.",
    "The top 8 teams advance to the Finals .",
    "Tie breaker (Prelims): Tie breakers will be decided on the basis of star marked questions.",
    "Tie breaker (Finals): Tie breakers will be decided on the basis of scores of Prelims 2 and Prelims 1.",
    "The Quiz Master’s decision is final and binding."
];


const Rules = () => {
  return (
    <div
      id="rules"
      className="relative w-full py-20 flex items-center justify-center overflow-hidden-mt-0.5"
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
      <div className="relative z-10 maxWidthForSections flex flex-col items-center w-full px-4 font-rajdhani">
        <div
          className="rounded-2xl w-full max-w-4xl py-10 px-6 md:px-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-4xl mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
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