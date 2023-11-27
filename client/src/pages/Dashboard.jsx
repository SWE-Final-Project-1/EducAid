import { Bell, BookCheck, MoreVertical, Plus, PlusCircle } from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import { useState } from "react";
import { RubricTable } from "../components/rubric/RubricTable";

export const Dashboard = () => {
  const [sizes, setSizes] = useState([100, "8%", "auto"]);

  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <ContentScrollable
          nav1={
            <div className="py-3 font-logo shadow-app_shadow_light w-full px-4 text-lg opacity-80 flex items-center justify-between">
              <span className="font-logo">Dashboard </span>
              <span className="flex items-center space-x-5 font-logo font-light">
                <span className="border p-1 px-4 text-[14px] cursor-pointer rounded-[0.2rem]">Today</span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <Plus size={20} />
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <BookCheck size={20}/>
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <Bell size={20}/>
                </span>
                <span className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem]">
                  <MoreVertical size={20}/>
                </span>
              </span>
            </div>
          }
          content={
            <div className="w-full bg-slate-100 h-full">
              <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                <Pane
                  minSize={"70%"}
                  maxSize={"60%"}
                  className="border border-r shadow-app_shadow_light"
                >
                  <div className="w-full h-full">
                    <RubricTable/>
                  </div>
                </Pane>
                <Pane>
                  <div className="w-full h-full"></div>
                </Pane>
              </SplitPane>
            </div>
          }
        />
      }
    />
  );
};
