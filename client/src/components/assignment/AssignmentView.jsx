import { RotatingLines } from "react-loader-spinner";
import { AssignmentCard } from "./AssignmentCard";
import { Loader } from "../ui/Loader";
import { Calendar, CalendarCheck, Info, ListTodo, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/ui/button";

export const AssignmentView = ({ assignments, isLoading }) => {
  const dueAssignments = assignments?.filter(
    ({ dueDate }) => new Date(dueDate) >= Date.now()
  );
  const upcommingAssignments = assignments?.filter(
    ({ dueDate }) => new Date(dueDate) < Date.now()
  );
  const navigate = useNavigate();
  return isLoading ? (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <Loader width={40} height={40} />
      </div>
    </>
  ) : assignments.length > 0 ? (
    <div className="w-full mx-auto pt-5 space-y-4">
      <div className="flex flex-col">
        <span className="text-[15px] opacity-70 mb-3 font-logo">
          Due ({dueAssignments?.length})
        </span>
        {dueAssignments?.length == 0 && !isLoading && (
          <div className="w-full text-center opacity-70">Nothing to see</div>
        )}
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <RotatingLines strokeColor="grey" strokeWidth="5" width="17" />
          </div>
        ) : (
          <div className="w-full">
            {dueAssignments?.map(
              ({ type, name, points, id, prompt, dueDate }) => (
                <AssignmentCard
                  key={id}
                  id={id}
                  type={type}
                  assignmentName={name}
                  points={points}
                  dueDate={dueDate}
                />
              )
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-[15px] font-logo  opacity-70 mb-3 ">
          Upcomming ({upcommingAssignments?.length})
        </span>
        <div className="w-full">
          {upcommingAssignments?.length == 0 && !isLoading && (
            <div>Nothing to see</div>
          )}
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <RotatingLines strokeColor="grey" strokeWidth="5" width="17" />
            </div>
          ) : (
            upcommingAssignments?.map(({ type, id, name, points, dueDate }) => (
              <AssignmentCard
                key={id}
                id={id}
                type={type}
                assignmentName={name}
                points={points}
                dueDate={dueDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="w-full h-full flex-col flex space-y-3 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={() => navigate("/create")}
            className="bg-app_tertiary space-x-2"
          >
            <Plus size={15} />
            <span>Create New</span>
          </Button>
        </div>
        <span className="opacity-70">No Assignments Created</span>
      </div>
    </>
  );
};
