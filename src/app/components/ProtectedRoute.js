// src/components/ProtectedRoute.js
'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!isUser) signIn(); // Redirect to login
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Show a loading state while the user session is being checked
  return <div>Loading...</div>;
};

export default ProtectedRoute;
