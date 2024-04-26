import Navbar from "../components/Navbar";

export default function Phineas() {
  return <div className='bg-[url("/277.jpg")] w-full bg-cover bg-center'>
    <Navbar />
    <div className="min-h-screen">
      <div className="text-center pt-48 pb-12">
        <h1 className="font-extrabold text-5xl md:text-6xl text-white">
          Phineas
        </h1>
      </div>
    </div>
  </div>
}