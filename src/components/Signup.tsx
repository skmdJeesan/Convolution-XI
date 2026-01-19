'use client'
import React, { useState } from 'react'
import '../app/login/login.css'
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
// import axios from 'axios';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useClickSound } from '@/hooks/useClickSound';

function Signup() {
  //const playClick = useClickSound('/click.mp3');

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //const router = useRouter()

  const signUpHandler = async (e: React.FormEvent) => {
    //playClick()
    e.preventDefault()
    // handle sign up logic here
    // try {
    //   const response = await axios.post('/api/auth/register', {name, email, password})
    //   console.log(response.data)
      
    //   // Sign in automatically after registration
    //   const signInResult = await signIn('credentials', {
    //     email,
    //     password,
    //     redirect: false
    //   })
      
    //   if (signInResult?.ok) {
    //     setName('')
    //     setEmail('')
    //     setPassword('')
    //     router.push('/')
    //   } else {
    //     console.error('Sign in failed')
    //   }
    // } catch (error) {
    //   throw error
    // }
  }
  
  // onClick={() => signIn('google', {callbackUrl: '/'})}
  // onClick={() => signIn('github', {callbackUrl: '/'})}

  return (
    <div className="form-container sign-up">
      <form onSubmit={(e: React.FormEvent) => signUpHandler(e)}>
        <h1>Create Account</h1>
        <div className="social-icons">
          <a href="#"   className="icon"><FaGoogle /></a>
          <a href="#" className="icon"><FaFacebook /></a>
          <a href="#"   className="icon"><FaGithub /></a>
          <a href="#" className="icon"><FaLinkedin /></a>
        </div>
        <span>or use your email for registeration</span>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup