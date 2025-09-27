import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Test basic API functionality
        return NextResponse.json({
            success: true,
            message: "Online courses API is working",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Test API error:", error);
        return NextResponse.json(
            { success: false, error: "Test API failed" },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        return NextResponse.json({
            success: true,
            message: "POST endpoint working"
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "POST test failed" },
            { status: 500 }
        );
    }
}