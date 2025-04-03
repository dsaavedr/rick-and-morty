import { useEffect, useState } from "react";
import { allCharactersQuery } from "../lib/queries/characters";
import { useQuery } from "@tanstack/react-query";
import { execute } from "../graphql/execute";
import Loader from "./Loader";
import { Character } from "../graphql/graphql";
import SidebarCharacterRow from "./SidebarCharacterRow";

const SidebarContent = () => {
  const [starredCharacterIds, setStarredCharacterIds] = useState<string[]>([]);
  const [starredCharactersCount, setStarredCharactersCount] = useState(0);
  const [totalCharactersCount, setTotalCharactersCount] = useState(0);
  const {
    data: { data },
    error,
    isLoading,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: () => execute(allCharactersQuery, { page: 1 }),
  });

  useEffect(() => {
    if (!data?.characters?.results?.length) return;

    setTotalCharactersCount(data?.characters?.results?.length);
  }, [data]);

  useEffect(() => {
    setStarredCharactersCount(starredCharacterIds.length);
  }, [starredCharacterIds]);

  useEffect(() => {
    setTotalCharactersCount(
      data?.characters?.results?.length - starredCharactersCount,
    );
  }, [starredCharactersCount, data]);

  const toggleStarred = (id: string) => {
    if (starredCharacterIds.includes(id)) {
      setStarredCharacterIds((state) => state.filter((el) => el !== id));
      return;
    }

    setStarredCharacterIds((state) => [...state, id]);
  };

  if (isLoading) return <Loader />;
  if (error) {
    console.error(error);
  }

  return (
    <div className="px-4 pt-5">
      <h2 className="mb-4 pl-5 text-xs font-semibold tracking-[5%] text-gray-500">
        STARRED CHARACTERS ({starredCharactersCount})
      </h2>
      <div className="">
        {data?.characters?.results
          ?.filter((c: Character) =>
            starredCharacterIds.includes(c.id as string),
          )
          .map((c: Character) => {
            if (!c) return null;
            return (
              <SidebarCharacterRow
                starred
                onClick={toggleStarred}
                character={c}
              />
            );
          })}
      </div>
      <h2 className="my-4 pl-5 text-xs font-semibold tracking-[5%] text-gray-500">
        CHARACTERS ({totalCharactersCount})
      </h2>
      <div className="">
        {data?.characters?.results
          ?.filter(
            (c: Character) => !starredCharacterIds.includes(c.id as string),
          )
          .map((c: Character) => {
            if (!c) return null;
            return (
              <SidebarCharacterRow onClick={toggleStarred} character={c} />
            );
          })}
      </div>
    </div>
  );
};

export default SidebarContent;
