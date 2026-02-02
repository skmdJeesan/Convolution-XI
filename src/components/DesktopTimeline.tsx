'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import {events } from '../components/Timeline_Data';


//PARTICLES COMPONENT
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
  }, []);
  if(!mounted) return null;
  const particles = Array.from({ length: 60 });
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
              <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-cyan-400/60 rounded-full animate-particle"
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

const DesktopTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const grayRailRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  const stateRef = useRef({ maxLineWidth: 0, moveDist: 0, holdDist: 0, triggerPoints: [] as number[] });
  const [activeNode, setActiveNode] = useState<number>(-1);

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
        const holdDist = window.innerHeight * 0.2;

        const triggerPoints = nodeRefs.current.map(node => {
          if (!node) return 0;
          return node.offsetLeft - lineStartX + (node.offsetWidth / 2);
        });

        stateRef.current = { maxLineWidth, moveDist, holdDist, triggerPoints };
        gsap.set(grayRailRef.current, { width: maxLineWidth });
      };

      updateMeasurements();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          start: 'top top',
          end: () => `+=${stateRef.current.moveDist + stateRef.current.holdDist}`, 
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onRefresh: updateMeasurements,
          onUpdate: (self) => {
            const { maxLineWidth, triggerPoints, moveDist } = stateRef.current;
            const totalDist = moveDist + stateRef.current.holdDist;
            const moveProgress = Math.min(self.progress * (totalDist / moveDist), 1);
            const currentWidth = moveProgress * maxLineWidth;
            
            let newActive = -1;
            triggerPoints.forEach((point, index) => {
              if (currentWidth >= (point - 10)) newActive = index;
            });
            setActiveNode(newActive);
          }
        }
      });

      tl.to(trackRef.current, { x: () => -stateRef.current.moveDist, ease: 'none', duration: () => stateRef.current.moveDist }, 0);
      tl.to(lineRef.current, { width: () => stateRef.current.maxLineWidth, ease: 'none', duration: () => stateRef.current.moveDist }, 0);
      tl.to({}, { duration: () => stateRef.current.holdDist });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-[#0a0a0a] text-white font-mono">
      
 {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
          {/* Deep Space Blackout */}
          <div className="absolute inset-0 bg-black/90 z-0"></div>

          {/* Nebulas */}
          <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-violet-950/30 blur-[120px] z-0"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-950/30 blur-[120px] z-0"></div>

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
          
          <Particles />
      </div>
      {/* --- SEAM BLENDERS --- */}
      <div className="absolute top-0 left-0 w-full h-15 bg-linear-to-b from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-15 bg-linear-to-t from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      </div>

       {/* --- HEADER --- */}
       <div className="absolute top-[5vh] z-40 flex flex-col items-center pointer-events-none">
          <h1 className="text-center text-xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
            Timeline
          </h1>
         <div className="w-50 h-0.5 bg-linear-to-r from-transparent via-cyan-500/80 to-transparent  mt-2"></div>
      </div>

      {/* --- TIMELINE TRACK --- */}
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex flex-row items-start pt-[55vh] pl-[50vw] w-max">
        
        {/* RAILS */}
        <div ref={grayRailRef} className="absolute top-[55vh] left-[50vw] h-px bg-neutral-900 -translate-y-1/2 z-0 border-y border-gray-900"></div>
        <div ref={lineRef} className="absolute top-[55vh] left-[50vw] h-0.5 bg-cyan-400 shadow-[0_0_20px_#22d3ee] -translate-y-1/2 z-10" style={{ width: '0px' }}>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-cyan-500 blur-xs rounded-full z-20"></div>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full z-30"></div>
        </div>

        {/*Nodes*/}
        {events.map((event, index) => {
          const isActive = index <= activeNode;
          const isEven = index % 2 === 0;

          return (
            <div key={event.id} ref={(el) => { nodeRefs.current[index] = el; }} className="relative z-20 shrink-0 w-auto mx-[10vw] -translate-y-1/2">
              
              {/* Central Node*/}
              <div className={`w-10 h-10 transition-all duration-300 ease-out flex items-center justify-center bg-[#0a0a0a] relative z-30 ${isActive ? 'scale-[0.8] opacity-100' : 'scale-[0.7] opacity-40'}`}>
                 <div className={`absolute inset-0 bg-[#0a0a0a] border-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`} 
                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                 </div>
                 <div className={`relative z-10 w-3 h-3 rotate-45 transition-colors duration-300 ${isActive ? 'bg-white shadow-[0_0_10px_#00f3ff]' : 'bg-gray-800'}`}></div>
              </div>

              {/* Connector Line */}
              <div className={`
                  absolute left-1/2 -translate-x-1/2 w-px bg-cyan-400 shadow-[0_0_15px_#00f3ff] z-0 transition-[height] duration-500 ease-out
                  ${isEven ? 'bottom-1/2 origin-bottom' : 'top-1/2 origin-top'}
                `}
                style={{
                  height: isActive ? '30px' : '0px' 
                }}
              ></div>

              {/* Card Wrapper*/}
             <div className={`
                absolute w-87.5 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out
                ${isActive ? 'opacity-100 translate-y-0 blur-0 z-50' : 'opacity-0 blur-sm z-0'}
                
                ${isEven 
                    ? `bottom-[calc(50%+30px)] ${isActive ? 'translate-y-0' : 'translate-y-8'}` 
                    : `top-[calc(50%+30px)] ${isActive ? 'translate-y-0' : '-translate-y-8'}` 
                }
              `}>
                
                {/*Card Content*/}
                <div className={`
                    relative bg-black/80 backdrop-blur-md  group
                    transition-all duration-300
                `}>
                  
                  {/* Glowing Border */}
                  <div className={`absolute inset-0 border transition-colors duration-300 
                      ${isActive ? 'border-cyan-500/30' : 'border-white/5'}`}
                      style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                  ></div>

                  {/* Corners*/}
                  <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                  <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                  <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>

                  {/*Inner Content*/}
                  <div className="relative p-6 z-10" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                      
                      <div className="flex justify-between items-start mb-3 border-b border-gray-800 pb-2">
                          <span className="text-sm font-bold text-cyan-600 tracking-widest uppercase">
                            // LOG_0{event.id}
                          </span>
                          <span className={`text-[12px] px-2 py-0.5 border ${isActive ? 'border-cyan-900 bg-cyan-950/30 text-cyan-300' : 'border-gray-800 text-gray-600'} rounded-sm uppercase tracking-wide`}>
                             {event.time}
                          </span>
                      </div>

                      {/* Datas*/}
                      <div className="flex items-baseline gap-3 mb-3">
                          <h2 className="text-5xl font-bold text-white tracking-tighter drop-shadow-lg">
                              {event.date.split(' ')[1]}
                          </h2>
                          <span className="text-xl text-gray-500 font-light uppercase tracking-widest">
                              {event.date.split(' ')[0]}
                          </span>
                      </div>

                      {/* Event Items List */}
                      <div className="space-y-2">
                          {event.items.map((item, i) => (
                             <div key={i} className="flex items-center gap-3 group/item overflow-hidden">
                                <div className={`w-1.5 h-1.5 bg-cyan-500 rotate-45 transition-transform duration-300 ${isActive ? 'group-hover/item:rotate-90 group-hover/item:scale-150' : ''}`}></div>
                                <span className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300
                                    ${isActive ? 'text-gray-300 group-hover/item:text-cyan-400 group-hover/item:translate-x-1' : 'text-gray-600'}`}>
                                    {item}
                                </span>
                             </div>
                          ))}
                      </div>

                      {/* Background*/}
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

export default DesktopTimeline;