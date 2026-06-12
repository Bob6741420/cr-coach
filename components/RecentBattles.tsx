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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Recent Battles</h2>
      <div className="space-y-2">
        {recent.map((b, i) => (
          <div key={i} className="flex items-center gap-3 py-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${b.won ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {b.won ? 'WIN' : 'LOSS'}
            </span>
            <span className="flex-1 text-sm text-gray-700 truncate">{b.opponentName}</span>
            <span className="text-sm font-mono text-gray-500 shrink-0">{b.myCrowns}–{b.theirCrowns}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
