const FAKE_DECKS = [
  { deck: 'Hog Rider + Fireball + Ice Spirit...', rate: 63, w: 7, l: 4 },
  { deck: 'Miner + Poison + Bats + Mega Minion...', rate: 44, w: 4, l: 5 },
]
const FAKE_LOSSES = [
  { card: 'P.E.K.K.A', count: 5 },
  { card: 'Mega Knight', count: 4 },
  { card: 'Lava Hound', count: 3 },
]
const FAKE_CARDS = [
  { name: 'Fireball', level: 10, gap: 6 },
  { name: 'Hog Rider', level: 12, gap: 4 },
  { name: 'Ice Spirit', level: 14, gap: 2 },
]

export default function DashboardPreview() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="blur-sm pointer-events-none select-none opacity-60">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Win Rate by Deck</h2>
            <div className="space-y-3">
              {FAKE_DECKS.map(d => (
                <div key={d.deck}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 truncate pr-2">{d.deck}</span>
                    <span className="font-semibold text-gray-900">{d.rate}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.rate >= 50 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${d.rate}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{d.w}W / {d.l}L</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Cards Beating You Most</h2>
            <div className="space-y-3">
              {FAKE_LOSSES.map(p => (
                <div key={p.card}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{p.card}</span>
                    <span className="font-semibold text-red-500">{p.count}x</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${(p.count / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Card Levels</h2>
            <div className="space-y-2">
              {FAKE_CARDS.map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="flex-1 text-sm text-gray-700">{c.name}</span>
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
