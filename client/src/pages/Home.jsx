import {
  BarChart,
  BookCheck,
  Gauge,
  HelpingHand,
  HomeIcon,
  Layers,
  PlusCircle,
  Settings,
  Upload,
  Users2,
} from "lucide-react";
import { AppLayout } from "../components/ui/AppLayout";
import { SideNav } from "../components/ui/SideNav";

export const Home = () => {
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
                  <Upload
                    className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                    size={20}
                  />
                ),
                label: "Upload",
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
        mainArea={<>MainArea</>}
      />
    </>
  );
};
