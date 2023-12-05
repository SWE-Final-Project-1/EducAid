import { Bell, BookCheck, MoreVertical, Plus } from "lucide-react";
import { SideSheet } from "./SideSheet";
import { Menu } from "./Menu";

export const HeadNav = ({ title }) => {
  return (
    <div className="py-3 font-logo shadow-app_shadow_light w-full px-4 text-lg opacity-80 flex items-center justify-between">
      <span className="font-logo">{title}</span>
      <span className="flex items-center space-x-5 font-logo font-light">
        <button className="border p-1 px-4 text-[14px] cursor-pointer hover:bg-slate-100 rounded-[0.2rem] active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-300">
          Today
        </button>
        <SideSheet>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Plus size={20} />
          </button>
        </SideSheet>
        <SideSheet>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <BookCheck size={20} />
          </button>
        </SideSheet>
        <Menu>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Bell size={20} />
          </button>
        </Menu>
        <Menu>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <MoreVertical size={20} />
          </button>
        </Menu>
      </span>
    </div>
  );
};
