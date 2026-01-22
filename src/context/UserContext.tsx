'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface userType {
  _id?: string
  name: string
  email: string
  phone: string
  institution: string
  department: string
  year: string
  image?: string
}

interface userContextType {
  user: userType | undefined
  setUser: (user: userType) => void
  loading: boolean
}

export const userData = React.createContext<userContextType | undefined>(undefined)

function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType>()
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    // Don't fetch if session is still loading
    if (status === 'loading') return

    // If no session, user is not authenticated
    if (status === 'unauthenticated') {
      setUser(undefined)
      setLoading(false)
      return
    }

    // Fetch user data when session is ready
    const getUser = async () => {
      try {
        setLoading(true)
        const result = await axios.get('/api/user')
        setUser(result.data)
      } catch (error: any) {
        console.error('Error fetching user:', error.response?.data || error.message)
        setUser(undefined)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [status, session])

  const data = { user, setUser, loading }

  return (
    <userData.Provider value={data}>
      {children}
    </userData.Provider>
  )
}

export default UserContext