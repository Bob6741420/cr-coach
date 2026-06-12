import type { LossPattern } from '@/lib/stats'

export default function LossPatterns({ patterns }: { patterns: LossPattern[] }) {
  const max = patterns[0]?.count ?? 1

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Cards Beating You Most</h2>
      <div className="space-y-3">
        {patterns.slice(0, 5).map(p => (
          <div key={p.card}>
            <div className="flex items-center gap-2 mb-1">
              {p.iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.iconUrl} alt={p.card} width={24} height={24} className="rounded shrink-0" />
              )}
              <span className="flex-1 text-sm text-gray-600 truncate">{p.card}</span>
              <span className="text-sm font-semibold text-red-500 shrink-0">{p.count}x</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full"
                style={{ width: `${(p.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {patterns.length === 0 && <p className="text-gray-400 text-sm">No losses found — nice!</p>}
      </div>
    </div>
  )
}
