import Dashboard from "views/user/Dashboard.js";
import Adoptpet from "views/user/Adoptpet";

import EligiblePets from "views/user/EligiblePets";

import Appointments from "views/user/Appointments";
import ForPickup from "views/user/ForPickup";
import UserProfile from "views/user/UserProfile";
import QualificationForm from "../auth/QualificationForm";
import Schedule from "./Schedule";
import UploadQR from "./UploadQR";
import Missing from "views/user/Missing";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/adoptpet",
    name: "Browse Pet",
    icon: "nc-icon nc-chart-pie-35",
    component: Adoptpet,
    layout: "/user",
  },
  {
    path: "/eligible-pets",
    name: "Eligible Pets",
    icon: "nc-icon nc-notes",
    component: EligiblePets,
    layout: "/user",
  },
  {
    path: "/appointment",
    name: "Apointments",
    icon: "nc-icon nc-notes",
    component: Appointments,
    layout: "/user",
  },
  {
    path: "/pick-up",
    name: "For Pick Up",
    icon: "nc-icon nc-notes",
    component: ForPickup,
    layout: "/user",
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user",
  },
  {
    path: "/adopt-form/:code",
    name: "Adopt Form",
    icon: "nc-icon nc-notes",
    component: AdoptForm,
    hidden: true,
    layout: "/user",
  },
  {
    path: "/schedule/:code",
    name: "schedule",
    icon: "nc-icon nc-notes",
    component: Schedule,
    hidden: true,
    layout: "/user",
  },
  {
    path: "/upload/proof-of-payment/:id",
    name: "schedule",
    icon: "nc-icon nc-notes",
    component: UploadQR,
    hidden: true,
    layout: "/user",
  },
];

export default dashboardRoutes;
