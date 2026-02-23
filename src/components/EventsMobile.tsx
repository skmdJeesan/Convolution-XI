"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import ConvolutionCard, { Event } from "./ConvolutionCard";
import './EventsMobile.css';

const EventsMobile = ({ events = [] }: { events: Event[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const paginationRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const activeIndexRef = useRef(0);

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setIsHeaderVisible(true);
            }
            if (entry.target === carouselWrapperRef.current) {
              setIsCarouselVisible(true);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (carouselWrapperRef.current) observer.observe(carouselWrapperRef.current);

    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const measurements = cardRefs.current.map((card, index) => {
        if (!card || !card.parentElement) return null;

        const rect = card.parentElement.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        return { index, distance, card };
      });

      let newActiveIndex = activeIndexRef.current;
      let minDistance = Infinity;
      const maxDistance = containerRect.width / 1.5;

      measurements.forEach((data) => {
        if (!data) return;
        const { index, distance, card } = data;

        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }

        let progress = distance / maxDistance;
        progress = Math.max(0, Math.min(progress, 1));

        const scale = 1 - progress * 0.315;
        const opacity = 1 - progress * 0.6;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity.toString();
        card.style.zIndex = progress < 0.2 ? "20" : "10";
      });

      if (newActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = newActiveIndex;

        if (paginationRef.current) {
          paginationRef.current.innerText = `${newActiveIndex + 1} / ${events.length}`;
        }

        if (prevBtnRef.current) {
          prevBtnRef.current.disabled = newActiveIndex === 0;
          if (newActiveIndex === 0) prevBtnRef.current.classList.add('disabled');
          else prevBtnRef.current.classList.remove('disabled');
        }

        if (nextBtnRef.current) {
          nextBtnRef.current.disabled = newActiveIndex === events.length - 1;
          if (newActiveIndex === events.length - 1) nextBtnRef.current.classList.add('disabled');
          else nextBtnRef.current.classList.remove('disabled');
        }
      }
    });
  }, [events.length]);

  useEffect(() => {
    handleScroll();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const scrollToSlide = useCallback((direction: 'prev' | 'next') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }

    const newIndex = direction === 'prev' ? activeIndexRef.current - 1 : activeIndexRef.current + 1;
    if (!scrollRef.current || !cardRefs.current[newIndex]) return;

    cardRefs.current[newIndex]?.parentElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  if (!events || events.length === 0) return null;

  return (
    // REMOVED: min-h-screen to allow the section to be exactly as tall as it needs to be
    <div id="events" className="w-full bg-black flex flex-col items-center justify-start overflow-x-hidden relative py-4">

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="absolute top-[10%] left-[-20%] w-[70%] h-[50%] bg-purple-900/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[-20%] w-[80%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* TIGHTENED: Changed pt-24 to pt-16 and pb-8 to pb-4 */}
      <div ref={headerRef} className="relative z-10 w-full max-w-[350px] px-6 pt-8 pb-4 flex flex-col items-center text-center">
        <h1 className={`font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase ${isHeaderVisible ? 'animate-title-up' : 'opacity-0-start'}`}>
            Events
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>

        {/* TIGHTENED: Changed mt-10 to mt-4 */}
        <p className={`max-w-2xl mt-8 text-stone-400 text-sm font-medium leading-relaxed tracking-wide ${isHeaderVisible ? 'animate-subtitle-up' : 'opacity-0-start'}`}>
          Prepare for deployment. Choose your domain and prove your skills in the
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold"> ultimate techno-management battlefield</span>.
        </p>
      </div>

      {/* TIGHTENED: Changed pb-20 to pb-10 */}
      <div 
        ref={carouselWrapperRef} 
        className={`relative w-full z-10 flex flex-col items-center pb-10 ${isCarouselVisible ? 'animate-carousel-up' : 'opacity-0-start'}`}
      >
        <div
          ref={scrollRef}
          className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-0 px-[15vw]"
        >
          {events.filter(Boolean).map((event, index) => (
            <div
              key={event.id || index}
              data-index={index}
              className="flex-none w-[70vw] snap-center snap-always shrink-0 py-8"
            >
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                className="transform-gpu will-change-transform w-full h-full"
              >
                <ConvolutionCard data={event} index={index} />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[95vw] px-2 flex justify-between items-center pointer-events-none z-20">
          <button
            ref={prevBtnRef}
            onClick={() => scrollToSlide('prev')}
            className="nav-button-prev pointer-events-auto disabled"
            aria-label="Previous event"
          />
          <button
            ref={nextBtnRef}
            onClick={() => scrollToSlide('next')}
            className={`nav-button-next pointer-events-auto ${events.length <= 1 ? 'disabled' : ''}`}
            aria-label="Next event"
          />
        </div>

        <div
          ref={paginationRef}
          className="mt-2 text-cyan-400 font-mono text-sm tracking-widest font-bold"
        >
          1 / {events.length}
        </div>
      </div>
    </div>
  );
};

export default EventsMobile;