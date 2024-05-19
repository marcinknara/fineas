'use client';
import Navbar from "../components/Navbar";
import ProtectedRoute from '../components/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <ProtectedRoute>
        <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
          <Navbar />
          <div className="min-h-screen">
            <div>
              <h1>Profile Page</h1>
              <p>This is a protected route</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return null;
}

export default Profile;
