import Dashboard from "views/Dashboard.js";
import Appointments from "views/admin/Appointments";
import ForPickup from "views/admin/ForPickup";
import Users from "views/admin/Users";
import Zoom from "views/admin/Zoom";
import PickUpForm from "views/admin/PickUpForm";
import Addpet from "views/admin/Addpet";
import ProofPayment from "views/admin/ProofPayment";

// Pages
import Adopties from "views/admin/Adopties";
import Lostpet from "views/admin/Lostpet";

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
    path: "/for-pickup",
    name: "For Pickup",
    icon: "nc-icon nc-notes",
    component: ForPickup,
    layout: "/admin",
  },
  {
    path: "/lostpet",
    name: "Lostpet",
    icon: "nc-icon nc-notes",
    component: Lostpet,
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
  {
    path: "/pick-up/:id/:code",
    name: "Pick Up",
    icon: "nc-icon nc-notes",
    hidden: true,
    component: PickUpForm,
    layout: "/admin",
  },
  {
    path: "/proof-of-payment/:id",
    name: "Proof Of Payment",
    icon: "nc-icon nc-notes",
    hidden: true,
    component: ProofPayment,
    layout: "/admin",
  },
];

export default dashboardRoutes;
