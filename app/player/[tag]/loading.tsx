export default function Loading() {
  const shimmer = { background: 'rgba(255,255,255,0.06)', borderRadius: 8 }
  const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="px-6 py-4 max-w-3xl mx-auto">
        <div style={{ ...shimmer, height: 16, width: 80 }} />
      </div>
      <div className="max-w-3xl mx-auto px-6 pb-16 space-y-5 animate-pulse">
        {/* Header card */}
        <div style={card}>
          <div className="flex justify-between">
            <div className="space-y-2">
              <div style={{ ...shimmer, height: 28, width: 160 }} />
              <div style={{ ...shimmer, height: 14, width: 120 }} />
            </div>
            <div style={{ ...shimmer, height: 36, width: 80 }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={card} className="space-y-2 text-center">
              <div style={{ ...shimmer, height: 10, width: 60, margin: '0 auto' }} />
              <div style={{ ...shimmer, height: 24, width: 72, margin: '0 auto' }} />
            </div>
          ))}
        </div>

        {/* Deck */}
        <div style={card} className="space-y-3">
          <div style={{ ...shimmer, height: 12, width: 100 }} />
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ ...shimmer, flex: 1, aspectRatio: '3/4', borderRadius: 10 }} />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div style={{ ...card, height: 180 }} />

        {/* Battles */}
        <div style={card} className="space-y-3">
          <div style={{ ...shimmer, height: 12, width: 120 }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ ...shimmer, height: 32 }} />
          ))}
        </div>
      </div>
    </main>
  )
}
