import { FC } from "react";

type Props = {
  jobType: string;
  department: string;
  company: string;
  country: string;
};

const JobCard: FC<Props> = ({ jobType, department, company, country }) => {
  return (
    <div className="relative ">
      <div className=" h-44 w-[325px] space-y-2 rounded-lg bg-slate-50 p-6 py-8">
        <div className="absolute -top-4 left-7 rounded-xl bg-red-800 p-5"></div>
        <div className="space-x-2 text-sm font-medium text-gray-500/80">
          <span>5h ago</span>
          <span>·</span>
          <span>{jobType}</span>
        </div>
        <h1 className="font-bold text-stone-900">{department}</h1>
        <h2 className="space-x-2 text-sm font-medium text-gray-500/80">
          {company}
        </h2>
        <h2 className="space-x-2 text-sm font-semibold text-blue-600">
          {country}
        </h2>
      </div>
    </div>
  );
};

export default JobCard;
