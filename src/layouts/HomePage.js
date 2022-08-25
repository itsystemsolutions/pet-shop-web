import React from "react";

import bgImage from "assets/img/bg-home.png";

import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

function HomePage() {
  const history = useHistory();

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "100%",
        backgroundSize: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="d-flex align-items-center min-vh-100">
        <div className="pl-5 mb-5">
          <div className="p-md-1 align-middle text-white">
            <h2 className="display-3">Your New </h2>
            <h2 className="display-3 ">Best Friend</h2>

            <h4>We're here to help you, find your perfect match.</h4>
            <Button
              onClick={() => history.push("/auth/login")}
              color="primary"
              className="bg-info bg-solid text-white"
            >
              ADOPT NOW
            </Button>
            <div>
              <h4>STEPS ON HOW TO ADOPT A PET</h4>
              <p>1. Find an available pet that you wish to adopt</p>
              <p>
                2. Answer all the following questions to be qualified to adopt a
                pet
              </p>
              <p>3. Request zoom interview</p>
              <p>4. Wait for the pet pick-up schedule</p>
              <p>
                5. Scan Gcash QR Code and Upload proof of Reciept for the
                payment/donations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
