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
    <div className="relative rounded-2xl overflow-hidden">
      <div className="blur-sm pointer-events-none select-none opacity-50">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Win Rate by Deck</h2>
            <div className="space-y-3">
              {decks.map(d => (
                <div key={d.deckSignature}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400 truncate pr-2">{d.deckSignature}</span>
                    <span className={`font-bold ${d.winRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>{d.winRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className={`h-full rounded-full ${d.winRate >= 50 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${d.winRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Cards Beating You</h2>
            <div className="space-y-3">
              {losses.map(p => (
                <div key={p.card}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{p.card}</span>
                    <span className="font-bold text-red-400">{p.count}×</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${(p.count / maxLoss) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Card Levels</h2>
            <div className="space-y-3">
              {cards.map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  {c.iconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.iconUrl} alt={c.name} width={24} height={24} className="rounded shrink-0" />
                  )}
                  <span className="flex-1 text-sm text-slate-300 truncate">{c.name}</span>
                  <span className="text-sm font-semibold text-white">{c.level}/16</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>-{c.gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(8,12,20,0.65)', backdropFilter: 'blur(2px)' }}>
        <div className="text-center space-y-1.5">
          <p className="text-2xl">🔒</p>
          <p className="text-sm font-bold text-white">Your full breakdown is ready</p>
          <p className="text-xs text-slate-400">Sign in below to unlock</p>
        </div>
      </div>
    </div>
  )
}
