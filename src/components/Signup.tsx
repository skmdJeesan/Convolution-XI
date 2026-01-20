'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from "react-icons/fa";

function SignUp() {
  const [loading, setLoading] = useState(false)
  return (
    <div className='main flex items-center justify-center h-screen text-white'>
      <div className="flex flex-col gap-2 items-center glassmorphism-bg rounded-4xl overflow-hidden px-7 py-4">
        <h1 className="text-xl font-bold">Create an Account</h1>
        <form action="post" className='w-[33w] flex flex-col gap-y-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='px-4 font-semibold'>Name</label>
            <input
              type="text"
              placeholder='Enter your name'
              id='name' name='name' required
              className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='px-4 font-semibold'>Email</label>
            <input
              type="email"
              placeholder='Enter your email'
              id='email' name='email' required
              className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='px-4 font-semibold'>Password</label>
            <input
              type="password"
              placeholder='Enter your password'
              id='password' name='password' required
              className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
            />
          </div>
          <div className="flex gap-2 w-full">
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="phne" className='px-4 font-semibold'>Phone</label>
              <input
                type='text'
                placeholder='Enter your phone number'
                id='phone' name='phone' required
                className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="institution" className='px-4 font-semibold'>Institution</label>
              <input
                type="text"
                placeholder='Institution name'
                id='institution' name='institution' required
                className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="department" className="px-4 font-semibold">Department</label>
              <input
                type="text"
                placeholder='Enter your dept. name'
                id='department' name='department' required
                className='outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm'
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="year" className="px-4 font-semibold">Year</label>
              <select
                id="year"
                name="year"
                required
                className="outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm"
              >
                <option value="" disabled selected hidden>(e.g., UG1, PG1)</option>
                <option value="School">School</option>
                <option value="UG1">UG1</option>
                <option value="UG2">UG2</option>
                <option value="UG3">UG3</option>
                <option value="UG4">UG4</option>
                <option value="PG">PG</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <p className='text-xs'>Already have an Account?</p>
            <Link href="/login" className="text-xs">please <span className='text-cyan-400'>Login</span></Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 rounded-3xl glass-btn cursor-pointer"
          >
            {loading ? ("loading..") : ("Register")}
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className='border border-gray-500 w-1/3'></span>
            <p className='text-xs'>Or Register with</p>
            <span className='border border-gray-500 w-1/3'></span>
          </div>
          <div className="flex items-center justify-center gap-2">
              <div className="py-2.5 px-7 w-1/3 bg-zinc-800 rounded-3xl inline-flex gap-1 items-center justify-center glass-btn"><FaGoogle className='text-lg'/></div>
              <div className="py-2.5 px-7 w-1/3 bg-zinc-800 rounded-3xl inline-flex gap-1 items-center justify-center glass-btn"><FaGithub className='text-lg'/></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp