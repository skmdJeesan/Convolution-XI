'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '../components/Timeline_Data';
import Particles from './Particles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DesktopTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const grayRailRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Use a ref for the active node to avoid re-renders during the animation frame
  // We only trigger state update when the index actually changes
  const activeNodeRef = useRef<number>(-1);
  const [activeNode, setActiveNode] = useState<number>(-1);
  
  const stateRef = useRef({ maxLineWidth: 0, moveDist: 0, holdDist: 0, triggerPoints: [] as number[] });

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!trackRef.current || !lineRef.current || !grayRailRef.current || !containerRef.current) return;

      const updateMeasurements = () => {
        const line = lineRef.current;
        const lastNode = nodeRefs.current[events.length - 1];
        if (!line || !lastNode) return;

        const lineStartX = line.offsetLeft;
        const lastNodeCenterX = lastNode.offsetLeft + (lastNode.offsetWidth / 2);
        
        const maxLineWidth = lastNodeCenterX - lineStartX;
        const moveDist = lastNodeCenterX - (window.innerWidth / 2);
        // Reduced holdDist slightly to prevent "overscroll" feeling at the end
        const holdDist = window.innerHeight * 0.3;

        const triggerPoints = nodeRefs.current.map(node => {
          if (!node) return 0;
          return node.offsetLeft - lineStartX + (node.offsetWidth / 2);
        });

        stateRef.current = { maxLineWidth, moveDist, holdDist, triggerPoints };
        gsap.set(grayRailRef.current, { width: maxLineWidth });
      };

      updateMeasurements();

      const { maxLineWidth, moveDist, holdDist } = stateRef.current;
      const totalDist = moveDist + holdDist;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          anticipatePin: 1,
          scrub: 0.1, // Added a slight smoothing factor (0.5s) to reduce jitter
          start: 'top top',
          end: `+=${totalDist}`, 
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Prevents glitching on fast scrolls
          onRefresh: updateMeasurements,
          onUpdate: (self) => {
            // Optimized Active Node Logic
            const { triggerPoints } = stateRef.current;
            // Calculate progress based on the "moving" part of the animation only
            const moveProgress = Math.min(self.progress * (totalDist / moveDist), 1);
            const currentWidth = moveProgress * maxLineWidth;
            
            let newActive = -1;
            // Reverse loop is often faster for finding the last active element
            for (let i = triggerPoints.length - 1; i >= 0; i--) {
                if (currentWidth >= (triggerPoints[i] - 20)) { // 20px buffer
                    newActive = i;
                    break;
                }
            }

            // Only trigger React State update if the node has CHANGED
            if (activeNodeRef.current !== newActive) {
                activeNodeRef.current = newActive;
                setActiveNode(newActive);
            }
          }
        }
      });

      // Use force3D: true to ensure GPU acceleration
      tl.to(trackRef.current, { 
        x: () => -stateRef.current.moveDist, 
        ease: 'none', 
        duration: 1, // Normalized duration
        force3D: true 
      }, 0);

      tl.to(lineRef.current, { 
        width: () => stateRef.current.maxLineWidth, 
        ease: 'none', 
        duration: 1, // Normalized duration matches track movement
        force3D: true 
      }, 0);
      
      // The "hold" time at the end
      tl.to({}, { duration: (holdDist / moveDist) }, ">");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-[#030712] text-white font-mono selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND LAYER --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
            <div className="absolute inset-0 bg-[#00040f]/95 z-0"></div>
            <div className="absolute top-[-10%] left-[20%] w-[60vw] h-100 bg-violet-950/30 blur-[120px] z-0"></div>
            <div className="absolute bottom-[-10%] right-[20%] w-[60vw] h-100 bg-cyan-950/30 blur-[120px] z-0"></div>
            <div className="absolute bottom-[2%] right-[-15%] w-[90vw] h-[20vw] rounded-full bg-[#030712] blur-[120px] z-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] z-0"></div>
            
            <Particles/>
          </div>
        </div>

       {/* --- HEADER --- */}
       <div className="absolute top-[2vh] z-50 flex flex-col items-center pointer-events-none select-none">
          <h1 className="text-center text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">
            Timeline
            <div className="w-60 h-0.5 bg-linear-to-r from-transparent via-cyan-500/80 to-transparent  mt-2"></div>
          </h1>
      </div>

      {/* Timeline Track*/}
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex flex-row items-start pt-[55vh] pl-[50vw] w-max will-change-transform">
        
        {/* rail */}
        <div ref={grayRailRef} className="absolute top-[55vh] left-[50vw] h-px bg-cyan-900/30 -translate-y-1/2 z-0"></div>
        <div ref={lineRef} className="absolute top-[55vh] left-[50vw] h-0.5 bg-cyan-400 shadow-[0_0_20px_#22d3ee] -translate-y-1/2 z-10 will-change-auto" style={{ width: '0px' }}>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-cyan-400/30 blur-md rounded-full z-20"></div>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-white shadow-[0_0_10px_white] rounded-full z-30"></div>
        </div>

        {/* Nodes */}
        {events.map((event, index) => {
          const isActive = index <= activeNode;
          const isEven = index % 2 === 0;

          return (
            <div key={event.id} ref={(el) => { nodeRefs.current[index] = el; }} className="relative z-20 shrink-0 w-auto mx-[8vw] -translate-y-1/2">
              
              {/* Central Node */}
             <div className={`w-10 h-10 transition-all duration-300 ease-out flex items-center justify-center bg-[#0a0a0a] relative z-30 ${isActive ? 'scale-[0.8] opacity-100' : 'scale-[0.7] opacity-40'}`}>

                 <div className={`absolute inset-0 bg-[#0a0a0a] border-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`} 

                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>

                 </div>

                 <div className={`relative z-10 w-3 h-3 rotate-45 transition-colors duration-300 ${isActive ? 'bg-white shadow-[0_0_10px_#00f3ff]' : 'bg-gray-800'}`}></div>
                 {isActive && index === activeNode && (
                    <div className="absolute inset-0 border border-cyan-500/50 rounded-full animate-ping opacity-20" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                 )}
              </div>

              {/* Connector Line */}
              <div className={`
                  absolute left-1/2 -translate-x-1/2 w-px bg-cyan-400/50 shadow-[0_0_10px_#00f3ff] z-0 transition-[height] duration-500 ease-out
                  ${isEven ? 'bottom-1/2 origin-bottom' : 'top-1/2 origin-top'}
                `}
                style={{
                  height: isActive ? '50px' : '0px' 
                }}
              ></div>

            {/* Cards */}
             <div className={`
                absolute w-80 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out perspective-1000
                ${isActive ? 'opacity-100 translate-y-0 blur-0 z-40' : 'opacity-0 blur-sm z-0'}
                
                ${isEven 
                    ? `bottom-[calc(50%+50px)] ${isActive ? 'translate-y-0' : 'translate-y-12'}` 
                    : `top-[calc(50%+50px)] ${isActive ? 'translate-y-0' : '-translate-y-12'}` 
                }
              `}>
                
                <div className={`
                    relative bg-[#0a0b14]/60 backdrop-blur-xl group
                    transition-all duration-300 hover:bg-[#0a0b14]/80
                `}>
                  
                  <div className={`absolute inset-0 border-l border-r border-t border-b transition-colors duration-300 
                      ${isActive ? 'border-cyan-500/30' : 'border-white/5'}`}
                      style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                  ></div>

                  <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>

                  {/* Inner Content */}
                  <div className="relative p-4 z-10" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                      
                      <div className="flex justify-between items-center mb-3 border-b border-cyan-900/30 pb-2">
                          <span className="text-[10px] font-mono font-bold text-cyan-500/80 tracking-widest uppercase flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                            LOG_0{event.id}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${isActive ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-gray-800 text-gray-600'} rounded-none uppercase tracking-wider`}>
                             {event.time}
                          </span>
                      </div>

                      <div className="flex items-baseline gap-3 mb-3">
                          <h2 className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">
                              {event.date.split(' ')[1]}
                          </h2>
                          <span className="text-xs font-mono text-cyan-200/50 uppercase tracking-[0.2em]">
                              {event.date.split(' ')[0]}
                          </span>
                      </div>

                      <div className="space-y-2">
                          {event.items.map((item, i) => (
                             <div key={i} className="flex items-center gap-2 group/item">
                                <div className={`w-1 h-1 bg-cyan-500 transition-all duration-300 ${isActive ? 'group-hover/item:w-3 group-hover/item:bg-violet-400' : ''}`}></div>
                                <span className={`text-xs font-medium tracking-wide uppercase transition-all duration-300
                                    ${isActive ? 'text-gray-400 group-hover/item:text-white group-hover/item:translate-x-1' : 'text-gray-700'}`}>
                                    {item}
                                </span>
                             </div>
                          ))}
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

export default DesktopTimeline;