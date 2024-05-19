'use client'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white mb-5">
            Login
          </h1>
          <div>
            <h1>Github OAuth Demo</h1>

            {!session ? (
              <>
                <button onClick={() => signIn("github")}>
                  Sign in with Github
                </button>
              </>
            ) : (
              <>
                <p>
                  Not {session.user.name || session.user.email}? Then
                  Logout and login again
                </p>
                <button onClick={signOut}>Logout</button> <br />
              </>
            )}
          </div>
          <form className="w-full flex flex-col items-center space-y-5" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="email" className="grow" placeholder="Email" value={email} onChange={handleEmailChange} />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </label>
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
