import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "views/admin/layout";
import AuthLayout from "views/auth/layout";
import AuthLayout2 from "views/auth/layout/index2";
import UserLayout from "views/user/layout";
import Homepage from "layouts/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/quiz" render={(props) => <AuthLayout2 {...props} />} />
      <Route path="/user" render={(props) => <UserLayout {...props} />} />
      <Route path="/" render={() => <Homepage />} />
      <Redirect from="/" to="/" />
    </Switch>
  </BrowserRouter>
);
