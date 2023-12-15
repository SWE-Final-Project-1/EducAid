import { api } from "@/api";
import { AssignmentDetailed } from "@/components/assignment/AssignmentDetailed";
import { StudentPreview } from "@/components/assignment/StudentPreview";
import { AppLayout } from "@/components/ui/AppLayout";
import { ContentScrollable } from "@/components/ui/ContentScrollable";
import { HeadNav } from "@/components/ui/HeadNav";
import { SideNav } from "@/components/ui/SideNav";
import { StudentSheet } from "@/components/upload/StudentSheet";
import { INSTRUCTOR_TAB_ICONS } from "@/constants";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Pane } from "split-pane-react";
import SplitPane from "split-pane-react/esm/SplitPane";

export const AssignmentInfo = () => {
  const { id } = useParams();
  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const { data } = await api.get(`/assignment/${id}`);
      return data;
    },
  });

  const [sizes, setSizes] = useState([100, "4%", "auto"]);

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/people/");
      return data;
    },
  });

  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const { data } = await api.get(`/grade/submissions/${id}`);
      return data;
    },
  });

  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <>
          <ContentScrollable
            nav1={<HeadNav title={"Assignments"} />}
            content={
              <div className="grid grid-cols-7">
                <div className="border border-r shadow-app_shadow_light col-span-4">
                  <div className="w-full bg-slate-50 h-full">
                    <div
                      style={{ height: "calc(100vh - 4.2rem)" }}
                      className="w-full h-full px-5 py-3 overflow-y-auto"
                    >
                      <AssignmentDetailed
                        submissions={submissions}
                        students={students}
                        assignment={assignment}
                        isLoading={assignmentLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 col-span-3">
                  <StudentSheet
                    heading={"Submissions"}
                    students={students}
                    submissions={submissions}
                    submissionLoading={submissionsLoading}
                    studentsLoading={studentsLoading}
                    notSheet={true}
                  />
                  {/* <StudentPreview/> */}
                </div>
              </div>
            }
          />
        </>
      }
    />
  );
};
