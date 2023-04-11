import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-lg">
        <p className="mb-5">TechTalQ</p>

        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/interview"
        >
          Start
        </Link>
      </div>
    </main>
  );
};

export default Home;
