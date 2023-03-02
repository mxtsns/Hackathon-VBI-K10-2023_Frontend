import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full h-[2rem] flex items-center">
      <div className="relative flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 block w-[1%] min-w-0 flex-auto rounded-[1.25rem] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-[#d2d2d2] outline-none transition duration-300 ease-in-out focus:border-[#03C988] focus:text-[#d2d2d2] focus:shadow-te-primary focus:outline-none dark:border-[#1C82AD] dark:text-[#d2d2d2] dark:placeholder:text-[#d2d2d2]/40"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
  );
};

export default SearchBar;
