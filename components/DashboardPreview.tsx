import { computeDeckWinRates, computeLossPatterns, computeCardLevels } from '@/lib/stats'
import type { CRPlayer, BattleLogEntry } from '@/lib/clash-royale'

export default function DashboardPreview({
  player,
  battles,
}: {
  player: CRPlayer
  battles: BattleLogEntry[]
}) {
  const decks = computeDeckWinRates(battles, player.tag).slice(0, 2)
  const losses = computeLossPatterns(battles, player.tag).slice(0, 3)
  const cards = computeCardLevels(player).slice(0, 3)
  const maxLoss = losses[0]?.count ?? 1

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="blur-sm pointer-events-none select-none opacity-60">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Real deck win rates */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Win Rate by Deck</h2>
            <div className="space-y-3">
              {decks.map(d => (
                <div key={d.deckSignature}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 truncate pr-2">{d.deckSignature}</span>
                    <span className="font-semibold text-gray-900">{d.winRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.winRate >= 50 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${d.winRate}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{d.wins}W / {d.battles - d.wins}L</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real loss patterns */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Cards Beating You Most</h2>
            <div className="space-y-3">
              {losses.map(p => (
                <div key={p.card}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{p.card}</span>
                    <span className="font-semibold text-red-500">{p.count}x</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${(p.count / maxLoss) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real card levels */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Card Levels</h2>
            <div className="space-y-2">
              {cards.map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  {c.iconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.iconUrl} alt={c.name} width={24} height={24} className="rounded shrink-0" />
                  )}
                  <span className="flex-1 text-sm text-gray-700 truncate">{c.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{c.level}/16</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">-{c.gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px]">
        <div className="text-center space-y-1">
          <p className="text-xl">🔒</p>
          <p className="text-sm font-bold text-gray-900">Your full breakdown is ready</p>
          <p className="text-xs text-gray-500">Enter your email below to unlock</p>
        </div>
      </div>
    </div>
  )
}
