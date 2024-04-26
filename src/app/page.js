import React from 'react';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <div className='bg-[url("/277.jpg")] w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white">
            Welcome to <span className="text-blue-300">Phineas</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white">
            A personal financial assistant, just for you. Powered by the latest machine learning and artificial intelligence models to provide you the financial clarity you need.
          </p>
        </div>
      </div>
    </div>
  );
}
