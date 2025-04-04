import { useContext } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { StarredIdsContext } from "../context/starredIds";

type Props = {
  character: {
    id?: string | null;
    image?: string | null;
    name?: string | null;
    species?: string | null;
  };
  onClick: () => void;
};

const SidebarCharacterRow = ({ character, onClick }: Props) => {
  const { starredIds, setStarredIds } = useContext(StarredIdsContext);
  const c = character;

  const toggleStarred = (id: string) => {
    if (starredIds.includes(id)) {
      setStarredIds((state) => state.filter((el) => el !== id));
      return;
    }

    setStarredIds((state) => [...state, id]);
  };

  if (!c.id) {
    return (
      <div className="hover:bg-primary-100 flex cursor-pointer items-center gap-4 border-t border-gray-200 px-5 py-4 hover:rounded-lg">
        <div>
          <p className="font-semibold">Jhon Doe</p>
          <p className="text-gray-500">This character couldn't be found. :/</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="hover:bg-primary-100 flex cursor-pointer items-center gap-4 border-t border-gray-200 px-5 py-4 hover:rounded-lg"
    >
      {c.image && (
        <img
          className="h-8 rounded-full"
          src={c.image}
          alt={`Image of ${c.name}`}
        />
      )}
      <div>
        <p className="font-semibold">{c.name}</p>
        <p className="text-gray-500">{c.species}</p>
      </div>
      <button
        onClick={() => toggleStarred(c.id!)}
        className="ml-auto h-8 w-8 cursor-pointer rounded-full bg-white p-1"
      >
        {starredIds.includes(c.id) ? (
          <IoMdHeart size={24} className="fill-secondary-600" />
        ) : (
          <IoMdHeartEmpty strokeWidth={2} className="text-gray-300" size={24} />
        )}
      </button>
    </div>
  );
};

export default SidebarCharacterRow;
