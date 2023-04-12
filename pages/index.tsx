import Link from "next/link";
import { FormEvent } from "react";

const Home = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-1/2 max-w-5xl font-mono">
        <h1 className="mb-5 text-2xl font-bold text-center">TechTalQ</h1>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="skill">Skill</label>
              <input
                id="skill"
                name="skill"
                autoComplete="Skill"
                required
                className="appearance-none rounded relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Skill"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="years-of-experience">Years Of Experience</label>
              <input
                id="years-of-experience"
                name="years-of-experience"
                type="number"
                autoComplete="Years Of Experience"
                required
                className="appearance-none rounded relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Years Of Experience"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="job-description">Job Description</label>
              <input
                id="job-description"
                name="job-description"
                type="number"
                autoComplete="Job Description"
                required
                className="appearance-none rounded relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job Description"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group mx-auto relative w-1/3 flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;
