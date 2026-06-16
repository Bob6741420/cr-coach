import type { Insight } from '@/lib/insights'

const styles = {
  warning: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', dot: '#f97316', title: '#fed7aa', body: '#fdba74' },
  tip:     { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.25)',  dot: '#3b82f6', title: '#bfdbfe', body: '#93c5fd'  },
  good:    { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   dot: '#22c55e', title: '#bbf7d0', body: '#86efac'  },
}

export default function Insights({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null
  return (
    <div className="card p-6 space-y-3">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">What Your Stats Mean</h2>
      <div className="space-y-3">
        {insights.map((ins, i) => {
          const s = styles[ins.type]
          return (
            <div key={i} className="rounded-xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: s.dot }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: s.title }}>{ins.title}</p>
                  <p className="text-sm mt-0.5 leading-relaxed" style={{ color: s.body }}>{ins.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
