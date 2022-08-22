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

const authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-circle-09",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/Signup",
    name: "Signup",
    icon: "nc-icon nc-circle-09",
    component: Signup,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-circle-09",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/ForgetPassword",
    name: "Forget Password",
    icon: "nc-icon nc-circle-09",
    component: ForgetPassword,
    layout: "/auth",
  },
];

export default authRoutes;
