import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const CreateAssignmentForm = () => {
  const [prompt, setPrompt] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  return (
    <div
      style={{
        height: "calc(100vh - 3.5rem)",
      }}
      className="h-full px-4 py-2 space-y-4 overflow-y-auto"
    >
      <div>
        <div className="w-full flex flex-col items-start py-2">
          <span className="font-semibold">Subject</span>
          <span className="text-sm opacity-60">
            The subject this assignment belongs to
          </span>
        </div>
        <Select className="w-3/4" />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start py-2">
          <span className="font-semibold">Assignment Name</span>
          <span className="text-sm opacity-60">
            What is the name of the assignment?
          </span>
        </div>
        <input
          className="outline-none w-3/4 border-none py-2 px-2 rounded-[4px] bg-app_white  border  border-[hsl(0, 0%, 80%)]"
          placeholder="Ex. Thermodynamics Assignment, Calculus Assignment"
        />
      </div>

      <div className="w-full">
        <div className="flex flex-col items-start py-2">
          <span className="font-semibold">Assignment Prompt</span>
          <span className="text-sm opacity-60">
            Provide instructions on how to do the assignment
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
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1">
            <>
              <div className="flex flex-col items-start">
                <span className="font-semibold">Due Date</span>
                <span className="text-sm opacity-60">
                  Provide time when assignment is due
                </span>
              </div>

              <DatePicker
                className="py-2 outline-none border-none"
                value={dueDate}
                onChange={setDueDate}
              />
            </>
            <>
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold">
                  Allowed Submission Formats
                </span>
                <span className="text-sm opacity-60">
                  Select the formats allowed for submission
                </span>
              </div>
              <Select isMulti className="w-full" />
            </>
          </div>

          <div className="col-span-1 w-full px-4">
            <>
              <div className="flex flex-col items-start py-2">
                <span className="font-semibold">Total Points</span>
                <span className="text-sm opacity-60">
                  How many points is this assignment worth?
                </span>
              </div>

              <input
                className="outline-none w-full border-none py-2 px-2 rounded-[4px] bg-app_white  border  border-[hsl(0, 0%, 80%)]"
                placeholder="Ex. 10pts, 20pts etc"
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
