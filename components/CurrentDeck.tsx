import type { CRPlayer, DeckCard } from '@/lib/clash-royale'

function CardTile({ card }: { card: DeckCard }) {
  return (
    <div className="flex flex-col items-center gap-1 relative">
      {card.iconUrls?.medium ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.iconUrls.medium}
          alt={card.name}
          className="w-full rounded-lg"
          style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
        />
      ) : (
        <div className="w-full aspect-[3/4] rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <span className="text-slate-500 text-xs text-center px-1">{card.name}</span>
        </div>
      )}
      {card.evolutionLevel != null && card.evolutionLevel > 0 && (
        <span className="absolute -top-1 -right-1 text-xs px-1 rounded font-bold leading-tight" style={{ background: '#7c3aed', color: '#e9d5ff', fontSize: 9 }}>EVO</span>
      )}
      <span className="text-xs text-slate-500 text-center leading-tight hidden sm:block truncate w-full">
        {card.name.split(' ')[0]}
      </span>
    </div>
  )
}

export default function CurrentDeck({ player }: { player: CRPlayer }) {
  const support = player.currentDeckSupportCards ?? []

  return (
    <div className="card p-6 space-y-4">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Current Deck</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {player.currentDeck.map(card => <CardTile key={card.name} card={card} />)}
      </div>
      {support.length > 0 && (
        <>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Heroes</p>
          <div className="flex gap-2">
            {support.map(card => (
              <div key={card.name} className="w-14">
                <CardTile card={card} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
