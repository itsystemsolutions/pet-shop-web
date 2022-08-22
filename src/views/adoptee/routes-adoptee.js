import Dashboard from "views/Dashboard.js";
import Adoptpet from "views/Adoptpet";

import Interviewstatus from "views/Interviewstatus";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/adoptee",
  },
  {
    path: "/adoptpet",
    name: "Adoptpet",
    icon: "nc-icon nc-chart-pie-35",
    component: Adoptpet,
    layout: "/adoptee",
  },
  {
    path: "/interviewstatus",
    name: "Interview Status",
    icon: "nc-icon nc-notes",
    component: Interviewstatus,
    layout: "/adoptee",
  },
];

export default dashboardRoutes;
