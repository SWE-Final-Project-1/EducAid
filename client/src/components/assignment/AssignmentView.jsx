import { RotatingLines } from "react-loader-spinner";
import { AssignmentCard } from "./AssignmentCard";

export const AssignmentView = ({ assignments, isLoading }) => {
  const dueAssignments = assignments?.filter(
    ({ dueDate }) => new Date(dueDate) >= Date.now()
  );
  const upcommingAssignments = assignments?.filter(
    ({ dueDate }) => new Date(dueDate) < Date.now()
  );
  return (
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
  );
};
