import { Bell, BookCheck, MoreVertical, Plus } from "lucide-react";
import { SideSheet } from "./SideSheet";
import { Menu } from "./Menu";

export const HeadNav = ({ title }) => {
  return (
    <div className="py-3 font-logo border w-full px-4 text-lg opacity-80 flex items-center justify-between bg-white">
      <span className="font-logo">{title}</span>
      <span className="flex items-center space-x-5 font-logo font-light">
        {/* <button className="border p-1 px-4 text-[14px] cursor-pointer hover:bg-slate-100 rounded-[0.2rem] active:bg-slate-300 focus:outline-none">
          Today
        </button> */}
        <SideSheet>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Plus className="opacity-90" size={20} />
          </button>
        </SideSheet>
        <SideSheet>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <BookCheck className="opacity-90" size={20} />
          </button>
        </SideSheet>
        <Menu>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Bell size={20} className="opacity-90"/>
          </button>
        </Menu>

        <SideSheet>
          <div className="w-[25px] h-[25px] rounded-full bg-app-background-1 ring-1 ring-app_side_hover cursor-pointer active:scale-90 transition-all duration-50 ease-in">
            {" "}
            <img
              src={
                "data:image/jpeg;base64,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"
              }
              className="w-full h-full object-contain rounded-full "
            />
          </div>
        </SideSheet>
        {/* <Menu>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <MoreVertical size={20} />
          </button>
        </Menu> */}
      </span>
    </div>
  );
};
