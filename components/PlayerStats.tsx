import type { CRPlayer } from '@/lib/clash-royale'

export default function PlayerStats({ player, winRate }: { player: CRPlayer; winRate: number }) {
  const stats = [
    { label: 'Best Trophies', value: player.bestTrophies.toLocaleString(), accent: false },
    { label: 'Win Rate', value: `${winRate}%`, accent: winRate >= 55 },
    { label: 'Total Battles', value: player.battleCount.toLocaleString(), accent: false },
    { label: 'Wins', value: player.wins.toLocaleString(), accent: false },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ label, value, accent }) => (
        <div key={label} className="card card-hover p-4 text-center space-y-1">
          <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
          <p className={`text-xl font-bold ${accent ? 'text-green-400' : 'text-white'}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
