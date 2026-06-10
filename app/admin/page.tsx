'use client'
import { useState, useEffect, useRef } from 'react'

interface Submission {
  id: string
  email: string
  player_tag: string
  player_name: string
  video_url: string
  status: string
  created_at: string
}

interface Comment {
  id: string
  timestamp_seconds: number
  comment: string
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selected, setSelected] = useState<Submission | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [timestamp, setTimestamp] = useState(0)
  const [saving, setSaving] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`/api/admin/submissions?email=${encodeURIComponent(email)}`)
    if (res.status === 401) { alert('Not authorized.'); return }
    const data = await res.json()
    setSubmissions(data.submissions)
    setAuthed(true)
  }

  async function selectSubmission(sub: Submission) {
    setSelected(sub)
    const res = await fetch(`/api/admin/comments?email=${encodeURIComponent(email)}&submissionId=${sub.id}`)
    const data = await res.json()
    setComments(data.comments)
  }

  function captureTimestamp() {
    if (videoRef.current) setTimestamp(Math.floor(videoRef.current.currentTime))
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim() || !selected) return
    setSaving(true)
    await fetch('/api/admin/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, submissionId: selected.id, timestampSeconds: timestamp, comment: newComment }),
    })
    setComments(prev => [...prev, { id: Date.now().toString(), timestamp_seconds: timestamp, comment: newComment }])
    setNewComment('')
    setSaving(false)
  }

  async function markDone() {
    if (!selected) return
    await fetch('/api/admin/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, submissionId: selected.id, markDone: true }),
    })
    setSubmissions(prev => prev.map(s => s.id === selected.id ? { ...s, status: 'reviewed' } : s))
    setSelected(prev => prev ? { ...prev, status: 'reviewed' } : null)
    alert('Marked as reviewed! The player will be notified.')
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <form onSubmit={login} className="bg-gray-800 rounded-2xl p-8 space-y-4 w-full max-w-sm">
          <h1 className="text-xl font-black text-white">Admin Access</h1>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700">
            Enter
          </button>
        </form>
      </main>
    )
  }

  if (selected) {
    return (
      <main className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-sm">← Back</button>
              <h1 className="text-xl font-black text-white mt-1">{selected.player_name} · {selected.player_tag}</h1>
              <p className="text-gray-400 text-sm">{selected.email}</p>
            </div>
            {selected.status !== 'reviewed' && (
              <button onClick={markDone} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-500 text-sm">
                Mark as Done
              </button>
            )}
            {selected.status === 'reviewed' && (
              <span className="bg-green-900 text-green-300 px-4 py-2 rounded-xl text-sm font-semibold">Reviewed</span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Video */}
            <div className="space-y-3">
              <video
                ref={videoRef} src={selected.video_url} controls
                className="w-full rounded-xl bg-black"
              />
              <button
                onClick={captureTimestamp}
                className="w-full bg-gray-700 text-white py-2 rounded-lg text-sm hover:bg-gray-600"
              >
                📍 Capture current timestamp ({formatTime(timestamp)})
              </button>
            </div>

            {/* Comments */}
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-xl p-4 space-y-3 max-h-80 overflow-y-auto">
                {comments.length === 0 && <p className="text-gray-500 text-sm">No comments yet.</p>}
                {comments.map(c => (
                  <div key={c.id} className="space-y-0.5">
                    <span className="text-purple-400 text-xs font-mono">{formatTime(c.timestamp_seconds)}</span>
                    <p className="text-white text-sm">{c.comment}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={addComment} className="space-y-2">
                <p className="text-gray-400 text-xs">Commenting at <span className="text-purple-400 font-mono">{formatTime(timestamp)}</span> — pause video and click capture to change</p>
                <textarea
                  value={newComment} onChange={e => setNewComment(e.target.value)}
                  placeholder="e.g. At this moment you should wait for the counter-push instead of pushing"
                  rows={3}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <button
                  type="submit" disabled={saving}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 text-sm"
                >
                  {saving ? 'Saving...' : 'Add Comment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-black text-white">Video Submissions</h1>
        {submissions.length === 0 && <p className="text-gray-500">No submissions yet.</p>}
        {submissions.map(sub => (
          <button
            key={sub.id} onClick={() => selectSubmission(sub)}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-left flex items-center justify-between transition-colors"
          >
            <div>
              <p className="text-white font-bold">{sub.player_name} <span className="text-gray-400 font-normal text-sm">· {sub.player_tag}</span></p>
              <p className="text-gray-400 text-sm">{sub.email}</p>
              <p className="text-gray-500 text-xs mt-1">{new Date(sub.created_at).toLocaleDateString()}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${sub.status === 'reviewed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
              {sub.status === 'reviewed' ? 'Reviewed' : 'Pending'}
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}
