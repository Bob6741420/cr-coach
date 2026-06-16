import type { LossPattern } from '@/lib/stats'

export default function LossPatterns({ patterns }: { patterns: LossPattern[] }) {
  const max = patterns[0]?.count ?? 1

  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Cards Beating You</h2>
      <div className="space-y-4">
        {patterns.slice(0, 5).map(p => (
          <div key={p.card}>
            <div className="flex items-center gap-2 mb-1.5">
              {p.iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.iconUrl} alt={p.card} width={22} height={22} className="rounded shrink-0" />
              )}
              <span className="flex-1 text-sm text-slate-300 truncate">{p.card}</span>
              <span className="text-sm font-bold text-red-400 shrink-0">{p.count}×</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full bg-red-500 rounded-full" style={{ width: `${(p.count / max) * 100}%` }} />
            </div>
          </div>
        ))}
        {patterns.length === 0 && <p className="text-slate-500 text-sm">No losses found — nice!</p>}
      </div>
    </div>
  )
}
