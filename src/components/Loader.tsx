import { TbLoader } from "react-icons/tb";

const Loader = () => {
  return (
    <TbLoader
      className="text-primary-600 mx-auto mt-10 animate-spin"
      size={50}
    />
  );
};

export default Loader;
