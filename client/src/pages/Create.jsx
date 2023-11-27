import {
  BarChart,
  Bell,
  BookCheck,
  Gauge,
  HelpingHand,
  HomeIcon,
  Layers,
  MoreVertical,
  Plus,
  PlusCircle,
  Settings,
  Users2,
} from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { SideNav } from "../components/ui/SideNav";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { CreateAssignmentForm } from "../components/create/CreateAssignmentForm";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { useState } from "react";
import { CreateAssignmentPreview } from "../components/create/CreateAssignmentPreview";
import { INSTRUCTOR_TAB_ICONS } from "../constants";

export const Create = () => {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);

  return (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={
              <div className="py-3 shadow-app_shadow_light w-full px-4 font-logo text-lg opacity-80 flex items-center justify-between">
                <span>Create Assignment</span>

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
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                  <Pane
                    minSize={"35%"}
                    maxSize={"40%"}
                    className="border border-r shadow-app_shadow_light"
                  >
                    <div className="w-full h-full">
                      <CreateAssignmentForm />
                    </div>
                  </Pane>
                  <Pane className="bg-slate-100">
                    <div className="w-full h-full">
                      <CreateAssignmentPreview />
                    </div>
                  </Pane>
                </SplitPane>
              </div>
            }
          />
        }
      />
    </>
  );
};
