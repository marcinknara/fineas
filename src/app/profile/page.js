import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";

export default async function Profile() {

  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white">
            Profile
          </h1>
        </div>
      </div>
    </div>
  );
}