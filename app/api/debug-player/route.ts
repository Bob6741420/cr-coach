import { NextRequest, NextResponse } from 'next/server'
import { formatTag } from '@/lib/clash-royale'

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag') ?? '20G8R2VGPY'
  const res = await fetch(
    `https://api.clashroyale.com/v1/players/${encodeURIComponent(formatTag(tag))}`,
    { headers: { Authorization: `Bearer ${process.env.CLASH_ROYALE_API_KEY}` } }
  )
  const raw = await res.json()
  return NextResponse.json({
    keys: Object.keys(raw),
    currentDeck: raw.currentDeck?.map((c: Record<string, unknown>) => ({ name: c.name, evolutionLevel: c.evolutionLevel, iconUrls: c.iconUrls })),
    supportCards: raw.currentDeckSupportCards?.map((c: Record<string, unknown>) => ({ name: c.name, evolutionLevel: c.evolutionLevel, iconUrls: c.iconUrls })),
    allSupportRaw: raw.currentDeckSupportCards,
  })
}
