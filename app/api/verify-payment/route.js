import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe only if the secret key is available
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request) {
    try {
        // Check if Stripe is configured
        if (!stripe) {
            return NextResponse.json(
                { success: false, error: "Stripe is not configured" },
                { status: 500 }
            );
        }

        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: "Session ID is required" },
                { status: 400 }
            );
        }

        // Retrieve the checkout session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent']
        });

        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { success: false, error: "Payment not completed" },
                { status: 400 }
            );
        }

        // Extract course information from metadata
        const courseTitle = session.metadata?.courseTitle || 'Online Kurs';
        const customerName = session.metadata?.customerName || session.customer_details?.name;

        return NextResponse.json({
            success: true,
            data: {
                payment_intent: session.payment_intent.id,
                amount_total: session.amount_total,
                currency: session.currency,
                customer_email: session.customer_details?.email || session.customer_email,
                customer_name: customerName,
                course_title: courseTitle,
                payment_status: session.payment_status
            }
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}