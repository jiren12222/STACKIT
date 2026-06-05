import { Link } from 'react-router'
import { Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-teal to-green rounded transform -rotate-45"></div>
              <span className="font-bold text-lg">StackIt</span>
            </div>
            <p className="text-white/60 text-sm">Build Solana dApps. Just describe it.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-teal">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-teal transition-colors">Home</Link></li>
              <li><Link to="/showcase" className="hover:text-teal transition-colors">Showcase</Link></li>
              <li><Link to="/manual" className="hover:text-teal transition-colors">Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-teal">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-teal transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-teal">Connect</h4>
            <div className="flex gap-4">
              <a href="https://x.com/0xGozie" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Twitter className="w-5 h-5 text-white/60 hover:text-teal" />
              </a>
              <a href="https://github.com/jiren12222" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Github className="w-5 h-5 text-white/60 hover:text-teal" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8">
          <p className="text-center text-sm text-white/40">© 2024 StackIt. Built with ❤️ for Solana developers.</p>
        </div>
      </div>
    </footer>
  )
}
