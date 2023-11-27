import {
  Bell,
  BookCheck,
  Gauge,
  MoreVertical,
  Plus,
  PlusCircle,
  Settings,
  Users2,
} from "lucide-react";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { AppLayout } from "../components/ui/AppLayout";
import { SideNav } from "../components/ui/SideNav";
import { UploadAssignment } from "../components/upload/UploadAssignment";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import { UploadAssignmentPreview } from "../components/upload/UploadAssignmentPreview";
import { useState } from "react";
import { Loader } from "../components/ui/Loader";
import { INSTRUCTOR_TAB_ICONS } from "../constants";

export const Upload = () => {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);
  const [file, setFile] = useState(null);
  const handleFileChange = file => {
    setFile(file);
  };
  return (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={
              <div className="py-3 shadow-app_shadow_light w-full px-4 font-logo text-lg opacity-60 flex items-center justify-between">
                <span>Grade Assignment</span>
                {/* <span className="flex items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer">
                  <PlusCircle className="mr-1" />
                  <span>Create Assignment</span>
                </span> */}

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
              </div>
            }
            content={
              <div className="w-full bg-slate-50 h-full">
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                  <Pane
                    minSize={"40%"}
                    maxSize={"60%"}
                    className="border border-r shadow-app_shadow_light"
                  >
                    <div className="w-full h-full">
                      <UploadAssignment
                        file={file}
                        handleFileChange={handleFileChange}
                      />
                    </div>
                  </Pane>
                  <Pane>
                    <div
                      style={{ height: "calc(100vh - 4rem)" }}
                      className="w-full bg-slate-100 h-full p-5 overflow-y-auto"
                    >
                      <UploadAssignmentPreview file={file} />
                    </div>
                  </Pane>
                </SplitPane>
              </div>
            }
          />
        }
      />
      <Loader msg={"Generating Feedback ..."} />
    </>
  );
};
