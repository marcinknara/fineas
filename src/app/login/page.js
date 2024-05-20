import { getServerSession } from 'next-auth';
import LoginForm from './LoginForm';
import { redirect } from 'next/navigation';

export default async function Login() {

  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
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
