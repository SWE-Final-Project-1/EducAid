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
import { HeadNav } from "@/components/ui/HeadNav";

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
            nav1={<HeadNav title={"Grade Submissions"} />}
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
