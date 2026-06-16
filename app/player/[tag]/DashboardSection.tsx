'use client'
import { useState, useEffect } from 'react'
import { getBrowserSupabase } from '@/lib/supabase-browser'
import SubscribeButton from '@/components/SubscribeButton'
import DashboardPreview from '@/components/DashboardPreview'
import DeckBreakdown from '@/components/DeckBreakdown'
import LossPatterns from '@/components/LossPatterns'
import CardLevels from '@/components/CardLevels'
import Insights from '@/components/Insights'
import type { CRPlayer, BattleLogEntry } from '@/lib/clash-royale'
import type { DeckWinRate, LossPattern, CardLevel } from '@/lib/stats'
import type { Insight } from '@/lib/insights'

interface DashboardData {
  tier: 'pro' | 'elite'
  deckWinRates: DeckWinRate[]
  lossPatterns: LossPattern[]
  cardLevels: CardLevel[]
  insights: Insight[]
}

type Step = 'email' | 'sent' | 'subscribe' | 'done'

export default function DashboardSection({
  player,
  battles,
  tag,
}: {
  player: CRPlayer
  battles: BattleLogEntry[]
  tag: string
}) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchDashboard(accessToken: string) {
    setLoading(true)
    setError(null)
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, battles, accessToken }),
    })
    setLoading(false)
    if (res.status === 403) return setStep('subscribe')
    if (!res.ok) return setError('Something went wrong')
    setData(await res.json())
    setStep('done')
  }

  useEffect(() => {
    const supabase = getBrowserSupabase()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchDashboard(session.access_token)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) fetchDashboard(session.access_token)
    })

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function sendLink() {
    if (!email) return setError('Please enter your email')
    setLoading(true)
    setError(null)
    const supabase = getBrowserSupabase()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.href,
      },
    })
    setLoading(false)
    if (err) return setError(err.message)
    setStep('sent')
  }

  if (step === 'done' && data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Your Dashboard</span>
          {data.tier === 'elite' && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Elite</span>
          )}
        </div>
        <Insights insights={data.insights} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DeckBreakdown decks={data.deckWinRates} />
          <LossPatterns patterns={data.lossPatterns} />
          <CardLevels cards={data.cardLevels} />
        </div>
      </div>
    )
  }

  if (loading && step !== 'email') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-center h-32">
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DashboardPreview player={player} battles={battles} />
      <div className="card p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white">Unlock Your Full Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">
            Based on your last {battles.length} battles — win rate by deck, what&apos;s beating you, and which cards are underleveled.
          </p>
        </div>

        {step === 'email' && (
          <>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(null) }}
              onKeyDown={e => e.key === 'Enter' && sendLink()}
              className="w-full px-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-lg focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
            <button
              onClick={sendLink}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-50 transition-all"
              style={{ background: 'var(--blue)' }}
            >
              {loading ? 'Sending...' : 'Send Sign-In Link'}
            </button>
          </>
        )}

        {step === 'sent' && (
          <div className="text-center space-y-3 py-4">
            <p className="text-2xl">📬</p>
            <p className="text-sm font-semibold text-white">Check your email</p>
            <p className="text-sm text-slate-400">
              We sent a sign-in link to <strong className="text-slate-300">{email}</strong>. Click it and you&apos;ll be brought right back here.
            </p>
            <button
              onClick={() => { setStep('email'); setError(null) }}
              className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
            >
              Use a different email
            </button>
          </div>
        )}

        {step === 'subscribe' && (
          <div className="space-y-4">
            <p className="text-sm text-orange-400">No active subscription found for <strong>{email}</strong>.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SubscribeButton
                playerTag={tag}
                tier="pro"
                label="Pro — $4.99/month"
                className="flex-1 text-white px-4 py-3 rounded-xl font-bold disabled:opacity-50 transition-all text-sm"
                style={{ background: 'var(--blue)' }}
              />
              <SubscribeButton
                playerTag={tag}
                tier="elite"
                label="Elite — $19.99/month"
                className="flex-1 text-white px-4 py-3 rounded-xl font-bold disabled:opacity-50 transition-all text-sm"
                style={{ background: 'rgba(139,92,246,0.8)' }}
              />
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p><strong className="text-slate-400">Pro:</strong> Full dashboard — deck win rates, loss patterns, card levels</p>
              <p><strong className="text-slate-400">Elite:</strong> Pro + personal gameplay video review by a real player</p>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}
