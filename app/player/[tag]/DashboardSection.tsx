'use client'
import { useState } from 'react'
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

type Step = 'email' | 'otp' | 'subscribe' | 'done'

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
  const [code, setCode] = useState('')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendCode() {
    if (!email) return setError('Please enter your email')
    setLoading(true)
    setError(null)
    const supabase = getBrowserSupabase()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    setLoading(false)
    if (err) return setError(err.message)
    setStep('otp')
  }

  async function verifyCode() {
    if (!code) return setError('Please enter the code')
    setLoading(true)
    setError(null)
    const supabase = getBrowserSupabase()
    const { data: authData, error: err } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })
    if (err || !authData.session) {
      setLoading(false)
      return setError('Wrong code — check your email and try again')
    }
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, battles, accessToken: authData.session.access_token }),
    })
    setLoading(false)
    if (res.status === 403) return setStep('subscribe')
    if (!res.ok) return setError('Something went wrong')
    setData(await res.json())
    setStep('done')
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

  return (
    <div className="space-y-4">
      <DashboardPreview player={player} battles={battles} />
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-5 border border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Unlock Your Full Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">
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
              onKeyDown={e => e.key === 'Enter' && sendCode()}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendCode}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to <strong>{email}</strong>. Check your inbox.
            </p>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError(null) }}
              onKeyDown={e => e.key === 'Enter' && verifyCode()}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center text-lg font-mono"
            />
            <button
              onClick={verifyCode}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button
              onClick={() => { setStep('email'); setCode(''); setError(null) }}
              className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              Use a different email
            </button>
          </>
        )}

        {step === 'subscribe' && (
          <div className="space-y-4">
            <p className="text-sm text-orange-600">No active subscription found for <strong>{email}</strong>.</p>
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
        )}

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}
