import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import React, { useState } from "react";
import { Job } from "../utils/types";
import { jobs } from "../utils/jobs";

type Props = {
  setFilteredJobs: any;
  filteredJobs: Job[];
};

const SearchBar: FC<Props> = ({ setFilteredJobs, filteredJobs }) => {
  const [search, setSearch] = useState<string>("");
  const filterJobs = (value: Job[]): Job | Job[] => {
    return value.filter(
      (item) => item.department.toLowerCase() === search.toLowerCase()
    );
  };
  return (
    <div className="relative flex w-full items-center gap-2 rounded-md bg-white shadow-sm shadow-white">
      <div className="flex w-5/12 items-center gap-2 pl-4">
        <FaSearch color="#2c55d1" />
        <input
          className=" w-full  outline-none"
          placeholder="Lütfen aramak istediğiniz şeyi yazınız"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex w-4/12 items-center gap-2 border-x-2 py-5 px-2">
        <MdLocationPin color="#2c55d1" size={19} />
        <input
          className="w-full outline-none"
          placeholder="Lütfen lokasyon giriniz"
          type="text"
          name="text"
        />
      </div>
      <div className="flex w-3/12 items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <input
            className="h-4 w-4 border-none bg-slate-800 text-slate-800"
            type="checkbox"
            name="fulltime"
            id="fulltime"
          />
          <label
            className="text-sm font-semibold text-zinc-700"
            htmlFor="fulltime"
          >
            Full Time Only
          </label>
        </div>
        <button
          onClick={() => {
            setFilteredJobs(filterJobs(jobs));
          }}
          className="rounded-md bg-sky-700 px-8 py-2 text-white"
        >
          Ara
        </button>
      </div>
      {filteredJobs.length === 1 && (
        <button
          onClick={() => {
            setFilteredJobs([]);
          }}
          className="absolute right-0 -bottom-7  rounded-bl-md rounded-br-md bg-white px-2 py-1 font-light text-gray-800 shadow-sm shadow-white"
        >
          Aramayı Temizle
        </button>
      )}
    </div>
  );
};

export default SearchBar;
