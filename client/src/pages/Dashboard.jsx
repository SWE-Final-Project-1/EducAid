import { Bell, BookCheck, MoreVertical, Plus, PlusCircle } from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Pane } from "split-pane-react";
import { useState } from "react";
import { RubricTable } from "../components/rubric/RubricTable";
import { Dialog } from "../components/ui/Dialog";
import { HeadNav } from "@/components/ui/HeadNav";
// import { Drawer } from "../components/ui/Drawer";

export const Dashboard = () => {
  const [sizes, setSizes] = useState([100, "8%", "auto"]);
  // console.log(import.meta.env.VITE_API_URL_DEV)

  return (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={<HeadNav title={"Dashboard"} />}
            content={
              <div className="w-full bg-white h-full">
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                  <Pane minSize={"70%"} maxSize={"60%"} className="">
                    <div className="w-full h-full">
                      {/* <button
                        className="btn"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        open modal
                      </button> */}

                      <Dialog content={<RubricTable />} />
                      {/* <RubricTable/> */}
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
    </>
  );
};
