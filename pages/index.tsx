import { InfoCircleFilled } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import skillsDataset from "./../data/skills.json"
import rolesDataset from "./../data/roles.json"

const Home = () => {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/interview",
      query: { skills, yearsOfExperience, jobDescription, jobRole },
    });
  };
  return (
    <main className="h-screen flex flex-col items-center justify-between p-24">
      <div className="z-10 w-1/2 max-w-5xl font-mono">
        <h1 className="mb-5 text-2xl font-bold text-center text-primary-300">
          TechTalQ
        </h1>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="skills">
                Job Role*
                <Tooltip title="'Job role' refers to the specific position or title that an interview candidate is applying for within the organization.">
                  <InfoCircleFilled className="ml-2 align-top" />
                </Tooltip>
              </label>
              <Select
                id="jobRole"
                className="appearance-none rounded relative
                  w-full
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300x focus:z-10 sm:text-sm"
                placeholder="Please select"
                value={jobRole}
                onChange={(values) => setJobRole(values)}
                options={rolesDataset.map(val => ({label: val, value: val}))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="skills">
                Skills* (upto 5)
                <Tooltip title='"Skills" refer to the specific abilities and knowledge required to perform technical tasks related to a particular job or industry.'>
                  <InfoCircleFilled className="ml-2 align-top" />
                </Tooltip>
              </label>
              <Select
                id="skills"
                mode="tags"
                allowClear
                className="appearance-none rounded relative
                  w-full
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300x focus:z-10 sm:text-sm"
                placeholder="Please select"
                value={skills}
                onChange={(values) => values?.length < 6 && setSkills(values)}
                options={skillsDataset.map(val => ({label: val, value: val}))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="years-of-experience">
                Years Of Experience*
                <Tooltip title='"Years of experience" refer to the amount of time a candidate has worked in a particular field or industry.'>
                  <InfoCircleFilled className="ml-2 align-top" />
                </Tooltip>
              </label>
              <div className="w-full flex items-center gap-4">
                <input
                  id="years-of-experience"
                  name="years-of-experience"
                  type="range"
                  autoComplete="Years Of Experience"
                  min="0"
                  max="10"
                  required
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-primary-300"
                  placeholder="Years Of Experience"
                  value={yearsOfExperience}
                  onChange={(val) => setYearsOfExperience(+val.target.value)}
                />
                <div>{yearsOfExperience}</div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="job-description">
                Job Description
                <Tooltip title='"Job description" is a document that outlines the duties, responsibilities, and requirements for a specific job or position within an organization.'>
                  <InfoCircleFilled className="ml-2 align-top" />
                </Tooltip>
              </label>
              <textarea
                id="job-description"
                name="job-description"
                autoComplete="Job Description"
                className="appearance-none rounded relative block h-40
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-primary-300 bg-primary-300
                  focus:border-primary-300 focus:z-10 sm:text-sm"
                placeholder="Job Description"
                value={jobDescription}
                onChange={(val) => setJobDescription(val.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!jobRole || !skills || skills.length === 0}
              className="group mx-auto relative w-1/3 flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed
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
