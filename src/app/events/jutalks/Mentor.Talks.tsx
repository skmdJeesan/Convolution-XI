'use client'
import React from 'react'

type Mentor = {
    name: string;
    post: string;
    university: string;
    image: string;
};

const mentors: Mentor[] = [
    {
        name: "Arindam Kumar Sil",
        post: "Associate Professor at Department of Electrical Engineering",
        university: "Jadavpur University",
        image: "/Mentors/aks.png",
    },
];

export default function Mentors() {
    return (
        <section id='judges' className="relative w-full pt-20 md:pt-25 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#FF97E3]">

            <div className='maxWidthForSections w-full flex flex-col items-center px-4'>

                {/* Header Section */}
                <div className="flex flex-col items-center pointer-events-none select-none mb-10 gap-2">
                    <h1 className="font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
                        Mentor
                    </h1>
                    <p className="opacity-90 text-center text-[#592A13] mt-3 text-base md:text-lg font-rajdhani font-bold tracking-wide">
                        Meet the Mentor of JU Talks!
                    </p>
                </div>

                {/* <span className="font-rajdhani text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_4px_10px_rgba(89,42,19,0.2)] text-center mt-2">
              To be declared soon ...
            </span> */}

                {/* Mentors Grid - NOW SMART/CONDITIONAL */}
                <div className={`grid grid-cols-1 ${mentors.length > 1 ? 'md:grid-cols-2' : ''} gap-6 lg:gap-10 w-full max-w-4xl justify-items-center`}>
                    {mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-5 sm:gap-6 p-6 sm:p-7 w-full max-w-xl rounded-[1.5rem] bg-[#FCEBEA] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform duration-300"
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
                                <div className="flex items-center gap-2 mb-1.5">
                                    <h3 className="tfont-rajdhani ext-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
                                        {mentor.name}
                                    </h3>
                                    <a 
                                        href="https://scholar.google.com/citations?user=ypKGGcsAAAAJ&hl=en" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-black text-white shrink-0 cursor-pointer transition-transform hover:scale-110"
                                    >
                                        <span className="font-serif text-[11px] font-bold italic leading-none pt-[1px]">i</span>
                                    </a>
                                </div>

                                <p className="text-sm sm:text-base text-gray-800 leading-snug font-rajdhani font-semibold">
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