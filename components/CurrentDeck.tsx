import type { CRPlayer } from '@/lib/clash-royale'

export default function CurrentDeck({ player }: { player: CRPlayer }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Current Deck</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {player.currentDeck.map(card => (
          <div key={card.name} className="flex flex-col items-center gap-1">
            {card.iconUrls?.medium ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.iconUrls.medium} alt={card.name} className="w-full rounded-lg" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} />
            ) : (
              <div className="w-full aspect-[3/4] rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="text-slate-500 text-xs text-center px-1">{card.name}</span>
              </div>
            )}
            <span className="text-xs text-slate-500 text-center leading-tight hidden sm:block truncate w-full">
              {card.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
