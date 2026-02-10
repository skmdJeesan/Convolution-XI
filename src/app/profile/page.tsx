'use client'
import FlipLink from '@/components/FlipLink'
import Loader from '@/components/Loader'
import Particles from '@/components/Particles'
import { userData } from '@/context/UserContext'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import profileIcon from "@/assets/images/Robot_Profile.jpg";
import React, { useContext, useState } from 'react'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

function page() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const data = useContext(userData)
  
  const handleSignOut = async () => {
    setLoading(true)
    try {
      // Use NextAuth's built-in redirect instead of router.replace()
      await signOut({ 
        redirect: true, 
        callbackUrl: '/' 
      })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen w-full bg-black mt-20 relative text-white p-2 lg:px-10 lg:py-2 font-sans flex flex-col items-center gap-4">
      <Particles />
      <div className="absolute end-0 bottom-5 rotate-y-180">
        <Image
          src="/small_robo.png"
          alt="small robo Logo"
          width={200}
          height={300}
        />
        {/* <video 
          src="/small_robo_vid.mp4"
          autoPlay loop muted width={150}
          height={150} className='bg-transparent'>
        </video> */}
      </div>

     

      <div className='nav flex items-center justify-between text-white w-full'>
        <h1 className='text-lg lg:text-2xl'>Welcome <span className='text-purple-400 font-bold'>{data?.user?.name} 🤖</span></h1>
        <button 
          onClick={handleSignOut} 
          disabled={loading}
          className='cursor-pointer glass-btnn py-1 lg:py-1.5 px-4 rounded-full'
        >
          {loading ? <Loader /> : <FlipLink>Log&nbsp;out</FlipLink>}
        </button>
      </div>

      <div className="user-details w-full p-4 glassmorphism-bg rounded-xl flex gap-4 lg:gap-8">
        <div className="profile flex flex-col items-center justify-center">
          <div className="h-14 w-14 lg:h-20 lg:w-20 rounded-full relative overflow-hidden mb-2 border-2 border-purple-500">
            <Image
              src={profileIcon}
              alt="profile icon"
              fill
              className="object-cover h-full w-full"
            />
          </div>
          <p className='text-sm lg:text-base text-zinc-500 hover:text-purple-500 cursor-pointer underline'>edit</p>
        </div>
        <ul className='text-sm lg:text-base'>
          <li>Name: {data?.user?.name}</li>
          <li>Convo-Id: {data?.user?._id?.slice(0,6)}</li>
          <li>Institution: {data?.user?.institution}</li>
          <li>Department: {data?.user?.department}</li>
          <li>year: {data?.user?.year}</li>
        </ul>
      </div>

      <div className="participation w-full p-4 glassmorphism-bg rounded-xl">
        <h2 className='text-lg lg:text-2xl mb-2 lg:mb-4'>Your Participation</h2>
        <div className="events-list flex flex-col gap-2 lg:gap-4">
          <p className='text-sm lg:text-base text-gray-400'>
            You have not participated in any events yet.<br />
            Go to <span onClick={() => router.replace('/#all-events')} className='cursor-pointer hover:text-purple-500 underline'>Events</span> for more details.
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default page

