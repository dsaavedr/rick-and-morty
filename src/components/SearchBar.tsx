import React, { ChangeEventHandler } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustments } from "react-icons/hi";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  onIconClick: () => void;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({
  className,
  value,
  onChange,
  onIconClick,
  ...props
}: Props) => {
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
        value={value}
        onChange={onChange}
      />
      <HiOutlineAdjustments
        className="text-primary-600 ml-auto cursor-pointer"
        size={20}
        onClick={onIconClick}
      />
    </div>
  );
};

export default SearchBar;
