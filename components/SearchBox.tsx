import { Search } from "lucide-react";
import React from "react";

type Props = {};

const SearchBox = (props: Props) => {
  return (
    <>
      <form
        action="#"
        className="relative w-[450px] flex justify-center rounded-xl items-center bg-gray-100"
      >
        <input
          className="px-4 py-[.7rem] w-full bg-transparent outline-none placeholder:font-medium text-slate-900 rounded-xl"
          placeholder="Search"
        />
        <button className="absolute icon-btn border-l px-2 right-0 top-0 bottom-0">
          <Search />
        </button>
      </form>
    </>
  );
};

export default SearchBox;
