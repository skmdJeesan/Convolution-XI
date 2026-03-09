'use client'
import React from 'react'
import { motion, Variants } from "framer-motion"

type Mentor = {
    name: string;
    post: string;
    university: string;
    image: string;
};

const mentors: Mentor[] = [
    {
        name: "Amitava Chatterjee",
        post: "Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/ac.png",
    },
    {
        name: "Smita Sadhu",
        post: "Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/ss.png",
    },
];

export default function Mentors() {
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
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
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id='judges' className="relative w-full py-20 flex flex-col items-center justify-center bg-transparent z-10">

            <div className='maxWidthForSections w-full flex flex-col items-center px-4'>

                {/* Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center pointer-events-none select-none mb-12"
                >
                    <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase relative inline-block">
                        Mentors
                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-200/60 to-transparent"></span>
                    </h1>
                    <p className="opacity-90 text-center text-white mt-5 text-base sm:text-lg font-rajdhani font-bold tracking-wide">
                        Meet the Mentors of Algomaniac!
                    </p>
                </motion.div>

                {/* Mentors Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group relative flex items-center gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.2)] hover:-translate-y-1"
                        >
                            {/* Profile Image */}
                            <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300">
                                {mentor.image ? (
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                        {mentor.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-rajdhani text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                                        {mentor.name}
                                    </h3>
                                    {/* Small info icon */}
                                    {/* <svg className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg> */}
                                </div>

                                <p className="font-rajdhani text-sm sm:text-base text-cyan-200/90 font-medium leading-tight mb-1">
                                    {mentor.post}
                                </p>
                                <p className="font-rajdhani text-xs sm:text-sm text-gray-300">
                                    {mentor.university}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}