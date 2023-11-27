import { Bell, BookCheck, MoreVertical, Plus } from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";

export const Profile = () => {
  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <ContentScrollable
          nav1={
            <div className="py-3 shadow-app_shadow_light w-full px-4 font-logo text-lg opacity-80 flex items-center justify-between">
              <span>My Profile</span>

              <span className="flex items-center space-x-5 font-logo font-light">
                <span className="border p-1 px-4 text-[14px] cursor-pointer rounded-[0.2rem]">
                  Today
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <Plus size={20} />
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <BookCheck size={20} />
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <Bell size={20} />
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <MoreVertical size={20} />
                </span>
              </span>
              {/* <span className="flex items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer">
                  <PlusCircle className="mr-1" />
                  <span>Create Assignment</span>
                </span> */}
            </div>
          }
          content={
            <div className="w-full bg-slate-50 h-full">
              <div className="w-full h-full">
                Profile
              </div>
            </div>
          }
        />
      }
    />
  );
};
