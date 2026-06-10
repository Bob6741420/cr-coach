import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { saveSubscriber, cancelSubscriber } from '@/lib/supabase'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.mode === 'subscription' && session.customer_email) {
      const tier = (session.metadata?.tier ?? 'pro') as 'pro' | 'elite'
      await saveSubscriber({
        email: session.customer_email,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        tier,
      })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await cancelSubscriber(sub.id)
  }

  return NextResponse.json({ received: true })
}
