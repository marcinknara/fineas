//api route for everything to do with next auth

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
// import { sql } from "@vercel/postgres";
import clientPromise from "@/app/lib/mongodb";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [CredentialsProvider({
    credentials: {
      email: {},
      password: {}
    },
    //Within this is where we query our DB
    async authorize(credentials, req) {
      console.log({credentials})


      const client = await clientPromise;
      const db = client.db('fineas-dev');
      const collection = db.collection('users');

      const user = await collection.findOne({ email: credentials?.email });

      if (!user) {
        console.log('No user found with this email.');
        return null;
      }

      const passwordCorrect = await compare(credentials?.password || "", user.password);

      console.log({passwordCorrect});

      if (passwordCorrect) {
        return {
          id: user._id,
          email: user.email 
        };
      }

      return null;
    }
  })],  
})

export {handler as GET, handler as POST}