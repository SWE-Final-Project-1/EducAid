import { useEffect } from "react";
import { Button } from "../ui/ui/button";
import { annotate } from "rough-notation";
import { useNavigate } from "react-router-dom";

export const LandingHero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 h-4/5">
      <div className="text-[4.5rem] leading-[1.1] tracking-[-0.025em] font-[500] w-[800px] text-center">
        <span id="landing_annot" className="text-[#2463eb]">
          Better Feedback
        </span>{" "}
        With the Help of AI.
      </div>
      <div className="text-center w-[600px] text-[1.125rem] leading-[2rem] opacity-80">
        Provide your students with detailed, customized feedback and suggestions
        in an instant with the help of artificial intelligence.
      </div>
      <div className="w-full flex items-center justify-center ">
        <Button
          onClick={() => navigate("/dashboard")}
          className="rounded-full text-[13px] border"
        >
          Get Started Today - Free Forever
        </Button>
      </div>
    </div>
  );
};
