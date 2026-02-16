'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import "@/app/sponsors.css";
// Imports kept for when you uncomment the content later
import techEle from "@/assets/images/ConvoSponsors/techno ele.webp";
import exide from "@/assets/images/ConvoSponsors/Exide.webp";
import megatherm from "@/assets/images/ConvoSponsors/Megatherm.png";
import iet from "@/assets/images/ConvoSponsors/iet.png";
import ntpl from "@/assets/images/ConvoSponsors/NTPL.png";
import pes from "@/assets/images/ConvoSponsors/pees.png";
import raydus from "@/assets/images/ConvoSponsors/raydus.png";
import deis from "@/assets/images/ConvoSponsors/deis.png";
import sps from "@/assets/images/ConvoSponsors/sps.png";
import telegraph from "@/assets/images/ConvoSponsors/telegrapg.png";
import comsoc from "@/assets/images/ConvoSponsors/comsoc.png";
import DecorativeIcons from "./DecorativeIcons";
import '@/app/sponsors.css';
import FlipLink from "./FlipLink";
import { motion } from "framer-motion";


const Sponsors: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.20, } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    // Reduced min-height to 60vh as requested
    <div id="sponsors" className="relative w-full min-h-[60vh] flex flex-col items-center justify-center">  
      {/* <Cursor magnetic /> */}

      {/* Grid Background */}
      <div className="tech-grid pointer-events-none" />
    {/* Decorative Icons */}

      <div className="py-12 h-full w-full relative z-10 flex flex-col items-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
           className="flex flex-col items-center pointer-events-none select-none mb-12">
          <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Our Sponsors
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
        </motion.div>

        {/* =============================================
            PREVIOUS CONTENT (COMMENTED OUT)
            =============================================
        */}
        {/*
        <div className="opacity-0 w-full h-full flex flex-col items-center justify-center">
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-2xl mb-4 w-fit"
          >
            <FlipLink>Main&nbsp;Sponsor</FlipLink>
          </motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center mb-10">
            <a
              href="/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </a>
          </motion.div>

          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-2xl mb-4 w-fit"
          >
            <FlipLink >Co-Sponsor</FlipLink>
          </motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center mb-10">
            <a
              href="/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </a> 
          </motion.div>

          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4 w-fit"
          >
            <FlipLink>Associate&nbsp;Sponsor</FlipLink>
          </motion.p>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center">
            <motion.a
              variants={itemVariants}
              href="/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </motion.a>
          </motion.div>

          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4 mt-10 w-fit"
          >
            <FlipLink>Event&nbsp;Partners</FlipLink>
          </motion.p>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <motion.a
              variants={itemVariants}
              href="https://www.theiet.org/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </motion.a>
          </motion.div>

          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4 mt-10 w-fit"><FlipLink>Digital&nbsp;Media&nbsp;Partner</FlipLink></motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center">
            <a
              href="https://www.telegraphindia.com/edugraph"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <p className="text-white/80 text-center">Coming Soon..</p>
            </a>
          </motion.div>
        </div>
        */}

        {/* =============================================
            ACTIVE COMING SOON TEXT
            (Modified from original: removed absolute positioning, made opaque)
            =============================================
        */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative mt-8 opacity-100" // Changed from absolute/opacity-30 to relative/opacity-100
        >
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-rajdhani font-semibold text-white tracking-tighter whitespace-nowrap capitalize">
            Coming <span className="text-transparent font-rajdhani w-fit bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">soon..</span>
          </h2>
        </motion.div>
      </div>

    </div>
    
  );
};

export default Sponsors;