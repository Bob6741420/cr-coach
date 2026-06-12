import type { CRPlayer, BattleLogEntry } from './clash-royale'

export interface DeckWinRate {
  deckSignature: string
  wins: number
  battles: number
  winRate: number
}

export interface LossPattern {
  card: string
  count: number
  iconUrl?: string
}

export interface CardLevel {
  name: string
  level: number
  maxLevel: number
  gap: number
  iconUrl?: string
}

function playerTeam(battle: BattleLogEntry, tag: string) {
  const normalTag = tag.startsWith('#') ? tag : '#' + tag
  return battle.team.find(t => t.tag === normalTag) ?? battle.team[0]
}

function opponentTeam(battle: BattleLogEntry, tag: string) {
  const normalTag = tag.startsWith('#') ? tag : '#' + tag
  return battle.opponent.find(t => t.tag !== normalTag) ?? battle.opponent[0]
}

export interface Streak {
  type: 'win' | 'loss'
  count: number
}

export function computeStreak(battles: BattleLogEntry[], tag: string): Streak | null {
  const results: ('win' | 'loss')[] = []
  for (const b of battles) {
    const team = playerTeam(b, tag)
    const opp = opponentTeam(b, tag)
    if (!team || !opp || team.crowns === opp.crowns) continue
    results.push(team.crowns > opp.crowns ? 'win' : 'loss')
  }
  if (results.length === 0) return null
  const first = results[0]
  let count = 0
  for (const r of results) {
    if (r === first) count++
    else break
  }
  return { type: first, count }
}

export function computeDeckWinRates(battles: BattleLogEntry[], tag: string): DeckWinRate[] {
  const map = new Map<string, { wins: number; battles: number }>()
  for (const b of battles) {
    const team = playerTeam(b, tag)
    const opp = opponentTeam(b, tag)
    if (!team || !opp) continue
    const sig = team.cards.map(c => c.name).sort().join(' + ')
    const won = team.crowns > opp.crowns
    const existing = map.get(sig) ?? { wins: 0, battles: 0 }
    map.set(sig, { wins: existing.wins + (won ? 1 : 0), battles: existing.battles + 1 })
  }
  return Array.from(map.entries())
    .map(([deckSignature, { wins, battles }]) => ({
      deckSignature, wins, battles, winRate: Math.round((wins / battles) * 100),
    }))
    .sort((a, b) => b.battles - a.battles)
}

export function computeLossPatterns(battles: BattleLogEntry[], tag: string): LossPattern[] {
  const counts = new Map<string, { count: number; iconUrl?: string }>()
  for (const b of battles) {
    const team = playerTeam(b, tag)
    const opp = opponentTeam(b, tag)
    if (!team || !opp) continue
    if (team.crowns < opp.crowns) {
      for (const card of opp.cards) {
        const existing = counts.get(card.name) ?? { count: 0 }
        counts.set(card.name, { count: existing.count + 1, iconUrl: existing.iconUrl ?? card.iconUrls?.medium })
      }
    }
  }
  return Array.from(counts.entries())
    .map(([card, { count, iconUrl }]) => ({ card, count, iconUrl }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

export function computeCardLevels(player: CRPlayer): CardLevel[] {
  return player.currentDeck
    .map(c => {
      const inGameLevel = (16 - c.maxLevel) + c.level
      const gap = 16 - inGameLevel
      return { name: c.name, level: inGameLevel, maxLevel: 16, gap, iconUrl: c.iconUrls?.medium }
    })
    .sort((a, b) => b.gap - a.gap)
}
