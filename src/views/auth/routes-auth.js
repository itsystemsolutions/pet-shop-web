import Login from "views/auth/Login";
import ForgetPassword from "views/auth/ForgetPassword";
import Register from "views/auth/Register";
import Quiz from "./Quiz";

// Pages
const authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-circle-09",
    component: Login,
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
  {
    path: "/quiz",
    name: "Quiz",
    icon: "nc-icon nc-circle-09",
    component: Quiz,
    layout: "/auth",
  },
];

export default authRoutes;
