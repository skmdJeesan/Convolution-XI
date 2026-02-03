"use client"
import React, { useEffect, useState } from 'react'
import Signin from '@/components/Signin';
import '../register/register.css'
import DecorativeIcons from '@/components/DecorativeIcons';
import Particles from '@/components/Particles';

function Page() { 
  
  return (
    <div className='bg-[#030305] font-sans selection:bg-cyan-500/30 h-screen w-full' id="container">
      <div className="tech-grid pointer-events-none" /> {/* Grid Background */}
      <DecorativeIcons />
      <Particles />
      <Signin />
    </div>
  )
}

export default Page