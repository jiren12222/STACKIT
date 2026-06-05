import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('stackit_user')
    const token = localStorage.getItem('stackit_token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Demo implementation
    const demoUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    }
    localStorage.setItem('stackit_user', JSON.stringify(demoUser))
    localStorage.setItem('stackit_token', 'demo-token-' + Date.now())
    setUser(demoUser)
  }

  const register = async (name: string, email: string, password: string) => {
    // Demo implementation
    const demoUser: User = {
      id: '1',
      email,
      name,
    }
    localStorage.setItem('stackit_user', JSON.stringify(demoUser))
    localStorage.setItem('stackit_token', 'demo-token-' + Date.now())
    setUser(demoUser)
  }

  const logout = () => {
    localStorage.removeItem('stackit_user')
    localStorage.removeItem('stackit_token')
    setUser(null)
    window.location.hash = '#/'
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
