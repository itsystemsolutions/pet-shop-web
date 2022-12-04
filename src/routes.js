import Dashboard from "views/Dashboard.js";
import Appointments from "views/admin/Appointments";
import ForPickup from "views/admin/ForPickup";
import Users from "views/admin/Users";
import Reports from "views/admin/Report";
import Zoom from "views/admin/Zoom";
import PickUpForm from "views/admin/PickUpForm";
import Addpet from "views/admin/Addpet";
import ProofPayment from "views/admin/ProofPayment";
import UserPets from "views/admin/UserPets";

// Pages
import Adopties from "views/admin/Adopties";
import Lostpet from "views/admin/Lostpet";
import MissingPets from "views/admin/MissingPets";

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
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/missing/pets",
    name: "Lost and Found",
    icon: "nc-icon nc-single-02",
    component: MissingPets,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-single-02",
    component: Reports,
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
    path: "/proof-of-payment/:id/:count",
    name: "Proof Of Payment",
    icon: "nc-icon nc-notes",
    hidden: true,
    component: ProofPayment,
    layout: "/admin",
  },
  {
    path: "/user/pets/:id",
    name: "User Pets",
    icon: "nc-icon nc-notes",
    hidden: true,
    component: UserPets,
    layout: "/admin",
  },
];

export default dashboardRoutes;
