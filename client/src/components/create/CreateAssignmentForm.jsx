import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Bot, Upload } from "lucide-react";

export const CreateAssignmentForm = () => {
  const [prompt, setPrompt] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  return (
    <div
      style={{
        height: "calc(100vh - 3.5rem)",
      }}
      className="h-full px-4 py-7 space-y-4 overflow-y-auto"
    >
      <div className="w-full">
        <div className="flex flex-col items-start py-2">
          <span className="font-logo">Name</span>
          <span className="text-sm opacity-60">
            What is the name of the assignment?
          </span>
        </div>
        <input
          className="outline-none w-full text-[14px] py-2 px-2 rounded-[4px] border bg-app_white  ]"
          placeholder="Ex. Thermodynamics Assignment, Calculus Assignment"
        />
      </div>

      <div>
        <div className="w-full flex flex-col items-start py-2">
          <span className="font-logo">Assignment Type</span>
          <span className="text-sm opacity-60">
            Is this a test of literacy or numeracy
          </span>
        </div>
        <Select className="w-full text-[14px]" />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start py-2">
          <span className="font-logo">Prompt</span>
          <span className="text-sm opacity-60">
            Needs to be as detailed as possible for better grading results
          </span>
        </div>
        <div className="container">
          <MDEditor value={prompt} onChange={setPrompt} />
          {/* <MDEditor.Markdown
            source={prompt}
            style={{ whiteSpace: "pre-wrap" }}
          /> */}
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="col-span-1">
            {/* <>
              <div className="flex flex-col items-start py-2">
                <span className="font-logo">Due Date</span>
                <span className="text-sm opacity-60">
                  Provide time when assignment is due
                </span>
              </div>

              <DatePicker
                className=""
                value={dueDate}
                onChange={setDueDate}
              />
            </> */}
            <>
              <div className="flex flex-col items-start py-2">
                <span className="font-logo">Submission Formats</span>
                <span className="text-sm opacity-60">
                  Select the formats allowed for submission
                </span>
              </div>
              <Select isMulti className="w-full" />
            </>
          </div>

          <div className="col-span-1 w-full ">
            <>
              <div className="flex flex-col items-start py-2">
                <span className="font-logo">Points</span>
                <span className="text-sm opacity-60">
                  How many points is this assignment worth?
                </span>
              </div>

              <input
                className="outline-none w-full border text-[14px] py-2 px-2 rounded-[4px] bg-app_white"
                placeholder="Ex. 10pts, 20pts etc"
              />
            </>
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 bg-slate-50 mx-auto z-10">
        <div className="divider text-sm my-2"></div>
        <span className=" shadow-app_shadow flex justify-center items-center text-sm text-white bg-app_tertiary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold">
          <div className="flex items-center">
            <Upload className="mr-1" />
            <span> Upload Rubric</span>
          </div>
        </span>
      </div>
    </div>
  );
};
