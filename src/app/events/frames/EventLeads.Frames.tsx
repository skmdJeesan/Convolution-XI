'use client'
import React, { memo } from 'react'
import { motion, easeInOut } from "framer-motion"
import './LeadStyle.css'
import Image from 'next/image';

// -- Types --
type TeamMember = {
  name: string;
  post: string;
  instagram: string;
  x: string;
  linkedin: string;
  image: string;
};

// -- Data --
const teamMembers: TeamMember[] = [
  {
    name: "Shoumik Das",
    post: "Event Lead",
    image: "/peoplePics/shoumik.jpeg",
    linkedin: "https://www.linkedin.com/in/shoumik-das-596769353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/shoumik__das?utm_source=qr&igsh=MWQzOHFsNGFlampoaw==",
    x: "",
  },
  {
    name: "Debayush Barman",
    post: "Event Lead",
    image: "/peoplePics/debayush.jpeg",
    linkedin: "",
    instagram: "https://www.instagram.com/_popai._?utm_source=qr&igsh=NHk3d3JzbHQxeGY0",
    x: "",
  },
];

// icons
const Icons = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 18a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
    </svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
};

// -- Reusable Components --

const SocialLink = ({ href, title, icon, dark }: { href: string; title: string; icon: React.ReactNode; dark?: boolean }) => (
  <a href={href} className={`team-social-link ${dark ? 'dark-theme' : ''}`} title={title} target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

// Memoized Card Component to prevent re-renders
const TeamCard = memo(({ member, variants }: { member: TeamMember, variants: any }) => {
  return (
    <div className="team-card-wrapper flex flex-col items-center">
      <motion.div variants={variants} className="flex flex-col items-center group w-full">
        
        {/* --- 1. THE CAMERA FRAME ASSEMBLY --- */}
        <div className="team-card relative">
          
          <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]">
             <Image src="/Frames/dslr.png" alt="Camera Frame" fill className="object-contain" priority />
          </div>

          <div 
            className="absolute z-10 overflow-hidden bg-[#1e293b]"
            style={{ top: '38%', left: '15%', width: '54%', height: '53%', borderRadius: '4px' }}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 240px, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-white/70 bg-slate-800">
                {member.name.split(' ').map(n => n.charAt(0)).join('')}
              </div>
            )}

            {/* --- DESKTOP HOVER OVERLAY --- */}
            <div className="hidden md:flex absolute inset-0 flex-col justify-end p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="font-rajdhani text-sm md:text-base font-bold text-white tracking-wide leading-tight">
                {member.name}
              </h3>
              <p className="font-rajdhani text-xs font-semibold text-cyan-300 mb-2">
                {member.post}
              </p>
              <div className="flex gap-2">
                {/* Regular Cyan Icons here */}
                {member.instagram && <SocialLink href={member.instagram} title="Instagram" icon={Icons.instagram} />}
                {member.x && <SocialLink href={member.x} title="X" icon={Icons.x} />}
                {member.linkedin && <SocialLink href={member.linkedin} title="LinkedIn" icon={Icons.linkedin} />}
              </div>
            </div>
            
          </div>
        </div>

        {/* --- MOBILE TEXT BELOW CAMERA --- */}
        <div className="flex md:hidden flex-col items-center mt-5 text-center w-full px-2">
            <h3 className="font-rajdhani text-xl font-extrabold text-[#063547] tracking-wide leading-tight drop-shadow-sm">
              {member.name}
            </h3>
            <p className="font-rajdhani text-sm font-bold text-slate-800 mb-3 drop-shadow-sm">
              {member.post}
            </p>
            <div className="flex gap-3">
              {/* Dark Theme Icons here to stay visible on the light blue background */}
              {member.instagram && <SocialLink dark href={member.instagram} title="Instagram" icon={Icons.instagram} />}
              {member.x && <SocialLink dark href={member.x} title="X" icon={Icons.x} />}
              {member.linkedin && <SocialLink dark href={member.linkedin} title="LinkedIn" icon={Icons.linkedin} />}
            </div>
        </div>

      </motion.div>
    </div>
  );
});

TeamCard.displayName = "TeamCard";

// -- Main Component --
function Team() {
  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } }
  };

  return (
    <div id='team' className="team-section max-h-screen">
      <div className="team-bg-gradient bg-[#52BAFF]"></div>

      {/* aeroplanes and clouds*/}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute top-[25%] left-[45%] w-14 md:w-20 h-auto opacity-80" />
        <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute bottom-[20%] left-[15%] w-16 md:w-24 h-auto opacity-80 -scale-x-100" />
        <Image src="/Frames/aeroplane.png" alt="aeroplane" width={100} height={60} className="absolute bottom-[10%] right-[10%] w-14 md:w-20 h-auto opacity-80 animate-float  -scale-x-100" />

        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[15%] left-[8%] w-12 md:w-16 h-auto opacity-80" />
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[50%] left-[6%] w-14 md:w-20 h-auto opacity-80" />
        <Image src="/Frames/cloud.png" alt="cloud" width={80} height={50} className="absolute top-[55%] left-[48%] w-12 md:w-16 h-auto opacity-80" />
      </div>

      <div className="team-spotlight-glow"></div> 

      <div className='maxWidthForSections w-full relative z-10'>
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="relative z-20 font-orbitron font-bold text-center text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-t from-gray-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            Our Team
          </h1>
          <p className="opacity-90 text-center text-white text-shadow-dark mt-5 text-base sm:text-lg font-medium">Meet the event leads of 24 Frames! We are ready to address all your queries.</p>
        </motion.div>
        
        <motion.div
          className="team-cards-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Team