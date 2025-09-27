import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createCoursePurchase, getCourseById } from "../../../utils/courseDatabase";

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
                { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables." },
                { status: 500 }
            );
        }

        const { courseId, customerName, customerEmail } = await request.json();

        if (!courseId || !customerName || !customerEmail) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get course details from your database
        const courseResult = await getCourseById(courseId);
        
        if (!courseResult.success) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        const course = courseResult.data;

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: course.title,
                            description: course.description || `Online Kurs: ${course.title}`,
                        },
                        unit_amount: Math.round(course.price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/course-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/OnlineKurse?cancelled=true`,
            customer_email: customerEmail,
            metadata: {
                courseId: courseId,
                customerName: customerName,
                customerEmail: customerEmail,
            },
            payment_intent_data: {
                metadata: {
                    courseId: courseId,
                    customerName: customerName,
                    customerEmail: customerEmail,
                }
            }
        });

        // Create pending purchase record
        const purchaseData = {
            course_id: courseId,
            customer_email: customerEmail,
            customer_name: customerName,
            stripe_payment_intent_id: session.payment_intent,
            stripe_session_id: session.id,
            amount_paid: course.price,
            currency: 'EUR',
            payment_status: 'pending'
        };

        const purchaseResult = await createCoursePurchase(purchaseData);
        
        if (!purchaseResult.success) {
            console.error("Failed to create purchase record:", purchaseResult.error);
            // Continue anyway, we'll handle it in the webhook
        }

        return NextResponse.json({ 
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}