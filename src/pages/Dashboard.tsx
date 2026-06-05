import { useState } from 'react'
import { Trash2, Plus, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

interface Project {
  id: string
  name: string
  slug: string
  description: string
  tools: string[]
  network: string
  securityScore: number
  createdAt: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('stackit_projects')
    return stored ? JSON.parse(stored) : []
  })

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    localStorage.setItem('stackit_projects', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Welcome back, {user?.name}</h1>
              <p className="text-muted mt-2">Manage and build your Solana projects</p>
            </div>
            <Link to="/build" className="btn-primary inline-flex items-center gap-2 w-fit">
              <Plus className="w-4 h-4" /> New Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 space-y-2">
              <p className="text-sm text-muted">Total Projects</p>
              <p className="text-3xl font-bold text-teal">{projects.length}</p>
            </div>
            <div className="card p-6 space-y-2">
              <p className="text-sm text-muted">Avg Security Score</p>
              <p className="text-3xl font-bold text-green">
                {projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.securityScore, 0) / projects.length) : 0}
              </p>
            </div>
            <div className="card p-6 space-y-2">
              <p className="text-sm text-muted">Tools Used</p>
              <p className="text-3xl font-bold text-teal">
                {new Set(projects.flatMap(p => p.tools)).size}
              </p>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Projects</h2>
            {projects.length === 0 ? (
              <div className="card p-12 text-center space-y-4">
                <Sparkles className="w-12 h-12 text-muted mx-auto opacity-50" />
                <p className="text-muted">No projects yet. Create your first Solana dApp!</p>
                <Link to="/build" className="btn-primary inline-flex">
                  Create Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Link to={`/project/${project.slug}/detail`} className="text-xl font-bold hover:text-teal transition-colors">
                        {project.name}
                      </Link>
                      <p className="text-sm text-muted">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tools.map((tool) => (
                          <span key={tool} className="text-xs bg-white/10 px-2 py-1 rounded text-teal">
                            {tool}
                          </span>
                        ))}
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-muted">{project.network}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted">Security Score</p>
                        <p className="text-xl font-bold text-teal">{project.securityScore}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/project/${project.slug}/detail`} className="btn-secondary text-xs px-3 py-1">
                          View
                        </Link>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="btn-ghost text-xs px-3 py-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
