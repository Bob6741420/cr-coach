import { computeDeckWinRates, computeLossPatterns, computeCardLevels } from '../stats'
import type { CRPlayer, BattleLogEntry } from '../clash-royale'

const win = (deck: string[]): BattleLogEntry => ({
  type: 'PvP', gameMode: { name: 'Ladder' },
  team: [{ tag: '#ME', crowns: 2, cards: deck.map(name => ({ name })) }],
  opponent: [{ tag: '#OP', crowns: 1, cards: [{ name: 'Hog Rider' }] }],
})

const loss = (opponentDeck: string[]): BattleLogEntry => ({
  type: 'PvP', gameMode: { name: 'Ladder' },
  team: [{ tag: '#ME', crowns: 0, cards: [{ name: 'Hog Rider' }] }],
  opponent: [{ tag: '#OP', crowns: 3, cards: opponentDeck.map(name => ({ name })) }],
})

describe('computeDeckWinRates', () => {
  it('returns 100% win rate for a deck with only wins', () => {
    const battles = [win(['Hog Rider', 'Fireball']), win(['Hog Rider', 'Fireball'])]
    const result = computeDeckWinRates(battles, '#ME')
    expect(result[0].winRate).toBe(100)
    expect(result[0].battles).toBe(2)
  })

  it('sorts by most-played deck first', () => {
    const battles = [
      win(['Hog Rider', 'Fireball']), win(['Hog Rider', 'Fireball']),
      loss(['Lava Hound']),
    ]
    const result = computeDeckWinRates(battles, '#ME')
    expect(result[0].battles).toBe(2)
  })
})

describe('computeLossPatterns', () => {
  it('counts cards from losses only', () => {
    const battles = [loss(['Lava Hound', 'Balloon']), loss(['Lava Hound', 'Minions'])]
    const result = computeLossPatterns(battles, '#ME')
    expect(result[0].card).toBe('Lava Hound')
    expect(result[0].count).toBe(2)
  })
})

describe('computeCardLevels', () => {
  it('sorts by biggest level gap first', () => {
    const player: CRPlayer = {
      tag: '#ME', name: 'Test', trophies: 5000, bestTrophies: 5500,
      wins: 100, losses: 50, battleCount: 150,
      currentDeck: [
        { name: 'Hog Rider', level: 9, maxLevel: 14 },
        { name: 'Fireball', level: 13, maxLevel: 14 },
      ],
      arena: { name: 'Master I' },
    }
    const result = computeCardLevels(player)
    expect(result[0].name).toBe('Hog Rider')
    expect(result[0].gap).toBe(5)
  })
})
