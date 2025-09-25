import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export default async function Checkout(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await Stripe.Checkout.Sessions.create({
                payment_method: { type: ['card'] },
                mode: 'payment',
                line_items: [
                    {
                        price: process.env.STRIPE_PAYMENT_CURRENCY,
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CheckoutSession.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
            });
            
            res.status(200).json({ id: session.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}