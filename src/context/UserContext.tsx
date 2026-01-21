'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface userContextType {
  user: userType | undefined, setUser: (user: userType) => void
}

interface userType {
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  image?: string;
}

export const userData = React.createContext<userContextType | undefined>(undefined)

function UserContext({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<userType>()
  const data = {user, setUser}
  
  const session = useSession()
  useEffect(() => {
    const getUser =  async () => { 
      try {
        const result = await axios.get('/api/user')
        setUser(result.data)
      } catch (error) { console.log(error) }
    }
    getUser()
  }, [session])
  return (
    <userData.Provider value={data}>{children}</userData.Provider>
  )
}

export default UserContext