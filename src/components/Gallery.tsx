"use client"
import React from "react";
import Image from "next/image";
// import Galleries from "../assets/images/Galleria/1.webp"

// Placeholder data - replace with your images
const images = [
  { src: "/assets/images/Galleria/1.webp", span: "col-span-1 md:col-span-2 row-span-2", title: "Keynote" },
  { src: "/assets/images/Galleria/2.webp", span: "col-span-1", title: "Workshops" },
  { src: "/assets/images/Galleria/3.webp", span: "col-span-1", title: "Cyber Security" },
  { src: "/assets/images/Galleria/4.webp", span: "col-span-1 md:col-span-2", title: "Robotics" },
  { src: "/assets/images/Galleria/5.webp", span: "col-span-1", title: "Networking" },
];

const Gallery = () => {
  return (
    <div className="p-8 bg-[#050505]">
       <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
         <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Gallery</h2>
         <span className="text-gray-500 font-mono text-sm">SCROLL DOWN ↓</span>
       </div>

      {/* Columns: 1 on mobile, 2 on tablet, 3 on desktop */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid relative group mb-4">
            <div className="relative overflow-hidden rounded-lg border border-white/5 bg-gray-900">
              <Image
                src={img.src}
                alt="Gallery Item"
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button className="px-6 py-2 border border-white text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;