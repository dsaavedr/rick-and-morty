import { IoMdClose } from "react-icons/io";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";

type Props = {
  drawerOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ drawerOpen, onClose }: Props) => {
  return (
    <div
      className={`relative h-screen w-screen min-w-[350px] overflow-y-scroll pt-10 text-[#111827] transition-all sm:w-auto ${!drawerOpen ? "ml-[-100vw]" : ""} sm:ml-0`}
    >
      <IoMdClose
        className="text-primary-600 absolute top-2 right-2 cursor-pointer sm:hidden"
        onClick={onClose}
        size={25}
      />
      <SidebarHeader />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
