import type React from 'react'
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, redirect } from 'react-router-dom'

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  checkUserInfo: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const pathname = useLocation().pathname
  const navigate = useNavigate()

  const loginPage = `${import.meta.env.VITE_API_URL}/login`

  useEffect(() => {
    checkUserInfo()
  }, [])

  const checkUserInfo = async (): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userinfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.status === 401 || !response.ok) {
        throw new Error('Unauthorized access or invalid response')
      }

      const userData: User = await response.json()
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error fetching user info:', error)
      removeSession()
      // navigate(loginPage)
      window.location.replace(loginPage)
    }
  }

  const removeSession = () => {
    setUser(null)
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setIsAuthenticated(false)
  }

  const logout = () => {
    removeSession()
    window.location.replace(`${import.meta.env.VITE_API_URL}/prepare-logout`)
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated && pathname !== loginPage) {
        await checkUserInfo()
        if (!isAuthenticated) {
          redirect(loginPage)
        }
      }
    }

    checkAuthentication()
  }, [isAuthenticated, pathname])

  return (
    <AuthContext.Provider value={{ user, checkUserInfo, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
