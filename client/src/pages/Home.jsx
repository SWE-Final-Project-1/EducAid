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
import { INSTRUCTOR_TAB_ICONS } from "../constants";

export const Home = () => {
  return (
    <>
      <AppLayout
        sideNav={
          <SideNav
            tabIcons={INSTRUCTOR_TAB_ICONS}
          />
        }
        mainArea={<>MainArea</>}
      />
    </>
  );
};
