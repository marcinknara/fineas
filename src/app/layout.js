import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from './components/ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fineas",
  description: "By Marcin Knara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <main className="flex justify-evenly items-start min-h-screen min-w-screen">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
