import React from "react";
import { useHistory } from "react-router-dom";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const history = useHistory();

  return (
    <Container fluid>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="fa-solid fa-dog text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Total Pets</p>
                    <Card.Title as="h4">150</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/admin/Adoptpet")}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left  mr-1"></i>
                more info
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Total pet Products</p>
                    <Card.Title as="h4">Comming Soon</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/admin/Adoptpet")}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left  mr-1"></i>
                more info
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Total Vendors</p>
                    <Card.Title as="h4">23</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/admin/Adoptpet")}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left mr-1"></i>
                more info
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Followers</p>
                    <Card.Title as="h4">+45K</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div
                className="stats"
                onClick={() => history.push("/admin/Adoptpet")}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left  mr-1"></i>
                more info
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
