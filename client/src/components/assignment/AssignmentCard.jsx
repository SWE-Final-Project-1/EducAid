import {
  BookCheck,
  Bot,
  CircleEllipsis,
  File,
  MoreVertical,
} from "lucide-react";

export const AssignmentCard = ({ assignmentName, dueDate, points }) => {
  return (
    <div className="bg-app_white px-4 py-3 mb-4 rounded-[0.4rem] flex items-center justify-between border">
      <div className="flex items-center ">
        <div className="w-8 h-8 bg-slate-300 cursor-pointer rounded-full flex items-center justify-center mr-3">
          <File size={15} className="text-white" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-logo hover:underline cursor-pointer">Think Piece 1</span>
          <span className="text-[12px] opacity-75">
            <span className="mr-4">Due: Mar 18 at 5:30pm</span>
            <span>30pts</span>{" "}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="border font-logo font-light text-[10px] rounded-full px-2 py-0.5">
            UNGRADED
          </div>
        </div>
        <MoreVertical size={15} />
      </div>
    </div>
  );
};
