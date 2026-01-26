'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {events } from '../components/Timeline_Data';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


//PARTICLES COMPONENT
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
  }, []);
  if(!mounted) return null;
  const particles = Array.from({ length: 70 });
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-particle"
                  style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${10 + Math.random() * 20}s`,
                      opacity: Math.random() * 0.5 + 0.2,
                  }}
              />
          ))}
      </div>
  );
};


const MobileTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
 
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [railHeight, setRailHeight] = useState(0);

  // Measurment
  useEffect(() => {
    const updateDimensions = () => {
      if (railContainerRef.current && lastNodeRef.current) {
        const railRect = railContainerRef.current.getBoundingClientRect();
        const lastNodeRect = lastNodeRef.current.getBoundingClientRect();
        const height = (lastNodeRect.top - railRect.top) + (lastNodeRect.height / 2) + 10;
        setRailHeight(height);
      }
    };

    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);

    updateDimensions();
    setTimeout(updateDimensions, 500);
    setTimeout(updateDimensions, 2000);

    return () => observer.disconnect();
  }, []);

  // Animation
  useLayoutEffect(() => {
    if (railHeight === 0 || !containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const line = lineRef.current;
      const container = containerRef.current;
      const rail = railContainerRef.current;

      gsap.fromTo(line,
        { height: 0 },
        {
          height: railHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top+=50 center', 
            end: `+=${railHeight}`,
            scrub: 0,
            onUpdate: (self) => {
              const currentBeamLen = self.progress * railHeight;
              
              if (currentBeamLen < 10) {
                 setActiveNode(-1);
                 return;
              }

              if (rail) {
                 const railRect = rail.getBoundingClientRect();
                 const nodes = document.querySelectorAll('.mobile-node-center');
                 let newActive = -1;

                 nodes.forEach((node, index) => {
                      const htmlNode = node as HTMLElement;
                      const nodeRect = htmlNode.getBoundingClientRect();
                      const nodeTopRelative = nodeRect.top - railRect.top;
                      const nodeCenterRelative = nodeTopRelative + (nodeRect.height / 2);
                      
                    if (currentBeamLen >= nodeCenterRelative) {
                         newActive = index;
                      }
                 });
                 
                 setActiveNode((prev) => (prev !== newActive ? newActive : prev));
              }
            }
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [railHeight]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white font-mono pb-20 overflow-hidden">

      {/* Background*/}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      >
          <div className="absolute inset-0 bg-black/90 z-0"></div>
          {/* First gd */}
          <div className="absolute top-[5%] left-[-20%] w-[90vw] h-[80vw] rounded-full bg-violet-950/30 blur-[100px] z-0"></div>
          {/* second gd */}
          <div className="absolute top-[25%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-cyan-950/40 blur-[100px] z-0"></div>
          {/* third gd */}
          <div className="absolute bottom-[25%] left-[-20%] w-[90vw] h-[90vw] rounded-full bg-violet-950/40 blur-[100px] z-0"></div>
          {/* Last gd */}
          <div className="absolute bottom-[2%] right-[-20%] w-[90vw] h-[80vw] rounded-full bg-cyan-950/30 blur-[100px] z-0"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 z-0"></div>
          <Particles />
      </div>
      
      {/* Bottom Gradient*/}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black-950/20 via-transparent to-transparent z-20 pointer-events-none"></div>

      {/*Header*/}
      <div className="relative z-50 pt-20 pb-8 flex flex-col items-center justify-center">
          {/* <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></div>
            <span className="text-[10px] text-cyan-500 tracking-[0.3em] uppercase">Status: Online</span>
          </div> */}
          <h1 className="text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
            Timeline
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4"></div>
      </div>

      {/* --- RAIL --- */}
      <div ref={railContainerRef} className="absolute top-50 left-0 w-[80px] h-full z-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 translate-x-[8px] w-[1px] bg-gray-900 transition-[height]"
            style={{ height: railHeight ? `${railHeight}px` : '100%' }}
          ></div>
          <div className="absolute top-0 left-1/2 translate-x-[8px] w-[2px] z-10">
              <div ref={lineRef} className="relative w-full bg-cyan-400 shadow-[0_0_15px_#00f3ff] h-0">
                   {/* Spark Head */}
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-cyan-500 blur-[4px] rounded-full z-20"></div>
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-30"></div>
              </div>
          </div>
      </div>

      {/*Content*/}
      <div className="relative z-10 pt-15 px-4 flex flex-col gap-12">
         {events.map((event, index) => {
            const isActive = index <= activeNode;
            const isLast = index === events.length - 1;
            return (
               <div
                 key={event.id}
                 className="timeline-row grid grid-cols-[80px_1fr] relative"
               >
                 {/* Node Column*/}
                 <div className="relative flex justify-center pr-4 h-full pt-2">
                     <div
                       ref={isLast ? lastNodeRef : null}
                       className="mobile-node-center absolute top-6 right-4 w-1 h-1"
                     ></div>
                     
                     <div className={`
                          relative z-20 w-8 h-8 flex items-center justify-center bg-[#0a0a0a] rounded-full
                          transition-all duration-300 ease-out
                          ${isActive ? 'scale-110' : 'scale-90'}
                      `}>
                          <div
                             className={`absolute inset-0 bg-black border-2 transition-colors duration-300 rounded-full ${isActive ? 'border-cyan-400 shadow-[0_0_15px_#00f3ff]' : 'border-gray-800'}`}
                          ></div>
                          <div className={`relative z-10 w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                 </div>

                 {/*Card section*/}
                 <div className="relative">
                     
                     <div className={`
                         absolute top-[23px] left-[-34px] h-[1px] bg-cyan-400 shadow-[0_0_10px_#00f3ff]
                         transition-all duration-300 ease-out origin-left z-0
                         ${isActive ? 'w-7.5 opacity-100' : 'w-0 opacity-0'}
                      `}></div>

                      {/*Card*/}
                      <div className={`
                          relative w-full transition-all duration-500 ease-out -ml-5
                          ${isActive 
                             ? 'opacity-100 translate-x-4' 
                             : 'opacity-0 translate-x-0' 
                          }
                      `}>
                          
                          <div className="relative bg-black/80 backdrop-blur-md p-1 group transition-all duration-300">
                              
                              <div className={`absolute inset-0 border transition-colors duration-300 
                                   ${isActive ? 'border-cyan-500/30' : 'border-white/5'}`}
                                   style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                              </div>

                              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>

                              <div className="relative p-5 z-10" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                                  
                                   <div className="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
                                      <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase">
                                         // LOG_0{event.id}
                                      </span>
                                      <span className={`text-[9px] px-1.5 py-0.5 border ${isActive ? 'border-cyan-900 bg-cyan-950/30 text-cyan-300' : 'border-gray-800 text-gray-600'} rounded-sm uppercase tracking-wide`}>
                                         {event.time}
                                      </span>
                                   </div>

                                   <div className="flex items-baseline gap-2 mb-3">
                                      <h2 className="text-3xl font-bold text-white tracking-tighter drop-shadow-lg">
                                          {event.date.split(' ')[1]}
                                      </h2>
                                      <span className="text-lg text-gray-500 font-light uppercase tracking-widest">
                                          {event.date.split(' ')[0]}
                                      </span>
                                   </div>

                                   <div className="space-y-1.5">
                                       {event.items.map((item, i) => (
                                          <div key={i} className="flex items-center gap-2 group/item">
                                              <div className={`w-1 h-1 bg-cyan-500 rotate-45 transition-transform duration-300 ${isActive ? 'group-hover/item:rotate-90 group-hover/item:scale-150' : ''}`}></div>
                                              <span className={`text-xs font-bold tracking-wide uppercase transition-colors duration-300
                                                  ${isActive ? 'text-gray-300 group-hover/item:text-cyan-400' : 'text-gray-600'}`}>
                                                  {item}
                                              </span>
                                          </div>
                                       ))}
                                   </div>

                                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
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