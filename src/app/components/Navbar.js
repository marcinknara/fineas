'use client';
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to home page after sign out
  };

  return (
    <nav className="bg-purple-900 p-4">
      <ul className="flex justify-evenly text-2xl text-white font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/fineas">Fineas</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/openai">OpenAI</Link>
        </li>
        <li>
          <Link href="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}
