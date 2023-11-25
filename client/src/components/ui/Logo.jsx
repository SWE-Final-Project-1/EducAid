import { RiRobotFill } from "react-icons/ri";
export const Logo = ({ size }) => {
  return (
    <span style={{ fontSize: size }} className="font-logo font-normal flex items-center cursor-pointer">
      <RiRobotFill className="inline-block mr-2" />
      EducAid
    </span>
  );
};
