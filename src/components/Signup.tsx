'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FlipLink from './FlipLink';



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
          <div className="flex gap-2 w-full">
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
              {/* <select
                id="year"
                name="year"
                required
                className="outline-none py-2 px-4 rounded-3xl glass-btn placeholder:text-sm"
              >
                <option value="" disabled selected hidden>(eg: UG1, PG1)</option>
                <option value="School" className='bg-zinc-800 ro'>School</option>
                <option value="UG1">UG1</option>
                <option value="UG2">UG2</option>
                <option value="UG3">UG3</option>
                <option value="UG4">UG4</option>
                <option value="PG">PG</option>
                <option value="Other">Other</option>
              </select> */}
              <Select>
                <SelectTrigger className="w-full py-2 px-4 rounded-3xl glass-btn placeholder:text-sm">
                  <SelectValue placeholder="(eg: UG1, PG1)" />
                </SelectTrigger>
                <SelectContent className='glass-btn'>
                  <SelectGroup>
                    <SelectItem value="School" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">School</SelectItem>
                    <SelectItem value="UG1" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG1</SelectItem>
                    <SelectItem value="UG2" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG2</SelectItem>
                    <SelectItem value="UG4" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG4</SelectItem>
                    <SelectItem value="PG" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">PG</SelectItem>
                    <SelectItem value="Other" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <p className='text-xs'>Already have an Account?</p>
            <div className="text-sm inline-flex gap-1">please <span className='text-purple-400'><FlipLink href="/login">Login</FlipLink></span></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 rounded-3xl glass-btnn cursor-pointe"
          >
            {loading ? ("loading..") : <FlipLink href=''>Register</FlipLink>}
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