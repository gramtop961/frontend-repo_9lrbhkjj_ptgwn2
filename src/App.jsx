import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [backendMessage, setBackendMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBackend = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${API_BASE}/api/hello`)
      const data = await res.json()
      setBackendMessage(data.message || 'Hello from backend!')
    } catch (e) {
      setError('Could not reach the backend API')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBackend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-red-600">Hello, World! 👋</h1>
        <p className="mt-3 text-red-600">A super simple app with a tiny API.</p>

        <div className="mt-8 space-y-2">
          <p className="text-sm uppercase tracking-wider text-slate-500">Backend says</p>
          <div className="min-h-[48px] flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-red-600 px-4 py-3">
            {loading ? 'Loading…' : error ? error : backendMessage}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={fetchBackend}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition"
          >
            Refresh Message
          </button>
          <a
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            href={`${API_BASE || ''}/api/hello`} target="_blank" rel="noreferrer"
          >
            Open API
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
