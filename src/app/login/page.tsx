"use client"
import React, { useState } from 'react'
import './login.css'

import Signin from '@/components/Signin'
import Toggle from '@/components/Toggle'
import Signup from '@/components/Signup'

function Page() {
  const [active, setActive] = useState<boolean>(false)
  return (
    <div className={`container ${active ? 'active' : ''}`} id="container">
      <Signup />
      <Signin />
      <Toggle active={active} setActive={setActive} />
    </div>
  )
}

export default Page