import { NextResponse } from "next/server";

export async function GET() {
    try {
        const envStatus = {
            // Database
            supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            supabase_service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            
            // Stripe
            stripe_secret_key: !!process.env.STRIPE_SECRET_KEY,
            stripe_publishable_key: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
            
            // Email
            smtp_host: !!process.env.SMTP_HOST,
            smtp_user: !!process.env.SMTP_USER,
            smtp_pass: !!process.env.SMTP_PASS,
            email_to: !!process.env.EMAIL_TO,
            
            // Site
            next_public_url: !!process.env.NEXT_PUBLIC_URL
        };

        const missingVars = Object.entries(envStatus)
            .filter(([key, value]) => !value)
            .map(([key]) => key.toUpperCase());

        return NextResponse.json({
            success: true,
            environment_status: envStatus,
            missing_variables: missingVars,
            total_missing: missingVars.length,
            message: missingVars.length > 0 
                ? `Missing ${missingVars.length} environment variables`
                : "All environment variables are configured"
        });

    } catch (error) {
        console.error("Environment check error:", error);
        return NextResponse.json(
            { success: false, error: "Environment check failed" },
            { status: 500 }
        );
    }
}