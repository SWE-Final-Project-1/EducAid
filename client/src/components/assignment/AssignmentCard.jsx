import {
  BookCheck,
  Bot,
  CircleEllipsis,
  File,
  FileDigit,
  FileType2,
  MoreVertical,
  RefreshCcw,
} from "lucide-react";
import { useQuery } from "react-query";
import { api } from "../../api";
import { Menu } from "../ui/Menu";
import { useNavigate } from "react-router-dom";

export const AssignmentCard = ({
  id,
  type,
  assignmentName,
  dueDate,
  points,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-app_white px-4 py-3 mb-4 rounded-[0.4rem] flex items-center justify-between border">
      <div className="flex items-center ">
        <div className="w-8 h-8 bg-slate-300 cursor-pointer rounded-full flex items-center justify-center mr-3">
          {type == "Literacy" ? (
            <FileType2 size={15} className="text-white" />
          ) : (
            <FileDigit size={15} className="text-white" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <span
            onClick={() => {
              navigate(`/assignments/${id}`);
            }}
            className="font-logo hover:underline cursor-pointer"
          >
            {assignmentName}
          </span>
          <span className="text-[12px] opacity-75">
            <span className="mr-4">
              Due: {new Date(dueDate).toDateString()}
            </span>
            <span>{points}pts</span>{" "}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer font-logo  hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <RefreshCcw size={16} className="opacity-50" />
          </div>
          <div className="border font-logo font-light text-[10px] rounded-full px-2 py-0.5">
            UNGRADED
          </div>
        </div>
        <Menu>
          <button className="cursor-pointer hover:bg-slate-100 p-2 rounded-[0.4rem] active:bg-slate-300">
            <MoreVertical size={15} />
          </button>
        </Menu>
      </div>
    </div>
  );
};
