import { Atom } from "lucide-react";
import { RiRobotFill } from "react-icons/ri";
export const Logo = ({ size }) => {
  return (
    <span
      style={{ fontSize: size }}
      className="font-logo font-normal flex items-center cursor-pointer text-[#656771]"
    >
      <Atom size={25} className="inline-block mr-2 text-[#656771] rot" />
      Educ<span className="font-bold">Aid</span>
    </span>
  );
};
