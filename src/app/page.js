'use client'
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PortfolioGraph from './components/PortfolioGraph';

async function getData() {
  const res = await fetch('/api');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

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
          <p className="mt-4 text-lg leading-relaxed text-white">
            Data: {data ? JSON.stringify(data, null, 2) : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}
