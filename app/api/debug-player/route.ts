import { NextRequest, NextResponse } from 'next/server'
import { fetchPlayer } from '@/lib/clash-royale'

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag') ?? '20G8R2VGPY'
  const player = await fetchPlayer(tag) as Record<string, unknown>
  return NextResponse.json({
    deckCards: (player.currentDeck as Array<Record<string, unknown>>)?.map(c => ({
      name: c.name,
      evolutionLevel: c.evolutionLevel,
      iconUrls: c.iconUrls,
    })),
    supportCards: (player.currentDeckSupportCards as Array<Record<string, unknown>>)?.map(c => ({
      name: c.name,
      evolutionLevel: c.evolutionLevel,
      iconUrls: c.iconUrls,
    })),
  })
}
