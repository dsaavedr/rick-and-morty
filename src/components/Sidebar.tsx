import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="h-screen pt-10 text-[#111827]">
      <SidebarHeader />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
