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
    name: "Avilasha Banerjee",
    post: "Event Lead",
    image: "/peoplePics/avilasha.jpeg",
    linkedin: "https://www.linkedin.com/in/avilasha-banerjee-4b3a12377",
    instagram: "https://www.instagram.com/avilasha.07",
    x: "",
  },
  {
    name: "Ritam Paul",
    post: "Event Lead",
    image: "/peoplePics/ritampaul.jpeg",
    linkedin: "https://www.linkedin.com/in/ritam-paul-40628a245?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/r.i.t.a.m_paul?igsh=MWJkZjM2bmZzaXBrNw==",
    x: "",
  },
];

// icons
const Icons = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
    </svg>
  ),
  x: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
};

// -- Reusable Components --

const SocialLink = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => (
  <a href={href} className="team-social-link" title={title} target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

// Memoized Card Component to prevent re-renders
const TeamCard = memo(({ member, variants }: { member: TeamMember, variants: any }) => {
  return (
    <div className="team-card-wrapper">
      <motion.div variants={variants} className="team-card">
        {/* Image/Avatar Section */}
        <div className="team-card-image-container">
          {member.image ? (
            <Image
      src={member.image}
      alt={member.name}
      fill
      sizes="(max-width: 640px) 160px, 240px"
      className="team-card-image object-cover"
      loading="lazy"
    />
          ) : (
            <div className="team-card-avatar">
              <span className="team-card-avatar-text">
                {member.name.split(' ').map(n => n.charAt(0)).join('')}
              </span>
            </div>
          )}
        </div>

        {/* Info Overlay */}
        <div className="team-card-info-overlay">
          <div className="team-card-name-post">
            <h3 className="font-rajdhani team-card-name">{member.name}</h3>
            <p className="font-rajdhani team-card-post">{member.post}</p>
          </div>

          {/* Social Links */}
          <div className="team-card-socials">
            {member.instagram && <SocialLink href={member.instagram} title="Instagram" icon={Icons.instagram} />}
            {member.x && <SocialLink href={member.x} title="X" icon={Icons.x} />}
            {member.linkedin && <SocialLink href={member.linkedin} title="LinkedIn" icon={Icons.linkedin} />}
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
    <div id='team' className="team-section bg-[#FF97E3]">
      <div className="team-bg-gradient"></div>
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FF97E3] to-transparent z-10"></div>

      <div className='maxWidthForSections'>
        <div
          className="flex flex-col items-center pointer-events-none select-none mb-5"
        >
          <h1 className="relative z-20 font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-sm whitespace-nowrap uppercase">
            Our Team
          </h1>
          <p className="opacity-90 font-rajdhani text-center text-[#592A13] font-bold mt-5 text-base sm:text-lg font-rajdhani">Meet the event leads of JU Talks! We are ready to address all your queries.</p>
        </div>

        <motion.div
          className="team-cards-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }} //when the page is 15% travelled then reveal
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