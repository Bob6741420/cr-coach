'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function TagInput() {
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const clean = tag.trim().replace(/^#/, '')
    if (!clean) return
    setLoading(true)
    router.push(`/player/${clean}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
      <input
        value={tag}
        onChange={e => setTag(e.target.value)}
        placeholder="#ABC123"
        className="flex-1 px-4 py-3 rounded-xl font-mono text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-60"
        style={{ background: 'var(--blue)' }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.15)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
      >
        {loading ? '...' : 'Analyze'}
      </button>
    </form>
  )
}
