import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { execute } from "../graphql/execute";
import { characterDetailQuery } from "../lib/queries/characters";
import Loader from "./Loader";
import { useContext, useEffect, useState } from "react";
import { CharacterDetailQuery } from "../graphql/graphql";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { StarredIdsContext } from "../context/starredIds";
import CharacterDetailRow from "./CharacterDetailRow";
import { RxHamburgerMenu } from "react-icons/rx";

type Props = {
  onMenuClick: () => void;
  drawerOpen: boolean;
};

const CharacterDetail = ({ onMenuClick, drawerOpen }: Props) => {
  const { id } = useParams();
  const [characterData, setCharacterData] =
    useState<CharacterDetailQuery | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["character", id || ""],
    queryFn: () => {
      if (id) return execute(characterDetailQuery, { id });
    },
  });
  const { starredIds } = useContext(StarredIdsContext);

  useEffect(() => {
    if (!data) return;
    setCharacterData(data.data);
  }, [data]);

  if (!id)
    return (
      <div
        className={`custom-shadow-lg relative flex-1 p-6 lg:px-[6.25rem] ${drawerOpen ? "hidden" : "visible"} sm:block`}
      >
        <RxHamburgerMenu
          onClick={onMenuClick}
          size={25}
          className="text-primary-600 absolute top-2 left-2 cursor-pointer sm:hidden"
        />
        <p className="mt-5">Select a character to get more details!</p>
      </div>
    );

  if (!characterData || isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div
      className={`custom-shadow-lg relative flex-1 p-6 pt-16 sm:pt-6 lg:px-[6.25rem] ${drawerOpen ? "hidden" : "visible"} sm:block`}
    >
      <RxHamburgerMenu
        onClick={onMenuClick}
        size={25}
        className="text-primary-600 absolute top-4 left-2 cursor-pointer sm:hidden"
      />
      <div className="relative mb-2 h-[75px] w-[75px]">
        <img
          className="h-full rounded-full"
          src={characterData.character?.image || ""}
          alt={characterData.character?.name || ""}
        />
        <div className="absolute right-[-10px] bottom-0 ml-auto h-8 w-8 rounded-full bg-white p-1">
          {starredIds.includes(id) ? (
            <IoMdHeart size={24} className="fill-secondary-600" />
          ) : (
            <IoMdHeartEmpty
              strokeWidth={2}
              className="text-gray-300"
              size={24}
            />
          )}
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-bold">
        {characterData.character?.name}
      </h2>

      <div>
        <CharacterDetailRow
          title="Species"
          content={characterData.character?.species}
        />
        <CharacterDetailRow
          title="Type"
          content={characterData.character?.type}
        />
        <CharacterDetailRow
          title="Status"
          content={characterData.character?.status}
        />
        <CharacterDetailRow
          title="Universe"
          content={characterData.character?.origin?.name}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
