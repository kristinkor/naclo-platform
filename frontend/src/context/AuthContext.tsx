// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

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
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Exported AuthProvider component that wraps the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export custom hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
