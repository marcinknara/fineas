// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const client = await clientPromise;
  const database = client.db('fineas-dev'); // Choose a name for your database 
  const collection = database.collection('users'); // Choose a name for your collection 

  const { email, password } = await req.json(); // Use req.json() to parse the JSON body

  console.log(JSON.stringify({ email, password }));

  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ message: "Could not create user." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = {
    email,
    password: hashedPassword
  };

  try {
    await collection.insertOne(newUser);
    return NextResponse.json({ message: "User signed up successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
