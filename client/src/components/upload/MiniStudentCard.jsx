import { Info } from "lucide-react";
import { useUploadStore } from "../store/useUploadStore";

export const MiniStudentCard = () => {
  const { selectedStudent } = useUploadStore();
  return (
    selectedStudent && (
      <div className="fixed cursor-pointer flex items-center space-x-2 rounded-lg right-7 px-4 py-4 bottom-3 w-auto min-h-[50px] bg-white border">
        <Info className="" />
        <div className="flex flex-col items-start">
          <span className="relative  w-full">
            Currently Grading{" "}
            <span className="font-logo">{selectedStudent?.firstName}'s</span>{" "}
            Submission
          </span>

          <span className="text-[11px] opacity-70">
            All uploads will be associated with this student
          </span>
        </div>
      </div>
    )
  );
};
