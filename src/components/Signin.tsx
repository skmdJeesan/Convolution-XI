'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import FlipLink from './FlipLink';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from './Loader';


function SignIn() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', })

  const session = useSession()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })

    if (result?.ok) {
      router.replace('/')   // or '/home'
    } else {
      console.error(result?.error)
      alert("Invalid credentials")
    }
  }


  return (
    <div className='main flex items-center justify-center min-h-screen w-full text-white px-3 sm:px-4 py-8 sm:py-6'>
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-3 items-center glassmorphism-bg rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden px-4 sm:px-5 md:px-6 lg:px-7 py-5 sm:py-6 md:py-7 lg:py-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[35vw]">

        {/* Header */}
        <div className='flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-1.5'>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Sign in</h1>
          <p className='text-xs sm:text-sm md:text-base text-gray-400'>Join the Future of <span className='text-purple-500/80'>Engineering</span></p>
        </div>

        {/* Form */}
        <form onSubmit={signinHandler} className='w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-3'>

          {/* Email Field */}
          <div className='flex flex-col gap-1 sm:gap-1.5'>
            <label htmlFor="email" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Email</label>
            <input
              type="email"
              placeholder='Enter your email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='outline-none py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm hover:bg-white/10 focus:bg-white/10 transition-all'
            />
          </div>

          {/* Password Field */}
          <div className='flex flex-col gap-1 sm:gap-1.5'>
            <label htmlFor="password" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Password</label>
            <input
              type="password"
              placeholder='Enter your password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='outline-none py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm hover:bg-white/10 focus:bg-white/10 transition-all'
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center px-1">
            <a href="#" className='text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors'>
              Forgot password?
            </a>
          </div>

          {/* Register Link */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center text-center">
            <p className='text-xs sm:text-sm'>Don&apos;t have an account?</p>
            <div className="text-xs sm:text-sm inline-flex gap-1">
              please <span className='text-purple-400'><FlipLink href="register">Register</FlipLink></span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-2xl sm:rounded-3xl glass-btnn cursor-pointer font-semibold text-sm sm:text-base hover:bg-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader />
            ) : (
              <FlipLink href=''>Sign in</FlipLink>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 w-full">
            <span className='border border-gray-500 flex-1'></span>
            <p className='text-xs sm:text-sm px-2'>Or Sign in with</p>
            <span className='border border-gray-500 flex-1'></span>
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
            <button
              type="button"
              className="py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-7 flex-1 sm:flex-none bg-zinc-800 rounded-2xl sm:rounded-3xl inline-flex gap-2 sm:gap-3 items-center justify-center glass-btn hover:bg-zinc-700 hover:scale-105 transition-all active:scale-95"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <FaGoogle className='text-base sm:text-lg md:text-xl' />
              <span className='text-xs sm:text-sm hidden sm:inline'>Google</span>
            </button>
            <button
              type="button"
              className="py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-7 flex-1 sm:flex-none bg-zinc-800 rounded-2xl sm:rounded-3xl inline-flex gap-2 sm:gap-3 items-center justify-center glass-btn hover:bg-zinc-700 hover:scale-105 transition-all active:scale-95"
              onClick={() => signIn('github', { callbackUrl: '/' })}
            >
              <FaGithub className='text-base sm:text-lg md:text-xl' />
              <span className='text-xs sm:text-sm hidden sm:inline'>GitHub</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn