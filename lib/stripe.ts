import Stripe from 'stripe'

let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })
  return _stripe
}

export async function createCheckoutSession(params: {
  playerTag: string
  tier: 'pro' | 'elite'
  successUrl: string
  cancelUrl: string
}): Promise<string> {
  const priceId = params.tier === 'elite'
    ? process.env.STRIPE_ELITE_PRICE_ID!
    : process.env.STRIPE_PRO_PRICE_ID!

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { playerTag: params.playerTag, tier: params.tier },
  })
  return session.url!
}
