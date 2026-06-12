const CR_BASE = 'https://api.clashroyale.com/v1'

export function formatTag(tag: string): string {
  return '#' + (tag.startsWith('#') ? tag.slice(1) : tag).toUpperCase()
}

async function crFetch(path: string) {
  const res = await fetch(`${CR_BASE}${path}`, {
    headers: { Authorization: `Bearer ${process.env.CLASH_ROYALE_API_KEY}` },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`CR API ${res.status}`)
  return res.json()
}

export interface CRPlayer {
  tag: string
  name: string
  trophies: number
  bestTrophies: number
  wins: number
  losses: number
  battleCount: number
  currentDeck: Array<{ name: string; level: number; maxLevel: number; iconUrls?: { medium: string } }>
  arena: { name: string }
}

export interface BattleLogEntry {
  type: string
  gameMode: { name: string }
  team: Array<{ tag: string; crowns: number; cards: Array<{ name: string; iconUrls?: { medium: string } }> }>
  opponent: Array<{ tag: string; crowns: number; cards: Array<{ name: string; iconUrls?: { medium: string } }> }>
}

export async function fetchPlayer(tag: string): Promise<CRPlayer> {
  return crFetch(`/players/${encodeURIComponent(formatTag(tag))}`)
}

export async function fetchBattleLog(tag: string): Promise<BattleLogEntry[]> {
  return crFetch(`/players/${encodeURIComponent(formatTag(tag))}/battlelog`)
}
