import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { execute } from "../graphql/execute";
import Loader from "./Loader";
import SidebarCharacterRow from "./SidebarCharacterRow";
import { StarredIdsContext } from "../context/starredIds";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sidebarCharactersQuery } from "../lib/queries/characters";
import { FilterCharacter, SidebarCharactersQuery } from "../graphql/graphql";

const SidebarContent = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<FilterCharacter>({});
  const { starredIds } = useContext(StarredIdsContext);
  const [starredCharactersCount, setStarredCharactersCount] = useState(0);
  const [totalCharactersCount, setTotalCharactersCount] = useState(0);
  const [charactersData, setCharactersData] =
    useState<SidebarCharactersQuery | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["characters", filter],
    queryFn: () =>
      execute(sidebarCharactersQuery, {
        filter,
      }),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFilter(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  useEffect(() => {
    const newData = data?.data?.characters?.results;
    if (!newData?.length) return;

    setTotalCharactersCount(newData.length);
    setCharactersData(data!.data!);
  }, [data]);

  useEffect(() => {
    setStarredCharactersCount(starredIds.length);
  }, [starredIds]);

  useEffect(() => {
    setTotalCharactersCount(
      (charactersData?.characters?.results?.length || 0) -
        starredCharactersCount,
    );
  }, [starredCharactersCount, charactersData]);

  const handleClick = (id: string) => {
    // Conserve search params in case it's in filtered view
    navigate(`/${id}?${searchParams.toString()}`);
  };

  if (isLoading) return <Loader />;
  if (error) {
    console.error(error);
  }

  return (
    <div className="px-4 pt-5">
      <h3 className="mb-4 pl-5 text-xs font-semibold tracking-[5%] text-gray-500">
        STARRED CHARACTERS ({starredCharactersCount})
      </h3>
      <div>
        {charactersData?.characters?.results
          ?.filter((c) => c !== null && starredIds.includes(c.id || ""))
          .map((c) => {
            if (!c) return null;
            return (
              <SidebarCharacterRow
                onClick={() => handleClick(c.id || "")}
                key={c.id}
                character={c}
              />
            );
          })}
      </div>
      <h3 className="my-4 pl-5 text-xs font-semibold tracking-[5%] text-gray-500">
        CHARACTERS ({totalCharactersCount})
      </h3>
      <div>
        {charactersData?.characters?.results
          ?.filter((c) => c !== null && !starredIds.includes(c.id || ""))
          .map((c) => {
            if (!c) return null;
            return (
              <SidebarCharacterRow
                onClick={() => handleClick(c.id || "")}
                key={c.id}
                character={c}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SidebarContent;
