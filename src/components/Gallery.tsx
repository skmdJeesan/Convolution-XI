"use client";
import React, { useEffect } from "react";
import "../app/gallery.css";
import { motion } from "framer-motion";

const Gallery = () => {

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (!scrollerInner) return;
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } }
  };

  return (
    <div className="relative min-h-screen py-10 bg-black">
      
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
           className="flex flex-col items-center pointer-events-none select-none mb-10">
        <h1 className="font-orbitron  font-bold  text-center text-3xl sm:text-5xl  tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase  ">
          Gallery
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
      </motion.div>

      <div
        id="gallery"
        className="outer-container-scroll galleryContainer relative"
        data-direction="right"
        data-speed="fast"
      >

        <div className="scroller" data-direction="right" data-speed="fast">
          <div className="scroller__inner">
            <img
              className="item first big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/1.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/2.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/3.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/4.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/5.webp"
              alt="gallery"
              draggable={false}
            />

            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/6.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/7.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/8.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/9.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/10.webp"
              alt="gallery"
              draggable={false}
            />

            <img
              className="item first big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/11.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/12.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/13.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/14.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item first big object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/15.webp"
              alt="gallery"
              draggable={false}
            />

            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/16.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/17.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/18.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/19.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/20.webp"
              alt="gallery"
              draggable={false}
            />

            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/21.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/22.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/23.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/24.webp"
              alt="gallery"
              draggable={false}
            />
            <img
              className="item object-cover w-full h-full"
              data-fancybox="gallery"
              src="/Galleria/25.webp"
              alt="gallery"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;