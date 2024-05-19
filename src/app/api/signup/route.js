// import { NextResponse } from 'next/server';
// import clientPromise from '../../lib/mongodb';
// const bcrypt = require('bcryptjs');

// // User model
// const User = require('../../models/user');

// export async function POST(req) {
// const client = await clientPromise;
// const database = client.db('fineas-dev'); // Choose a name for your database 
// const collection = database.collection('users'); // Choose a name for your collection 

//   const { email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.rewrite('/signup').json({ msg: 'User already exists' });
//     }

//     // Create new user
//     user = new User({
//       email,
//       password,
//     });

//     // Hash password and save user
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();
//     return NextResponse.json('User signed up successfully')
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: 'Internal server error' })
//   }

// }
// import { NextResponse } from 'next/server';
// import clientPromise from '../../lib/mongodb';
// import User from '../../models/user';

// const bcrypt = require('bcryptjs');


// export async function POST(req) {

//   const client = await clientPromise;
//   const database = client.db('fineas-dev'); // Choose a name for your database 
//   const collection = database.collection('users'); // Choose a name for your collection 

//   const { email, password } = req.body;

//   console.log(JSON.stringify(req.body));

//   const existingUer = await User.findOne({ email });

//   if (existingUer) {
//     return NextResponse("Invalid email", { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 8);
//   const newUser = new User({
//     email,
//     password: hashedPassword
//   });

//   try {
//     await newUser.save();
//     return NextResponse("User is registered", { status: 200 });
//   } catch (error) {
//     return NextResponse("Internal server error", { status: 500 });
//   }

// }

// src/app/api/signup/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import User from '../../models/user';

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
