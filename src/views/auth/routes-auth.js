import Login from "views/auth/Login";
import ForgetPassword from "views/auth/ForgetPassword";
import Register from "views/auth/Register";

import QualificationForm from "views/auth/QualificationForm";

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
    path: "/qualification-form/:username",
    name: "QualificationForm",
    icon: "nc-icon nc-circle-09",
    component: QualificationForm,
    layout: "/auth",
  },
];

export default authRoutes;
