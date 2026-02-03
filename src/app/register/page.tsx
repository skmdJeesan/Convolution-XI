"use client"
import React, { useEffect, useState } from 'react'
import Signup from '@/components/Signup'
import DecorativeIcons from '@/components/DecorativeIcons';
import './register.css'
import Particles from '@/components/Particles';

function Page() {
  return (
    <div className='bg-[#030305] font-sans selection:bg-cyan-500/30 h-screen w-full' id="container">
        {/* Grid Background */}
        <div className="tech-grid pointer-events-none" />
        {/* Decorative Icons */}
        <DecorativeIcons />
        <Particles />
        <Signup />
    </div>
  )
}

export default Page