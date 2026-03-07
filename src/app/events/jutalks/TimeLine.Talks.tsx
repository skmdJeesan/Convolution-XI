import React from "react";

const Timeline = () => {
  return (
    <div
      id="timeline"
      className="relative w-full pt-20 md:pt-25 pb-5 flex flex-col items-center justify-center overflow-hidden bg-[#FF97E3]"
    >
      
      {/*main content */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full px-4 gap-20">
       <div
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-sm whitespace-nowrap uppercase">
            Timeline
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