import { getLocalStorageUserAuth } from '@utils/auth'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// Define types for tokens and Auth context state
/**
 * @typedef Tokens
 * @property {string} accessToken - The access token for authentication
 * @property {string} refreshToken - The refresh token for renewing access
 * @property {number} expiresAt - The expiration time of the access token (in milliseconds since the epoch)
 */
interface Tokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}
/**
 * @typedef AuthContextType
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {(username: string, password: string) => Promise<boolean>} login - Login function
 * @property {() => void} logout - Logout function
 * @property {Tokens | null} tokens - Authentication tokens (accessToken, refreshToken)
 */
interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  tokens: Tokens | null
}

interface AuthProviderProps {
  children: ReactNode
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType | null>(null)

// The AuthProvider component, typed with children prop
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const navigate = useNavigate()

  // Load tokens from localStorage on mount
  useEffect(() => {
    const tokens = getLocalStorageUserAuth()
    if (tokens) {
      setTokens(tokens)
      setIsAuthenticated(true)
    }
  }, [])

  // Login function with async/await
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) throw new Error('Login failed')

      const data: Tokens = await response.json() // Assuming data contains tokens
      setTokens(data)
      setIsAuthenticated(true)
      localStorage.setItem('auth_tokens', JSON.stringify(data))
      navigate('/meeting')
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setTokens(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth_tokens')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, tokens }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuth hook with proper typing
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
