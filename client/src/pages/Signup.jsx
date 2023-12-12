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
  Tag,
} from "lucide-react";
import { annotate, annotationGroup } from "rough-notation";
import { Input } from "@/components/ui/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { Logo } from "@/components/ui/Logo";

export const Signup = () => {
  const width = 400;
  const height = 500;

  const left =
    typeof window !== "undefined" && window.innerWidth / 2 - width / 2;
  const top =
    typeof window !== "undefined" && window.innerHeight / 2 - height / 2;

  const microsoftLogin = () => {
    window.open(
      `${
        process.env.NODE_ENV == "production"
          ? `${import.meta.env.VITE_API_URL_PROD}/auth/microsoft`
          : `${import.meta.env.VITE_API_URL_DEV}/auth/microsoft`
      }`,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    );
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const CanSplitName = name => {
    if (typeof name !== "string" || name.trim() === "") {
      return null; // Return null for invalid input
    }

    const nameParts = name.split(" ");

    // Check if there are exactly two parts
    return nameParts >= 2;
  };

  const registerMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/signup", {
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        emailAddress: email,
        password: password,
        role: "Instructor",
      });
    },
    onSuccess: () => {
      toast.success("Registered Account");
      queryClient.invalidateQueries(["user"]);
      setTimeout(() => navigate("/dashboard"), 2000);
    },

    onError: () => {
      toast.error("Error during Registration");
    },
  });

  useEffect(() => {
    const e = document.querySelector("#annotation");
    const annotation = annotate(e, { type: "underline", color: "yellow" });
    annotation.show();
  });

  return (
    <>
      <div className="w-screen h-screen grid grid-cols-5 text-black font-display bg-app_bg_deepest">
        <div className="col-span-3 flex items-center justify-center">
          <div className="w-[450px] h-auto rounded-lg mt-16 px-6 py-9 z-20 bg-white">
            <div className="text-black flex flex-col items-center space-y-2 ">
              {/* <img src="/headphones.png" className="w-40" /> */}
              <span className="text-2xl font-logo text-center ">
                Create your EducAid account
              </span>
              {/* <span className="text-center text-[12px] w-4/5 font-logo opacity-70">
                Create a new account on educaid or{" "}
                <span className="text-green-400 cursor-pointer">log in </span>{" "}
                to an existing account to proceed
              </span> */}
            </div>
            <div className="text-black space-y-3 my-4">
              <Button
                onClick={() => {
                  microsoftLogin();
                }}
                className="border bg-white hover:text-white p-3 space-x-2 text-black font-logo flex items-center justify-center  rounded-md w-full shadow-app_shadow_light"
              >
                <img
                  src="/microsoft.png"
                  width={"20px"}
                  className="mr-[1rem]"
                />
                Continue with Microsoft
              </Button>
            </div>
            <div className="divider text-[10px] p-0 m-0 mb-3 opacity-70">
              Or, register with your email
            </div>
            <div className="space-y-2 mb-8">
              <div className="space-y-1">
                <span className="text-[12px] font-logo opacity-70 ">Name</span>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className="p-6"
                />
              </div>
              {/* <div>
                <span className="text-[14px] font-logo opacity-70">School</span>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="School name"
                  className="p-6"
                />
              </div> */}
              <div className="space-y-1">
                <span className="text-[12px] font-logo opacity-70">
                  Work Email
                </span>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="p-6"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[12px] font-logo opacity-70">
                  Password
                </span>
                <Input
                  type={"password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-6"
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] text-center">
                By signing up, you agree to EducAid’s{" "}
                <span className="text-app_blue">Terms of Service </span>and
                <span className="text-app_blue"> Privacy Policy.</span>
              </div>
              <Button
                style={{
                  cursor:
                    !name || !email || !password ? "not-allowed" : "pointer",
                  opacity: !name || !email || !password ? "80%" : "100%",
                }}
                onClick={() => {
                  if (
                    name &&
                    email &&
                    password &&
                    !registerMutation.isLoading
                  ) {
                    // if (!CanSplitName(name)) {
                    //   toast.error(
                    //     "Name field should be your first and last name seperated by space"
                    //   );

                    //   return;
                    // }
                    registerMutation.mutate();
                  } else {
                    toast("You must fill all required fields", {
                      icon: <Info />,
                    });
                  }
                }}
                className={`${
                  registerMutation.isLoading ? "" : "arrow "
                }shadow-app_shadow hover:text-white bg-app_blue text-white p-6 space-x-2 font-semibold flex items-center justify-center  rounded-md w-full`}
              >
                {registerMutation.isLoading ? (
                  <RotatingLines strokeColor="white" width="15" />
                ) : (
                  "Create a free account"
                )}
              </Button>
            </div>
            <div className="w-full text-center font-logo text-[14px] pt-7 opacity-70">
              Already have an account ?{" "}
              <Link to="/login" className="text-app_blue">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-app_blue h-full pattern">
          <div className="absolute top-5 left-5">
            <Logo size={"20px"} />
          </div>
          <div className="text-white font-logo space-y-5 flex flex-col h-full justify-center text-center w-full">
            <div className="flex items-center justify-center space-x-12 ">
              <div className="grad_orange border text-[40px] min-w-[80px] min-h-[80px] rounded-full flex items-center justify-center">
                🤔
              </div>
              <div className="grad_purple border text-[40px] min-w-[80px]  min-h-[80px] rounded-full flex items-center justify-center">
                🧠
              </div>
              <div className="grad_green border text-[40px] w-[80px] h-[80px] rounded-full flex items-center justify-center">
                📋
              </div>
            </div>
            <span className="text-3xl text-center font-semibold">
              10<span className="text-green">x</span> your grading{" "}
              <span id="annotation">speed</span>
            </span>
            <span className="text-[12px] w-1/2 mx-auto text-center opacity-70">
              Bolster your productivity. Harnessing AI for Balanced Literacy and
              Numeracy Evaluations
            </span>
          </div>
        </div>
      </div>
    </>
    // <div className="w-screen h-screen text-black font-display bg-app_bg_deepest flex items-center justify-center">
    //   <GridOverlay />

    //   <footer className="z-10 py-7 px-10 fixed bottom-0 left-0 w-full flex justify-center items-center space-x-10">
    //     <h1 className="font-logo text-[1rem] leading-[2.3rem] flex items-center relative cursor-pointer">
    //       {/* <img src="/logo.svg" width={25} className="mr-2" /> */}
    //       <span className="relative">
    //         EducAid
    //         <span className="absolute text-[8px] px-1 text-green-400">
    //           Beta
    //         </span>
    //       </span>
    //     </h1>
    //     <a
    //       target="_blank"
    //       href="https://github.com/SWE-Final-Project-1/EducAid"
    //       className="text-sm flex items-center opacity-70"
    //     >
    //       <Code2 className="mr-1 opacity-70" size={17} />
    //       Github
    //     </a>
    //   </footer>
    // </div>
  );
};
