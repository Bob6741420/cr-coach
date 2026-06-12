import type { CRPlayer } from '@/lib/clash-royale'

export default function CurrentDeck({ player }: { player: CRPlayer }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-4">Current Deck</h2>
      <div className="grid grid-cols-8 gap-2">
        {player.currentDeck.map(card => (
          <div key={card.name} className="flex flex-col items-center gap-1">
            {card.iconUrls?.medium ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.iconUrls.medium}
                alt={card.name}
                className="w-full rounded-lg shadow-sm"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-1">{card.name}</span>
              </div>
            )}
            <span className="text-xs text-gray-500 text-center leading-tight hidden sm:block truncate w-full text-center">
              {card.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
