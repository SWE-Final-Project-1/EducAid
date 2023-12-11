import { userContext } from "@/contexts/UserContext";
import { Download, Info, Trash, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Button } from "../ui/ui/button";

export const ProfileSheet = () => {
  const { user, userLoading } = useContext(userContext);
  return (
    <div className="">
      <div className="font-logo mb-3 h-full">Profile</div>
      <div className="space-y-5 flex justify-between flex-col h-full">
        <div className="space-y-5">
          <div className="flex flex-col items-start">
            <span className="opacity-70 text-[15px] ">Name</span>
            <div className="w-full flex justify-between">
              <span className="text-[15px]">
                {user?.firstName + " " + user?.lastName}
              </span>
              <span className="font-logo text-app_blue text-[15px] cursor-pointer">
                Update
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="opacity-70 text-[15px] space-x-2 flex items-center">
              <span>Email</span>
              <Info size={15} />
            </span>
            <div className="w-full flex justify-between">
              <span className="text-[15px]">{user?.emailAddress}</span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="opacity-70 text-[15px] space-x-2 flex items-center">
              <span>Role</span>
              <Info size={15} />
            </span>
            <div className="w-full flex justify-between">
              <span className="text-[15px]">{user?.role}</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="opacity-70 text-[15px] ">Password</span>
            <div className="w-full flex justify-between">
              <span className="text-[15px]">•••••••</span>
              <span className="font-logo text-app_blue text-[15px] cursor-pointer">
                Create
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-3">
          <Button className="w-full space-x-2 bg-slate-700">
            <Download size={18} />
            <span>Download Report</span>
          </Button>
          {/* <Button className="w-full space-x-2 bg-red-400">
            <Trash2 size={18} />
            <span>Delete Account</span>
          </Button> */}

          <div className="font-logo text-sm space-x-2 opacity-40 justify-center flex items-center">
            <Info size={15} />
            <span className="text-[12px] w-full">
              You can only do this once a day
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
