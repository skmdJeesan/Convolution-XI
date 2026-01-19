'use client'
import React from 'react'
import '../app/login/login.css'
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
// import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Signin() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // const session = useSession()
  const router = useRouter()
  //console.log(session)
  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    // handle sign in logic here
    // try {
    //   const response = await signIn('credentials', { email, password, redirect: false})
    //   //console.log(response)
    //   setEmail('')
    //   setPassword('')
    //   router.push('/')
    // } catch (error) {
    //   console.log(error)
    // }
  }

  // onClick={() => signIn('google', {callbackUrl: '/'})}
  // onClick={() => signIn('github', {callbackUrl: '/'})}

  return (
    <div className="form-container sign-in">
      <form onSubmit={signinHandler} className=''>
        <h1>Sign In</h1>
        <div className="social-icons">
          <a href="#"   className="icon"><FaGoogle /></a>
          <a href="#" className="icon"><FaFacebook /></a>
          <a href="#"   className="icon"><FaGithub /></a>
          <a href="#" className="icon"><FaLinkedin /></a>
        </div>
        <span>or use your email password</span>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#">Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default Signin