import { NextResponse } from "next/server";
import { connectionDatabase } from "@/libs/mongosdb";
import Topic from "@/models/Topic";

export async function GETworkdetails() {
  try {
    await connectionDatabase();
    const workDetails = await Topic.find();
    return NextResponse.json(workDetails, { status: 200 });
  } catch (error) {
    return new NextResponse(`Failed to load data: ${error.message}`, {
      status: 500,
    });
  }
}
