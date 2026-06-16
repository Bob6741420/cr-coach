import type { CardLevel } from '@/lib/stats'

export default function CardLevels({ cards }: { cards: CardLevel[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Card Levels</h2>
      <div className="space-y-3">
        {cards.map(c => (
          <div key={c.name} className="flex items-center gap-3">
            {c.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.iconUrl} alt={c.name} width={30} height={30} className="rounded shrink-0" />
            )}
            <span className="flex-1 text-sm text-slate-300 truncate">{c.name}</span>
            <span className="text-sm font-semibold text-white shrink-0">{c.level}/{c.maxLevel}</span>
            {c.gap > 0 ? (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>-{c.gap}</span>
            ) : (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>MAX</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
