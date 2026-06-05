import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 h-16 bg-dark/80 blur-backdrop border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-teal to-green rounded transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"></div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline">StackIt</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/flow" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">Design</Link>
              <Link to="/build" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">Build</Link>
            </>
          )}
          <Link to="/showcase" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">Showcase</Link>
          <Link to="/manual" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">Tools</Link>
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-white/70 hover:text-teal transition-colors">
                {user?.name || 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn-secondary text-xs">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-sm">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-dark/95 blur-backdrop border-b border-white/5 p-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/flow" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
                Design
              </Link>
              <Link to="/build" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
                Build
              </Link>
            </>
          )}
          <Link to="/showcase" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
            Showcase
          </Link>
          <Link to="/manual" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
            Tools
          </Link>
          <div className="pt-2 border-t border-white/10 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-sm font-medium text-white/70 hover:text-teal py-2" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full btn-secondary text-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block btn-primary w-full text-center text-sm" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
