import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import routes from "../routes-quiz";
import bgImage from "assets/img/login-bg.png";

function Auth() {
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/quiz") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "59.2rem",
        backgroundSize: "contain",
        width: "100%",
        paddingLeft: "15px",
        height: "1%",
      }}
    >
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="auth-panel w-100" ref={mainPanel}>
            <div className="content">
              <Switch>{getRoutes(routes)}</Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
