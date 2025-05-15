// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { api, setAuthToken } from '../utils/api'

// Define the user shape
type UserType = {
  id: number
  email: string
  roleId: number
  firstName: string
  lastName: string
}

// Define context type
type AuthContextType = {
  user: UserType | null
  setUser: (user: UserType | null) => void
  loading: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)
// Exported AuthProvider component that wraps the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    setAuthToken(token)

    api
      .get('/users/me')
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
