// import { connectionDatabase } from "@/libs/mongosdb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectionDatabase();
  const db = client.db("");
  const collection = db.collection("");
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

// workdtais clletioc
export async function GetWorkDetails() {
  try {
    await connectionDatabase();
    const WorkDetails = await Topic.find();
    return NextResponse.json(JSON.stringify(WorkDetails), { status: 200 });
  } catch (error) {
    return new NextResponse("Filed to load data" + error.massage, {
      status: 500,
    });
  }
}






