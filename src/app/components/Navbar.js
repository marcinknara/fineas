import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-purple-900 p-4">
      <ul className="flex justify-evenly text-2xl text-white font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/phineas">Phineas</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
