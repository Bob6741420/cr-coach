import type { DeckWinRate } from '@/lib/stats'

export default function DeckBreakdown({ decks }: { decks: DeckWinRate[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Win Rate by Deck</h2>
      <div className="space-y-4">
        {decks.filter(d => d.battles >= 3).slice(0, 5).map(d => {
          const shortName = d.deckSignature.split(' + ').slice(0, 3).join(', ') + '…'
          return (
            <div key={d.deckSignature}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400 truncate pr-2">{shortName}</span>
                <span className={`font-bold shrink-0 ${d.winRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>{d.winRate}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className={`h-full rounded-full ${d.winRate >= 50 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${d.winRate}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 mt-1">{d.wins}W / {d.battles - d.wins}L · {d.battles} games</p>
            </div>
          )
        })}
        {decks.filter(d => d.battles >= 3).length === 0 && <p className="text-slate-500 text-sm">Play 3+ games with the same deck to see stats.</p>}
      </div>
    </div>
  )
}
