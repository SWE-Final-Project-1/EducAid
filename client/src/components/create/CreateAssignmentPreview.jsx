import { FolderSync } from "lucide-react";
import { useCreatePreviewStore } from "../store/useCreatePreviewStore";
import { IoFileTrayStackedSharp } from "react-icons/io5";

export const CreateAssignmentPreview = () => {
  const {
    assignmentName,
    assignmentType,
    prompt,
    dueDate,
    submissionFormats,
    points,
    rubricTableHtml,
    updateAssignmentName,
    updateAssignmentType,
    updatePrompt,
    updateDueDate,
    updateSubmissionFormats,
    updatePoints,
    updateRubricTableHtml,
  } = useCreatePreviewStore();
  return assignmentName || prompt ? (
    <>
      <div className="h-full px-4 py-2 space-y-2 transition-opacity duration-500 ease-linear">
        <span className="text-sm opacity-40 font-logo">
          Assignment Preview
        </span>
        <div className="mb-4 font-logo opacity-70 text-[23px]">{assignmentName}</div>
        <div className="flex items-start space-x-6">
          <span className="text-[13px]">
            {" "}
            <span className="font-logo text-[13px]">Due: </span>
            {dueDate.toDateString()}
          </span>

          <span className="text-[13px]">
            {" "}
            <span className="font-logo text-[13px]">Points: </span>
            {points}
          </span>

          <span className="text-[13px]">
            {" "}
            <span className="font-logo text-[13px]">Submitting: </span>{" "}
            {submissionFormats.length > 0 ? submissionFormats.join(", ") : "-"}
          </span>

          <span className="text-[13px]">
            {" "}
            <span className="font-logo text-[13px]">Test Type: </span>{" "}
            {`${new Date().toDateString()} - ${dueDate.toDateString()}`}{" "}
          </span>
        </div>
        <div className="divider"></div>

        <div
          className="font-logo font-light"
          dangerouslySetInnerHTML={{
            __html: prompt,
          }}
        ></div>
        <div
          className="font-logo font-light"
          dangerouslySetInnerHTML={{ __html: rubricTableHtml }}
        ></div>
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-full flex flex-col space-y-2 items-center justify-center">
        <FolderSync size={40} className="opacity-40" />
        <span className="opacity-40 text-sm font-logo">Nothing to preview yet</span>
      </div>
    </>
  );
};
