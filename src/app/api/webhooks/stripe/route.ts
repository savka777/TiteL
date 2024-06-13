import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { done: isDone, value: chunk } = await reader.read();
    done = isDone;
    if (chunk) {
      chunks.push(chunk);
    }
  }

  return Buffer.concat(chunks);
}

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json("Only POST requests allowed", { status: 405 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("Missing stripe-signature header");
    return NextResponse.json("Missing stripe-signature header", { status: 400 });
  }

  let rawBody: Buffer;
  if (req.body) {
    try {
      rawBody = await streamToBuffer(req.body);
    } catch (error) {
      console.error("Error reading raw body:", error);
      return NextResponse.json("Error reading raw body", { status: 500 });
    }
  } else {
    console.error("Empty body");
    return NextResponse.json("Empty body", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Received event:", event.id, event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });
      const lineItems = sessionWithLineItems.line_items;
      if (!lineItems) {
        return NextResponse.json("Internal Server Error", { status: 500 });
      }

      const userId = session.metadata?.userId;
      const priceId = session.metadata?.priceId;
      if (!userId || !priceId) {
        console.error("No userId or priceId in session metadata");
        return NextResponse.json("No userId or priceId in session metadata", { status: 200 });
      }

      console.log("Processing checkout.session.completed for userId:", userId);

      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
      if (paymentIntent.status === "succeeded") {
        let tokensToAdd = 0;
        switch (priceId) {
          case "price_1PRCL4P3PzZi6quKwR3gQe2C":
            tokensToAdd = 50;
            break;
          case "price_1PRCL1P3PzZi6quKrRQXpV6j":
            tokensToAdd = 100;
            break;
          case "price_1PRCKwP3PzZi6quKyj5lvvQ1":
            tokensToAdd = 200;
            break;
          default:
            console.error("Unknown priceId:", priceId);
            return NextResponse.json("Unknown priceId", { status: 400 });
        }

        console.log(`Adding ${tokensToAdd} tokens to userId: ${userId}`);
        try {
          await db.user.update({
            where: { id: userId },
            data: { tokenBalance: { increment: tokensToAdd } },
          });
          console.log("Token balance updated successfully for userId:", userId);
        } catch (error) {
          console.error("Error updating token balance for userId:", userId, error);
          return NextResponse.json("Error updating token balance", { status: 500 });
        }
      } else {
        console.error("Payment not succeeded for userId:", userId);
        return NextResponse.json("Payment not succeeded", { status: 400 });
      }
    } catch (error) {
      console.error("Error processing checkout.session.completed:", error);
      return NextResponse.json("Error processing checkout.session.completed", { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
