import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Label,
  Row,
} from "reactstrap";
import { FormText } from "react-bootstrap";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";

const axios = require("axios").default;

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [setshowhide, setShowHide] = useState("password");
  const [eye, seteye] = useState(true);

  const handleEye = () => {
    if (setshowhide === "password") {
      setShowHide("text");
      seteye(false);
    } else {
      setShowHide("password");
      seteye(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/login?username=${username}&password=${password}`
      )
      .then(function (response) {
        if (response.data !== 0) {
          localStorage.setItem("user_id", response.data);
          axios
            .get(
              process.env.REACT_APP_API_URL + "/user/info/?id=" + response.data
            )
            .then((response) => {
              if (response.data.type === "USER") {
                history.push("/user/dashboard");
                localStorage.setItem("user_role", "User");
                localStorage.setItem("user_username", " - " + username);
              } else if (response.data.type === "ADMIN") {
                history.push("/admin/dashboard");
                localStorage.setItem("user_role", "Admin");
                localStorage.setItem("user_username", "");
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            text: "Account is invalid",
            title: "Invalid Credentials",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Row className="justify-content-center">
      <Col className="w-100" md={6} sm={12}>
        <Card>
          <CardHeader>
            <div className="text-center">
              <h1>SIGN IN</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  placeholder="Username"
                  type="text"
                  minLength={4}
                  autoComplete="new-username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  placeholder="Password"
                  value={password}
                  minLength={4}
                  required
                  type={setshowhide}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Row>
                  <Col>
                    <div className="mt-2 mr-3" style={{ cursor: "pointer" }}>
                      <a
                        className="color-primary"
                        onClick={() => history.push("/auth/ForgetPassword")}
                      >
                        Forgot Password
                      </a>
                    </div>
                  </Col>
                  <Col className="text-right">
                    <FormText onClick={handleEye}>
                      <div
                        className="font-italic mt-3"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                        />
                        <span className="ml-2">
                          {eye ? "Show" : "Hide"} password
                        </span>
                      </div>
                    </FormText>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button
                    className="mt-5 mb-4 font-italic rounded-pill btn-fill"
                    color="primary"
                    type="submit"
                    block
                  >
                    Log in
                  </Button>
                </div>
              </FormGroup>
              <span className="mt-2 font-italic">
                Dont have account?
                <a
                  className="color-primary ml-2 mt-3"
                  onClick={() => history.push("/auth/register")}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </a>
              </span>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
