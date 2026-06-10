import type { DeckWinRate } from '@/lib/stats'

export default function DeckBreakdown({ decks }: { decks: DeckWinRate[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Win Rate by Deck</h2>
      <div className="space-y-3">
        {decks.slice(0, 5).map(d => (
          <div key={d.deckSignature}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 truncate pr-2">{d.deckSignature}</span>
              <span className="font-semibold text-gray-900 shrink-0">{d.winRate}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${d.winRate >= 50 ? 'bg-green-400' : 'bg-red-400'}`}
                style={{ width: `${d.winRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{d.wins}W / {d.battles - d.wins}L</p>
          </div>
        ))}
        {decks.length === 0 && <p className="text-gray-400 text-sm">Not enough data yet.</p>}
      </div>
    </div>
  )
}
