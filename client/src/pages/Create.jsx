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
import { HeadNav } from "@/components/ui/HeadNav";

export const Create = () => {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);

  return (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={<HeadNav title={"Create Assignment"} />}
            content={
              <div className="w-full bg-white h-full">
                <SplitPane split="vertical" sizes={[550]} onChange={setSizes}>
                  <Pane
                    minSize={"35%"}
                    maxSize={"40%"}
                    className=""
                  >
                    <div className="w-full h-full">
                      <CreateAssignmentForm />
                    </div>
                  </Pane>
                  <Pane className="bg-app_slate">
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
