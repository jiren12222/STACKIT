import { useState } from 'react'
import { ArrowLeft, Copy, Save, MessageCircle, Code2, Eye } from 'lucide-react'
import { Link, useParams } from 'react-router'

interface ProjectData {
  id: string
  name: string
  slug: string
  description: string
  code: string
  tools: string[]
  network: string
  securityScore: number
  features: string[]
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'assistant' | 'push'>('preview')
  
  const [project, setProject] = useState<ProjectData>({
    id: '1',
    name: 'NFT Marketplace',
    slug: slug || 'nft-marketplace',
    description: 'Complete NFT marketplace with Metaplex integration',
    code: `
# NFT Marketplace Project
import asyncio
from solders.pubkey import Pubkey
from solana.rpc.async_client import AsyncClient

class NFTMarketplace:
    def __init__(self):
        self.client = AsyncClient("https://api.devnet.solana.com")
    
    async def list_nft(self, nft_mint: str, price: float):
        """List NFT for sale"""
        try:
            result = await self.client.get_account_info(Pubkey.from_string(nft_mint))
            return {"status": "success", "listing": nft_mint}
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    async def buy_nft(self, nft_mint: str, buyer: str):
        """Purchase NFT"""
        return {"status": "success", "buyer": buyer}

marketplace = NFTMarketplace()
    `.trim(),
    tools: ['metaplex', 'phantom', 'helius'],
    network: 'devnet',
    securityScore: 85,
    features: ['List NFTs', 'Buy NFTs', 'Wallet Integration']
  })

  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'How can I help you improve your project?' }
  ])
  const [chatInput, setChatInput] = useState('')

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    setChatMessages([
      ...chatMessages,
      { role: 'user', content: chatInput }
    ])
    
    // Simulate assistant response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `I can help you with: "${chatInput}". Let me modify your code...`
      }])
    }, 500)
    
    setChatInput('')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(project.code)
  }

  const saveCode = () => {
    const projects = JSON.parse(localStorage.getItem('stackit_projects') || '[]')
    const updated = projects.map((p: ProjectData) => p.id === project.id ? project : p)
    localStorage.setItem('stackit_projects', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="btn-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-black">{project.name}</h1>
            <p className="text-muted mt-1">{project.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          {(['preview', 'code', 'assistant', 'push'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-semibold capitalize transition-colors ${
                activeTab === tab ? 'text-teal border-b-2 border-teal' : 'text-muted hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'preview' && (
            <div className="card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-muted mb-1">Security Score</p>
                  <p className="text-3xl font-bold text-teal">{project.securityScore}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-muted mb-1">Network</p>
                  <p className="text-lg font-bold text-green capitalize">{project.network}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-muted mb-1">Tools</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-xs bg-teal/20 text-teal px-2 py-1 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <iframe
                srcDoc={`
                  <html>
                    <head>
                      <style>
                        body { background: #0B0F1A; color: #F5F5F0; font-family: system-ui; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; }
                        h1 { color: #00D4AA; }
                        button { background: #00D4AA; color: #0B0F1A; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
                        button:hover { background: #14F195; }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h1>${project.name}</h1>
                        <p>${project.description}</p>
                        <button>Connect Wallet</button>
                      </div>
                    </body>
                  </html>
                `}
                className="w-full h-96 rounded-lg border border-white/10"
              />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="card p-8 space-y-4">
              <div className="flex gap-2">
                <button onClick={copyCode} className="btn-secondary text-sm flex items-center gap-2">
                  <Copy className="w-4 h-4" /> Copy
                </button>
                <button onClick={saveCode} className="btn-secondary text-sm flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
              <pre className="bg-gray-950 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                {project.code}
              </pre>
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="card p-8 space-y-4 flex flex-col h-96">
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-teal/20 text-teal'
                        : 'bg-white/10 text-white'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me to add methods, fix config, or explain code..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <button onClick={handleSendMessage} className="btn-primary">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'push' && (
            <div className="card p-8 space-y-4">
              <textarea
                placeholder="Describe your changes..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal h-24"
              />
              <button className="btn-primary">Push Update</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
