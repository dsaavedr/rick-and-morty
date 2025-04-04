type Props = {
  title: string;
  content?: string | null;
};

const CharacterDetailRow = ({ title, content }: Props) => {
  if (!content) return null;

  return (
    <div className="border-gray-200 py-4 [&:not(:last-child)]:border-b">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-gray-500">{content}</p>
    </div>
  );
};

export default CharacterDetailRow;
