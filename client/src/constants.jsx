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


export const ASSIGNMENT_TYPES= [
  { value: 'Literacy', label: 'Literacy' },
  { value: 'Numeracy', label: 'Numeracy' },
]

export const ASSIGNMENT_FORMATS = [
  { value: 'PDF', label: 'PDF' },
  { value: 'JPEG', label: 'JPEG' },
  { value: 'PNG', label: 'PNG' },
];

export const GRADE_LEVELS = [
  { value: 'grade1', label: 'Grade 1' },
  { value: 'grade2', label: 'Grade 2' },
  { value: 'grade3', label: 'Grade 3' },
  { value: 'grade4', label: 'Grade 4' },
  { value: 'grade5', label: 'Grade 5' },
  { value: 'grade6', label: 'Grade 6' },
  { value: 'jhs1', label: 'JHS 1' },
  { value: 'jhs2', label: 'JHS 2' },
  { value: 'jhs3', label: 'JHS 3' },
  { value: 'shs1', label: 'SHS 1' },
  { value: 'shs2', label: 'SHS 2' },
  { value: 'shs3', label: 'SHS 3' },
];





