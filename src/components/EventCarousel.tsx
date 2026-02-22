'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import styles from './EventCarousel.module.css';
import TransitionLink from './TransitionLink';
import { FaArrowRight } from 'react-icons/fa6';

interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const EventCarousel = ({ events }: { events: Event[] }) => {
  const [currDeg, setCurrDeg] = useState<number>(0);
  const stepDeg = 360 / events.length;

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Observer for Header Animation
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          if (headerRef.current) headerObserver.unobserve(headerRef.current);
        }
      },
      { threshold: 0.2 }
    );

    // Observer to pause 3D animation when out of view
    const containerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } 
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (containerRef.current) containerObserver.observe(containerRef.current);

    return () => {
      headerObserver.disconnect();
      containerObserver.disconnect();
    };
  }, []);

  const rotateLeft = () => { setCurrDeg((prev) => prev + stepDeg); };
  const rotateRight = () => { setCurrDeg((prev) => prev - stepDeg); };

  const memoizedEvents = useMemo(() => {
    return events.map((event, index) => (
      <li
        key={event.id}
        className={styles.carouselItem}
        style={{
          '--_index': index + 1,
        } as React.CSSProperties}
      >
        <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover z-0 rounded-[inherit]"
            decoding="async" /* OPTIMIZATION: Async decoding prevents main-thread blocking */
          />
          <div className={`${styles.cardContent} relative z-10`}>
            <div className={styles.iconContainer}>{event.icon}</div>
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
        
        {/* OPTIMIZATION: Next.js Image for Reflection instead of CSS background-image */}
        <div className={styles.reflectionWrapper}>
          <Image
            src={event.image}
            alt={`${event.title} reflection`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover z-0"
            decoding="async"
          />
          <div className={styles.reflectionOverlay}></div>
        </div>
      </li>
    ));
  }, [events]);

  // OPTIMIZATION: Removed JS hover state entirely. Pause is now handled by IntersectionObserver (JS) and :hover (CSS).
  const isPaused = !isCarouselVisible;

  return (
    <div className={styles.bodyContainer} ref={containerRef}>
      
      {/* HEADER WITH NATIVE OBSERVER */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none select-none">
        <div 
          ref={headerRef}
          className={`${styles.headerBase} ${isHeaderVisible ? styles.headerAnimate : ''}`}
        >
          <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
          Events
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
        </div>
      </div>

      {/* BLOCKERS */}
      <div className={styles.interactionZoneContainer}>
        <div className={styles.blockerLeft}></div>
        <div className={styles.blockerRight}></div>
      </div>

      {/* CONTROLS */}
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

      {/* OPTIMIZATION: Applied dynamic class to pause animations only when out of viewport */}
      <div className={`${styles.carousel} ${isPaused ? styles.paused : ''}`}>
        <div className={styles.depthBlocker}></div>

        <div 
          className={styles.sceneCenter}
          style={{ transform: `scale(var(--scene-scale, 1)) translateZ(calc(var(--carousel-diameter) / -2))` }}
        >
            {/* Robot Center Piece */}
            <div className={styles.centerRobotWrapper}>
                 <div className={styles.centerPiece}>
                    <Image 
                      src="/assets/images/event_robot_1.png" 
                      alt="Event Mascot" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`${styles.robotImage} object-contain`} 
                      priority
                    />
                    <div className={styles.robotLegsGradient}></div>
                 </div>
            </div>

            {/* Manual Rotater */}
            <div 
              className={styles.manualRotater}
              style={{ transform: `rotateY(${currDeg}deg)` }}
            >
                <div className={styles.carouselRotationDirection}>
                  <ul 
                    className={styles.carouselItemWrapper} 
                    style={{ '--_num-elements': events.length } as React.CSSProperties}
                  >
                    {memoizedEvents}
                    <li className={styles.carouselGround}></li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
<div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#030712e5] to-transparent z-69 pointer-events-none"></div>   
<div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-[#030712b7] to-transparent z-10 pointer-events-none"></div>   
 </div>
  );
};

export default EventCarousel;