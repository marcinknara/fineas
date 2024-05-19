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

// import mongoose from "mongoose";

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI!);
//   } catch (e) {
//     throw new Error("Failed to connect to MongoDB");
//   }
// };

// export default connect;
