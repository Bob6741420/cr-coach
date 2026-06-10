import type { CardLevel } from '@/lib/stats'

export default function CardLevels({ cards }: { cards: CardLevel[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Card Levels</h2>
      <div className="space-y-2">
        {cards.map(c => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="flex-1 text-sm text-gray-700">{c.name}</span>
            <span className="text-sm font-semibold text-gray-900">{c.level}/{c.maxLevel}</span>
            {c.gap > 0 ? (
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">-{c.gap}</span>
            ) : (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">MAX</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
