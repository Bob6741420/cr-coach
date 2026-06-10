import { NextRequest, NextResponse } from 'next/server'
import { fetchPlayer, fetchBattleLog } from '@/lib/clash-royale'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params
  try {
    const [player, battles] = await Promise.all([
      fetchPlayer(tag),
      fetchBattleLog(tag),
    ])
    return NextResponse.json({ player, battles })
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    return NextResponse.json(
      { error: msg.includes('404') ? 'Player not found' : 'Failed to fetch player' },
      { status: msg.includes('404') ? 404 : 500 }
    )
  }
}
