import React from "react";
import Image from "next/image";
import Link from "next/link";


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
                <li  className="pl-2 leading-relaxed drop-shadow-sm">
            This event is based on 'Bahfest', for more clarification <span><Link href='http://bahfest.com/' className="underline underline-offset-2">click here</Link></span>
            </li>
            <li className="pl-2 leading-relaxed drop-shadow-sm">
            Event comprises two rounds:
              <ol  style={{ listStyleType: 'lower-alpha' }} className=" ml-6 list-inside">
                <li className="pl-2 leading-relaxed drop-shadow-sm">
                Online Screening round
                </li>
                <li className="pl-2 leading-relaxed drop-shadow-sm">
                Offline Presentation round. Each team can have 1-4 members.
                </li>
              </ol>
            </li>
            <li>The teams have to submit an abstract for their ideas for the first round. Top 9 teams will be shortlisted for the offline presentation round.
            </li>
            <li className="pl-2 leading-relaxed drop-shadow-sm">
            Judging criteria are as follows:
              <ol className="ml-6 list-inside" style={{ listStyleType: 'lower-alpha' }}>
                <li className="pl-2 leading-relaxed drop-shadow-sm">Comic sense of the presentation
                </li>
                <li className="pl-2 leading-relaxed drop-shadow-sm">How “logically illogical” the presentation is</li>
                <li className="pl-2 leading-relaxed drop-shadow-sm">Relevance of the topic in case of a tie</li>
              </ol>
            </li>
            <li className="pl-2 leading-relaxed drop-shadow-sm">
            There will be a maximum of 20 slides and a minimum of 6 slides for the presentation. Each team will have to complete their presentation within 9 minutes.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;