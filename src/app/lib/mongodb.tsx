import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);

let clientPromise;
try {
  clientPromise = client.connect();
} catch (e) {
  console.error("Failed to connect to MongoDB", e);
}

export default clientPromise;
