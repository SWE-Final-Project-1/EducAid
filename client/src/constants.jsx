import {
  BookCheck,
  Gauge,
  PlusCircle,
  Settings,
  Upload,
  Users2,
} from "lucide-react";

export const INSTRUCTOR_TAB_ICONS = [
  {
    icon: (
      <Gauge
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Dashboard",
    route: "/dashboard",
  },

  {
    icon: (
      <PlusCircle
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Create",
    route: "/create",
  },

  {
    icon: (
      <Upload
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Upload",
    route: "/upload",
  },

  {
    icon: (
      <BookCheck
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Assignments",
    route: "/assignments",
  },
  // {
  //   icon: (
  //     <Users2
  //       className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
  //       size={20}
  //     />
  //   ),
  //   label: "People",
  //   route: "/people",
  // },

  // {
  //   icon: (
  //     <Settings
  //       className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
  //       size={20}
  //     />
  //   ),
  //   label: "Settings",
  //   route: "/settings",
  // },
];

export const STUDENT_TAB_ICONS = [
  {
    icon: (
      <Gauge
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Dashboard",
    route: "/dashboard",
  },

  {
    icon: (
      <BookCheck
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Assignments",
    route: "/assignments",
  },

  {
    icon: (
      <Settings
        className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
        size={20}
      />
    ),
    label: "Settings",
    route: "/settings",
  },
];
