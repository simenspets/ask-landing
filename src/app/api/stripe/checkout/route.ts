import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const { plan } = await req.json();
  let priceId;
  if (plan === 'start') priceId = process.env.STRIPE_PRICE_START;
  else if (plan === 'full') priceId = process.env.STRIPE_PRICE_FULL;
  else if (plan === 'premium') priceId = process.env.STRIPE_PRICE_PREMIUM;

  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan or missing price ID' }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/billing/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/billing/cancel',
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
} 