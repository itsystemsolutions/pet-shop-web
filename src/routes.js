import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Login from "views/Login";
import Signup from "views/Signup";
import ForgetPassword from "views/ForgetPassword";
import Question from "views/Question";
import Adoptpet from "views/Adoptpet";

import Appointment from "views/Appointment";
import Reciept from "views/Reciept";
import Schedule from "views/Schedule";
import Zoom from "views/Zoom";

import Interviewstatus from "views/Interviewstatus";
import Register from "views/Register";
import Addpet from "views/Addpet";

// Pages
import Adopties from "views/admin/Adopties";
import Approvers from "views/admin/Approvers";
import Addadoptee from "views/Addadoptee";
import Addapprover from "views/Addapprover";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/adoptee",
    name: "ADD Adoptee",
    icon: "nc-icon nc-circle-09",
    component: Addadoptee,
    layout: "/admin",
  },
  {
    path: "/approver",
    name: "ADD Approver",
    icon: "nc-icon nc-circle-09",
    component: Addapprover,
    layout: "/admin",
  },
  {
    path: "/addpet",
    name: "Addpet",
    icon: "nc-icon nc-chart-pie-35",
    component: Addpet,
    layout: "/admin",
  },
  {
    path: "/adoptpet",
    name: "Adoptpet",
    icon: "nc-icon nc-chart-pie-35",
    component: Adoptpet,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/question",
    name: "Question",
    icon: "nc-icon nc-notes",
    component: Question,
    layout: "/admin",
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  {
    path: "/adopties",
    name: "Adopties List",
    icon: "nc-icon nc-notes",
    component: Adopties,
    layout: "/admin",
  },

  {
    path: "/approvers",
    name: "Approvers List",
    icon: "nc-icon nc-notes",
    component: Approvers,
    layout: "/admin",
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: "nc-icon nc-notes",
    component: Appointment,
    layout: "/admin",
  },
  {
    path: "/zoom",
    name: "Zoom",
    icon: "nc-icon nc-notes",
    component: Zoom,
    layout: "/admin",
  },
  {
    path: "/interviewstatus",
    name: "Interview Status",
    icon: "nc-icon nc-notes",
    component: Interviewstatus,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/reciept",
  //   name: "Reciept",
  //   icon: "nc-icon nc-paper-2",
  //   component: Reciept,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
