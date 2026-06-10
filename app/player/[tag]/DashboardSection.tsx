'use client'
import { useState } from 'react'
import SubscribeButton from '@/components/SubscribeButton'
import DeckBreakdown from '@/components/DeckBreakdown'
import LossPatterns from '@/components/LossPatterns'
import CardLevels from '@/components/CardLevels'
import type { CRPlayer, BattleLogEntry } from '@/lib/clash-royale'
import type { DeckWinRate, LossPattern, CardLevel } from '@/lib/stats'

interface DashboardData {
  tier: 'pro' | 'elite'
  deckWinRates: DeckWinRate[]
  lossPatterns: LossPattern[]
  cardLevels: CardLevel[]
}

export default function DashboardSection({
  player,
  battles,
  tag,
}: {
  player: CRPlayer
  battles: BattleLogEntry[]
  tag: string
}) {
  const [email, setEmail] = useState('')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUnlock() {
    if (!email) return setError('Please enter your email')
    setLoading(true)
    setError(null)
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, battles, email }),
    })
    if (res.status === 403) {
      setError('subscription_required')
      setLoading(false)
      return
    }
    setData(await res.json())
    setLoading(false)
  }

  if (data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Your Dashboard</span>
          {data.tier === 'elite' && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Elite</span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DeckBreakdown decks={data.deckWinRates} />
          <LossPatterns patterns={data.lossPatterns} />
          <CardLevels cards={data.cardLevels} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-5 border border-gray-100">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Unlock Your Full Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">
          Based on your last {battles.length} battles — win rate by deck, what&apos;s beating you, and which cards are underleveled.
        </p>
      </div>

      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => { setEmail(e.target.value); setError(null) }}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error === 'subscription_required' ? (
        <div className="space-y-4">
          <p className="text-sm text-orange-600">No active subscription found for this email.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SubscribeButton
              playerTag={tag}
              tier="pro"
              label="Pro — $4.99/month"
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
            />
            <SubscribeButton
              playerTag={tag}
              tier="elite"
              label="Elite — $19.99/month"
              className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm"
            />
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong>Pro:</strong> Full dashboard — deck win rates, loss patterns, card levels</p>
            <p><strong>Elite:</strong> Pro + personal gameplay video review by a real player</p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading your stats...' : 'View My Dashboard'}
        </button>
      )}

      {error && error !== 'subscription_required' && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
