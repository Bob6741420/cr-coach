'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SubmitPage() {
  const [email, setEmail] = useState('')
  const [playerTag, setPlayerTag] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return setError('Please select a video file')
    if (file.size > 200 * 1024 * 1024) return setError('Video must be under 200MB')
    setLoading(true)
    setError(null)
    const form = new FormData()
    form.append('email', email)
    form.append('playerTag', playerTag)
    form.append('playerName', playerName)
    form.append('video', file)
    const res = await fetch('/api/submit', { method: 'POST', body: form })
    if (res.status === 403) {
      setError('This email does not have an Elite subscription.')
      setLoading(false)
      return
    }
    if (!res.ok) {
      setError('Something went wrong. Try again.')
      setLoading(false)
      return
    }
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-black text-gray-900">Video Submitted!</h1>
          <p className="text-gray-500">Your gameplay will be reviewed within 48 hours. You'll receive an email with timestamped feedback when it's ready.</p>
          <Link href="/" className="block text-blue-600 underline text-sm">← Back to home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Submit Gameplay for Review</h1>
          <p className="text-gray-500 text-sm mt-1">Elite subscribers only. You'll get personal timestamped feedback within 48 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Your Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Your In-Game Name</label>
            <input
              type="text" required value={playerName} onChange={e => setPlayerName(e.target.value)}
              placeholder="Waffles"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Your Player Tag</label>
            <input
              type="text" required value={playerTag} onChange={e => setPlayerTag(e.target.value)}
              placeholder="#ABC123"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Gameplay Video</label>
            <input
              type="file" required accept="video/*"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-400 mt-1">Max 200MB. Screen recording of a full match works best.</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Uploading...' : 'Submit for Review'}
          </button>
        </form>
      </div>
    </main>
  )
}
