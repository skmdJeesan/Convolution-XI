'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
  const router = useRouter()
  let [loading, setLoading] = useState(false)
  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      router.push('/login')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col gap-1 items-center justify-center h-screen bg-zinc-900 text-white'>
      <h1>profile page</h1>
      <button onClick={handleSignOut} className='cursor-pointer'>Log out</button>
    </div>

  )
}

export default page