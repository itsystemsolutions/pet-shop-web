import Dashboard from "views/Dashboard.js";
import Appointments from "views/admin/Appointments";
import Users from "views/admin/Users";
import Zoom from "views/admin/Zoom";
import Addpet from "views/admin/Addpet";

// Pages
import Adopties from "views/admin/Adopties";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
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
    path: "/adopties",
    name: "Requested Interviews",
    icon: "nc-icon nc-notes",
    component: Adopties,
    layout: "/admin",
  },
  {
    path: "/appointment",
    name: "Appointments",
    icon: "nc-icon nc-notes",
    component: Appointments,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/zoom/:id/:code",
    name: "Zoom",
    icon: "nc-icon nc-notes",
    hidden: true,
    component: Zoom,
    layout: "/admin",
  },
];

export default dashboardRoutes;
