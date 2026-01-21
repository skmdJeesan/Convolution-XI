'use client'
import { SessionProvider } from 'next-auth/react'
import UserContext from '@/context/UserContext'
import React from 'react'

function ClientProvider({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <UserContext>{children}</UserContext>
    </SessionProvider>
  )
}

export default ClientProvider