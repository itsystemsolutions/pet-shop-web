import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";

import routes from "views/user/routes-user";
import Swal from "sweetalert2";

function Header() {
  const history = useHistory();

  const location = useLocation();

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "ADOPT";
  };

  const handleLogout = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "question",
      title: `Are you sure you want to sign out?`,
      confirmButtonText: "Sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/auth/login");
      }
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link className="m-0" href="#pablo" onClick={handleLogout}>
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
