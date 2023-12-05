import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Bot, Edit2, Info, PenSquare, Upload } from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { RubricTable } from "../rubric/RubricTable";
import { useCreatePreviewStore } from "../store/useCreatePreviewStore";
import { useMutation } from "react-query";
import { api } from "../../api";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { ASSIGNMENT_FORMATS, ASSIGNMENT_TYPES } from "../../constants";
import { AlertTriangle } from "lucide-react";

export const CreateAssignmentForm = () => {
  // const [prompt, setPrompt] = useState();
  // const [dueDate, setDueDate] = useState(new Date());
  const {
    assignmentName,
    assignmentType,
    rubricTableHtml,
    prompt,
    dueDate,
    submissionFormats,
    points,
    updateAssignmentName,
    updateAssignmentType,
    updatePrompt,
    updateDueDate,
    updateSubmissionFormats,
    updatePoints,
    updateRubricTableHtml,
  } = useCreatePreviewStore();

  const createAssignmentMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/assignment/", {
        name: assignmentName,
        type: assignmentType,
        prompt: prompt,
        dueDate: dueDate,
        submissionFormats: submissionFormats,
        points: points,
        rubric: rubricTableHtml,
      });
    },
    onSuccess: data => {
      toast.success("Assignment created !");
    },

    onError: data => {
      toast.error("Error creating assignment");
    },
  });

  const isValidated =
    assignmentName &&
    assignmentType &&
    rubricTableHtml &&
    prompt &&
    submissionFormats &&
    points;

  console.log(submissionFormats);

  return (
    <>
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
            value={assignmentName}
            onChange={e => updateAssignmentName(e.target.value)}
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
          <Select
            options={ASSIGNMENT_TYPES}
            onChange={({ value, label }) => updateAssignmentType(value)}
            className="w-full text-[14px]"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col items-start py-2">
            <span className="font-logo">Prompt</span>
            <span className="text-sm opacity-60">
              Needs to be as detailed as possible for better grading results
            </span>
          </div>
          <div>
            <MDEditor value={prompt} onChange={updatePrompt} />
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
                <Select
                  onChange={v =>
                    updateSubmissionFormats(v.map(({ value }) => value))
                  }
                  menuPlacement="top"
                  isMulti
                  options={ASSIGNMENT_FORMATS}
                  className="w-full"
                />
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
                  // type="number"
                  className="w-full outline-none border text-[14px] py-2 px-2 rounded-[4px] bg-app_white number-to-text"
                  placeholder="Ex. 10pts, 20pts etc"
                  value={points}
                  onChange={e => updatePoints(e.target.value)}
                />
              </>
            </div>
          </div>
        </div>
        <div className="w-full sticky -bottom-4 bg-slate-50 z-10 pb-2">
          <div className="divider text-sm my-2"></div>
          {!rubricTableHtml ? (
            <span
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className=" shadow-app_shadow flex justify-center items-center text-sm text-white bg-app_tertiary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
            >
              <div className="flex items-center">
                <Upload className="mr-1" />
                <span> Upload Rubric</span>
              </div>
            </span>
          ) : (
            <div className="space-y-2">
              <div
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className=" border border-app_tertiary flex justify-center items-center text-sm text-app_tertiary bg-app_tertiary bg-opacity-10 px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
              >
                <div className="flex items-center">
                  <PenSquare className="mr-1" />
                  <span> Edit Rubric</span>
                </div>
              </div>
              <div className="divider text-[10px] my-2">OR</div>
              {!createAssignmentMutation.isLoading ? (
                <span
                  onClick={() => {
                    if (isValidated) {
                      createAssignmentMutation.mutateAsync();
                    } else {
                      toast("Incomplete form fields", {
                        icon: <AlertTriangle />,
                      });
                    }
                  }}
                  style={{
                    backgroundColor: isValidated ? "#53bab9" : "#424549",
                    opacity: isValidated ? "100%" : "90%",
                    cursor: isValidated ? "pointer" : "not-allowed",
                  }}
                  className="shadow-app_shadow flex justify-center items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer w-full font-semibold"
                >
                  <div className="flex items-center">
                    <Upload className="mr-1" />
                    <span> Upload Assignment</span>
                  </div>
                </span>
              ) : (
                <span className="w-full flex items-center justify-center">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    width="17"
                  />
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog
        content={<RubricTable />}
        heading={"Assignment Rubric "}
        sub={"Provide suitable grading criteria"}
      />
    </>
  );
};
