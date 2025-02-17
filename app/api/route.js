import { connectionDatabase } from "@/libs/mongosdb";
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






// pages/api/getAllData.js

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = new MongoClient(process.env.MONGO_DB_CoNNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("user_data_db");

            // Choose a name for your collection
            const collection = database.collection("WorkDetails");
            const allData = await collection.find({}).toArray();

            res.status(200).json(allData);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
