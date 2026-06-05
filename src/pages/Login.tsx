import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        await register(formData.name, formData.email, formData.password)
      } else {
        await login(formData.email, formData.password)
      }
      navigate('/dashboard')
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black">StackIt</h1>
          <p className="text-muted">{isSignUp ? 'Create an account' : 'Welcome back'}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-muted hover:text-teal transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <p className="text-xs text-muted text-center">
          Demo mode: Use any email/password to continue
        </p>
      </div>
    </div>
  )
}
