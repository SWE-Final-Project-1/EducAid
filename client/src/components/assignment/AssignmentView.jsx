import { AssignmentCard } from "./AssignmentCard";

export const AssignmentView = () => {
  return (
    <div className="w-full mx-auto pt-5 space-y-4">
      <div className="flex flex-col">
        <span className="text-[15px] opacity-70 mb-3 font-logo">Due (3)</span>
        <AssignmentCard />
        <AssignmentCard />
      </div>

      <div className="flex flex-col">
        <span className="text-[15px] font-logo  opacity-70 mb-3 ">
          Upcomming (13)
        </span>
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
      </div>
    </div>
  );
};
