import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustments } from "react-icons/hi";

const SearchBar = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={`flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-4 text-gray-500 ${className}`}
    >
      <CiSearch size={20} />
      <input
        className="text-sm font-medium outline-none"
        type="text"
        placeholder="Search or filter results"
        name="search"
        id="search"
      />
      <HiOutlineAdjustments className="text-primary-600 ml-auto" size={20} />
    </div>
  );
};

export default SearchBar;
