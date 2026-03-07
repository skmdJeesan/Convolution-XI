import React from "react";

const Timeline = () => {
  return (
    <div
      id="timeline"
      className="relative w-full pt-20 md:pt-25 pb-20 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      
      {/*main content */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full px-4 gap-20">
       <div
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase relative inline-block">
            Timeline
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-400/80 to-transparent"></span>
          </h1>
        </div>
        
        <span className="font-orbitron text-3xl md:text-4xl font-bold tracking-wide text-white drop-shadow-[0_4px_10px_rgba(89,42,19,0.2)] text-center mt-2">
          Coming Soon...
        </span>
      </div>
      
    </div>
  );
};

export default Timeline;