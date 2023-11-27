import { AppLayout } from "../components/ui/AppLayout";
import { SideNav } from "../components/ui/SideNav";
import { INSTRUCTOR_TAB_ICONS } from "../constants";

export const People = () => {
  return (
    <AppLayout
      sideNav={<SideNav tabIcons={INSTRUCTOR_TAB_ICONS} />}
      mainArea={<>People</>}
    />
  );
};
