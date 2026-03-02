import React from "react";
import { motion } from "framer-motion"; 
const Timeline = () => {
    const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };
  return (
    <div
      id="timeline"
      className="relative w-full pt-20 md:pt-25 pb-20 flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#2c5111] via-[#243d10] to-[#3a4511] "
    >
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      ></div>
      {/*main content */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full px-4 gap-20">
       <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="font-orbitron font-bold text-center text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-gray-300 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Timeline
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
        </motion.div>
        
        <span className="font-orbitron text-3xl md:text-6xl font-bold tracking-widest text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] uppercase text-center mt-2">
          Coming Soon...
        </span>
      </div>
      
    </div>
  );
};

export default Timeline;