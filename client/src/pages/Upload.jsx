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
import { useMemo, useRef, useState } from "react";
import { Loader } from "../components/ui/Loader";
import { INSTRUCTOR_TAB_ICONS } from "../constants";
import { HeadNav } from "@/components/ui/HeadNav";
import { useQuery } from "react-query";
import { api } from "@/api";
import { SideSheet } from "@/components/ui/SideSheet";
import { StudentSheet } from "@/components/upload/StudentSheet";
import { useUploadStore } from "@/components/store/useUploadStore";
import { MiniStudentCard } from "@/components/upload/MiniStudentCard";
import { FeedbackSheet } from "@/components/upload/FeedbackSheet";

export const Upload = () => {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);
  const [file, setFile] = useState(null);
  const memoizedFile = useMemo(() => file, [file]);
  const fileInputRef = useRef();
  const { isOpen, feedbackOpen, updateFeedbackOpen, selectedAssignment } = useUploadStore();
  const handleFileChange = async event => {

    const file = event.target.files[0];
    setFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

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

  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ["submissions", selectedAssignment],
    queryFn: async () => {
      const { data } = await api.get(
        `/grade/submissions/${selectedAssignment}`
      );
      return data;
    },
  });

  return studentsLoading || assignmentsLoading ? (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={
        <ContentScrollable
          nav1={<HeadNav title={"Grading Area"} />}
          content={
            <div className="w-full flex items-center justify-center bg-white h-full">
              <Loader width={40} height={40} />
            </div>
          }
        />
      }
    />
  ) : (
    <>
      <AppLayout
        sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
        mainArea={
          <ContentScrollable
            nav1={<HeadNav title={"Grading Area"} />}
            content={
              <div className="w-full bg-white h-full">
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                  <Pane minSize={"40%"} maxSize={"60%"} className="">
                    <div className="w-full h-full">
                      <UploadAssignment
                        assignments={assignments}
                        students={students}
                        file={memoizedFile}
                        handleButtonClick={handleButtonClick}
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                      />
                    </div>
                  </Pane>
                  <Pane>
                    <div
                      style={{ height: "calc(100vh - 4rem)" }}
                      className="w-full bg-app_slate h-full p-5 overflow-y-auto"
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
      <SideSheet
        heading={"Select Student"}
        content={<StudentSheet students={students} submissions={submissions}/>}
        open={isOpen}
      >
        <></>
      </SideSheet>
      <SideSheet
        heading={"Grade Results"}
        content={<FeedbackSheet />}
        open={feedbackOpen}
        override={true}
      >
        <></>
      </SideSheet>
      <MiniStudentCard />
    </>
  );
};
