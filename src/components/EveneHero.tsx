"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import TransitionLink from './TransitionLink';

interface MyComponentProps {
  about: string;
  buttonDesign: string;
  logo: string;
  mode: string;
  name: string;
  registeredUiBtn: string;
  textColor?: string;
}

const EventHero: React.FC<MyComponentProps> = ({
  about,
  buttonDesign,
  logo,
  mode,
  name,
  registeredUiBtn,
  textColor = "text-white text-shadow-dark",
}) => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 relative z-10">
      
      <div className="flex flex-col items-center justify-center gap-y-8 max-w-4xl w-full">
        
        {/* Logo Section */}
        <div className="relative w-full flex justify-center">
          <Image 
            width={500} 
            height={300} 
            src={logo} 
            alt={`${name} logo`} 
            className="w-[70vw] sm:w-[50vw] md:w-[400px] object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* About Text */}
        <p className={`${textColor} font-rajdhani text-center text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl`}>
          {about}
        </p>

        {/* Action Buttons / Status */}
        <div className="mt-2">
          {session ? (
             <p className={`py-3 px-8 font-orbitron text-base sm:text-lg font-bold rounded-full shadow-lg ${registeredUiBtn}`}>

              Registrations not started yet

            </p>
          ) : (
            <TransitionLink
            //   href={`/event/register-${mode}?eventName=${name}`} 
              href={`/login`} 
              className={`
                inline-block py-3 px-10 text-base sm:text-lg font-bold rounded-full 
                shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 
                transition-all duration-300 uppercase tracking-widest
                ${buttonDesign}
              `}
            >
              Register Now
            </TransitionLink>
           
          )}
        </div>

      </div>
    </div>
  )
}

export default EventHero