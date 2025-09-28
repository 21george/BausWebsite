import { NextResponse } from "next/server";
import { getOnlineCourses } from "../../../utils/courseDatabase";

export async function GET() {
    try {
        const result = await getOnlineCourses();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in get-courses API:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: "Failed to fetch courses",
                data: []
            },
            { status: 500 }
        );
    }
}