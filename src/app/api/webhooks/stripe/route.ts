import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    )
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId) {
    return new Response(null, { status: 200 })
  }

  if (event.type === 'checkout.session.completed') {
    const userId = session.metadata.userId
    const priceId = session.metadata.priceId

    let tokensToAdd = 0
    if (priceId === 'price_1PPPQVP3PzZi6quKQ6kQPDb0') tokensToAdd = 50
    else if (priceId === 'price_1PPPRcP3PzZi6quKkn3eKGR6') tokensToAdd = 100
    else if (priceId === 'price_1PPPRuP3PzZi6quKhk2ypHIG') tokensToAdd = 200

    await db.user.update({
      where: { id: userId },
      data: { tokenBalance: { increment: tokensToAdd } },
    })
  }

  return new Response(null, { status: 200 })
}
