// src/app/auth/error/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-5xl md:text-6xl text-white mb-5">
          Authentication Error
        </h1>
        <p className="text-white">{error}</p>
      </div>
    </div>
  );
}
