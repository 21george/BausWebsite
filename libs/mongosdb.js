import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_CoNNECTION;
const options = { useNewURLParser: true, useUnifiedToppology: true };
let cachedClient = null;

export const connectionDatabase = async () => {
  if (cachedClient) return cachedClient;
  const client = await MongoClient.connect(uri, options);
  cachedClient = client;
  console.log(client, "Conneccted to database");
  return client;
};
