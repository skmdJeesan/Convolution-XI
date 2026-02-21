'use client';

import React from 'react';
import { events } from '../components/Timeline_Data';


const TabletTimeline = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#030712] text-white pb-20 overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#030712] z-0"></div>

          {/* <div className="absolute top-[5%] left-[-16%] w-[90vw] h-[80vw] rounded-full bg-fuchsia-950/30 blur-[120px] z-0"></div>
          <div className="absolute bottom-[10%] right-[-15%] w-[90vw] h-[80vw] rounded-full bg-cyan-950/30 blur-[120px] z-0"></div>
          <div className="absolute bottom-[2%] right-[-15%] w-[90vw] h-[10vw] rounded-full bg-[#030712] blur-[120px] z-0"></div> */}
          <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-[#030712] to-transparent  z-69 transform-gpu"></div>
          <div 
                     className="absolute inset-0 opacity-[0.15] " 
                     style={{ 
                         backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
                         backgroundSize: '40px 40px' 
                     }}
                 ></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-50 pt-15 pb-13 flex flex-col items-center justify-center">
          <h1 className="font-orbitron font-bold text-center text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Timeline
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 p-4 w-full max-w-4xl mx-auto">
         {events.map((event, index) => {
            const isEven = index % 2 === 0; 
            const isLast = index === events.length - 1;
            
            return (
              
               <div key={event.id} className={`relative w-full pb-3 min-h-35 flex ${isEven ? 'justify-start' : 'justify-end'}`}>
                 
                {/* vertical line */}
                 {!isLast && (
                     <div className="absolute top-[52px] -bottom-[52px] left-1/2 -translate-x-1/2 w-[2px] bg-cyan-400 shadow-[0_0_15px_#00f3ff] z-0"></div>
                 )}

                 <div className="absolute left-1/2 -translate-x-1/2 top-8 z-20 flex flex-col items-center">
                     {/*node*/}
                     <div className="w-10 h-10 transition-all duration-300 ease-out flex items-center justify-center bg-[#0a0a0a] relative z-30 scale-110">
                        <div className="absolute inset-0 bg-[#0a0a0a] border-2 transition-colors duration-300 border-cyan-400" 
                             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        </div>
                        <div className="relative z-10 w-2.5 h-2.5 rotate-45 transition-colors duration-300 bg-white shadow-[0_0_10px_#00f3ff]"></div>
                     </div>
                 </div>

                 {/*horizontal connector*/}
                 <div className={`
                     absolute top-[51px] h-[2px] shadow-[0_0_10px_rgba(34,211,238,0.5)]
                     transition-all duration-700 ease-out z-0
                     ${isEven ? 'right-1/2 origin-right' : 'left-1/2 origin-left'}
                     w-[calc(50%-45%)] opacity-100 bg-cyan-400
                 `}></div>

                 {/*card*/}
                 <div className={`
                     relative w-[45%] transition-all duration-700 ease-out group opacity-100 translate-x-0
                 `}>
                    
                    {/* Card Container */}
                    <div className="relative bg-black/80 p- group transition-all duration-300">
                        
                        {/*border */}
                        <div className="absolute inset-0 border transition-colors duration-300 border-cyan-500/30"
                             style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                        </div>

                        {/*corners*/}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 border-cyan-400"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 border-cyan-400"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 border-cyan-400"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 border-cyan-400"></div>

                        {/* Inner Content */}
                        <div className="relative p-5 z-10" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                            
                             {/* Header */}
                             <div className="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
                                <span className="text-xs font-bold font-mono text-cyan-600 tracking-widest uppercase">
                                   // LOG_0{event.id}
                                </span>
                                <span className="text-sm font-rajdhani font-semibold px-1.5 py-0.3 border border-cyan-900 bg-cyan-950/30 text-cyan-300 rounded-sm uppercase tracking-wide">
                                   {event.time}
                                </span>
                             </div>

                             {/* Date */}
                             <div className="flex items-baseline gap-2 mb-3">
                                <h2 className="text-3xl font-orbitron font-semibold text-white tracking-tighter drop-shadow-lg">
                                    {event.date.split(' ')[1]}
                                </h2>
                                <span className="text-lg font-orbitron text-gray-400 font-medium uppercase tracking-widest">
                                    {event.date.split(' ')[0]}
                                </span>
                             </div>

                             {/* Items */}
                             <div className="space-y-1.5">
                                 {event.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 group/item">
                                        <div className="w-1 h-1 bg-cyan-500 rotate-45 transition-transform duration-300 group-hover/item:rotate-90 group-hover/item:scale-150"></div>
                                        <span className="text-lg font-rajdhani font-semibold tracking-normal capitalize transition-colors duration-300 text-gray-300 group-hover/item:text-cyan-400">
                                            {item}
                                        </span>
                                    </div>
                                 ))}
                             </div>

                             {/* Scanline */}
                             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10 pointer-events-none"></div>

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

export default TabletTimeline;