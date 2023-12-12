import { GridOverlay } from "@/components/ui/GridOverlay";
import { Button } from "@/components/ui/ui/button";
import { BsDiscord, BsGithub, BsGoogle, BsMicrosoft } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { MdLock } from "react-icons/md";
import {
  Activity,
  Brackets,
  Code2,
  FileCode,
  Github,
  GithubIcon,
  Info,
  Plus,
  ScreenShare,
  Tag,
  Upload,
  UserPlus,
} from "lucide-react";
import { OnboardTable } from "@/components/auth/onboardTable";
import { Dialog } from "@/components/ui/Dialog";
import Select from "react-select";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/api";
import { GRADE_LEVELS } from "@/constants";
import toast from "react-hot-toast";
import { Oval, RotatingLines } from "react-loader-spinner";
import { userContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Loader } from "@/components/ui/Loader";

export const Onboard = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [step, setStep] = useState(1);

  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onboardMutation.mutate(file);
  };

  const onboardMutation = useMutation({
    mutationFn: async file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("school", school);
      formData.append("grade", grade);
      formData.append("fileType", file?.name.split(".")[1]);
      formData.append("instructorId", user?.id);

      await api.post("/auth/onboard", formData);
    },

    onSuccess: data => {
      toast("Setup Students' Info", {
        icon: <Info />,
      });
      queryClient.invalidateQueries(["user"]);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },

    onError: data => {
      toast.error("Error Occurred");
    },
  });

  return (
    <>
      <div className="w-screen h-screen grid grid-cols-6 text-black font-display bg-app_bg_deepest overflow-y-hidden overflow-x-hidden">
        <div className="absolute top-5 left-5">
          <Logo size={"20px"} />
        </div>
        <div className="col-span-2 w-full mx-auto space-y-2 h-full px-8 flex flex-col items-start my-48">
          <div className="opacity-75 text-[14px] font-logo">
            STEP {step} of 1
          </div>
          <div className="text-[1.5rem] font-logo w-11/12">
            Welcome,{" "}
            <span className="text-app_tertiary">Upload your students'</span>{" "}
            document to get started
          </div>

          <div className="text-[12px] opacity-70">
            For example, upload a csv or excel file
          </div>

          <div className="w-full">
            <div className="w-full mb-2">
              <div className="flex flex-col items-start py-2">
                <span className="text-[12px] font-logo opacity-70">School</span>
              </div>
              <div className="outline-none w-full text-[14px] py-2 px-2 rounded-[4px] border bg-white flex items-center">
                <input
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  placeholder="Ex. Ashesi University, Academic City"
                  className="outline-none bg-white w-full"
                />
                <Loader width={20} height={20} />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col items-start py-2">
                <span className="text-[12px] font-logo opacity-70">Grade</span>
              </div>
              <Select
                // menuPlacement="top"
                options={GRADE_LEVELS}
                onChange={({ value, label }) => setGrade(value)}
                className="w-full text-[14px]"
              />
            </div>
            <div className="flex items-center space-x-2 mt-4 opacity-70 text-[12px] text-center w-full">
              <Info size={15} className="opacit-70" />
              <span className="text-center">
                Fill out form before you can upload document
              </span>
            </div>
          </div>
        </div>

        {onboardMutation.isLoading ? (
          <div className="flex items-center justify-center bg-app_slate col-span-4 flex-col">
            <Loader width={40} height={40} />
            <span>Analyzing Document</span>
          </div>
        ) : (
          <div
            style={{
              opacity: !school || !grade ? "50%" : "100%",
            }}
            className="col-span-4 bg-app_slate flex items-center justify-center"
          >
            <div
              onClick={() => {
                if (!school || !grade) {
                  toast("Fill Out Empty Fields", {
                    icon: <Info />,
                  });
                  return;
                }

                handleButtonClick();
              }}
              className="w-[670px] h-[400px] bg-white rounded-xl border flex flex-col items-center justify-center border-app_tertiary border-dashed cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <ScreenShare size={30} className="text-app_tertiary mb-4" />
              <div className="text-[19px]">
                Drag and drop or click here to add a file
              </div>
              <div className="text-[12px] mb-5 opacity-75">
                csv, xls or xlsx
              </div>
              <Button
                // onClick={handleButtonClick}
                className="flex items-center bg-app_tertiary text-white "
              >
                <Plus className="mr-3" size={20} />
                Upload a file
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
    // <>
    //   <div className="w-screen h-screen text-black font-display bg-app_bg_deepest flex items-center justify-center">
    //     <GridOverlay />
    //     <div className="w-[450px] h-auto rounded-lg p-6 z-20 bg-white border">
    //       <div className="text-black flex flex-col items-center space-y-2 ">
    //         {/* <img src="/headphones.png" className="w-40" /> */}
    //         <span className="text-2xl font-bold text-center">
    //           Get Started
    //         </span>
    //         <span className="text-center text-[12px] opacity-90 w-4/5">
    //           Enroll your students on educaid or{" "}
    //           <span className="text-green-400 cursor-pointer">provide </span> an
    //           existing record to proceed
    //         </span>
    //       </div>

    //       <div className="text-black space-y-3 mt-5">
    //         <Button
    //           onClick={() => {
    //             if (onboardMutation.isLoading || !(grade && school)) {
    //               toast.error("Please fill all fields");
    //               return;
    //             }
    //             handleButtonClick();
    //           }}
    //           style={{
    //             backgroundColor: !(grade && school) && "#4a4a4a",
    //             cursor: grade && school ? "pointer" : "not-allowed",
    //           }}
    //           className="shadow-app_shadow bg-app_tertiary hover:text-white p-3 space-x-2 text-white font-semibold flex items-center justify-center  rounded-md w-full"
    //         >
    //           {!onboardMutation.isLoading && (
    //             <Upload size={17} style={{ marginRight: "1rem" }} />
    //           )}
    //           {onboardMutation.isLoading ? (
    //             <RotatingLines strokeWidth="5" width="15" strokeColor="white" />
    //           ) : (
    //             "Upload Data (.xls or .csv)"
    //           )}
    //         </Button>
    //       </div>
    //       <div className="space-y-5"></div>
    //     </div>

    //     <footer className="z-10 py-7 px-10 fixed bottom-0 left-0 w-full flex justify-center items-center space-x-10">
    //       <h1 className="font-logo text-[1rem] leading-[2.3rem] flex items-center relative cursor-pointer">
    //         {/* <img src="/logo.svg" width={25} className="mr-2" /> */}
    //         <span className="relative">
    //           EducAid
    //           <span className="absolute text-[8px] px-1 text-green-400">
    //             Beta
    //           </span>
    //         </span>
    //       </h1>
    //       <a
    //         target="_blank"
    //         href="https://github.com/SWE-Final-Project-1/EducAid"
    //         className="text-sm flex items-center opacity-70"
    //       >
    //         <Code2 className="mr-1 opacity-70" size={17} />
    //         Github
    //       </a>
    //     </footer>
    //   </div>
    //   <input
    //     type="file"
    //     ref={fileInputRef}
    //     style={{ display: "none" }}
    //     onChange={handleFileChange}
    //   />
    //   <Dialog
    //     content={<OnboardTable />}
    //     heading={"Enroll Students "}
    //     sub={"Add Students in your grade"}
    //   />
    // </>
  );
};
