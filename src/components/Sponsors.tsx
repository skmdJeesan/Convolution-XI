'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import "@/app/sponsors.css";
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
    <div className="relative w-full min-h-screen">  
      {/* <Cursor magnetic /> */}

      {/* Grid Background */}
      <div className="tech-grid pointer-events-none" />
      {/* Decorative Icons */}
      <DecorativeIcons />

      <div className="py-12 h-full w-full">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-10 text-center mb-10 space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            our sponsors
          </h2>
          <div className="h-1 w-24 mx-auto bg-linear-to-r from-transparent via-cyan-500 to-transparent rounded-full opacity-70"></div>
        </motion.div>

        <div className="w-full h-full">
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-2xl mb-4"
          ><FlipLink href="">Main Sponsor</FlipLink></motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center mb-10">
            <a
              href="https://megatherm.com/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg"
            >
              <Image
                src={megatherm}
                alt="megatherm image"
                className="object-cover h-full w-full"
              ></Image>
            </a>
            
          </motion.div>

          {/* ----------------------co sponsor---------------- */}
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-2xl mb-4"><FlipLink href="">Co-Sponsor</FlipLink></motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center mb-10">
            <a
              href="https://www.raydus.com/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-20 w-30"
            >
              <Image
                src={raydus}
                alt="exide image"
                className="h-full w-full object-cover "
              ></Image>
            </a> 
          </motion.div>

          {/* -----------------------------associate--------------------- */}
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4"><FlipLink href="">Associate Sponsor</FlipLink></motion.p>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center">
            <motion.a
              variants={itemVariants}
              href="https://www.exideindustries.com/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-14 w-40"
            >
              <Image
                src={exide}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://www.techno.co.in/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-14 w-40"
            >
              <Image
                src={techEle}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
          </motion.div>

          {/* -----------------------------event partners--------------------- */}
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4 mt-10"><FlipLink href="">Event Partners</FlipLink></motion.p>
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
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={iet}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="http://ieeepeskolkata.org/#:~:text=The%20Power%20%26%20Energy%20Society%20"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={pes}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="http://www.ieeespskolkata.org/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={sps}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://ewh.ieee.org/r10/calcutta/deis/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={deis}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://www.comsoc.org/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={comsoc}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://www.neoteletronix.com/"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-22 w-40"
            >
              <Image
                src={ntpl}
                alt="exide image"
                className="h-full w-full object-cover"
              ></Image>
            </motion.a>
          </motion.div>

          {/* ---------------------------------media partners--------------------- */}
          <motion.p 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-white text-center text-xl mb-4 mt-10"><FlipLink href="">Digital Media Partner</FlipLink></motion.p>
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex gap-4 justify-center">
            <a
              href="https://www.telegraphindia.com/edugraph"
              target="_blank"
              className="hover:scale-105 glassmorphism-bg p-3 rounded-lg h-24 w-60"
            >
              <Image
                src={telegraph}
                alt="megatherm image"
                className="h-full w-full object-cover"
              ></Image>
            </a>
          </motion.div>
        </div>
      </div>

    </div>
    
  );
};

export default Sponsors;
