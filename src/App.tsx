import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { AuthProvider, useAuth } from './hooks/useAuth'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import FlowPage from './pages/FlowPage'
import BuildPage from './pages/BuildPage'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import Showcase from './pages/Showcase'
import ProjectView from './pages/ProjectView'
import ProjectSettings from './pages/ProjectSettings'
import ManualPage from './pages/ManualPage'
import NotFound from './pages/NotFound'

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 w-32 bg-teal/30 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark text-light">
      <Navigation />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/project/:slug" element={<ProjectView />} />
          <Route path="/manual" element={<ManualPage />} />

          {/* Protected Routes */}
          <Route path="/flow" element={isAuthenticated ? <FlowPage /> : <Navigate to="/login" />} />
          <Route path="/build" element={isAuthenticated ? <BuildPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/project/:slug/detail" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
          <Route path="/project/:slug/settings" element={isAuthenticated ? <ProjectSettings /> : <Navigate to="/login" />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App