import React from "react";
import Image from "next/image";

const rules = [
  "Round 1 : PPT Shortlisting : Teams must submit a concise PowerPoint presentation (max 10 slides) outlining their proposed solution. Judges will review the submissions and shortlist the top 25 teams, with 5 more teams in the waitlist",
  "Round 2 : Online Pitching : Shortlisted teams will present their ideas to the judges via Google Meet. Based on their pitches, the judges will select the top 10 teams for the next round, with an additional 5 teams in the waitlist.",
  "Round 3 : Prototype Creation:  The top 10 teams will develop and showcase their prototypes offline at the Electrical Engineering Department, Jadavpur University.",
];

const Rules = () => {
  return (
    <div
      id="rules"
      className="relative w-full py-20 flex items-center justify-center overflow-hidden bg-transparent -mt-0.5"
    >

      {/* --- Main Content --- */}
      <div className="relative z-10 maxWidthForSections flex flex-col items-center w-full px-4">
        <div
          className="rounded-2xl w-full max-w-4xl py-10 px-6 md:px-12 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <h1 className="uppercase font-orbitron font-bold text-center text-2xl md:text-4xl mb-10  drop-shadow-md tracking-wide text-transparent bg-clip-text bg-linear-to-t from-slate-600 to-slate-900">
            Rules & Regulations
          </h1>

          <ul className="space-y-4 font-rajdhani text-slate-800 text-base md:text-xl font-medium list-disc list-outside ml-4 md:ml-6 marker:text-cyan-400">
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