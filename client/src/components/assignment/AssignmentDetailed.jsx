import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const AssignmentDetailed = ({ assignment, isLoading }) => {
  return !isLoading ? (
    <>
      <div className="h-full py-2 space-y-2 transition-opacity duration-500 ease-linear">
        <span className="text-sm opacity-40 font-semibold">
          Assignment Preview
        </span>
        <div className="mb-4 font-logo text-[20px]">{assignment?.name}</div>
        <div className="flex items-start space-x-6">
          <span>
            {" "}
            <span className="font-logo">Due: </span>
            {new Date(assignment?.dueDate)?.toDateString()}
          </span>

          <span>
            {" "}
            <span className="font-logo">Points: </span>
            {assignment?.points}
          </span>

          <span>
            {" "}
            <span className="font-logo">Submissions: </span>
            20/27
            {/* {assignment?.points} */}
          </span>
          {/* <span>
            {" "}
            <span className="font-logo">Submitting: </span>{" "}
            {assignment?.submissionFormats?.join(", ")}
          </span> */}

          {/* <span>
            {" "}
            <span className="font-logo">Due: </span>{" "}
            {`${new Date().toDateString()} - ${assignment?.dueDate.toDateString()}`}{" "}
          </span> */}
        </div>
        <div className="divider"></div>

        <div
          className="font-logo font-light"
          dangerouslySetInnerHTML={{
            __html: assignment?.prompt,
          }}
        ></div>
        <div
          className="font-logo w-full font-light"
          dangerouslySetInnerHTML={{ __html: assignment?.rubric }}
        ></div>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
};
