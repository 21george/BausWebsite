import { NextResponse } from "next/server";
import { getOnlineCourses } from "../../actions/onlinecourses/CourseActions";
import { logger } from "../../../utils/logger";

export async function GET() {
    try {
        const result = await getOnlineCourses();
        return Response.json(result);
    } catch (error) {
        logger.error("Error in get-courses API:", error);
        return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}