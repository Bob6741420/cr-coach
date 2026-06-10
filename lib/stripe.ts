import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export async function createCheckoutSession(params: {
  playerTag: string
  tier: 'pro' | 'elite'
  successUrl: string
  cancelUrl: string
}): Promise<string> {
  const priceId = params.tier === 'elite'
    ? process.env.STRIPE_ELITE_PRICE_ID!
    : process.env.STRIPE_PRO_PRICE_ID!

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { playerTag: params.playerTag, tier: params.tier },
  })
  return session.url!
}
