import clientPromise from '../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const client = await clientPromise;
  const database = client.db('sample_mflix'); // Choose a name for your database 

  try {
    const collection = database.collection('comments'); // Choose a name for your collection 
    const allData = await collection.find({}).limit(5).toArray();

    return NextResponse.json(allData)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server error' })
  }

}
