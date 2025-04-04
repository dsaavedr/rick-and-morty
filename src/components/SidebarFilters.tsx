import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  visible?: boolean;
  search: string;
  onFilter?: () => void;
};

const Species = ["all", "human", "alien"] as const;
const Status = ["all", "alive", "dead", "unknown"] as const;
type SpeciesType = ElementType<typeof Species>;
type StatusType = ElementType<typeof Status>;

type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

const SidebarFilters = ({ visible, search, onFilter }: Props) => {
  const [, setSearchParams] = useSearchParams();
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("all");

  const disabled =
    selectedSpecies === "all" && selectedStatus === "all" && !search;

  const handleFilter = () => {
    const params: {
      species?: SpeciesType;
      status?: StatusType;
      name?: string;
    } = {};

    if (selectedSpecies !== "all") {
      params.species = selectedSpecies;
    }
    if (selectedStatus !== "all") {
      params.status = selectedStatus;
    }
    if (search) {
      params.name = search;
    }

    const urlParams = new URLSearchParams(params);
    setSearchParams(urlParams);
    if (onFilter) onFilter();
  };

  return (
    <div
      hidden={!visible}
      className="custom-shadow-sm rounded-md border border-gray-200 bg-white p-6"
    >
      <h4 className="mb-2 text-sm text-gray-500">Species</h4>
      <div className="mb-6 flex items-center gap-2">
        {Species.map((el) => (
          <button
            key={el}
            className={`filter-option capitalize ${selectedSpecies === el ? "selected" : ""}`}
            onClick={() => setSelectedSpecies(el)}
          >
            {el}
          </button>
        ))}
      </div>
      <h4 className="mb-2 text-sm text-gray-500">Status</h4>
      <div className="mb-6 flex items-center gap-2">
        {Status.map((el) => (
          <button
            key={el}
            className={`filter-option capitalize ${selectedStatus === el ? "selected" : ""}`}
            onClick={() => setSelectedStatus(el)}
          >
            {el}
          </button>
        ))}
      </div>
      <button
        disabled={disabled}
        onClick={handleFilter}
        className={`w-full rounded-lg py-2 text-sm font-medium ${disabled ? "pointer-events-none bg-gray-100 text-gray-500" : "bg-primary-600 cursor-pointer text-white"}`}
      >
        Filter
      </button>
    </div>
  );
};

export default SidebarFilters;
