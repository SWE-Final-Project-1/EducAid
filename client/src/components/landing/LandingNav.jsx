import { useNavigate } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/ui/button";

export const LandingNav = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-40 py-6 flex justify-between">
      <div className="flex items-center space-x-14">
        <Logo size={20} />
        <div className="text-[15px] font-logo opacity-70 cursor-pointer">Features</div>
      </div>
      <div>
        <Button onClick = {() => navigate("/dashboard")} className="rounded-full bg-app_blue/90">Launch app</Button>
      </div>
    </div>
  );
};
