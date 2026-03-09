'use client'
import Link from 'next/link';
import React from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
type Mentor = {
    name: string;
    post: string;
    university: string;
    image: string;
    profile: string
};

const mentors: Mentor[] = [
    {
        name: "Dipten Maity",
        post: "Associate Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/dm.png",
        profile: "https://scholar.google.co.in/citations?hl=en&user=34JBou8AAAAJ"
    },
    {
        name: "Biswendu Chatterjee",
        post: "Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/bdc.png",
        profile:"https://scholar.google.com/citations?user=tglA61sAAAAJ&hl=en"
    },
    {
        name: "Susanta Ray",
        post: "Associate Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/sr.png",
        profile: "https://www.researchgate.net/profile/Susanta-Ray"
    },
];

export default function Mentors() {


    const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };

    return (
        <section id='judges' className="relative w-full pt-20 md:pt-25 pb-5 flex flex-col items-center justify-center overflow-hidden">

            <div className='maxWidthForSections w-full flex flex-col items-center px-4'>

                {/* Header Section */}
                <motion.div 
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center pointer-events-none select-none mb-10 gap-2">
                    <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
                        Judges & Mentors
                    </h1>
                    <p className="opacity-90 text-center text-white mt-3 text-base md:text-lg font-rajdhani font-bold tracking-wide">
                        Meet the Judges & Mentors of Circuistics!
                    </p>
                </motion.div>

                {/* <span className="font-rajdhani text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_4px_10px_rgba(89,42,19,0.2)] text-center mt-2">
              To be declared soon ...
            </span> */}

                <div className="flex justify-center md:flex-wrap lg:flex-nowrap flex-col md:flex-row gap-2 md:gap-x-6">
                    {mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-white/20 shadow-black/20 shadow-md backdrop-blur-sm flex py-4 px-3 items-center gap-x-4 sm:max-w-[500px]"
                        >
                            <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-300">
                                {mentor.image ? (
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full font-rajdhani bg-[#592A13] flex items-center justify-center text-3xl font-bold text-white">
                                        {mentor.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5 text-white">
                                  
                                    <h3 className="tfont-rajdhani text-sm sm:text-lg font-semibold text-white tracking-tight">
                                        {mentor.name}
                                    </h3>
                                    <Link target="_blank" href={mentor.profile}>
                <FaInfoCircle  />
              </Link>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-200 leading-snug font-rajdhani font-semibold">
                                    {mentor.post}, <br className="hidden sm:block" /> {mentor.university}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}