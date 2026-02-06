'use client';

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
} from 'react';
import gsap from 'gsap';
import { events } from '../components/Timeline_Data';

/* optimised particles*/

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const particles = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

/* ---------------- TIMELINE ---------------- */

const TabletTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);

  const [activeNode, setActiveNode] = useState(-1);
  const [railHeight, setRailHeight] = useState(0);

  const nodeCentersRef = useRef<number[]>([]);
  const activeNodeRef = useRef<number>(-1);

  /* --------- MEASURE HEIGHT --------- */

  useEffect(() => {
    const updateDimensions = () => {
      if (!railContainerRef.current || !lastNodeRef.current) return;

      const railRect = railContainerRef.current.getBoundingClientRect();
      const lastNodeRect = lastNodeRef.current.getBoundingClientRect();

      const height =
        lastNodeRect.top -
        railRect.top +
        lastNodeRect.height / 2 +
        10;

      setRailHeight(height);
    };

    const observer = new ResizeObserver(updateDimensions);
    if (railContainerRef.current)
      observer.observe(railContainerRef.current);

    updateDimensions();
    return () => observer.disconnect();
  }, []);

  /*caching node positions */

  useLayoutEffect(() => {
    if (!railContainerRef.current || railHeight === 0) return;

    const railRect = railContainerRef.current.getBoundingClientRect();
    const nodes = Array.from(
      document.querySelectorAll('.mobile-node-center')
    ) as HTMLElement[];

    nodeCentersRef.current = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top - railRect.top + rect.height / 2;
    });
  }, [railHeight]);

  /* Gsap logic*/

  useLayoutEffect(() => {
    if (!containerRef.current || !lineRef.current || railHeight === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current!,
        { height: 0 },
        {
          height: railHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top+=150 center',
            end: `+=${railHeight}`,
            scrub: true,
            fastScrollEnd: true,

            onUpdate: (self) => {
              const beamLen = self.progress * railHeight;
              if (beamLen < 10) {
                if (activeNodeRef.current !== -1) {
                  activeNodeRef.current = -1;
                  setActiveNode(-1);
                }
                return;
              }

              const centers = nodeCentersRef.current;
              let newActive = -1;

              for (let i = 0; i < centers.length; i++) {
                if (beamLen >= centers[i]) newActive = i;
                else break;
              }

              if (newActive !== activeNodeRef.current) {
                activeNodeRef.current = newActive;
                setActiveNode(newActive);
              }
            },
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [railHeight]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#030712] text-white font-mono pb-20 overflow-hidden">

      <div 
        className="absolute inset-0 z-0 pointer-events-none"
      >

          <div className="absolute inset-0 bg-[#030712] z-0"></div>

          <div className="absolute top-[5%] left-[-16%] w-[90vw] h-[80vw] rounded-full bg-violet-950/30 blur-[120px] z-0"></div>
          <div className="absolute bottom-[10%] right-[-15%] w-[90vw] h-[80vw] rounded-full bg-cyan-950/30 blur-[120px] z-0"></div>
          <div className="absolute bottom-[2%] right-[-15%] w-[90vw] h-[10vw] rounded-full bg-[#030712] blur-[120px] z-0"></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
          <Particles />
      </div>


      {/* --- HEADER --- */}
      <div className="relative z-50 pt-24 pb-16 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">
            Timeline
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent mt-4"></div>
      </div>
      
      {/* Rail */}
      <div ref={railContainerRef} className="absolute top-60 left-1/2 -translate-x-1/2 w-0.5 h-full z-0 pointer-events-none">
          
          {/* Gray Rail */}
          <div 
            className="absolute top-0 left-0 w-full bg-gray-900 transition-[height]"
            style={{ height: railHeight ? `${railHeight}px` : '100%' }}
          ></div>
          
          {/* Active Beam*/}
          <div className="absolute top-0 left-0 w-full z-10">
              <div ref={lineRef} className="relative w-full bg-cyan-400 shadow-[0_0_20px_#00f3ff] h-0">
                   {/* Head*/}
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-cyan-500 blur-xs rounded-full z-20"></div>
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full z-30"></div>
              </div>
          </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 p-4 w-full max-w-4xl mx-auto">
         {events.map((event, index) => {
            const isActive = index <= activeNode;
            const isLast = index === events.length - 1;
            const isEven = index % 2 === 0; 
            
            return (
               <div key={event.id} className={`relative w-full mb-5 min-h-35 flex ${isEven ? 'justify-start' : 'justify-end'}`}>
                 
                 {/* central node*/}
                 <div className="absolute left-1/2 -translate-x-1/2 top-8 z-20 flex flex-col items-center">
                     {/* Reference for calculations */}
                     <div ref={isLast ? lastNodeRef : null} className="mobile-node-center w-1 h-1 absolute top-1/2 -translate-y-1/2"></div>

                     {/* Visual Node */}
                     <div className={`w-10 h-10 transition-all duration-300 ease-out flex items-center justify-center bg-[#0a0a0a] relative z-30 ${isActive ? 'scale-110' : 'scale-100'}`}>
                        <div className={`absolute inset-0 bg-[#0a0a0a] border-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-800'}`} 
                             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        </div>
                        <div className={`relative z-10 w-2.5 h-2.5 rotate-45 transition-colors duration-300 ${isActive ? 'bg-white shadow-[0_0_10px_#00f3ff]' : 'bg-gray-800'}`}></div>
                     </div>
                 </div>

                 {/*connector*/}
                 <div className={`
                     absolute top-12.25 h-0.5 shadow-[0_0_10px_rgba(34,211,238,0.5)]
                     transition-all duration-700 ease-out z-0
                     ${isEven ? 'right-1/2 origin-right' : 'left-1/2 origin-left'}
                     ${isActive ? 'w-[calc(50%-45%)] opacity-100 bg-cyan-400' : 'w-0 opacity-0 bg-gray-800'}
                 `}></div>

                 {/* card*/}
                 <div className={`
                     relative w-[45%] transition-all duration-700 ease-out group
                     ${isActive 
                        ? 'opacity-100 translate-x-0' 
                        : `opacity-0 ${isEven ? 'translate-x-12' : '-translate-x-12'}`
                     }
                 `}>
                    
                    {/* Card Container */}
                    <div className="relative bg-black/80 backdrop-blur-md p-1 group transition-all duration-300">
                        
                        {/* Glowing Border */}
                        <div className={`absolute inset-0 border transition-colors duration-300 
                             ${isActive ? 'border-cyan-500/30' : 'border-white/5'}`}
                             style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                        </div>

                        {/* Corner Accents */}
                        <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                        <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>
                        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-cyan-400' : 'border-gray-700'}`}></div>

                        {/* Inner Content */}
                        <div className="relative p-5 z-10" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                            
                             {/* Header */}
                             <div className="flex justify-between items-start mb-2 border-b border-gray-800 pb-2">
                                <span className="text-xs font-bold text-cyan-600 tracking-widest uppercase">
                                   // LOG_0{event.id}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 border ${isActive ? 'border-cyan-900 bg-cyan-950/30 text-cyan-300' : 'border-gray-800 text-gray-600'} rounded-sm uppercase tracking-wide`}>
                                   {event.time}
                                </span>
                             </div>

                             {/* Date */}
                             <div className="flex items-baseline gap-2 mb-3">
                                <h2 className="text-3xl font-bold text-white tracking-tighter drop-shadow-lg">
                                    {event.date.split(' ')[1]}
                                </h2>
                                <span className="text-lg text-gray-500 font-light uppercase tracking-widest">
                                    {event.date.split(' ')[0]}
                                </span>
                             </div>

                             {/* Items */}
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