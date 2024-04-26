import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phineas",
  description: "By Marcin Knara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <main className="flex justify-evenly items-start min-h-screen min-w-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
