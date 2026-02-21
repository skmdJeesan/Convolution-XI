'use client';

import React from 'react';
import { events } from '../components/Timeline_Data';

const MobileTimeline = () => {
  return (
    <div className="relative w-full min-h-screen bg-black pb-20 overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#030712] z-0"></div>
          {/* <div className="absolute top-[-10%] left-[-20%] w-[90vw] h-[80vh] rounded-full bg-fuchsia-950/20 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute top-[25%] right-[-15%] w-[90vw] h-csreen rounded-full bg-cyan-900/60 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute bottom-[25%] left-[-15%] w-[90vw] h-screen rounded-full bg-purple-900/40 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute bottom-[5%] right-[-20%] w-[105vw] h-[90vh] rounded-full bg-cyan-900/30 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute bottom-0 left-0 w-full h-[10] bg-linear-to-t from-[#030712] to-transparent  z-69 transform-gpu"></div> */}
          <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-[#030712] to-transparent  z-69 transform-gpu"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 z-0"></div>

           <div 
                     className="absolute inset-0 opacity-[0.15] " 
                     style={{ 
                         backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
                         backgroundSize: '40px 40px' 
                     }}
                 ></div>
      </div>

      {/* Header */}
      <div className="relative z-50 pt-15 pb-8 flex flex-col items-center justify-center">
          <h1 className="font-orbitron font-bold text-center text-4xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Timeline
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-10 px-4 flex flex-col gap-8">
         {events.map((event, index) => {
            const isLast = index === events.length - 1;

            return (
               <div key={event.id} className="timeline-row grid grid-cols-[80px_1fr] relative">
                 
                 {/* Node Column */}
                 <div className="relative flex justify-center pr-4 h-full pt-2">
                     
                     {!isLast && (
                         <div className="absolute top-10 -bottom-14 left-8 -ml-px w-0.5 bg-cyan-400 shadow-[0_0_15px_#00f3ff] z-0"></div>
                     )}

                     {/*node*/}
                     <div className="relative z-20 w-8 h-8 transition-all duration-300 ease-out flex items-center justify-center bg-[#0a0a0a] scale-110 shrink-0">
                         <div className="absolute inset-0 bg-[#0a0a0a] border-[1.5] transition-colors duration-300 border-cyan-400" 
                              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                         </div>
                         <div className="relative z-10 w-2 h-2 rotate-45 transition-colors duration-300 bg-white shadow-[0_0_10px_#00f3ff]"></div>
                     </div>
                 </div>

                 {/* Card Section */}
                 <div className="relative">
                     {/*horizontal connector */}
                     <div className="absolute top-5.75 -left-8.5 h-px bg-cyan-400 shadow-[0_0_10px_#00f3ff] z-0 w-7.5 opacity-100"></div>

                      {/*card*/}
                      <div className="relative w-full -ml-5 opacity-100 translate-x-4">
                          
                          <div className="relative bg-[#06091fd3]  p-1 group transition-all duration-300"
                               style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                              
                              <div className="absolute inset-0 border border-cyan-500/50">
                              </div>
                              
                              <div className="absolute top-[5px] left-[5px] w-[14.14px] h-[1px] bg-cyan-500/50 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-10"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>

                              <div className="relative p-2 z-10" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                                  
                                   <div className="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
                                      <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase">
                                          // LOG_0{event.id}
                                      </span>
                                      <span className="text-sm font-rajdhani font-semibold px-1.5 py-0.3 border border-cyan-900 bg-cyan-950/30 text-cyan-300 rounded-sm uppercase tracking-wide">
                                         {event.time}
                                      </span>
                                   </div>

                                   <div className="flex items-baseline gap-2 mb-3">
                                      <h2 className="text-2xl font-orbitron font-semibold text-white tracking-tighter drop-shadow-lg">
                                          {event.date.split(' ')[1]}
                                      </h2>
                                      <span className="text-sm font-orbitron text-gray-400 font-medium uppercase tracking-widest">
                                          {event.date.split(' ')[0]}
                                      </span>
                                   </div>

                                   <div className="space-y-1.5">
                                       {event.items.map((item, i) => (
                                          <div key={i} className="flex items-center gap-2 group/item">
                                              <div className="w-1 h-1 bg-cyan-500 rotate-45 transition-transform duration-300 group-hover/item:rotate-90 group-hover/item:scale-150"></div>
                                              <span className="text-base font-rajdhani font-semibold tracking-normal capitalize transition-colors duration-300 text-gray-300 group-hover/item:text-cyan-400">
                                                  {item}
                                              </span>
                                          </div>
                                       ))}
                                   </div>

                                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10 pointer-events-none"></div>
                              </div>
                          </div>
                      </div>
                 </div>
               </div>
            );
         })}
      </div>
    </div>
  );
};

export default MobileTimeline;