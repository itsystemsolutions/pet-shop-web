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
    layout: "/approver",
  },
  {
    path: "/adopties",
    name: "Adopties List",
    icon: "nc-icon nc-notes",
    component: Adopties,
    layout: "/approver",
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: "nc-icon nc-notes",
    component: Appointment,
    layout: "/approver",
  },
];

export default dashboardRoutes;
