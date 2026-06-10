import type { LossPattern } from '@/lib/stats'

export default function LossPatterns({ patterns }: { patterns: LossPattern[] }) {
  const max = patterns[0]?.count ?? 1

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Cards Beating You Most</h2>
      <div className="space-y-3">
        {patterns.slice(0, 5).map(p => (
          <div key={p.card}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{p.card}</span>
              <span className="font-semibold text-red-500">{p.count}x</span>
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
