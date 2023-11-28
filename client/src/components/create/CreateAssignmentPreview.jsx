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
        <span className="text-sm opacity-40 font-semibold">
          Assignment Preview
        </span>
        <div className="mb-4 font-logo">{assignmentName}</div>
        <div className="flex items-start space-x-6">
          <span>
            {" "}
            <span className="font-logo">Due: </span>
            {dueDate.toDateString()}
          </span>

          <span>
            {" "}
            <span className="font-logo">Points: </span>
            {points}
          </span>

          <span>
            {" "}
            <span className="font-logo">Submitting: </span>{" "}
            {submissionFormats.map(format => format.label).join(", ")}
          </span>

          <span>
            {" "}
            <span className="font-logo">Available: </span>{" "}
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
        <IoFileTrayStackedSharp size={70} className="opacity-40" />
        <span className="opacity-80 text-sm font-logo">Nothing to preview</span>
      </div>
    </>
  );
};
