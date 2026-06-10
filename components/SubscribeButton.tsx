'use client'
import { useState } from 'react'

interface Props {
  playerTag: string
  tier: 'pro' | 'elite'
  label: string
  className?: string
}

export default function SubscribeButton({ playerTag, tier, label, className }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerTag, tier }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className ?? 'bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors'}
    >
      {loading ? 'Loading...' : label}
    </button>
  )
}
