// import { connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  const topic = await topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
