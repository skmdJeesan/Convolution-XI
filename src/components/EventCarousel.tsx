'use client';
import React, { useState } from 'react';
import styles from './EventCarousel.module.css';
import { motion, Variants } from 'framer-motion';
import TransitionLink from './TransitionLink';
import { FaArrowRight } from 'react-icons/fa6';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const EventCarousel = ({events}: {events: Event[]}) => {
  const [currDeg, setCurrDeg] = useState<number>(0);
  const stepDeg = 360 / events.length;

  const rotateLeft = () => {
    setCurrDeg((prev) => prev + stepDeg);
  };

  const rotateRight = () => {
    setCurrDeg((prev) => prev - stepDeg);
  };

  return (
    <div className={styles.bodyContainer}>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center pointer-events-none select-none"
      >
        <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
          EVENTS
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
      </motion.div>

      {/* 1. ANGULAR WIDTH BLOCKERS (2D CURTAINS) */}
      <div className={styles.interactionZoneContainer}>
        <div></div>
        <div></div>
      </div>

      <div className={styles.carousel}>
        
        {/* Controls */}
        <div 
          className={`${styles.carouselControlButton} ${styles.left}`}
          onClick={rotateLeft}
        >
          <input type="radio" name="carousel-control-input" />
        </div>
        
        <div 
          className={`${styles.carouselControlButton} ${styles.right}`}
          onClick={rotateRight}
        >
          <input type="radio" name="carousel-control-input" defaultChecked />
        </div>

        {/* 2. DEPTH BLOCKER (INVISIBLE WALL) 
            It must be HERE: Inside 'carousel' (for 3D space) 
            but OUTSIDE 'sceneCenter' so it stays fixed.
        */}
        <div className={styles.depthBlocker}></div>


        {/* --- NEW SHARED 3D PIVOT CENTER --- */}
        {/* This pushes everything (robot AND cards) to the exact center of the circle */}
        <div 
          className={styles.sceneCenter}
          style={{ transform: `scale(var(--scene-scale, 1)) translateZ(calc(var(--carousel-diameter) / -2))` }}
        >
            {/* Robot Center Piece */}
            <div className={styles.centerRobotWrapper}>
                 <div className={styles.centerPiece}>
                    <img 
                      src="/assets/images/event_robot_1.png" 
                      alt="Event Mascot" 
                      className={styles.robotImage} 
                    />
                    <div className={styles.robotLegsGradient}></div>
                    <div className={styles.spotlight}></div>
                 </div>
            </div>

            {/* Manual Rotater - NOW ONLY HANDLES ROTATION */}
            <div 
              className={styles.manualRotater}
              style={{ transform: `rotateY(${currDeg}deg)` }}
            >
                <div className={styles.carouselRotationDirection}>
                  <ul 
                    className={styles.carouselItemWrapper} 
                    style={{ '--_num-elements': events.length } as React.CSSProperties}
                  >
                    {events.map((event, index) => (
                      <li
                        key={event.id}
                        className={styles.carouselItem}
                        style={{
                          '--_index': index + 1,
                          '--_image-url': `url('${event.image}')`,
                        } as React.CSSProperties}
                      >
                        <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>
                            <div className={styles.cardContent}>
                              <div className={styles.iconContainer}>
                                {event.icon}
                              </div>
                              <h3 className={styles.cardTitle}>{event.title}</h3>
                              <p className={styles.cardDesc}>{event.desc}</p>
                              <TransitionLink href={`/events/${event.id}`} className={styles.exploreBtn}>
                                Explore <FaArrowRight className="ml-2" />
                              </TransitionLink>
                            </div>
                        </div>
                        <div className={`${styles.cardFace} ${styles.cardFaceBack}`}></div>
                        <div className={`${styles.cardFace} ${styles.cardFaceRight}`}></div>
                        <div className={`${styles.cardFace} ${styles.cardFaceLeft}`}></div>
                        <div className={`${styles.cardFace} ${styles.cardFaceTop}`}></div>
                        <div className={`${styles.cardFace} ${styles.cardFaceBottom}`}></div>
                      </li>
                    ))}
                    <li className={styles.carouselGround}></li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;