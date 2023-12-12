import { Info } from "lucide-react";

export const NotificationCard = ({ type, createdAt, status }) => {
  return (
    <div className="flex items-start space-x-2 h-full">
      <div className="w-2 h-2 mt-2 bg-app_blue rounded-full"></div>
      {type == "onboarding" ? (
        <div className="text-[14px] opacity-60 w-full font-logo flex items-start">Setting up your students' data</div>
      ) : (
        <div className="text-[14px] opacity-70 w-full font-logo">Batch Grading Job On <span className="font-semibold">Think Piece One</span> Completed!</div>
      )}
    </div>
  );
};
