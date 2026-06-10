'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function TagInput() {
  const [tag, setTag] = useState('')
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const clean = tag.trim().replace(/^#/, '')
    if (clean) router.push(`/player/${clean}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={tag}
        onChange={e => setTag(e.target.value)}
        placeholder="#ABC123"
        className="border-2 border-white/30 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 text-lg w-56 font-mono focus:outline-none focus:border-white/60"
      />
      <button
        type="submit"
        className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
      >
        Analyze
      </button>
    </form>
  )
}
