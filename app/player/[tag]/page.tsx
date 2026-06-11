import { fetchPlayer, fetchBattleLog } from '@/lib/clash-royale'
import PlayerStats from '@/components/PlayerStats'
import DashboardSection from './DashboardSection'
import Link from 'next/link'

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
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    let serverIp = 'unknown'
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json')
      const ipData = await ipRes.json()
      serverIp = ipData.ip
    } catch {}
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 text-xl font-semibold">Player not found.</p>
        <p className="text-gray-500">Check your tag and try again.</p>
        <p className="text-xs text-gray-400 font-mono">{msg} · IP: {serverIp}</p>
        <p className="text-xs text-gray-400 font-mono">Key ends: ...{(process.env.CLASH_ROYALE_API_KEY ?? '').slice(-10)}</p>
        <Link href="/" className="text-blue-600 underline">← Go back</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">{player.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{player.arena.name} · {player.tag}</p>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← Search again</Link>
        </div>

        <PlayerStats player={player} />

        <DashboardSection player={player} battles={battles} tag={tag} />
      </div>
    </main>
  )
}
