import { useState } from "react";
import SearchBar from "./SearchBar";
import SidebarFilters from "./SidebarFilters";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFiltersOpen = () => setFiltersOpen((state) => !state);

  return (
    <div className="px-5">
      <h1 className="mb-6 text-2xl font-bold">
        <Link to="/">Rick and Morty list</Link>
      </h1>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onIconClick={toggleFiltersOpen}
        className="mb-4"
      />
      <SidebarFilters
        onFilter={() => setFiltersOpen(false)}
        search={search}
        visible={filtersOpen}
      />
    </div>
  );
};

export default SidebarHeader;
