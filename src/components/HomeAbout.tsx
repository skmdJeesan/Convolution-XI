"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import robotImage from "@/assets/images/Robot_with_Laptop2.png";

const HomeAbout = () => {
  return (
    <div id="about" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

     
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-[1400px] h-full mx-auto px-6 flex items-center justify-center z-10">

        {/* --- THE ABOUT CARD --- */}
        <motion.div 
            className="relative z-10 w-full h-min:100px md:w-[95%] bg-white/[0.03] backdrop-blur-md border border-white/10 border-l-white/20 border-t-white/20 rounded-2xl p-8 md:p-16 md:pr-[300px] shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)] text-left -mt-10 md:-mt-32 overflow-hidden"
            
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 1 // Waiting for robot
            }}
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter drop-shadow-lg">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Us</span>
          </h2>
          
          <p className="text-gray-200 text-sm md:pr-20 md:text-lg leading-relaxed tracking-wide font-light">
            Convolution X is the tenth edition of the annual
            techno-management fest organized by the Students' Forum of the
            Department of Electrical Engineering, Jadavpur University.
            Convolution acts as an umbrella event comprising of several
            student interaction events, technical competitions, workshops,
            and has also hosted, in the past, lectures by some of the most
            illustrious names in academia and industry alike.
          </p>
        </motion.div>

        {/* --- THE ROBOT --- */}
        <motion.div 
          className="absolute bottom-0 right-0 z-20 h-[45vh] md:h-[85vh] w-auto pointer-events-none"
          initial={{ y: "40%", opacity: 0, filter: "brightness(0.5)" }}
          whileInView={{ y: 0, opacity: 1, filter: "brightness(1)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.1 }}
        >
          <Image
            src={robotImage}
            alt="Robot holding laptop"
            priority={true}
            className="h-full w-auto object-contain object-right-bottom drop-shadow-[0_0_30px_rgba(0,0,0,1)]"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default HomeAbout;