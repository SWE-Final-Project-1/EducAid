import {
  Bell,
  BookCheck,
  CheckCircle,
  Cpu,
  FileUp,
  GraduationCap,
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
import { useQuery } from "react-query";
import { api } from "@/api";
// import { Drawer } from "../components/ui/Drawer";

export const Dashboard = () => {
  const [sizes, setSizes] = useState([100, "8%", "auto"]);
  // console.log(import.meta.env.VITE_API_URL_DEV)

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/people/");
      return data;
    },
  });

  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data } = await api.get("/assignment/");
      return data;
    },
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await api.get("/people/dashboard");
      return data;
    },
  });

  // const { data: submissions, isLoading: submissionsLoading } = useQuery({
  //   queryKey: ["submissions", selectedAssignment],
  //   queryFn: async () => {
  //     const { data } = await api.get(
  //       `/grade/submissions/${selectedAssignment}`
  //     );
  //     return data;
  //   },
  // });
  return (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={<HeadNav title={"Dashboard"} />}
            content={
              <div
                style={{ height: "calc(100% - 4rem)" }}
                className="w-full bg-white h-full overflow-y-auto px-6 py-8"
              >
                <div className="w-full h-full space-y-8">
                  <div className="flex items-center space-x-10 mx-auto">
                    <MetricsCard
                      color={"#f7a5a0"}
                      icon={<CheckCircle className="opacity-60" />}
                      title={"Assignments"}
                      value={metrics?.total_assignments}
                      sub={metrics?.percentage_increase_assignments}
                    />
                    <MetricsCard
                      color={"#c5ddf0"}
                      icon={<GraduationCap className="opacity-60" />}
                      title={"Enrolled Students"}
                      value={metrics?.total_students}
                      sub={metrics?.percentage_increase_students}
                    />

                    <MetricsCard
                      color={"#e7f0d2"}
                      icon={<Cpu className="opacity-60" />}
                      title={"Batch Grading"}
                      sub={metrics?.percentage_increase_notifications}
                      value={metrics?.total_notifications}
                    />
                    <MetricsCard
                      color={"#f7ccb0"}
                      icon={<FileUp className="opacity-60" />}
                      title={"Submissions"}
                      sub={metrics?.percentage_increase_submissions}
                      value={metrics?.total_submissions}
                    />
                  </div>
                  <DashboardTable students={students} />
                </div>
              </div>
            }
          />
        }
      />
    </>
  );
};
