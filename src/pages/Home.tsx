import { Link } from 'react-router'
import { ArrowRight, Zap, Eye, Rocket, Code2, Lock, MessageSquare, Share2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-green">Solana</span> dApps.
              <br />
              Just describe it.
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl">
              Visual workflow builder + AI code generation + live preview + one-click deployment. Production-ready Python code in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={isAuthenticated ? '/build' : '/login'}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Designing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/showcase" className="btn-secondary inline-flex items-center justify-center gap-2">
                See Projects <Eye className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-teal">4</p>
                <p className="text-xs text-muted">Steps to Deploy</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green">20+</p>
                <p className="text-xs text-muted">Solana Tools</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-teal">0s</p>
                <p className="text-xs text-muted">Wait Time</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green">100%</p>
                <p className="text-xs text-muted">Open Code</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="card p-8 animate-float">
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-teal/50 to-green/50 rounded-lg"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 sm:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <p className="section-label">HOW IT WORKS</p>
            <h2 className="text-4xl sm:text-5xl font-black">Design. Build. Preview. Ship.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                number: '01',
                title: 'Design Visually',
                description: 'Drag nodes on a Figma-style canvas. Connect wallet, NFT engines, DEX swaps, price oracles. No code required.',
                icon: Code2,
              },
              {
                number: '02',
                title: 'Code Generates',
                description: 'AI understands your flow. Outputs production-grade Python with error handling, security checks, and Solana best practices.',
                icon: Zap,
              },
              {
                number: '03',
                title: 'Live Preview',
                description: 'See your dApp come alive instantly. Interactive preview shows wallet balances, NFT grids, swap UI, DAO proposals.',
                icon: Eye,
              },
              {
                number: '04',
                title: 'Ship & Share',
                description: 'Deploy with one click. Get a shareable URL. Push updates on-the-fly. Version history tracks all changes.',
                icon: Rocket,
              },
            ].map((item, i) => (
              <div key={i} className="card p-8 space-y-4 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-4xl font-black text-teal/30 mb-2">{item.number}</p>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <item.icon className="w-6 h-6 text-teal flex-shrink-0" />
                </div>
                <p className="text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <p className="section-label">FEATURES</p>
            <h2 className="text-4xl sm:text-5xl font-black">Powerful Tools for Builders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AI Builder', description: 'Describe what you want. Get code instantly.' },
              { title: 'Live Preview', description: 'See changes in real-time with interactive UI.' },
              { title: 'Security Scan', description: 'Built-in security analysis and best practices.' },
              { title: 'Code Assistant', description: 'Chat-based code editing and improvements.' },
              { title: 'Push Updates', description: 'Version control and deployment history.' },
              { title: 'Shareable URLs', description: 'Public project showcase and collaboration.' },
            ].map((feature, i) => (
              <div key={i} className="card p-6 space-y-3 hover:shadow-teal/20 hover:shadow-xl transition-all">
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <p className="section-label">PRICING</p>
            <h2 className="text-4xl sm:text-5xl font-black">Simple, Transparent Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { tier: 'Free', price: '$0', features: ['5 Projects', 'Public Deploy', 'Community Support'] },
              { tier: 'Pro', price: '$29', features: ['Unlimited Projects', 'Private Deploy', 'Email Support', 'Advanced Analytics'], highlight: true },
              { tier: 'Enterprise', price: '$199', features: ['Everything in Pro', 'Dedicated Support', 'Custom Integrations', 'SLA'] },
            ].map((plan, i) => (
              <div key={i} className={`card p-8 space-y-6 flex flex-col ${plan.highlight ? 'ring-2 ring-teal' : ''}`}>
                <div>
                  <p className="text-4xl font-black">{plan.price}</p>
                  <p className="text-lg font-semibold mt-2">{plan.tier}</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-muted flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-teal rounded-full"></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-dark">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black">Ready to build?</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Join developers shipping Solana dApps 10x faster with StackIt.
          </p>
          <Link to={isAuthenticated ? '/build' : '/login'} className="btn-primary inline-flex items-center gap-2">
            Start Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
