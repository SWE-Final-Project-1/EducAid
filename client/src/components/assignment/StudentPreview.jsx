import { User, UserRound } from "lucide-react";

export const StudentPreview = () => {
  return (
    <div className="w-full py-3 px-5">
      <div className="font-logo">Students</div>
      <div className="divider p-0 m-0"></div>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-slate-200 flex items-center justify-center mr-4">
            <UserRound size={15} className="opacity-30" />
          </span>
          <span className="font-logo text-[15px] mr-20">Kweku Manu</span>
          <span className="text-green-500 font-logo text-[12px] px-2 py-1 rounded-2xl bg-green-400 bg-opacity-10 border border-green-500">
            Submitted
          </span>
        </div>
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-slate-200 flex items-center justify-center mr-4">
            <UserRound size={15} className="opacity-30" />
          </span>
          <span className="font-logo text-[15px] mr-20">Kweku Manu</span>
          <span className="text-green-500 font-logo text-[12px] px-2 py-1 rounded-2xl bg-green-400 bg-opacity-10 border border-green-500">
            Submitted
          </span>
        </div>
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-slate-200 flex items-center justify-center mr-4">
            <UserRound size={15} className="opacity-30" />
          </span>
          <span className="font-logo text-[15px] mr-20">Kweku Manu</span>
          <span className="text-green-500 font-logo text-[12px] px-2 py-1 rounded-2xl bg-green-400 bg-opacity-10 border border-green-500">
            Submitted
          </span>
        </div>
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-slate-200 flex items-center justify-center mr-4">
            <UserRound size={15} className="opacity-30" />
          </span>
          <span className="font-logo text-[15px] mr-20">Kweku Manu</span>
          <span className="text-green-500 font-logo text-[12px] px-2 py-1 rounded-2xl bg-green-400 bg-opacity-10 border border-green-500">
            Submitted
          </span>
        </div>

        <div className="flex items-center">
          <span className="p-2 rounded-full bg-slate-200 flex items-center justify-center mr-4">
            <UserRound size={15} className="opacity-30" />
          </span>
          <span className="font-logo text-[15px] mr-20">Kweku Manu</span>
          <span className="text-green-500 font-logo text-[12px] px-2 py-1 rounded-2xl bg-green-400 bg-opacity-10 border border-green-700">
            Submitted
          </span>
        </div>
      </div>
    </div>
  );
};
