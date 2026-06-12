'use client'
import { useState } from 'react'

export default function ShareButton({ tag }: { tag: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const clean = tag.replace('#', '')
    await navigator.clipboard.writeText(`${window.location.origin}/player/${clean}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
    >
      {copied ? '✓ Copied!' : '🔗 Share'}
    </button>
  )
}
