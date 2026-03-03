import React from "react";
import Image from "next/image";

const rules = [
  "This is a competitive programming event.",
  "There will be two rounds: Prelims and Finals.",
  "Prelims will be conducted online.",
  "Top 30 participants will be selected for the on-site Finals.",
  "Individual participation in both rounds (no teams).",
  "There will be 5-6 questions of varying difficulty in each round, with a time limit of 2 hours.",
  "Score per question will be based on difficulty, with ties between participants broken by time taken to solve.",
  "Both rounds will be conducted on browser based online platforms.",
  "Finalists are requested to carry their own laptops."
];

const Rules = () => {
  return (
    <div
      id="rules"
      // FIX: Added the space between bg-transparent and -mt-0.5
      className="relative w-full py-10 flex flex-col items-center justify-center overflow-hidden bg-transparent -mt-0.5"
    >

      {/* --- Background Glows --- */}
      {/* Shifted the main fuchsia glow to the left (left-1/4) so it sits behind the box */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="hidden sm:absolute bottom-40 left-50 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="absolute top-1/4 right-1/3 text-white opacity-30 text-4xl">✨</div>
      <div className="absolute bottom-1/3 left-1/4 text-white opacity-20 text-2xl">✨</div>
      <div className="absolute bottom-1/2 right-1/4 text-white opacity-20 text-2xl">✨</div>


      {/* --- Main Content --- */}
      {/* Set max-w-7xl and used md:justify-start to push it to the left side on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-center md:justify-start px-4 md:px-10 lg:px-16">
        <div
          // Shrunk max-w-4xl down to max-w-3xl so the left-alignment is more obvious
          className="rounded-2xl w-full max-w-3xl py-10 px-6 md:px-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <h1 className="uppercase font-orbitron font-bold text-center md:text-left text-2xl md:text-4xl mb-10  drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-gray-500 to-white">
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