'use client'
import React from 'react'
import { motion, Variants } from "framer-motion"
import Image from "next/image"

type Prize = {
  id: string;
  title: string;
  amount: string;
  image: string;
  glow: string;
  borderGlow: string;
};

const prizes: Prize[] = [
  {
    id: "silver",
    title: "Silver Prize",
    amount: "TBD",
    image: "/Circuistics/silver prize.png",
    glow: "group-hover:shadow-[0_8px_32px_0_rgba(56,189,248,0.3)]",
    borderGlow: "group-hover:border-sky-400/50",
  },
  {
    id: "gold",
    title: "Gold Prize",
    amount: "TBD",
    image: "/Circuistics/gold prize.png",
    glow: "group-hover:shadow-[0_8px_32px_0_rgba(250,204,21,0.3)]",
    borderGlow: "group-hover:border-yellow-400/50",
  },
  {
    id: "bronze",
    title: "Bronze Prize",
    amount: "TBD",
    image: "/Circuistics/bronze prize.png",
    glow: "group-hover:shadow-[0_8px_32px_0_rgba(244,63,94,0.3)]",
    borderGlow: "group-hover:border-rose-400/50",
  },
];

export default function Prizes() {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id='prizes' className="relative w-full py-24 flex flex-col items-center justify-center bg-transparent z-10">

      <div className='maxWidthForSections w-full flex flex-col items-center px-4'>

        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center pointer-events-none select-none mb-16 md:mb-24"
        >
          <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase relative inline-block">
            Prizes
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-200/60 to-transparent"></span>
          </h1>
        </motion.div>

        {/* Prizes Layout - Changed to flex-row for mobile, gap reduced */}
        <motion.div
          className="flex flex-row justify-center items-stretch mt-6 md:mt-10 gap-2 sm:gap-4 md:gap-8 lg:gap-12 w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {prizes.map((prize) => {
            const isGold = prize.id === "gold";

            return (
              <motion.div
                key={prize.id}
                variants={cardVariants}
                // flex-1 forces them to equally share the row width. Padding shrunk for mobile.
                className={`group relative flex flex-col items-center flex-1 max-w-[280px] p-2 sm:p-4 md:p-8 rounded-xl md:rounded-3xl 
                  bg-gradient-to-br from-fuchsia-500/10 via-purple-500/20 to-cyan-500/10 
                  backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] 
                  transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 
                  ${prize.borderGlow} ${prize.glow}`}
              >

                {/* Responsive Image Sizing
                                    Mobile Math: Gold (-top-12, h-20), Silver (-top-8, h-16) -> Bottoms align perfectly at 2rem!
                                    Desktop Math: Gold (-top-24, h-40), Silver (-top-16, h-32) -> Bottoms align perfectly at 4rem!
                                */}
                <div
                  className={`absolute drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out 
                                    ${isGold
                      ? '-top-12 w-20 h-20 md:-top-24 md:w-40 md:h-40 group-hover:scale-105'
                      : '-top-8 w-16 h-16 md:-top-16 md:w-32 md:h-32 group-hover:scale-110'
                    }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={prize.image}
                      alt={prize.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text Info - Shrunk margins and text sizes for mobile */}
                <div className="mt-8 md:mt-10 flex flex-col items-center justify-end h-full text-center w-full">
                  <h3 className="font-rajdhani text-[11px] leading-tight sm:text-base md:text-xl lg:text-2xl font-bold text-white tracking-wide mb-1 md:mb-2 group-hover:text-white/90 transition-colors">
                    {prize.title}
                  </h3>

                  {/* Amount Pill */}
                  <div className="px-2 py-1 md:px-6 md:py-2 rounded-full bg-black/30 border border-white/5 mt-auto md:mt-2">
                    <p className="font-orbitron text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold text-cyan-300 tracking-wider">
                      {prize.amount}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  )
}