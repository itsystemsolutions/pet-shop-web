import Dashboard from "views/Dashboard.js";
import Adoptpet from "views/user/Adoptpet";

import EligiblePets from "views/user/EligiblePets";

import Appointments from "views/user/Appointments";
import UserProfile from "views/user/UserProfile";
import AdoptForm from "./AdoptForm";
import Schedule from "./Schedule";

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
    path: "/UserProfile",
    name: "UserProfile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user",
  },
];

export default dashboardRoutes;
