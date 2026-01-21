'use client';
import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import FlipLink from '@/components/FlipLink'; // adjust import path as needed
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // adjust import path as needed
import { signIn } from 'next-auth/react';
import Loader from './Loader';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    institution: '',
    department: '',
    year: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (value: string) => {
    setFormData(prev => ({ ...prev, year: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission
    try {
      const response = await axios.post('/api/auth/register', formData)
      console.log(response.data)
      
      // Sign in automatically after registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: true
      })
      
      if (signInResult?.ok) {
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          institution: '',
          department: '',
          year: '',
        })
        setLoading(false)
      } else {
        console.error('Sign in failed')
      }
    } catch (error) {
      throw error
    }
    //console.log(formData);
  };

  return (
    <div className='main flex items-center justify-center min-h-screen w-full text-white px-3 sm:px-4 py-6 sm:py-4'>
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-2 items-center glassmorphism-bg rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden px-4 sm:px-5 md:px-6 lg:px-6 py-4 sm:py-6 md:py-7 lg:py-6 w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-[55vw]">
        
        {/* Header */}
        <div className='flex flex-col items-center gap-1 sm:gap-2'>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Create an Account</h1>
          <p className='text-xs sm:text-sm md:text-base text-gray-400'>Powering Innovation at <span className='text-purple-500/80'>Convolution</span> XI</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2 sm:gap-4 md:gap-5 lg:gap-2'>

          {/* Name Field */}
          <div className='flex flex-col gap-1 sm:gap-1.5'>
            <label htmlFor="name" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Name</label>
            <input
              type="text"
              placeholder='Enter your name'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
            />
          </div>

          {/* Email & Password */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-2 w-full">
            <div className='flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2'>
              <label htmlFor="email" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Email</label>
              <input
                type="email"
                placeholder='Enter your email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
              />
            </div>
            <div className='flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2'>
              <label htmlFor="password" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
              />
            </div>
          </div>

          {/* Phone & Institution */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-2 w-full">
            <div className='flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2'>
              <label htmlFor="phone" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Phone</label>
              <input
                type='text'
                placeholder='Enter your phone number'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
                className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
              />
            </div>
            <div className='flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2'>
              <label htmlFor="institution" className='px-3 sm:px-4 font-semibold text-xs sm:text-sm'>Institution</label>
              <input
                type="text"
                placeholder='Institution name'
                id='institution'
                name='institution'
                value={formData.institution}
                onChange={handleChange}
                required
                className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
              />
            </div>
          </div>

          {/* Department & Year */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-2 w-full">
            <div className='flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2'>
              <label htmlFor="department" className="px-3 sm:px-4 font-semibold text-xs sm:text-sm">Department</label>
              <input
                type="text"
                placeholder='Enter your dept. name'
                id='department'
                name='department'
                value={formData.department}
                onChange={handleChange}
                required
                className='outline-none py-1 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm'
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-1.5 w-full sm:w-1/2">
              <label htmlFor="year" className="px-3 sm:px-4 font-semibold text-xs sm:text-sm">Year</label>
              <Select value={formData.year} onValueChange={handleYearChange}>
                <SelectTrigger className="w-full outline-none py-2 sm:py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl glass-btn placeholder:text-xs sm:placeholder:text-sm text-sm h-auto">
                  <SelectValue placeholder="(eg: UG1, PG1)" />
                </SelectTrigger>
                <SelectContent className='glass-btn'>
                  <SelectGroup>
                    <SelectItem value="School" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">School</SelectItem>
                    <SelectItem value="UG1" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG1</SelectItem>
                    <SelectItem value="UG2" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG2</SelectItem>
                    <SelectItem value="UG3" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG3</SelectItem>
                    <SelectItem value="UG4" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">UG4</SelectItem>
                    <SelectItem value="PG" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">PG</SelectItem>
                    <SelectItem value="Other" className="focus:bg-purple-500/60 data-[state=checked]:bg-purple-600/30">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center text-center">
            <p className='text-xs sm:text-sm'>Already have an Account?</p>
            <div className="text-xs sm:text-sm inline-flex gap-1">
              please <span className='text-purple-400'><FlipLink href="/login">Sign in</FlipLink></span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="py-1 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-2xl sm:rounded-3xl glass-btnn cursor-pointer font-semibold text-sm sm:text-base hover:bg-purple-500/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader /> : <FlipLink href=''>Register</FlipLink>}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 w-full">
            <span className='border border-gray-500 flex-1'></span>
            <p className='text-xs sm:text-sm px-2'>Or Register with</p>
            <span className='border border-gray-500 flex-1'></span>
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
            <button
              type="button"
              className="py-2 sm:py-2.5 px-4 sm:px-5 md:px-7 flex-1 sm:flex-none bg-zinc-800 rounded-2xl sm:rounded-3xl inline-flex gap-2 sm:gap-3 items-center justify-center glass-btn hover:bg-zinc-700 transition-all"
            >
              <FaGoogle className='text-base sm:text-lg'/>
              <span className='text-xs sm:text-sm hidden sm:inline'>Google</span>
            </button>
            <button
              type="button"
              className="py-2 sm:py-2.5 px-4 sm:px-5 md:px-7 flex-1 sm:flex-none bg-zinc-800 rounded-2xl sm:rounded-3xl inline-flex gap-2 sm:gap-3 items-center justify-center glass-btn hover:bg-zinc-700 transition-all"
            >
              <FaGithub className='text-base sm:text-lg'/>
              <span className='text-xs sm:text-sm hidden sm:inline'>GitHub</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}