import React from 'react'
import { motion } from "framer-motion"

const Mentors = () => {
    const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };
  return (
    <div 
      id="judges" 
      className="relative w-full pt-20 md:pt-25 pb-30 flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#3a4511] via-[#525412] to-[#6b5e13]"
    >
      
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 maxWidthForSections flex flex-col items-center w-full px-4 gap-4">
        
        {/* Heading */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="font-orbitron font-bold text-center text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-gray-300 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Mentors
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
        </motion.div>

        <div className="mx-auto flex justify-center mt-12">
           <span className="font-orbitron text-3xl md:text-6xl font-bold tracking-widest text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] uppercase text-center">
             Coming Soon...
           </span>
        </div>
        
      </div>
    </div>
  );
};

export default Mentors;