import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Home = () => {
  const [skill, setSkill] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/interview",
      query: { skill, yearsOfExperience, jobDescription },
    });
  };
  return (
    <main className="h-screen flex flex-col items-center justify-between p-24">
      <div className="z-10 w-1/2 max-w-5xl font-mono">
        <h1 className="mb-5 text-2xl font-bold text-center text-primary-300">
          TechTalQ
        </h1>

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
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300 focus:z-10 sm:text-sm"
                placeholder="Skill"
                value={skill}
                onChange={(val) => setSkill(val.target.value)}
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
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300 focus:z-10 sm:text-sm"
                placeholder="Years Of Experience"
                value={yearsOfExperience}
                onChange={(val) => setYearsOfExperience(+val.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="job-description">Job Description</label>
              <input
                id="job-description"
                name="job-description"
                type="text"
                autoComplete="Job Description"
                required
                className="appearance-none rounded relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300 focus:z-10 sm:text-sm"
                placeholder="Job Description"
                value={jobDescription}
                onChange={(val) => setJobDescription(val.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group mx-auto relative w-1/3 flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-primary-600 hover:bg-primary-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-primary-500"
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
