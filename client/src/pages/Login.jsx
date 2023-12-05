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
import { Input } from "@/components/ui/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { userContext } from "@/contexts/UserContext";

export const Login = () => {
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/login", {
        emailAddress: email,
        password,
      });
      return data;
    },
    onSuccess: data => {
      const {user} = data
      toast(`Welcome back, ${user?.firstName}`, {
        icon: <Info />,
      });

      queryClient.invalidateQueries(["user"]);
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    },
    onError: () => {
      toast.error("Login Failed");
    },
  });

  return (
    <div className="w-screen h-screen text-black font-display bg-app_bg_deepest flex items-center justify-center">
      <GridOverlay />
      <div className="w-[450px] h-auto rounded-lg px-6 py-9 z-20 bg-white border">
        <div className="text-black flex flex-col items-center space-y-2 ">
          {/* <img src="/headphones.png" className="w-40" /> */}
          <span className="text-2xl font-bold text-center ">
            Login to Account
          </span>
          <span className="text-center text-[12px] w-4/5 font-logo opacity-70">
            Create a new account on educaid or{" "}
            <span className="text-green-400 cursor-pointer">log in </span> to an
            existing account to proceed
          </span>
        </div>
        <div className="text-black space-y-3 my-4">
          <Button
            onClick={() => {
              microsoftLogin();
            }}
            className="border bg-app_white hover:text-white p-3 space-x-2 text-black font-semibold flex items-center justify-center  rounded-md w-full"
          >
            {/* <BsMicrosoft size={17} style={{ marginRight: "1rem" }} /> */}
            <img src="/microsoft.png" width={"20px"} className="mr-[1rem]" />
            Continue with Microsoft
          </Button>
        </div>
        <div className="divider text-[10px] p-0 m-0 mb-3 opacity-70">OR</div>
        <div className="space-y-5 mb-8">
          <div>
            <span className="text-[14px] font-logo opacity-70">Email</span>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className=""
            />
          </div>
          <div>
            <span className="text-[14px] font-logo opacity-70">Password</span>
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className=""
            />
          </div>
        </div>

        <div>
          <Button
            style={{
              cursor: !email || !password ? "not-allowed" : "pointer",
              opacity: !email || !password ? "80%" : "100%",
            }}
            onClick={() => {
              if (email && password && !loginMutation.isLoading) {
                loginMutation.mutate();
              } else {
                toast.error("You must fill all required fields");
              }
            }}
            className="shadow-app_shadow hover:text-white bg-primary/90 text-white p-5 space-x-2 font-semibold flex items-center justify-center  rounded-md w-full"
          >
            {loginMutation.isLoading ? (
              <RotatingLines strokeColor="white" width="15" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
        <div className="w-full text-center font-logo text-[14px] pt-2 opacity-70">
          Don't have an account ? <a href="/signup">Signup</a>
        </div>
      </div>

      <footer className="z-10 py-7 px-10 fixed bottom-0 left-0 w-full flex justify-center items-center space-x-10">
        <h1 className="font-logo text-[1rem] leading-[2.3rem] flex items-center relative cursor-pointer">
          {/* <img src="/logo.svg" width={25} className="mr-2" /> */}
          <span className="relative">
            EducAid
            <span className="absolute text-[8px] px-1 text-green-400">
              Beta
            </span>
          </span>
        </h1>
        <a
          target="_blank"
          href="https://github.com/SWE-Final-Project-1/EducAid"
          className="text-sm flex items-center opacity-70"
        >
          <Code2 className="mr-1 opacity-70" size={17} />
          Github
        </a>
      </footer>
    </div>
  );
};
