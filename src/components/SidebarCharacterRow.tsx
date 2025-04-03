import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

type Props = {
  character: {
    id?: string | null;
    image?: string | null;
    name?: string | null;
    species?: string | null;
  };
  starred?: boolean;
  onClick: (c: string) => void;
};

const SidebarCharacterRow = ({ character, starred, onClick }: Props) => {
  const c = character;

  return (
    <div className="hover:bg-primary-100 flex cursor-pointer items-center gap-4 border-t border-gray-200 px-5 py-4 hover:rounded-lg">
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
        onClick={() => onClick(c.id as string)}
        className="ml-auto h-8 w-8 cursor-pointer rounded-full bg-white p-1"
      >
        {starred ? (
          <IoMdHeart size={24} className="fill-secondary-600" />
        ) : (
          <IoMdHeartEmpty strokeWidth={2} className="text-gray-300" size={24} />
        )}
      </button>
    </div>
  );
};

export default SidebarCharacterRow;
