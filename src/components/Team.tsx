'use client'
import React from 'react'
import { motion, easeInOut } from "framer-motion"
import './TeamStyles.css'

type TeamMember = {
  name: string;
  post: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Jahid Mamud",
    post: "Secretary",
    image: "./peoplePics/jahid.png",
    linkedin: "https://www.linkedin.com/in/jahid-mamud/",
    instagram:
      "https://www.instagram.com/jem_.__/profilecard/?igsh=b2o0ZjlqZ3pkeW5t",
    facebook: "",
  },
  {
    name: "Ritam Kundu",
    post: "Joint secretary",
    image: "./peoplePics/ritam.png",
    linkedin:
      "https://www.linkedin.com/in/ritam-kundu-394612257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/ritamkundu.__/profilecard/?igsh=MTJxZ2NibmMxcW1pNw==",
    facebook: "",
  },
  {
    name: "Siddhanta Ghosh",
    post: "Treasurer",
    image: "./peoplePics/sid.png",
    linkedin: "https://www.linkedin.com/in/siddhanta-ghosh",
    instagram: "https://www.instagram.com/ghosh_siddhanta2k3/",
    facebook:
      "https://www.facebook.com/profile.php?id=100089382764364&mibextid=ZbWKwL",
  },
  {
    name: "Akash Bag",
    post: "Tech Lead",
    image: "./peoplePics/akash.png",
    linkedin: "https://www.linkedin.com/in/akashbag0903/",
    instagram: "https://www.instagram.com/akash09.dev/",
    facebook: "",
  },
  {
    name: "Arindam Pradhan",
    post: "Design Lead",
    image: "./peoplePics/arindam.png",
    linkedin:
      "https://www.linkedin.com/in/arindam-pradhan/?originalSubdomain=in",
    instagram: "https://www.instagram.com/arindam_ju01/",
    facebook: "",
  },
  {
    name: "Aritra Kumar Dutta",
    post: "Sponsorship Lead",
    image: "./peoplePics/aritra.png",
    linkedin:
      "https://www.linkedin.com/in/aritra-dutta-1752b4304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/_travelling.tesla/profilecard/?igsh=cnJpM3BtMzkycW90",
    facebook: "https://www.facebook.com/share/19VD7DQ6Ei/",
  },
  {
    name: "Reejul Chattaraj",
    post: "Content Lead",
    image: "./peoplePics/rc.png",
    linkedin:
      "https://www.linkedin.com/in/reejul-chattaraj-85a09727a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/_reeejul?igsh=MW8xNG51N3pnbDNpMw%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/share/19gMsP3Ce7/?mibextid=LQQJ4d",
  },
  {
    name: "Sinjan Dinda",
    post: "Logistics Lead",
    image: "./peoplePics/dinda.png",
    linkedin:
      "https://www.linkedin.com/in/sinjan-dinda-a70861276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/dinda_sinjan?igsh=bWc4eGJnMDJ0MTc4",
    facebook: "https://www.facebook.com/share/15soztURSb/",
  },
  {
    name: "Arunava Roy",
    post: "PR Lead",
    image: "./peoplePics/arunava.png",
    linkedin:
      "https://www.linkedin.com/in/arunava-roy-176a4527b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/arunava_roy_10/profilecard/?igsh=MTA0azFiODJsa2huMw==",
    facebook: "https://www.facebook.com/share/1BLg4SPrKK/",
  },
];

function Team() {
  // Calculate total members for curve distribution
  const totalMembers = teamMembers.length;
  const centerIndex = Math.floor(totalMembers / 2);

  const getCardRotation = (index: number): number => {
    // Calculate rotation based on distance from center
    // Center cards are upright (0 deg), side cards are tilted (-15 to 15 deg)
    const distance = Math.abs(index - centerIndex);
    const maxDistance = centerIndex;
    const rotationDegree = (distance / maxDistance) * 15;
    return index < centerIndex ? -rotationDegree : rotationDegree;
  };

  const getCardTranslateY = (index: number): number => {
    // Center cards stay lower, side cards move up slightly for curve effect
    const distance = Math.abs(index - centerIndex);
    const maxDistance = centerIndex;
    const translateY = (distance / maxDistance) * 30;
    return translateY;
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };

  const containerVariants = {
    hidden: { opacity: 0, },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeInOut
      }
    }
  };

  return (
    <div id='team' className="team-section">
      {/* Premium dark background with gradient */}
      <div className="team-bg-gradient"></div>
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center pointer-events-none select-none mb-5 relative w-full">
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-semibold text-white tracking-tighter whitespace-nowrap capitalize">
            Our <span className="text-transparent w-fit bg-clip-text bg-linear-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap">team</span>
          </h2>
          {/* <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-500/80 to-transparent"></span> */}
      </motion.div>

      {/* Curved Cards Container */}
      <motion.div
        className="team-cards-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-card-wrapper"
            style={{
              '--card-rotation': `${getCardRotation(index)}deg`,
              '--card-translate-y': `${getCardTranslateY(index)}px`,
              '--animation-delay': `${index * 0.1}s`,
            } as React.CSSProperties}
          >
            {/* Card with floating animation */}
            <motion.div
              variants={cardVariants}
              className="team-card"
            >
              {/* Image/Avatar Section - Full card background */}
              <div className="team-card-image-container">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-card-image"
                  />
                ) : (
                  <div className="team-card-avatar">
                    <span className="team-card-avatar-text">
                      {member.name.split(' ').map(n => n.charAt(0)).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Overlay - Appears on hover */}
              <div className="team-card-info-overlay">
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-post">{member.post}</p>

                {/* Social Links */}
                <div className="team-card-socials">
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      className="team-social-link"
                      title="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                      </svg>
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      className="team-social-link"
                      title="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="team-social-link"
                      title="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Team