import { Bell, BookCheck, MoreVertical, Plus, PlusCircle } from "lucide-react";
import { AssignmentCard } from "../components/assignment/AssignmentCard";
import { AppLayout } from "../components/ui/AppLayout";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";
import { AssignmentView } from "../components/assignment/AssignmentView";
import { HeadNav } from "@/components/ui/HeadNav";
import { useQuery } from "react-query";
import { api } from "@/api";

export const Assignment = () => {
  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryFn: async () => {
      const { data } = await api.get("/assignment/");
      return data;
    },
    queryKey: ["assignment"],
  });

  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <>
          <ContentScrollable
            nav1={<HeadNav title={"Assignments"} />}
            content={
              <div className="w-full bg-app_slate h-full">
                <div
                  style={{ height: "calc(100vh - 4.2rem)" }}
                  className="w-full h-full px-5 py-3 overflow-y-auto"
                >
                  <AssignmentView
                    assignments={assignments}
                    isLoading={assignmentsLoading}
                  />
                </div>
              </div>
            }
          />
        </>
      }
    />
  );
};
