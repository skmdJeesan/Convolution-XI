'use client'
import Loader from '@/components/Loader'
import { userData } from '@/context/UserContext'
import { signOut } from 'next-auth/react'
import React, { useContext, useState } from 'react'

function page() {
  const [loading, setLoading] = useState(false)

  const data = useContext(userData)
  
  const handleSignOut = async () => {
    setLoading(true)
    try {
      // Use NextAuth's built-in redirect instead of router.replace()
      await signOut({ 
        redirect: true, 
        callbackUrl: '/login' 
      })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoading(false)
    }
  }
  
  return (
    <div className='flex flex-col gap-1 items-center justify-center h-screen bg-zinc-900 text-white'>
      <h1>Welcome <span className='text-purple-400'>{data?.user?.name}</span></h1>
      <button 
        onClick={handleSignOut} 
        disabled={loading}
        className='cursor-pointer glass-btnn py-2 px-5 rounded-full'
      >
        {loading ? <Loader /> : 'Log out'}
      </button>
    </div>
  )
}

export default page