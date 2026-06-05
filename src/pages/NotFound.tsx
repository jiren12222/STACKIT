export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal to-green">
          404
        </div>
        <h1 className="text-4xl font-black">Page not found</h1>
        <p className="text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <a href="#/" className="btn-primary inline-block">
          Back to Home
        </a>
      </div>
    </div>
  )
}
