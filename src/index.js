import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AdopteeLayout from "layouts/Adoptee.js";
import ApproverLayout from "layouts/Approver.js";
import Homepage from "views/Homepage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/adoptee" render={(props) => <AdopteeLayout {...props} />} />
      <Route
        path="/approver"
        render={(props) => <ApproverLayout {...props} />}
      />
      <Route path="/" render={() => <Homepage />} />
      <Redirect from="/" to="/" />
    </Switch>
  </BrowserRouter>
);
