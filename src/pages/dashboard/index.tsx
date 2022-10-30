import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import JobCard from "../../components/JobCard";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import { Job, JobProps } from "../../utils/types";
import { jobs } from "../../utils/jobs";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Index: NextPage<JobProps> = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  console.log(useSession());
  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <SearchBar
          filteredJobs={filteredJobs}
          setFilteredJobs={setFilteredJobs}
        />
        <main className="flex max-w-5xl flex-wrap justify-between gap-6">
          {filteredJobs.length === 0
            ? jobs.map((j) => (
                <Link key={j.id} href={`/job/${j.slug}`}>
                  <a>
                    <JobCard
                      jobType={j.jobType}
                      department={j.department}
                      company={j.company}
                      country={j.country}
                    />
                  </a>
                </Link>
              ))
            : filteredJobs.map((j) => (
                <Link key={j.id} href={`/job/${j.slug}`}>
                  <a>
                    <JobCard
                      jobType={j.jobType}
                      department={j.department}
                      company={j.company}
                      country={j.country}
                    />
                  </a>
                </Link>
              ))}
        </main>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<JobProps> = async () => {
  return {
    props: {
      jobs,
    },
  };
};

export default Index;
