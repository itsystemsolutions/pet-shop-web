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

    if (username === "admin" && password === "4dm1n") {
      history.push("/admin/dashboard");
    } else {
      console.log("here");
      axios
        .post(`/user/login?username=${username}&password=${password}`)
        .then(function (response) {
          if (response.data !== 0) {
            axios.get("/user/info/?id=" + response.data).then((response) => {
              console.log("asdasldkasjdlkj");
              if (response.data.type === "ADOPTEE") {
                history.push("/adoptee/dashboard");
              } else if (response.data.type === "APPROVER") {
                history.push("/approver/dashboard");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Oops...",
              title: "Invalid Credentials!",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
                Dont have account ?
                <a
                  className="color-primary mt-3"
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
