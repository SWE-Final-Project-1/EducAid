import { BookCheck, Gauge, PlusCircle, Settings, Users2 } from "lucide-react";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import { AppLayout } from "../components/ui/AppLayout";
import { SideNav } from "../components/ui/SideNav";
import { UploadAssignment } from "../components/upload/UploadAssignment";

export const Upload = () => {
  return (
    <>
      <AppLayout
        sideNav={
          <SideNav
            tabIcons={[
              {
                icon: (
                  <Gauge
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "Dashboard",
              },

              {
                icon: (
                  <PlusCircle
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "Create",
              },

              {
                icon: (
                  <BookCheck
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "Assignments",
              },
              {
                icon: (
                  <Users2
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "People",
              },

              {
                icon: (
                  <Settings
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "Settings",
              },
            ]}
          />
        }
        mainArea={
          <ContentScrollable
            // nav1={
            //   <div className="py-3 shadow-app_shadow_light w-full px-4 font-semibold text-lg opacity-80 flex items-center justify-between">
            //     <span>Create Assignment</span>
            //     <span className="flex items-center text-sm text-white bg-app_secondary px-3 py-2 rounded-[0.4rem] cursor-pointer">
            //       <PlusCircle className="mr-1" />
            //       <span>Create Assignment</span>
            //     </span>
            //   </div>
            // }
            content={
              <div className="w-full bg-slate-100 h-full">
                <UploadAssignment />
              </div>
            }
          />
        }
      />
    </>
  );
};
