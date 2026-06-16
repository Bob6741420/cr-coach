import type { Metadata } from 'next'
import { fetchPlayer, fetchBattleLog } from '@/lib/clash-royale'
import { computeStreak } from '@/lib/stats'
import PlayerStats from '@/components/PlayerStats'
import CurrentDeck from '@/components/CurrentDeck'
import RecentBattles from '@/components/RecentBattles'
import TrophyChart from '@/components/TrophyChart'
import ShareButton from '@/components/ShareButton'
import DashboardSection from './DashboardSection'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  try {
    const player = await fetchPlayer(tag)
    const winRate = Math.round((player.wins / Math.max(player.battleCount, 1)) * 100)
    const title = `${player.name} — CR Coach`
    const description = `${player.trophies.toLocaleString()} trophies · ${winRate}% win rate · See what's beating ${player.name} and how to improve.`
    return {
      title,
      description,
      openGraph: { title, description },
      twitter: { card: 'summary', title, description },
    }
  } catch {
    return { title: 'Player — CR Coach' }
  }
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params

  let player, battles
  try {
    ;[player, battles] = await Promise.all([
      fetchPlayer(tag),
      fetchBattleLog(tag),
    ])
  } catch {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg)' }}>
        <p className="text-red-400 text-xl font-semibold">Player not found.</p>
        <p className="text-slate-500">Check your tag and try again.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">← Go back</Link>
      </main>
    )
  }

  const streak = computeStreak(battles, player.tag)
  const winRate = Math.round((player.wins / Math.max(player.battleCount, 1)) * 100)

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Top nav */}
      <div className="px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">← CR Coach</Link>
        <ShareButton tag={player.tag} />
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16 space-y-5">

        {/* Player header */}
        <div className="card p-6 space-y-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white break-words">{player.name}</h1>
              <p className="text-slate-500 text-sm mt-1">{player.arena.name} · {player.tag}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold text-white">{player.trophies.toLocaleString()}</p>
              <p className="text-slate-500 text-xs mt-0.5">trophies</p>
            </div>
          </div>
        </div>

        {/* Streak banner */}
        {streak && streak.count >= 3 && (
          <div className={`rounded-2xl px-5 py-3 text-sm font-semibold flex items-center gap-2 ${
            streak.type === 'win'
              ? 'text-green-300'
              : 'text-red-300'
          }`} style={{
            background: streak.type === 'win' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${streak.type === 'win' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
          }}>
            {streak.type === 'win' ? '🔥' : '💀'}
            {streak.count}-game {streak.type === 'win' ? 'win' : 'losing'} streak
          </div>
        )}

        <PlayerStats player={player} winRate={winRate} />
        <CurrentDeck player={player} />
        <TrophyChart battles={battles} tag={player.tag} currentTrophies={player.trophies} />
        <RecentBattles battles={battles} tag={player.tag} />
        <DashboardSection player={player} battles={battles} tag={tag} />
      </div>
    </main>
  )
}
