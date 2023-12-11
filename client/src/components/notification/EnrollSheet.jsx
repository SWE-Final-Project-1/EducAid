import { Plus } from "lucide-react";
import { Button } from "../ui/ui/button";
import { Input } from "../ui/ui/input";
import Select from "react-select";

export const EnrollSheet = () => {
  return (
    <div>
      <div className="space-y-3 mb-8">
        <div className="space-y-1">
          <span className="text-[12px] font-logo opacity-70">Firstname</span>
          <Input
            // value={email}
            // onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Firstname"
            className="py-5"
          />
        </div>
        <div>
          <span className="text-[12px] font-logo opacity-70">Lastname</span>
          <Input
            // value={password}
            // onChange={e => setPassword(e.target.value)}
            type="text"
            placeholder="Lastname"
            className="py-5"
          />
        </div>
        <div>
          <span className="text-[12px] font-logo opacity-70">Age</span>
          {/* <Select/> */}
          <Input
            // value={password}
            // onChange={e => setPassword(e.target.value)}
            // type="password"
            placeholder="Student's age"
            className="py-5"
          />
        </div>
        <div className="">
          <span className="text-[12px] font-logo opacity-70">Gender</span>
          <Select />
        </div>

        <div className="w-full py-5 ">
          <Button className="w-full space-x-2 bg-slate-700">
            <Plus size={18} />
            <span>Enroll Student</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
