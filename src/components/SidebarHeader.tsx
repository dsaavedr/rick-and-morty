import SearchBar from "./SearchBar";

const SidebarHeader = () => {
  return (
    <div className="px-5">
      <h1 className="text-bold mb-6 text-2xl">Rick and Morty list</h1>
      <SearchBar className="mb-4" />
    </div>
  );
};

export default SidebarHeader;
