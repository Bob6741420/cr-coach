import type { Insight } from '@/lib/insights'

const styles = {
  warning: { bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-400', title: 'text-orange-900', body: 'text-orange-800' },
  tip:     { bg: 'bg-blue-50',   border: 'border-blue-200',   dot: 'bg-blue-400',   title: 'text-blue-900',   body: 'text-blue-800'   },
  good:    { bg: 'bg-green-50',  border: 'border-green-200',  dot: 'bg-green-400',  title: 'text-green-900',  body: 'text-green-800'  },
}

export default function Insights({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
      <h2 className="text-base font-bold text-gray-900">What Your Stats Mean</h2>
      <div className="space-y-3">
        {insights.map((ins, i) => {
          const s = styles[ins.type]
          return (
            <div key={i} className={`${s.bg} border ${s.border} rounded-lg p-4`}>
              <div className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full ${s.dot} mt-1.5 shrink-0`} />
                <div>
                  <p className={`text-sm font-semibold ${s.title}`}>{ins.title}</p>
                  <p className={`text-sm mt-0.5 ${s.body}`}>{ins.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
