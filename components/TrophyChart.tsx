'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { BattleLogEntry } from '@/lib/clash-royale'

export default function TrophyChart({
  battles,
  tag,
  currentTrophies,
}: {
  battles: BattleLogEntry[]
  tag: string
  currentTrophies: number
}) {
  const normalTag = tag.startsWith('#') ? tag : '#' + tag

  const points: { label: string; trophies: number }[] = []
  const reversed = [...battles].reverse()
  reversed.forEach((b, i) => {
    const team = b.team.find(t => t.tag === normalTag) ?? b.team[0]
    if (team?.startingTrophies != null) {
      points.push({ label: String(i + 1), trophies: team.startingTrophies })
    }
  })
  points.push({ label: 'Now', trophies: currentTrophies })

  if (points.length < 3) return null

  const vals = points.map(p => p.trophies)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const pad = Math.max(30, Math.round((max - min) * 0.25))
  const trending = points[points.length - 1].trophies >= points[0].trophies
  const lineColor = trending ? '#4ade80' : '#f87171'

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Trophy Trend</h2>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{
          background: trending ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
          color: trending ? '#4ade80' : '#f87171',
        }}>
          {trending ? '↑ Climbing' : '↓ Dropping'}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={points} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#475569' }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis domain={[min - pad, max + pad]} tick={{ fontSize: 10, fill: '#475569' }} width={48} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(v: unknown) => [Number(v).toLocaleString(), 'Trophies']}
            contentStyle={{ fontSize: 12, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }}
          />
          <Line type="monotone" dataKey="trophies" stroke={lineColor} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
