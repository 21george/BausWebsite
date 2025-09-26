import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updatePurchaseStatus } from "../../actions/onlinecourses/CourseActions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature || !webhookSecret) {
            console.error("Missing signature or webhook secret");
            return NextResponse.json(
                { error: "Missing signature" },
                { status: 400 }
            );
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return NextResponse.json(
                { error: "Webhook signature verification failed" },
                { status: 400 }
            );
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await handlePaymentSuccess(paymentIntent);
                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                await handlePaymentFailure(failedPayment);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook error" },
            { status: 500 }
        );
    }
}

async function handlePaymentSuccess(paymentIntent) {
    try {
        console.log("Payment succeeded:", paymentIntent.id);
        
        // Update purchase status to completed
        const result = await updatePurchaseStatus(paymentIntent.id, 'completed');
        
        if (result.success) {
            console.log("Purchase status updated successfully");
            
            // Send download links email
            await sendDownloadEmail(result.data);
        } else {
            console.error("Failed to update purchase status:", result.error);
        }
    } catch (error) {
        console.error("Error handling payment success:", error);
    }
}

async function handlePaymentFailure(paymentIntent) {
    try {
        console.log("Payment failed:", paymentIntent.id);
        
        // Update purchase status to failed
        await updatePurchaseStatus(paymentIntent.id, 'failed');
        
    } catch (error) {
        console.error("Error handling payment failure:", error);
    }
}

async function sendDownloadEmail(purchaseData) {
    try {
        // Send email with download links
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-course-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchaseId: purchaseData.id,
                customerEmail: purchaseData.customer_email,
                customerName: purchaseData.customer_name,
                downloadToken: purchaseData.download_token,
                courseId: purchaseData.course_id
            })
        });

        if (!emailResponse.ok) {
            console.error("Failed to send download email");
        } else {
            console.log("Download email sent successfully");
        }
    } catch (error) {
        console.error("Error sending download email:", error);
    }
}