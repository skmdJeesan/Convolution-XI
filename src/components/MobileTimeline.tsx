'use client';

import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { events } from '../components/Timeline_Data';

const TimelineItem = memo(({ event, isActive, isLast, setLastNodeRef }: any) => {
  return (
    <div className="timeline-row grid grid-cols-[80px_1fr] relative">
      <div className="relative flex justify-center pr-10 h-full pt-4.5">
          <div
            ref={isLast ? setLastNodeRef : null}
            className="mobile-node-center absolute top-6 right-4 w-1 h-1"
          ></div>
          
          <div className={`
               relative z-20 w-8 h-8 flex items-center justify-center shrink-0
               transition-all duration-300 ease-out
               ${isActive ? 'scale-110' : 'scale-90 opacity-30'}
           `}>
               <div 
                  className={`absolute inset-0 bg-[#0a0a0a] border-[1.5px] transition-all duration-300 
                    ${isActive ? 'border-cyan-400 shadow-[0_0_15px_#00f3ff]' : 'border-gray-800'}`}
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
               ></div>
               
               {/* Inner Diamond */}
               <div 
                  className={`relative z-10 w-2 h-2 rotate-45 transition-all duration-300 bg-white shadow-[0_0_10px_#00f3ff]  
                    ${isActive ? 'opacity-100' : 'opacity-30'}`}
               ></div>
           </div>
      </div>

      <div className="relative">
          {/* horizontal connector */}
          <div className={`
              absolute top-8 -left-11 h-px bg-cyan-400 shadow-[0_0_10px_#00f3ff] z-0
              transition-all duration-300 ease-out origin-left
              ${isActive ? 'w-9 opacity-100' : 'w-0 opacity-0'}
           `}></div>

           {/* Card section */}
           <div className={`
               relative w-full transition-all duration-500 ease-out -ml-6
               ${isActive ? 'opacity-100 translate-x-4' : 'opacity-0 translate-x-0'}
           `}>
               
               <div className="relative bg-[#06091fd3] p-1 group transition-all duration-300"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                   
                   <div className={`absolute inset-0 border transition-colors duration-300 
                        ${isActive ? 'border-cyan-500/50' : 'border-white/5'}`}>
                   </div>
                   
                   <div className={`absolute top-[5px] left-[5px] w-[14.14px] h-[1px] -translate-x-1/2 -translate-y-1/2 -rotate-45 z-10 transition-colors duration-300 ${isActive ? 'bg-cyan-500/50' : 'bg-white/10'}`}></div>
                   <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                   <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                   <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>

                   <div className="relative p-2 z-10" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}>
                       
                        <div className="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
                           <span className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-cyan-600' : 'text-gray-500'}`}>
                               // LOG_0{event.id}
                           </span>
                           <span className={`text-[12px] font-rajdhani font-semibold px-1.5 py-0.3 border rounded-sm uppercase tracking-wide transition-colors duration-300 ${isActive ? 'border-cyan-900 bg-cyan-950/30 text-cyan-300' : 'border-gray-800 text-gray-600 bg-transparent'}`}>
                              {event.time}
                           </span>
                        </div>

                        <div className="flex items-baseline gap-2 mb-3">
                           <h2 className={`text-[22px] font-orbitron font-semibold tracking-tighter drop-shadow-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                               {event.date.split(' ')[1]}
                           </h2>
                           <span className="text-[13px] font-orbitron text-gray-400 font-medium uppercase tracking-widest">
                               {event.date.split(' ')[0]}
                           </span>
                        </div>

                        <div className="space-y-1.5">
                            {event.items.map((item: string, i: number) => (
                               <div key={i} className="flex items-center gap-2 group/item">
                                   <div className={`w-1 h-1 rotate-45 transition-all duration-300 ${isActive ? 'bg-cyan-500 group-hover/item:rotate-90 group-hover/item:scale-150' : 'bg-gray-700'}`}></div>
                                   <span className={`text-sm font-rajdhani font-semibold tracking-normal capitalize transition-colors duration-300
                                       ${isActive ? 'text-gray-300 group-hover/item:text-cyan-400' : 'text-gray-600'}`}>
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
});
TimelineItem.displayName = 'TimelineItem';

// logics
const MobileTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railContainerRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);

  const [activeNode, setActiveNode] = useState<number>(-1);
  const [railHeight, setRailHeight] = useState(0);
  
  const nodePositions = useRef<number[]>([]);

  const setLastNodeRef = useCallback((el: HTMLDivElement | null) => {
    lastNodeRef.current = el;
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (railContainerRef.current && lastNodeRef.current) {
        const railRect = railContainerRef.current.getBoundingClientRect();
        const lastNodeRect = lastNodeRef.current.getBoundingClientRect();
        
        const height = (lastNodeRect.top - railRect.top) + (lastNodeRect.height / 2) + 10;
        setRailHeight(height);

        const nodes = document.querySelectorAll('.mobile-node-center');
        const positions: number[] = [];
        
        nodes.forEach((node) => {
          const nodeRect = node.getBoundingClientRect();
          const nodeTopRelative = nodeRect.top - railRect.top;
          const nodeCenterRelative = nodeTopRelative + (nodeRect.height / 2);
          positions.push(nodeCenterRelative);
        });
        
        nodePositions.current = positions;
      }
    };

    let lastWidth = window.innerWidth;
    const observer = new ResizeObserver(() => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateDimensions();
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);

    updateDimensions();
    setTimeout(updateDimensions, 500);
    setTimeout(updateDimensions, 2000);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const beamScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, railHeight]);

  useMotionValueEvent(beamHeight, "change", (latestHeight) => {
    if (latestHeight < 10) {
      if (activeNode !== -1) setActiveNode(-1);
      return;
    }

    let newActive = -1;
    nodePositions.current.forEach((pos, index) => {
      if (latestHeight >= pos) {
        newActive = index;
      }
    });

    if (newActive !== activeNode) {
      setActiveNode(newActive);
    }
  });

  return (
    <div ref={containerRef} className="relative  w-full min-h-screen bg-black text-white font-mono pb-20 overflow-hidden">

      {/* Background*/}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#030712] z-0"></div>
          <div 
  className="absolute inset-0 z-0 pointer-events-none"
  style={{
    backgroundImage: `
      radial-gradient(90vw 100vh at 10% 20%, rgb(88 6 95 / 40%) 0%, transparent 100%),
      radial-gradient(100vw 70vh at 90% 40%, rgba(22, 78, 99, 0.3) 0%, transparent 100%),
      radial-gradient(95vw 80vh at 10% 80%, rgba(88, 28, 135, 0.3) 0%, transparent 100%),
      radial-gradient(100vw 65vh at 90% 90%, rgba(22, 78, 99, 0.2) 0%, transparent 100%)`
  }}
></div>
          {/* <div className="absolute top-[-10%] left-[-20%] w-[90vw] h-[80vh] rounded-full bg-fuchsia-950/20 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute top-[25%] right-[-15%] w-[90vw] h-csreen rounded-full bg-cyan-900/30 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute bottom-[25%] left-[-15%] w-[90vw] h-screen rounded-full bg-purple-900/20 blur-[100px] z-0 transform-gpu"></div>
          <div className="absolute bottom-[5%] right-[-20%] w-[105vw] h-[90vh] rounded-full bg-cyan-900/20 blur-[100px] z-0 transform-gpu"></div> */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-[#030712] to-transparent  z-69 transform-gpu"></div>
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
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black-950/20 via-transparent to-transparent z-20 pointer-events-none"></div>

      {/*Header*/}
      <div className="relative z-50 pt-15 pb-8 flex flex-col items-center justify-center">
        <h1 className="font-orbitron font-bold text-center text-4xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
         Timeline
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
        </div>

      {/*rail */}
      <div ref={railContainerRef} className="absolute top-38 left-0 w-13.5 h-full z-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 translate-x-2 w-0.5 bg-gray-800 transition-[height]"
            style={{ height: railHeight ? `${railHeight}px` : '100%' }}
          ></div>
          
          <div className="absolute top-0 left-1/2 translate-x-2 w-0.5 z-10" style={{ height: `${railHeight}px` }}>
              <motion.div 
                style={{ scaleY: beamScale }} 
                className="absolute top-0 left-0 w-full h-full bg-cyan-400 shadow-[0_0_15px_#00f3ff] origin-top"
              ></motion.div>
              
              {/*spark*/}
              <motion.div 
                style={{ y: beamHeight }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 blur-xs rounded-full z-20"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-30"></div>
              </motion.div>
          </div>
      </div>

      {/*content*/}
      <div className="relative z-10 pt-10 px-4 flex flex-col gap-8">
         {events.map((event, index) => (
             <TimelineItem 
               key={event.id}
               event={event}
               isActive={index <= activeNode}
               isLast={index === events.length - 1}
               setLastNodeRef={setLastNodeRef}
             />
         ))}
      </div>
    </div>
  );
};

export default MobileTimeline;