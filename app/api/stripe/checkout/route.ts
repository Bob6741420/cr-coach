import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { playerTag, tier } = await req.json() as {
    playerTag: string
    tier: 'pro' | 'elite'
  }
  const base = process.env.NEXT_PUBLIC_APP_URL!
  const tag = encodeURIComponent(playerTag)

  const url = await createCheckoutSession({
    playerTag,
    tier,
    successUrl: `${base}/player/${tag}?subscribed=true`,
    cancelUrl: `${base}/player/${tag}`,
  })

  return NextResponse.json({ url })
}
