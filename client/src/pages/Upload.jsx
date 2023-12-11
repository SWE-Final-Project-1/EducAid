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

export const Upload = () => {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);
  const [file, setFile] = useState(null);
  const memoizedFile = useMemo(() => file, [file]);
  const fileInputRef = useRef();

  const handleFileChange = async event => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = file => {
  //   setFile(file);
  // };

  const { students, studentsLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => {
      const { data } = api.get("/");
      return data;
    },
  });

  const { assignments, assignmentsLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => {
      const { data } = api.get("/");
      return data;
    },
  });

  return (
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
      {/* <Loader msg={"Generating Feedback ..."} /> */}
    </>
  );
};
