import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

try {
    await client.connect();
} catch(e) {
    console.error(e);
}

let db = await client.db("todoslist");
export default db;