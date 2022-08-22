import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Row, Col } from "reactstrap";

import bgImage from "assets/img/bg-home.png";

function Homepage() {
  const history = useHistory();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "59.2rem",
        backgroundSize: "cover",
        width: "100%",
        paddingLeft: "15px",
      }}
    >
      <div class="ml-lg-5 ml-sm-1 h-100 p-5 p-md-1">
        <div class="row h-100 align-items-center">
          <div>
            <h1 className="display-3">Your New </h1>
            <h1 className="display-3 ">Best Friend</h1>

            <h5>
              Integer molestie lorem at massa Facilisis in pretium nisl aliquet
            </h5>
            <h5>Nulla volutpat aliquam velit</h5>

            <Button
              onClick={() => history.push("/auth/login")}
              color="primary"
              className="bg-info mb-5 text-white rounded-pill pl-2"
            >
              ADOPT NOW!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
