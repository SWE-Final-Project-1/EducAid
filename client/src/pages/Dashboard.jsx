import {
  Bell,
  BookCheck,
  CheckCircle,
  MoreVertical,
  Plus,
  PlusCircle,
} from "lucide-react";
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
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
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
              <div className="w-full bg-white h-full px-4 py-8">
                <div className="w-full h-full">
                  <div className="flex items-center space-x-10 mx-auto">
                    <MetricsCard
                      color={"#d1dae1"}
                      icon={<CheckCircle className="opacity-60" />}
                      title={"Assignments"}
                      //  sub ={}
                      value={24}
                    />
                    <MetricsCard
                      color={"red"}
                      icon={<CheckCircle className="opacity-60" />}
                      title={"Enrolled Students"}
                      //  sub ={}
                      value={24}
                    />

                    <MetricsCard
                      color={"red"}
                      icon={<CheckCircle className="opacity-60" />}
                      title={"Batch Grading"}
                      //  sub ={}
                      value={24}
                    />
                    <MetricsCard
                      color={"red"}
                      icon={<CheckCircle className="opacity-60" />}
                      title={"Submissions"}
                      //  sub ={}
                      value={24}
                    />
                  </div>
                  <DashboardTable />
                </div>
              </div>
            }
          />
        }
      />
    </>
  );
};
