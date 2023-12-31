import {
  Bot,
  Info,
  Plus,
  RotateCcw,
  ScreenShare,
  ScreenShareIcon,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";
import { GridOverlay } from "../ui/GridOverlay";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/ui/button";
import { useUploadStore } from "../store/useUploadStore";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { api } from "@/api";

const SUPPORTED_FILE_TYPES = ["JPG", "PNG", "PDF"];
export const UploadAssignment = ({
  file,
  fileInputRef,
  handleButtonClick,
  handleFileChange,
  assignments,
  students,
}) => {
  const {
    isOpen,
    updateSelectedAssignment,
    selectedAssignment,
    selectedStudent,
    updateIsOpen,
    feedback,
    updateFeedback,
    updateFeedbackOpen,
    updateSelectedStudent,
  } = useUploadStore();

  const submitMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", selectedAssignment);
      formData.append("studentId", selectedStudent.id);
      formData.append("fileExtension", file?.name.split(".").pop());
      const { data } = await api.post("/grade/submit", formData);
      return data;
    },
    onSuccess: data => {
      updateIsOpen(true);
      toast("Submission Successfully Uploaded", {
        icon: <Info />,
      });
    },

    onError: data => {
      toast("Error Uploading Submission", {
        icon: <Info />,
      });
    },
  });
  const gradeNowMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", selectedAssignment);
      formData.append("studentId", selectedStudent.id);
      formData.append("fileExtension", file?.name.split(".").pop());
      const { data } = await api.post("/grade/", formData);
      return data;
    },
    onSuccess: data => {
      toast("Submission Graded", {
        icon: <Info />,
      });
      console.log(data);
      const feedback = JSON.parse(data.feedback);
      updateFeedback({ ...feedback, gradedAt: data.gradedAt });
      updateFeedbackOpen(true);
      updateSelectedStudent(null);
    },
    onError: () => {
      toast("Error Grading Submission", {
        icon: <Info />,
      });
    },
  });
  return (
    <>
      <div className="w-full h-full flex flex-col space-y-6 mt-10 items-center mx-auto px-10">
        <div className="w-full flex items-center ">
          <div className="col-span-4 w-full bg-app_slate flex items-center justify-center">
            <div
              style={{
                opacity:
                  !selectedAssignment ||
                  submitMutation.isLoading ||
                  gradeNowMutation.isLoading
                    ? "80%"
                    : "100%",
                cursor:
                  !selectedAssignment ||
                  submitMutation.isLoading ||
                  gradeNowMutation.isLoading
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={() => {
                if (
                  !selectedAssignment ||
                  submitMutation.isLoading ||
                  gradeNowMutation.isLoading
                ) {
                  toast("Select an assignment first", {
                    icon: <Info />,
                  });
                  return;
                }
                handleButtonClick();
              }}
              className="w-full h-auto py-5 bg-white rounded-xl border flex flex-col items-center justify-center border-app_tertiary border-dashed cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <ScreenShareIcon size={30} className="text-app_tertiary mb-4" />
              <div className="text-[15px]">
                Drag and drop or click here to add a file
              </div>
              <div className="text-[12px] mb-5 opacity-75">
                png, jpg or pdf,
              </div>
              <Button
                size={"sm"}
                className="flex items-center bg-app_tertiary text-white "
              >
                {file ? (
                  <RotateCcw className="mr-3" size={15} />
                ) : (
                  <Plus className="mr-3" size={15} />
                )}
                {file ? "Change file" : "Upload a file"}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full flex flex-col items-start mb-2">
            <span className="font-logo text-[15px]">Assignment</span>
            <span className="opacity-60 text-[12px]">
              Assignments with ungraded submissions
            </span>
          </div>
          <Select
            styles={{ fontSize: "5px" }}
            isDisabled={selectedAssignment || selectedStudent ? true : false}
            onChange={({ value, label }) => {
              console.log(value);
              updateIsOpen(true);
              updateSelectedAssignment(value);
            }}
            options={assignments?.map(({ name, type, id }) => ({
              value: id,
              label: name + " " + "(" + type + ")",
            }))}
            className="w-full"
          />
        </div>

        {/* <div className="w-full">
          <div className="w-full flex flex-col items-start mb-2">
            <span className="font-logo text-[15px]">Student</span>
            <span className="opacity-60 text-[12px]">
              The student the assignment belongs to
            </span>
          </div>
          <Select
            options={students?.map(({ firstName, lastName, id }) => ({
              value: id,
              label: firstName + " " + lastName + " " + "(" + id + ")",
            }))}
            className="w-full"
          />
        </div> */}
        <div className="w-full 10">
          <Button
            onClick={() => {
              if (
                !selectedAssignment ||
                !file ||
                submitMutation.isLoading ||
                gradeNowMutation.isLoading
              ) {
                toast("Select an assignment first", {
                  icon: <Info />,
                });
                return;
              }
              submitMutation.mutate();
            }}
            className=" shadow-app_shadow flex justify-center items-center text-sm text-white border bg-app_tertiary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
          >
            {submitMutation.isLoading ? (
              <>
                <RotatingLines strokeColor="white" width="15" />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Upload className="mr-1" size={"18px"} />
                <span>Submit Assignment</span>
              </div>
            )}
          </Button>
          <div className="divider text-[12px] my-2">OR</div>
          <Button
            onClick={() => {
              if (
                !selectedAssignment ||
                !file ||
                submitMutation.isLoading ||
                gradeNowMutation.isLoading
              ) {
                toast("Select an assignment first", {
                  icon: <Info />,
                });
                return;
              }
              gradeNowMutation.mutate();
            }}
            className="flex justify-center shadow-app_shadow items-center text-sm text-white border bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
          >
            {gradeNowMutation.isLoading ? (
              <>
                <RotatingLines strokeColor="white" width="15" />
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <Bot className="mr-1" size={"19px"} />
                <span>Grade Now</span>
              </div>
            )}
          </Button>
        </div>
        <div className="font-logo space-x-2 text-sm opacity-40 flex items-center">
          <Info size={15} />
          <span className="text-[12px]">
            Upload Submissions for Batch Grading or Grade as you Go
          </span>
        </div>
      </div>
    </>
  );
};
