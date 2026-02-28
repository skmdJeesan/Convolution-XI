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
  eventsRegistered?:string[]
}

// for notifications
export interface NotificationType {
  _id: string;
  email: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface userContextType {
  user: userType | undefined
  setUser: (user: userType) => void
  loading: boolean
  notifications: NotificationType[]
  setNotifications: (n: NotificationType[]) => void
}

export const userData = React.createContext<userContextType | undefined>(undefined)

function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType>()
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    // Don't fetch if session is still loading
    if (status === 'loading') return

    // If no session, user is not authenticated
    if (status === 'unauthenticated') {
      setUser(undefined)
      setNotifications([]) // Clear notifications on logout
      setLoading(false)
      sessionStorage.removeItem("hasSeenWelcomeNotifs"); //remove all cache notifications if logged out
      return
    }

    // Fetch user data when session is ready
    const getUser = async () => {
      try {
        setLoading(true)
        
        const [userResult, notifResult] = await Promise.all([
          axios.get('/api/user'),
          axios.get('/api/notifications').catch((err) => {
            // console.error('Notifications fetch failed:', err.response?.data || err.message);
            return { data: [] }; 
          })
        ]);
        
        setUser(userResult.data)
        setNotifications(notifResult.data)
        
      } catch (error: any) {
        // console.error('Error fetching user:', error.response?.data || error.message)
        setUser(undefined)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [status, session])

  const data = { user, setUser, loading, notifications, setNotifications }

  return (
    <userData.Provider value={data}>
      {children}
    </userData.Provider>
  )
}

export default UserContext