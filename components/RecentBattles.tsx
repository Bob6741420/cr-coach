import type { BattleLogEntry } from '@/lib/clash-royale'

export default function RecentBattles({ battles, tag }: { battles: BattleLogEntry[]; tag: string }) {
  const normalTag = tag.startsWith('#') ? tag : '#' + tag

  const recent = battles.map(b => {
    const team = b.team.find(t => t.tag === normalTag) ?? b.team[0]
    const opp = b.opponent[0]
    const won = team.crowns > opp.crowns
    return { won, myCrowns: team.crowns, theirCrowns: opp.crowns, opponentName: opp.name, mode: b.gameMode.name }
  })

  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Recent Battles</h2>
      <div className="space-y-1">
        {recent.map((b, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-lg transition-colors hover:bg-white/[0.03]">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md shrink-0 w-12 text-center" style={{
              background: b.won ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              color: b.won ? '#4ade80' : '#f87171',
            }}>
              {b.won ? 'WIN' : 'LOSS'}
            </span>
            <span className="flex-1 text-sm text-slate-300 truncate">{b.opponentName}</span>
            <span className="text-sm font-mono text-slate-500 shrink-0">{b.myCrowns}–{b.theirCrowns}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
