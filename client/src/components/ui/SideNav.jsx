import { LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";

export const SideNav = ({ profile, tabIcons }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="text-white py-5 bg-app_primary w-[240px] h-screen shadow-app_shadow flex flex-col items-center justify-between">
      <div className="flex flex-col item-center w-full justify-center px-4 ">
        <Logo size={"20px"} />
      </div>

      <div className="flex flex-col items-start space-y-2 w-full">
        {tabIcons?.map(({ icon, label }, index) => (
          <TabButton
            key={index}
            icon={icon}
            index={index}
            isActive={activeTab == index}
            setActiveTab={setActiveTab}
            label={label}
          />
        ))}

        <Profile
          profile={{
            avatarUrl:
              "https://i.pinimg.com/236x/04/11/17/041117fffc8f8fff9a257e2fb9d593e2.jpg",
          }}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 w-full">
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

export const Profile = ({ profile }) => {
  return (
    <div className="w-full py-2 px-4 group flex items-center space-x-2 cursor-pointer">
      <div className="w-[22px] h-[22px] rounded-full bg-app-background-1 ring-2 cursor-pointer active:scale-90 transition-all duration-50 ease-in">
        {" "}
        <img
          src={profile?.avatarUrl}
          className="w-full h-full object-contain rounded-full "
        />
      </div>
      <span>Profile</span>
    </div>
  );
};

export const TabButton = ({ icon, index, isActive, setActiveTab, label }) => {
  return isActive ? (
    <div
      onClick={() => {
        setActiveTab(index);
        console.log(index);
      }}
      className="w-full py-2 group-active:scale-90 transition-all duration-50 ease-in px-4 group flex items-center space-x-2 font-semibold bg-app_primary_hover border-r-2 border-app-blue cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </div>
  ) : (
    <div
      onClick={() => {
        setActiveTab(index);
        console.log(index);
      }}
      className="w-full py-2 px-4 flex items-center group space-x-2 hover:bg-app-hover cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};
