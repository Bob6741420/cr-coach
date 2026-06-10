import type { CRPlayer } from '@/lib/clash-royale'

export default function PlayerStats({ player }: { player: CRPlayer }) {
  const winRate = Math.round((player.wins / Math.max(player.battleCount, 1)) * 100)

  const stats = [
    { label: 'Trophies', value: player.trophies.toLocaleString() },
    { label: 'Best', value: player.bestTrophies.toLocaleString() },
    { label: 'Win Rate', value: `${winRate}%` },
    { label: 'Battles', value: player.battleCount.toLocaleString() },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
      ))}
    </div>
  )
}
