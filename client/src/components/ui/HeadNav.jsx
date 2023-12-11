import { Bell, BookCheck, Inbox, MoreVertical, Plus } from "lucide-react";
import { SideSheet } from "./SideSheet";
import { Menu } from "./Menu";
import { useQuery } from "react-query";
import { api } from "@/api";
import { NotificationCard } from "../notification/NotificationCard";
import { Loader } from "./Loader";
import { Button } from "flowbite-react";
import { ProfileSheet } from "../notification/ProfileSheet";
import { StatsSheet } from "../notification/StatsSheet";
import { EnrollSheet } from "../notification/EnrollSheet";

export const HeadNav = ({ title }) => {
  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notification/");
      return data;
    },
  });
  return (
    <div className="py-3 font-logo border w-full px-4 text-lg opacity-80 flex items-center justify-between bg-white">
      <span className="font-logo">{title}</span>
      <span className="flex items-center space-x-5 font-logo font-light">
        {/* <button className="border p-1 px-4 text-[14px] cursor-pointer hover:bg-slate-100 rounded-[0.2rem] active:bg-slate-300 focus:outline-none">
          Today
        </button> */}
        <SideSheet heading={"Enroll New Student"} content={<EnrollSheet />}>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Plus className="opacity-90" size={20} />
          </button>
        </SideSheet>
        <SideSheet
          heading={"Performances"}
          sub={
            <div className="text-[12px] opacity-70">
              Students' Average Score in the last 30 days
            </div>
          }
          content={<StatsSheet />}
        >
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <BookCheck className="opacity-90" size={20} />
          </button>
        </SideSheet>
        <Menu
          content={
            <NotificationList
              notifications={notifications}
              notificationsLoading={notificationsLoading}
            />
          }
        >
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <Bell size={20} className="opacity-90" />
          </button>
        </Menu>

        <SideSheet heading="Account Settings" content={<ProfileSheet />}>
          <div className="w-[25px] h-[25px] rounded-full bg-app-background-1 ring-1 ring-app_side_hover cursor-pointer active:scale-90 transition-all duration-50 ease-in">
            {" "}
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
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

export const NotificationList = ({ notifications, notificationsLoading }) => {
  return (
    <div className="max-h-[100px] w-full overflow-y-auto">
      <div className="flex w-full justify-between items-center mb-5">
        <div className="text-[18px] font-logo">Notifications</div>
        <div className="text-app_tertiary font-logo text-[12px] cursor-pointer bg-none border-none">
          Clear All
        </div>
      </div>
      <div>
        {!notificationsLoading ? (
          notifications?.map(() => {
            return <NotificationCard />;
          })
        ) : (
          <div className="w-full flex items-center justify-center">
            <Loader width={20} height={20} />
          </div>
        )}
      </div>
      {/* {(!notifications && !notificationsLoading) && ( */}
      <div className="flex items-center flex-col">
        {/* <Inbox className="opacity-40" /> */}
        <div className="opacity-50 w-full text-[12px] flex items-center justify-center font-logo">
          No Notifications
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
