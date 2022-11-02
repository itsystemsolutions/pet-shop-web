import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

const axios = require("axios").default;

function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/user/info?id=" +
          localStorage.getItem("user_id")
      )
      .then((response) => {
        if (response.data.qualificationAnswers === null) {
          history.push("/quiz/form");
        }
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <h3 className="my-3">STEPS ON HOW TO ADOPT A PET</h3>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats min-vh-15">
            <Card.Header>
              <h4 className="mt-1">
                Find an available pet that you whish to adopt.
              </h4>
            </Card.Header>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/user/adoptpet")}
                style={{ cursor: "pointer" }}
              >
                Step 1 <i className="fa fa-arrow-right  mr-1"></i>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats min-vh-15">
            <Card.Header>
              <h4 className="mt-1">
                Answer all the following questions to be qualified to adopt a
                pet
              </h4>
            </Card.Header>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/user/adoptpet")}
                style={{ cursor: "pointer" }}
              >
                Step 2 <i className="fa fa-arrow-right  mr-1"></i>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats min-vh-15">
            <Card.Header>
              <h4 className="mt-1">Request zoom interview</h4>
            </Card.Header>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/user/adoptpet")}
                style={{ cursor: "pointer" }}
              >
                Step 3 <i className="fa fa-arrow-right  mr-1"></i>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats min-vh-15">
            <Card.Header>
              <h4 className="mt-1">Wait for the pet pick-up schedule</h4>
            </Card.Header>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/user/adoptpet")}
                style={{ cursor: "pointer" }}
              >
                Step 4 <i className="fa fa-arrow-right  mr-1"></i>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats min-vh-15">
            <Card.Header>
              <h4 className="mt-1">
                Scan Gcash QR Code and upload proof of receipt for the
                payment/donations.
              </h4>
            </Card.Header>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/user/adoptpet")}
                style={{ cursor: "pointer" }}
              >
                Step 5 <i className="fa fa-arrow-right  mr-1"></i>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
