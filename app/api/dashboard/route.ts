import { NextRequest, NextResponse } from 'next/server'
import { getSubscription } from '@/lib/supabase'
import { computeDeckWinRates, computeLossPatterns, computeCardLevels } from '@/lib/stats'
import type { CRPlayer, BattleLogEntry } from '@/lib/clash-royale'

export async function POST(req: NextRequest) {
  const { player, battles, email } = await req.json() as {
    player: CRPlayer
    battles: BattleLogEntry[]
    email: string
  }

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const isOwner = email === process.env.OWNER_EMAIL
  const tier = isOwner ? 'elite' : await getSubscription(email)
  if (!tier) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  return NextResponse.json({
    tier,
    deckWinRates: computeDeckWinRates(battles, player.tag),
    lossPatterns: computeLossPatterns(battles, player.tag),
    cardLevels: computeCardLevels(player),
  })
}
