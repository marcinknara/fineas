import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import Navbar from '../components/Navbar';

export default async function Login() {

  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white mb-5">
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
