import { Bot, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";
import { GridOverlay } from "../ui/GridOverlay";
import { Logo } from "../ui/Logo";

const SUPPORTED_FILE_TYPES = ["JPG", "PNG", "PDF"];
export const UploadAssignment = ({ file, handleFileChange }) => {
  useEffect(() => {
    console.log(file);
  });
  return (
    <>
      <div className="w-full z-50 h-full flex flex-col space-y-6 justify-center items-center mx-auto px-10">
        {/* <GridOverlay /> */}
        <div className="w-full flex justify-center items-center z-50">
          <FileUploader
            handleChange={handleFileChange}
            name="file"
            types={SUPPORTED_FILE_TYPES}
          />
        </div>
        <div className="w-full z-50">
          <div className="w-full flex flex-col items-start">
            <span className="font-logo">Student</span>
            <span className="text-sm opacity-60">
              The student the assignment belongs to
            </span>
          </div>
          <Select className="w-full" />
        </div>

        <div className="w-full z-50">
          <div className="w-full flex flex-col items-start">
            <span className="font-logo">Assignment</span>
            <span className="text-sm opacity-60">
              The assignment the student is submitting
            </span>
          </div>
          <Select className="w-full" />
        </div>
        <div className="w-full z-10">
          <span
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="flex justify-center shadow-app_shadow items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
          >
            <div className="flex items-center">
              <Bot className="mr-1" />
              <span>Grade Now</span>
            </div>
          </span>
          <div className="divider text-sm my-2">OR</div>
          <span className=" shadow-app_shadow flex justify-center items-center text-sm text-white bg-app_tertiary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold">
            <div className="flex items-center">
              <Upload className="mr-1" />
              <span>Submit Assignment</span>
            </div>
          </span>
        </div>
        <div className="font-logo text-sm opacity-25">
          Upload Submissions for Batch Grading
        </div>
      </div>
    </>
  );
};

export const UploadArea = () => {};
