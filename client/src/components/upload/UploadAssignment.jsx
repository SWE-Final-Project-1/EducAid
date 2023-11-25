import { Bot, Upload } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";

const SUPPORTED_FILE_TYPES = ["JPG", "PNG", "PDF"];
export const UploadAssignment = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = file => {
    setFile(file);
  };
  return (
    <div className="w-1/2 h-full flex flex-col space-y-6 justify-center items-center mx-auto px-10">
      <div className="w-full flex justify-center items-center">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={SUPPORTED_FILE_TYPES}
        />
      </div>
      <div className="w-full ">
        <div className="w-full flex flex-col items-start">
          <span className="font-semibold">Student</span>
          <span className="text-sm opacity-60">
            The student the assignment belongs to
          </span>
        </div>
        <Select className="w-full" />
      </div>

      <div className="w-full">
        <div className="w-full flex flex-col items-start">
          <span className="font-semibold">Assignment</span>
          <span className="text-sm opacity-60">
            The assignment the student is submitting
          </span>
        </div>
        <Select className="w-full" />
      </div>
      <span className="flex justify-center items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold">
        <div className="flex items-center">
          <Bot className="mr-1" />
          <span>Auto Grade</span>
        </div>
      </span>
    </div>
  );
};

export const UploadArea = () => {};
