import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { jobs } from "../../utils/jobs";
import { Job } from "../../utils/types";

const SingleJob: NextPage<JobProps> = ({ job }) => {
  return (
    <Layout>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex h-32 w-full rounded-lg ">
          <div className="flex h-full w-2/12 items-center justify-center rounded-l-md bg-orange-400">
            <p className="text-center text-xl font-semibold text-white">
              {job.company}
            </p>
          </div>
          <div className="flex h-full w-10/12 items-center justify-between rounded-r-md bg-white px-10">
            <div className="space-y-2">
              <div className="text-xl font-bold">{job.company}</div>
              <div className="text-sm font-medium text-gray-500/80">
                {job["web"].slice(7)}
              </div>
            </div>
            <button className="rounded-lg bg-indigo-200 px-5 py-4 font-bold text-indigo-500">
              Şirket Sitesi
            </button>
          </div>
        </div>
        <div className="h-full w-full space-y-3 rounded-lg bg-white px-12 py-10">
          <div className="space-x-2 text-sm font-medium text-gray-500/80">
            <span>5h ago</span>
            <span>·</span>
            <span>{job.jobType}</span>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-4xl font-bold">{job.department}</div>
              <h2 className="space-x-2 text-sm font-semibold text-blue-600">
                {job.country}
              </h2>
            </div>
            <button className="rounded-lg bg-indigo-500 px-5 font-bold text-white">
              Şimdi Başvur!
            </button>
          </div>
          <p className="pt-3 text-sm font-medium text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            magni doloribus sint iusto, architecto, amet voluptas vitae eveniet
            ipsum dicta rem! Modi enim inventore dolorum quibusdam, cupiditate
            error corrupti unde? Unde, eos ducimus. Repellendus error esse neque
            praesentium ut ducimus impedit consequatur, sapiente consequuntur,
            aliquid cum dolorum reiciendis eligendi pariatur?
          </p>
          <h1 className="text-2xl font-semibold">Requirements</h1>
          <p className="pt-3 text-sm font-medium text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iure
            animi obcaecati esse optio unde ipsum iste pariatur, amet quos fuga
            placeat, fugit vero debitis temporibus veniam aliquid ut beatae
            laudantium excepturi! Itaque eius pariatur totam deleniti nisi quo
            et illum quaerat dicta eaque, fugiat, quasi id excepturi, esse earum
            cupiditate aperiam repellat eligendi expedita veritatis recusandae
            dolorem. Ex magni magnam sapiente provident itaque repellendus
            fugiat vero veniam obcaecati optio?
          </p>
          <ul className="mt-4 list-disc pl-5 text-sm font-medium text-gray-500">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
              quasi?
            </li>
            <li>Sit amet consectetur adipisicing elit.</li>
            <li>
              Suscipit eligendi nulla architecto atque sapiente accusamus
              nostrum ullam! Saepe quaerat adipisci debitis reiciendis
              praesentium?
            </li>
            <li>
              Assumenda error necessitatibus molestias saepe et quos porro
              placeat esse, tempore, ea sit magnam. Commodi, iste in!
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SingleJob;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type JobProps = {
  job: Job;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { slug: "sft-eng-1" } },
      { params: { slug: "ui-dsg-1" } },
      { params: { slug: "sys-dsg-1" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const job = jobs.find((item) => item.slug === slug);
  return {
    props: {
      job,
    },
  };
};
