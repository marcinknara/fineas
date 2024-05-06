'use client'
import React from 'react';
import Navbar from './components/Navbar';
import PortfolioGraph from './components/PortfolioGraph';


export default function HomePage() {
  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white">
            Welcome to <span className="text-blue-300">Fineas</span>
          </h1>
          <PortfolioGraph />
          <p className="mt-4 text-lg leading-relaxed text-white">
            An AI financial assistant, just for you. Powered by machine learning models to provide you the financial clarity you need.
          </p>
        </div>
      </div>
    </div>
  );
}
