import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSubscription } from '@/lib/supabase'
import { computeDeckWinRates, computeLossPatterns, computeCardLevels } from '@/lib/stats'
import { generateInsights } from '@/lib/insights'
import type { CRPlayer, BattleLogEntry } from '@/lib/clash-royale'

export async function POST(req: NextRequest) {
  const { player, battles, accessToken } = await req.json() as {
    player: CRPlayer
    battles: BattleLogEntry[]
    accessToken: string
  }

  if (!accessToken) {
    return NextResponse.json({ error: 'Auth required' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  if (error || !user?.email) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  const email = user.email
  const isOwner = email === process.env.OWNER_EMAIL
  const tier = isOwner ? 'elite' : await getSubscription(email)
  if (!tier) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  const deckWinRates = computeDeckWinRates(battles, player.tag)
  const lossPatterns = computeLossPatterns(battles, player.tag)
  const cardLevels = computeCardLevels(player)
  const insights = generateInsights(player, deckWinRates, lossPatterns, cardLevels, battles)

  return NextResponse.json({ tier, deckWinRates, lossPatterns, cardLevels, insights })
}
