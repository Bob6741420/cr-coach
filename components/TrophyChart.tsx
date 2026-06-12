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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Trophy Trend</h2>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trending ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trending ? '↑ Climbing' : '↓ Dropping'}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={points} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9ca3af' }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis domain={[min - pad, max + pad]} tick={{ fontSize: 10, fill: '#9ca3af' }} width={48} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(v: unknown) => [Number(v).toLocaleString(), 'Trophies']}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Line type="monotone" dataKey="trophies" stroke={trending ? '#22c55e' : '#ef4444'} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
