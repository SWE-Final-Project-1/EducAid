import { Bell, BookCheck, MoreVertical, Plus } from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";
import { HeadNav } from "@/components/ui/HeadNav";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import { useState } from "react";
import { ProfileArea } from "@/components/profile/ProfileArea";

export const Profile = () => {
  const [sizes, setSizes] = useState([100, "15%", "auto"]);
  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <ContentScrollable
          nav1={<HeadNav title={"My Profile"} />}
          content={
            <div className="w-full bg-slate-50 h-full">
              <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                <Pane
                  minSize={"35%"}
                  maxSize={"35%"}
                  className="border border-r shadow-app_shadow_light"
                >
                  <div className="w-full h-full">
                    <ProfileArea/>
                  </div>
                </Pane>
                <Pane className="bg-slate-100">
                  <div className="w-full h-full">
                  </div>
                </Pane>
              </SplitPane>
            </div>
          }
        />
      }
    />
  );
};
