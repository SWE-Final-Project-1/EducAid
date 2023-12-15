import { Download, MessageCircle, MessageSquare } from "lucide-react";
import {
  BsChatRight,
  BsChatRightQuote,
  BsChatRightQuoteFill,
} from "react-icons/bs";
import { Button } from "../ui/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { useUploadStore } from "../store/useUploadStore";

export const FeedbackSheet = () => {
  const { updateFeedbackOpen, feedback } = useUploadStore();
  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-10 mx-auto w-full border-b pb-6 border-opacity-5">
        <div className="flex flex-col items-start opacity-70">
          <span className="text-[26px] font-logo ">
            {feedback ? feedback?.score : "-"}%
          </span>
          <span className="text-[10px]">Percentage</span>
        </div>
        <div className="flex flex-col items-start opacity-70">
          <span className="text-[26px] font-logo ">
            {feedback ? feedback?.score : "-"}
          </span>
          <span className="text-[10px]">Score</span>
        </div>
        <div className="flex flex-col items-start opacity-70">
          <span className="text-[26px] font-logo">
            {feedback ? "100" : "-"}
          </span>
          <span className="text-[10px] w-full">Total Points</span>
        </div>
        <div className="flex flex-col items-start opacity-70">
          <span className="text-[26px] font-logo">
            {feedback ? feedback?.grade : "-"}
          </span>
          <span className="text-[10px]">Grade</span>
        </div>
      </div>
      <div className="px-2 py-5">
        <FeedbackCard feedback={feedback} />
      </div>

      <Button
        onClick={() => {
          console.log("Hello");
          updateFeedbackOpen(false);
        }}
        className="w-full mt-[130px] space-x-2 "
      >
        <Download />
        <span>Save</span>
      </Button>
    </div>
  );
};

export const FeedbackCard = ({ feedback }) => {
  // const { updateFeedbackOpen } = useUploadStore();
  return (
    <>
      <div className="w-full flex items-start space-x-5 relative">
        <div className="pt-1">
          <BsChatRightQuote size={14} className="opacity-50" />
        </div>
        <div className="text-[12px]">{feedback?.feedback}</div>
      </div>
      <div className="absolute flex flex-col italic opacity-90 items-start right-8 font-logo text-[12px]">
        Graded by EduBot,{" "}
        <span>
          {feedback?.gradedAt ? feedback.gradedAt : "just now"}
        </span>
      </div>
    </>
  );
};
