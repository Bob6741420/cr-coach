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
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 text-xl font-semibold">Player not found.</p>
        <p className="text-gray-500">Check your tag and try again.</p>
        <Link href="/" className="text-blue-600 underline">← Go back</Link>
      </main>
    )
  }

  const streak = computeStreak(battles, player.tag)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 break-words">{player.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{player.arena.name} · {player.tag}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ShareButton tag={player.tag} />
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 hidden sm:block">← Search again</Link>
          </div>
        </div>

        <PlayerStats player={player} />

        {streak && streak.count >= 3 && (
          <div className={`rounded-xl px-5 py-3 text-sm font-semibold flex items-center gap-2 ${
            streak.type === 'win'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {streak.type === 'win' ? '🔥' : '💀'}
            {streak.count}-game {streak.type === 'win' ? 'win' : 'losing'} streak
          </div>
        )}

        <CurrentDeck player={player} />

        <TrophyChart battles={battles} tag={player.tag} currentTrophies={player.trophies} />

        <RecentBattles battles={battles} tag={player.tag} />

        <DashboardSection player={player} battles={battles} tag={tag} />
      </div>
    </main>
  )
}
