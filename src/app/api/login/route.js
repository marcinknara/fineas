// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const client = await clientPromise;
  const database = client.db('fineas-dev'); // Choose a name for your database 
  const collection = database.collection('users'); // Choose a name for your collection 

  const { email, password } = await req.json(); // Use req.json() to parse the JSON body

  console.log(JSON.stringify({ email, password }));

  const user = await collection.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
  }

  // If email and password are valid, consider user authenticated
  return NextResponse.json({ message: "User logged in successfully." }, { status: 200 });
}
