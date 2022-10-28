import Link from "next/link";
import { FC, useState } from "react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const NavBar: FC = () => {
  const [toggle, setToggle] = useState<boolean>(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("toggle") as string)
  );

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between py-6">
      <Link href="/dashboard">
        <a>
          <div className="text-xl font-bold text-slate-50">devjobs</div>
        </a>
      </Link>
      <div className="flex items-center gap-2">
        <BsFillSunFill color="white" size={18} />
        <label
          htmlFor="default-toggle-size"
          className="relative inline-flex cursor-pointer"
        >
          <input
            type="checkbox"
            id="default-toggle-size"
            className="peer sr-only"
            onClick={() => {
              typeof window !== "undefined" &&
                setToggle((prev: boolean): boolean => {
                  const nextColor = prev === true ? false : true;
                  localStorage.setItem("toggle", JSON.stringify(nextColor));
                  return nextColor;
                });
            }}
            defaultChecked={toggle}
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        </label>
        <BsFillMoonStarsFill color="white" size={16} />
      </div>
    </div>
  );
};

export default NavBar;
