import { Info, LogOut, Settings } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { useQueryClient } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Alert } from "flowbite-react";
import { BsGear } from "react-icons/bs";
import { Button } from "./ui/button";

export const SideNav = ({ profile, tabIcons }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="text-black py-5 bg-app_white border w-[250px] h-screen flex flex-col items-center justify-between">
      <div className="w-full flex-col items-center">
        <div className="flex item-center w-full justify-between px-4 ">
          <Logo size={"18px"} />
        </div>

        <div className="flex flex-col items-start space-y-2 w-full mt-20">
          {tabIcons?.map(({ icon, label, route }, index) => (
            <TabButton
              key={index}
              icon={icon}
              index={index}
              isActive={route == window.location.pathname}
              setActiveTab={setActiveTab}
              label={label}
              route={route}
            />
          ))}

          {/* <Profile
          isActive={"/profile" == window.location.pathname}
          profile={{
            avatarUrl:
              "https://i.pinimg.com/236x/04/11/17/041117fffc8f8fff9a257e2fb9d593e2.jpg",
          }}
        /> */}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full ">
        <TabButton
          icon={
            <LogOut
              size={20}
              className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
            />
          }
          label={"Logout"}
          index={tabIcons?.length}
          isActive={activeTab == tabIcons?.length}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export const Profile = ({ profile, isActive }) => {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  return isActive ? (
    <>
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className="w-full py-2 group-active:scale-90 transition-all duration-50 ease-in px-4 group flex items-center space-x-3 font-semibold bg-app_side_hover border-r-2 border-app-blue cursor-pointer"
      >
        <div className="w-[22px] h-[22px] rounded-full bg-app-background-1 ring-1 ring-app_side_hover cursor-pointer active:scale-90 transition-all duration-50 ease-in">
          {" "}
          <img
            src={profile?.avatarUrl}
            className="w-full h-full object-contain rounded-full "
          />
        </div>
        <span>Profile</span>
      </div>
    </>
  ) : (
    <>
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className="w-full py-2 px-4 group flex items-center space-x-3 cursor-pointer"
      >
        <div className="w-[22px] h-[22px] rounded-full bg-app-background-1 ring-1 cursor-pointer active:scale-90 transition-all duration-50 ease-in">
          {" "}
          <img
            src={profile?.avatarUrl}
            className="w-full h-full object-contain rounded-full "
          />
        </div>
        <span>Account</span>
      </div>
    </>
  );
};

export const TabButton = ({
  icon,
  index,
  isActive,
  setActiveTab,
  label,
  route,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return isActive ? (
    <div
      onClick={async () => {
        if (label != "Logout") {
          setActiveTab(index);
          console.log(index);
          navigate(route);
        } else {
          await api.post("/auth/logout");
          navigate("/login");
          queryClient.invalidateQueries(["user"]);
        }
      }}
      className="w-full py-2 group-active:scale-90 transition-all duration-50 ease-in px-4 group flex items-center space-x-3 font-semibold border-r-2 border-app_dark cursor-pointer opacity-70 bg-app_tertiary/20"
    >
      {icon}
      <span>{label}</span>
    </div>
  ) : (
    <div
      onClick={async () => {
        if (label != "Logout") {
          setActiveTab(index);
          console.log(index);
          navigate(route);
        } else {
          setLoading(true);
          toast("Signing you out", {
            icon: <Info />,
          });
          await api.post("/auth/logout");
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
            queryClient.invalidateQueries(["user"]);
          }, 2000);
        }
      }}
      className="w-full py-2 px-4 flex items-center group space-x-3 hover:bg-app-hover cursor-pointer opacity-70"
    >
      {loading && label == "Logout" ? (
        <>
          <RotatingLines strokeColor="white" width="15" />
          <span className="text-[14px] opacity-60">Please wait ...</span>
        </>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </div>
  );
};
